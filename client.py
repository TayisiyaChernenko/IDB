import pickle
import socket


# function to run the client
def client():
    # set up the client to connect to the server
    host = socket.gethostname()
    port = 5000
    client_socket = socket.socket()
    client_socket.connect((host, port))
    # send the doc/pdf that wants to find answers from
    paper = input("Document/PDF: ")
    client_socket.send(paper.encode())
    exist = client_socket.recv(1024).decode()
    while exist == '0':
        rec = client_socket.recv(1024).decode()
        print(rec)
        paper = input("Document/PDF: ")
        client_socket.send(paper.encode())
        exist = client_socket.recv(1024).decode()
    # once a doc/pdf is found
    # asks questions to the server and print out server response
    msg = input("Message: ")
    while msg.lower().strip() != "bye":
        client_socket.send(msg.encode())
        data = client_socket.recv(1024)
        a = pickle.loads(data)
        for i in range(len(a)):
            print(a[i])
        msg = input("Message: ")
    client_socket.close()


if __name__ == '__main__':
    client()
