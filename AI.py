import socket
import pickle
import pymongo
from transformers import pipeline

qa_model = pipeline("question-answering", model='distilbert-base-cased-distilled-squad')


# function to call the question answer model
def answer(q, c):
    result = qa_model(question=q, context=c)
    return result


# function to run the server
def server():
    # set up the database connection
    client = pymongo.MongoClient("mongodb://localhost:27017/")  # can be changed to the actual database
    db = client["IDB"]  # can be changed to a database name
    col = db["pdf"]  # subject to change collection name
    # set up the host and the port
    host = socket.gethostname()
    port = 5000
    server_socket = socket.socket()
    server_socket.bind((host, port))
    server_socket.listen(1)
    conn, address = server_socket.accept()
    print("Connection from: " + str(address))
    # checks to see if the pdf/doc exists
    paper = conn.recv(1024).decode()
    exist = col.count_documents({"doc": paper}, limit=1)
    conn.send(str(exist).encode())
    while col.count_documents({"doc": paper}, limit=1) == 0:
        conn.send("File does not exist".encode())
        paper = conn.recv(1024).decode()
        exist = col.count_documents({"doc": paper}, limit=1)
        if exist:
            conn.send(str(exist).encode())
            break
        conn.send(str(exist).encode())
    # if it does exist, extract the pdf
    # extract_pdf(paper)
    query = {"doc": paper}
    doc = col.find(query)
    context = []
    for i in doc:
        context = i['text']
    # keep running the server while the client asks questions
    while True:
        q = conn.recv(1024).decode()
        if not q:
            break
        print("Client sent: " + str(q))
        a = []

        for i in range(len(context)):
            a.append(answer(q, context[i]))
        data = pickle.dumps(a)

        conn.send(data)
    conn.close()


if __name__ == '__main__':
    server()
