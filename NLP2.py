# -*- coding: utf-8 -*-

import nltk
import string
import aspose.words as aw
import warnings
from pathlib import Path
from transformers import AutoModelForQuestionAnswering, AutoTokenizer, pipeline

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

# preprocessing
lemmer = nltk.stem.WordNetLemmatizer()


def PreProcessFile(filename):
    f = open(filename, 'r', errors='ignore')
    lines = f.readlines()
    temp = []
    count = 0
    # Strips the newline character
    for line in lines:
        l = line.strip()
        temp.append(l)
        flag = 0
        count = count + 1
        res = line.split()
        if len(res) >= 3:
            i = 0
            x = 0
            y = 0
            while flag == 0:
                if keywords[i].lower() in res[0].lower():
                    if '.' != temp[count - 1][-1]:
                        temp[count - 1] = temp[count - 1] + '.'
                    flag = 9
                i += 1
                if i == len(keywords):
                    flag = 1
            while flag == 1:
                if keywords[x].lower() in res[1].lower():
                    if '.' != temp[count - 1][-1]:
                        temp[count - 1] = temp[count - 1] + '.'
                    flag = 9
                x += 1
                if x == len(keywords):
                    flag = 2
            while flag == 2:
                if keywords[y].lower() in res[2].lower():
                    if '.' != temp[count - 1][-1]:
                        temp[count - 1] = temp[count - 1] + '.'
                    flag = 9
                y += 1
                if y == len(keywords):
                    flag = 9
    length = len(filename)
    filenameTemp = filename[:(length - 4)] + "Copy" + filename[(length - 4):]
    with open(filenameTemp, 'w') as f:
        for line in temp:
            f.write(line)
            f.write('\n')
    return filenameTemp





## Read and preprocess file
print("Enter the name of the file to be searched")
filename = input()

##FileConverter
doc = aw.Document(filename)
if "pdf" in filename:
    filename = filename[:-4]+".txt"
    doc.save(filename)
if "docx" in filename:
    filename = filename[:-5]+".txt"
    doc.save(filename)

FileName = PreProcessFile(filename)
print("Ask a question.")
user_response = input()
user_response2 = user_response

txt = Path(FileName).read_text()
txt = txt.replace('\n', '')
txt = txt.lower()

sent_tokens = nltk.sent_tokenize(txt)  # converts to list of scentences
word_tokens = nltk.word_tokenize(txt)  # converts to list of words

user_response = user_response.lower()


def LemTokens(tokens):
    return [lemmer.lemmatize(token) for token in tokens]


remove_punct_dict = dict((ord(punct), None) for punct in string.punctuation)


def LemNormalize(text):
    return LemTokens(nltk.word_tokenize(text.lower().translate(remove_punct_dict)))


# Vectorized

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity


def response(user_response):
    chatbot_response = ''
    sent_tokens.append(user_response)
    TfidfVec = TfidfVectorizer(tokenizer=LemNormalize, stop_words="english")
    tfidf = TfidfVec.fit_transform(sent_tokens)
    vals = cosine_similarity(tfidf[-1], tfidf)
    idx = vals.argsort()[0][-2]
    flat = vals.flatten()
    flat.sort()
    req_tfidf = flat[-2]
    '''
    if (req_tfidf == 0):
        chatbot_response = chatbot_response + "I don't understand you"
        return chatbot_response
    else:
    '''
    chatbot_response = chatbot_response + sent_tokens[idx]
    return chatbot_response


if __name__ == "__main__":
    model_name = "deepset/bert-large-uncased-whole-word-masking-squad2"

    # a) Get predictions
    nlp = pipeline('question-answering', model=model_name, tokenizer=model_name)

    txt = str(txt)

    QA_input = {
        'question': user_response2,
        'context': txt
    }
    res = nlp(QA_input)

    # b) Load model & tokenizer
    model = AutoModelForQuestionAnswering.from_pretrained(model_name)
    tokenizer = AutoTokenizer.from_pretrained(model_name)
    print(res['answer'])

    print("\nYou may also looking for: ")
    print(response(user_response))
    sent_tokens.remove(user_response)
