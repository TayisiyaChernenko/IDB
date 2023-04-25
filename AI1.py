import json
import websockets
import asyncio
import certifi
import pymongo
from bson import ObjectId
import nltk
import string
import warnings
from transformers import pipeline
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# connect to the database
ca = certifi.where()
client = pymongo.MongoClient("mongodb+srv://tayisiyachernenko:HYF6s7cpA-tTwFc@clusterseniorproject.amhkbqh"".mongodb.net/?retryWrites=true&w=majority", tlsCAFile=ca)  # can be changed to the actual database
db = client["test"]  # can be changed to a database name
doc = db["documents"]  # subject to change collection name
post = db["posts"]

model_name = "deepset/bert-large-uncased-whole-word-masking-squad2"
nlp = pipeline('question-answering', model=model_name, tokenizer=model_name)
warnings.filterwarnings('ignore')
keywords = ["Professor", "Course", "Student", "information", "Required", "Contact", "Pre-requisite", "Co-requisite",
            "Description",
            "Learning", "Objective", "Textbook", "Assignment", "Academic", "&", "Calendar", "Tentative", "Grading",
            "Policy",
            "Attendance", "Policies", "Collaboration", "integrity", "Late", "Test", "Extra", "credit", "Regard",
            "Missing",
            "Field", "Trip", "Conduct", "Email", "Use", "Withdrawal", "from", "Class", "Grievance", "Procedure",
            "Incomplete",
            "Grade", "Disability", "Service", "Religious", "Holy", "Day", "and", "Recommend", "Material",
            "Connectivity",
            "Problem", "Homework", "AccessAbility", "Resource", "Center", "Additional", "Instructor", "UT", "Dallas",
            "Syllabus", "Recording", "Off-campus", "Instruction", "Comet", "Creed", "Support", "TA", "Outcomes", "Text",
            "Instructional", "Mode", "platform", "COVID-19", "Guideline", "Technical", "Access", "Server",
            "Unavailability",
            "or", "other", "Exams", "Teams", "Communication"]


# function to call the question answer model
def answer(q, c, p):
    QA_input = {
        'question': q,
        'context': c
    }
    result = nlp(QA_input)
    res = result['answer']
    res += "\nYou may also looking for: "
    res += response(q, p)
    if post.count_documents({"text": p["text"], "belongsToDiscission.course": p["belongsToDiscission"]["course"], "belongsToDiscission.section": p["belongsToDiscission"]["section"]}) <= 1:
        val = {"replyText": str(res), "firstName": "AI", "lastName": "bot"}
        post.update_one(p, {"$push": {"replies": val}})
    else:
        val = {"replyText": "Question already answered", "firstName": "AI", "lastName": "bot"}
        post.update_one(p, {"$push": {"replies": val}})


def LemTokens(tokens):
    lemmer = nltk.stem.WordNetLemmatizer()
    return [lemmer.lemmatize(token) for token in tokens]


def LemNormalize(text):
    remove_punct_dict = dict((ord(punct), None) for punct in string.punctuation)
    return LemTokens(nltk.word_tokenize(text.lower().translate(remove_punct_dict)))


def response(q, p):
    str = p["text"].split(":")
    name = str[0].lower()
    course = p["belongsToDiscission"]["course"]
    section = p["belongsToDiscission"]["section"]
    txt = doc.find_one({"course": course, "section": section, "name": name})
    if txt is None:
        print("Not in DB")
    else:
        txt = txt["text"]
        txt = txt.replace('\n', '')
        txt = txt.lower()
        sent_tokens = nltk.sent_tokenize(txt)  # converts to list of scentences
        chatbot_response = ''
        sent_tokens.append(q)
        TfidfVec = TfidfVectorizer(tokenizer=LemNormalize, stop_words="english")
        tfidf = TfidfVec.fit_transform(sent_tokens)
        vals = cosine_similarity(tfidf[-1], tfidf)
        idx = vals.argsort()[0][-2]
        flat = vals.flatten()
        flat.sort()
        req_tfidf = flat[-2]
        chatbot_response = chatbot_response + sent_tokens[idx]
        return chatbot_response


async def new_client_connected(client_socket, path):
    print("New Client Connected")
    while True:
        input = await client_socket.recv()
        message = json.loads(input)
        p = post.find_one({"_id": ObjectId(message["id"])})
        str = p["text"].split(":")
        q = str[1].strip()
        n = str[0].strip().lower()
        c = doc.find_one({"course": p["belongsToDiscission"]["course"], "section": p["belongsToDiscission"]["section"], "name": n})
        answer(q, c["text"], p)


async def start_server():
    print("Server Start")
    await websockets.serve(new_client_connected, "localhost", 8000)


if __name__ == '__main__':
    event_loop = asyncio.get_event_loop()
    event_loop.run_until_complete(start_server())
    event_loop.run_forever()
