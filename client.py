import pickle
import socket


def client():
    host = socket.gethostname()
    port = 5000
    client_socket = socket.socket()
    client_socket.connect((host, port))
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
