# pus the document into the DB
import aspose.words as aw
import certifi
import pymongo

ca = certifi.where()
client = pymongo.MongoClient("mongodb+srv://tayisiyachernenko:HYF6s7cpA-tTwFc@clusterseniorproject.amhkbqh"".mongodb.net/?retryWrites=true&w=majority", tlsCAFile=ca)  # can be changed to the actual database
db = client["test"]  # can be changed to a database name
pdf = db["documents"]  # subject to change collection name

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


if __name__ == '__main__':
    c = input("What is the course name?: ")
    s = input("What is the course's section number?: ")
    q = input("What is the name of this file?: ")
    name = q.split(".")
    doc = aw.Document(q)
    if "pdf" in q:
        q = q[:-4] + ".txt"
        doc.save(q)
    if "docx" in q:
        q = q[:-5] + ".txt"
        doc.save(q)
    doc = PreProcessFile(q)
    text = ""
    for i in open(doc).readlines():
        text += i
    print(text)
    query = {"course": c, "section": s, "name:": name[0].lower(), "text": text}
    pdf.insert_one(query)
