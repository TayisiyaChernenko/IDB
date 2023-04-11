import pymongo
import fitz
import os.path


def extract_pdf(pdf):
    document = fitz.open(pdf)
    text = []
    for page in document:
        text.append((page.get_text("text")))
    return text


if __name__ == '__main__':
    client = pymongo.MongoClient("mongodb://localhost:27017/")
    db = client["IDB"]
    col = db["pdf"]
    ct = []
    paper = input("Name of Doc: ")
    # exist = os.path.exists(paper)
    if os.path.exists(paper):
        if col.count_documents({"doc": paper}, limit=1) == 0:
            if paper.endswith(".pdf"):
                print("pdf")
                ct = extract_pdf(paper)
                d = {"doc": paper, "text": ct}
                x = col.insert_one(d)
            elif paper.endswith(".docx") or paper.endswith(".doc"):
                print("docx")
                print("PDFs only")
            print("Not in database")
        else:
            print("In database already")
    else:
        print("File does not exist")
    query = {"doc": paper}
    doc = col.find(query)
    context = []
    for i in doc:
        # print(i['text'])
        context = i['text']
    # print(context)
    # for i in range(len(context)):
    #     print(context[i])
