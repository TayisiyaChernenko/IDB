import json
import websockets
import asyncio
import certifi
import pymongo
from bson import ObjectId
from transformers import pipeline

qa_model = pipeline("question-answering", model='distilbert-base-cased-distilled-squad')
ca = certifi.where()
client = pymongo.MongoClient("mongodb+srv://tayisiyachernenko:HYF6s7cpA-tTwFc@clusterseniorproject.amhkbqh"".mongodb.net/?retryWrites=true&w=majority", tlsCAFile=ca)  # can be changed to the actual database
db = client["test"]  # can be changed to a database name
pdf = db["pdf"]  # subject to change collection name
post = db["posts"]


# function to call the question answer model
def answer(q, c, p):
    result = qa_model(question=q, context=c)
    print(p)
    if post.count_documents({"text": p["text"], "belongsToDiscission.course": p["belongsToDiscission"]["course"], "belongsToDiscission.section": p["belongsToDiscission"]["section"]}) <= 1:
        val = {"replyText": str(result), "firstName": "AI", "lastName": "bot"}
        post.update_one(p, {"$push": {"replies": val}})
    else:
        val = {"replyText": "Question already answered", "firstName": "AI", "lastName": "bot"}
        post.update_one(p, {"$push": {"replies": val}})


async def new_client_connected(client_socket, path):
    print("New Client Connected")
    while True:
        input = await client_socket.recv()
        message = json.loads(input)
        # print("Client sent: ", input)
        p = post.find_one({"_id": ObjectId(message["id"])})
        c = "My name is Linhnam Nguyen. I am currently 21 years old. My hobbies are playing video games and watching " \
            "anime. I am the oldest out of my 4 brothers and a sister."
        # subject: question. Split at ":"
        q = p["text"]
        answer(q, c, p)
        # await client_socket.send(a)


async def start_server():
    print("Server Start")
    await websockets.serve(new_client_connected, "localhost", 8000)


if __name__ == '__main__':
    event_loop = asyncio.get_event_loop()
    event_loop.run_until_complete(start_server())
    event_loop.run_forever()
