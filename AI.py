import fitz
import docx
from transformers import pipeline

def extract_pdf(pdf) -> str:
    doc = fitz.open(pdf)
    text = ""
    for page in doc:
        text += page.get_text()
    #print(text)
    return text

def extract_doc(file):
    doc = docx.Document(file)
    text = []
    for para in doc.paragraphs:
        text.append(para.text)
    #print(text)

if __name__ == '__main__':
    #extract_doc('a.docx')
    #extract_pdf('syllabus.pdf')
    qa_model = pipeline("question-answering")
    q = input("Question: ")
    c = extract_pdf('syllabus.pdf')
    result = qa_model(question=q, context=c)
    # print(result['answer'])
    print(result)
