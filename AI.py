import socket
import pickle
import fitz
import docx
from transformers import pipeline

qa_model = pipeline("question-answering", model='distilbert-base-cased-distilled-squad')
ct = []


def extract_pdf(pdf):
    doc = fitz.open(pdf)
    for page in doc:
        ct.append(page.get_text("text"))


def extract_doc(file):
    doc = docx.Document(file)
    text = []
    for para in doc.paragraphs:
        text.append(para.text)
    print("\n".join(text))


def answer(q, c):
    result = qa_model(question=q, context=c)
    return result


def server():
    host = socket.gethostname()
    port = 5000
    server_socket = socket.socket()
    server_socket.bind((host, port))
    server_socket.listen(1)
    conn, address = server_socket.accept()
    print("Connection from: " + str(address))
    while True:
        q = conn.recv(1024).decode()
        if not q:
            break
        print("Client sent: " + str(q))
        a = []
        for i in range(len(ct)):
            a.append(answer(q, ct[i]))
        data = pickle.dumps(a)
        conn.send(data)
    conn.close()


if __name__ == '__main__':
    extract_pdf('syllabus.pdf')
    server()
    # extract_doc('a.docx')
    # print(result['answer'])