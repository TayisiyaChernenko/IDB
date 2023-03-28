import fitz
import docx
from transformers import pipeline


def extract_pdf(pdf) -> str:
    doc = fitz.open(pdf)
    t = ""
    out = open("test.txt", "wb")
    for page in doc:
        t += page.get_text("text", flags=fitz.TEXT_INHIBIT_SPACES, sort=True)
        #out.write(page.get_text("text", flags=fitz.TEXT_INHIBIT_SPACES, sort=True).encode("utf8"))
        #out.write(bytes((12,)))
    text = " ".join(t.split())
    out.write(text.encode("utf8"))
    out.write(bytes((12,)))
    out.close()
    print(text)
    return text


def extract_doc(file):
    doc = docx.Document(file)
    text = []
    for para in doc.paragraphs:
        text.append(para.text)
    print("\n".join(text))


if __name__ == '__main__':
    #extract_doc('a.docx')
    #extract_pdf('syllabus.pdf')
    qa_model = pipeline("question-answering", model='distilbert-base-cased-distilled-squad')
    q = input("Question: ")
    c = extract_pdf('syllabus.pdf')
    """
    c = "Course Syllabus – Spring 2023 Course Information Course CS 4365, Section 002 Course Title Artificial " \
        "Intelligence Term Spring 2023 Days & Times Mondays & Wednesdays 11:30 am – 12:45 pm Professor Contact " \
        "Information Professor Anjum Chida Office Phone 972-883-2185 Email Address anjum.chida@utdallas.edu Office " \
        "Location ECSS 4.230 Online Office Hours In-person - 10:00 am to 12:00 noon (Tuesdays & Thursdays) (Or by " \
        "appointment, meeting can be virtual as well via MS-Teams) Course Pre-requisites, Co-requisites, and/or Other " \
        "Restrictions - CS 3345 (Data Structures and Algorithms). An understanding of inference in first=order logic " \
        "and propositional logic and basic probability theory is also assumed. Course Description - CS 4365 - " \
        "Artificial Intelligence (3 semester credit hours) Basic concepts and techniques that enable computers to " \
        "perform intelligent tasks. Examples are taken from areas such as natural language understanding, " \
        "computer vision, machine learning, search strategies and control, logic, and theorem proving. Student " \
        "Learning Objectives/Outcomes 1. Understand and use uninformed and heuristic search techniques 2. Understand " \
        "and use local search algorithms. 3. Understand and use constraint satisfaction problems. 4. Understand and " \
        "use logical inference using the resolution algorithm. 5. Understand and use probabilistic inference in " \
        "Bayesian networks 6. Understand and use planning 7. Understand and use games with perfect information (" \
        "adversarial search) 8. Understand and use zero-sum games with hidden information Required Textbooks and " \
        "Materials Artificial Intelligence, A Modern Approach. 4ed. Stuart Russell and Peter Norvig. ** The textbook " \
        "resource site: http://aima.cs.berkeley.edu/ ** The 3rd edition is available and acceptable. ** This book is " \
        "the primary textbook of this course and is referred as [AI]. Course Syllabus Spring 2023 CS 4365_002 Page 1 " \
        "Academic Calendar Class Date Material Covered Major Topic 1 Jan 18 Chapter 1&2 Introduction Intelligent " \
        "Agent 2, 3 Jan 23, 25 Chapter 3 Solving Problems by Searching 4, 5 Jan 30, Feb 1 Chapter 4 Beyond Classical " \
        "Search 6, 7 Feb 6, 8 Chapter 5 Adversarial Search 8. 9 Feb 13, 15 Chapter 7 Logical Agents 10, 11 Feb 20, " \
        "22 Chapter 8 First Order Logic 12 Feb 27 Exam I 13 March 1 Chapter 9 Inference in First Order Logic 14, " \
        "15 March 6, 8 Chapter 6 Constraint Satisfaction Problem Spring Break March 13-16 16, 17 March 20, " \
        "22 Chapter 13 Quantifying Uncertainty 18, 19 March 27, 29 Chapter 14 Probabilistic Reasoning 20 April 3 Exam " \
        "II 21 April 5 Chapter 10 Classical Planning 22, 23 April 10, 12 Chapter 11 Planning and Acting in Real World " \
        "24, 25 April 17, 19 Chapter 12 Knowledge Representation 26, 27 April 24, 26 Review 28, 29 May 1 Review 30 " \
        "May 3 Exam III Assignments will be through eLearning. For academic calendar Click Here Course Syllabus " \
        "Spring 2023 CS 4365_002 Page 2 Grading Policy: The grade will be determined as described below. The lowest " \
        "assignment and homework score will be dropped. No other bonus work, make-up work, dropped scores, " \
        "or other means of raising your grade should be expected. At the end of the semester, it is possible that " \
        "grades may be curved, but a curve should not be expected. Grades are not based on needs or consequences but " \
        "are based only on performance. Total score will be calculated as follows: Assessment Percentage towards your " \
        "Total Score Exam – I 20 % Exam – II 20 % Exam – III 25 % Programming Assignments 20 % Homework 10% Class " \
        "Participation 5 % Assignment of letter grade is as follows: Total Letter Grade 98-100 A+ 93-97 A 90-92 A- " \
        "88-89 B+ 83-87 B 80-82 B- 78-79 C+ 73-77 C 70-72 C- 60-69 D 0-59 F Course Syllabus Spring 2023 CS 4365_002 " \
        "Page 3 Tentative Test Dates: Exam 1: February 27 Exam 2: April 3 Exam 3: May 3 *All examinations will be at " \
        "the Testing Center (https://ets.utdallas.edu/testing-center). *Failure " \
        "to take the exam due to incorrect registration or absence will result in score of zero for that exam, " \
        "NO EXCEPTIONS. Course & Instructor Policies: Exams All three exams will be at the Testing Center. All " \
        "students are required to register and reserve seats at the center at least 48 hours before the exam. This " \
        "48-hour deadline is strictly followed by the testing center. If a student misses an exam due to not " \
        "registering 48 hours prior to the exam, this will constitute a ZERO for the exam. No Exceptions will be made " \
        "for missing the exam due to missed or incorrect registration. All exams could be registered in the first few " \
        "weeks of the semester, once registered a confirmation email will be sent to the student. It is the student " \
        "responsibility to ensure proper registration and to follow all the guidelines and dress code restrictions " \
        "given in the Testing center website. Exams must be taken on time. Exceptions require advance approval by the " \
        "instructor. It is up to the instructor to determine whether an exception will be made and will depend " \
        "largely on proof of extraordinary circumstances. Otherwise, a missed exam will either incur a substantial " \
        "penalty or be recorded as a zero. Make-Up Exams Make-Up exams will be administered only under extreme " \
        "extenuating circumstances like hospitalization or road accidents. Proof of such incident is required to " \
        "request a Make-Up and will be approved after instructors’ discretion. Assignments and Homework All " \
        "assignments and HWs will be available via elearning and must be submitted via elearning as well. No email " \
        "submission allowed. Assignments must be turned in on time. All assignments will be due on eLearning. Late " \
        "submissions will be accepted, but any late submission made within 24 hours of when the assignment is due " \
        "will have its score deducted by 10% the maximum score possible. Late submissions made more than 24 but less " \
        "than 48 hours after the assignment is due will have the score deducted an additional 10% (so 20% total). No " \
        "points will be awarded for submissions more than 48 hours late. Even after deductions, scores cannot be " \
        "negative. It is your responsibility to upload your Course Syllabus Spring 2023 CS 4365_002 Page 4 work early " \
        "enough to avoid possible problems uploading to eLearning. It is your responsibility to ensure that you have " \
        "submitted the correct items. It is recommended that you double-check your submission to ensure it is " \
        "correct. All Assignments are to be individual efforts. You are allowed to collaborate with other students, " \
        "or to discuss solutions with other students, but make sure that the work you submit is your own and not " \
        "simply copied from other students work. Copying of Assignments in whole or in part, from other students in " \
        "this semester or previous semesters will be considered an act of scholastic dishonesty. There will be no " \
        "makeup exams or other extra credit opportunity in the semester. No makeup work is possible for Assignments, " \
        "but the lowest Assignment score and lowest Homework score will be dropped before calculating Assignment " \
        "Total and HW total respectively. Class Attendance Regular and punctual class attendance is expected. " \
        "Attendance will be taken in every class, and this will constitute a part of Class Participation credit. " \
        "Attendance will be taken as an elearning Quiz, students need to login into elearning and take the Attendance " \
        "Quiz in every class. Students who fail to attend class regularly are inviting scholastic difficulty. " \
        "Attendance score will be used to calculate Class Participation credit. Every student is allowed up to 3 " \
        "absence per semester with no excuse, more if proper documentation is given for a valid excuse. Class " \
        "Participation Regular class participation is expected. Students who fail to participate in class regularly " \
        "are inviting scholastic difficulty. A portion of the grade for this course is directly tied to your " \
        "participation in this class. It also includes engaging in group or other activities during class that " \
        "solicit your feedback on homework assignments, readings, or materials covered in the lectures (and/or labs). " \
        "Class participation is documented by faculty. Successful participation is defined as consistently adhering " \
        "to University requirements, as presented in this syllabus. Failure to comply with these University " \
        "requirements is a violation of the Student Code of Conduct. Additional Videos In addition to regular class " \
        "and lecture, the student will be required to watch additional videos covering some class material or " \
        "providing help with Assignments. These additional videos will be released every week. Students will be " \
        "expected to watch these videos in timely manner and contribute to class discussions pertaining to these " \
        "videos. Email Correspondence with the Instructor. Any courses related questions can be asked via email to " \
        "the instructor. It is the instructor’s policy to respond to every email within 24 hours, if a response is " \
        "not given in 24 hours, the student is encouraged to email again. On occasions, the instructor gets too " \
        "Course Syllabus Spring 2023 CS 4365_002 Page 5 many emails and might forget to respond or read the email, " \
        "student patience is highly appreciated in this matter. Class Assessment Surveys There are three class " \
        "assessment survey, one at the Beginning of the Semester, one at the Middle and one at the end of the " \
        "semester. The end of semester survey is the official UTD course evaluation survey taken from the website " \
        "eval.utdallas.edu . The other two surveys will be via elearning. All surveys are anonymous. Surveys are " \
        "considered as feedbacks from students which becomes essential part of course design and course conduct " \
        "modifications. Surveys also encourages the instructor and helps the instructor become better at teaching the " \
        "course. Class Materials The instructor may provide class materials that will be made available to all " \
        "students registered for this class as they are intended to supplement the classroom experience. These " \
        "materials may be downloaded during the course; however, these materials are for registered students' use " \
        "only. Classroom materials may not be reproduced or shared with those not in class or uploaded to other " \
        "online environments except to implement an approved Office of Student AccessAbility accommodation. Failure " \
        "to comply with these University requirements is a violation of the Student Code of Conduct. Class Recordings " \
        "Students are expected to follow appropriate University policies and maintain the security of passwords used " \
        "to access recorded lectures. Unless the Office of Student AccessAbility has approved the student to record " \
        "the instruction, students are expressly prohibited from recording any part of this course. Recordings may " \
        "not be published, reproduced, or shared with those not in the class, or uploaded to other online " \
        "environments except to implement an approved Office of Student AccessAbility accommodation. Failure to " \
        "comply with these University requirements is a violation of the Student Code of Conduct. The instructor may " \
        "record meetings of this course. These recordings will be made available to all students registered for this " \
        "class, the intent is to supplement the classroom experience. OSA Students If you are seeking classroom " \
        "accommodations under the Americans with Disabilities Act (2008), you are required to register with the " \
        "Office of Student AccessAbility, located in the Administration Building. Their phone number is 972-883- " \
        "2098, email: studentaccess@utdallas.edu and website is https://studentaccess.utdallas.edu . OSA students " \
        "need to submit a letter from OSA to the instructor as soon as possible preferable within first two weeks of " \
        "the semester. The student must meet the instructor during the first two weeks of the semester to ensure all " \
        "facilities and accommodations are properly met for their needs. Course Syllabus Spring 2023 CS 4365_002 Page " \
        "6 Comet Creed This creed was voted on by the UT Dallas student body in 2014. It is a standard that Comets " \
        "choose to live by and encourage others to do the same: “As a Comet, I pledge honesty, integrity, and service " \
        "in all that I do.” Academic Support Resources The information contained in the following link lists the " \
        "University’s academic support resources for all students. Please see " \
        "http://go.utdallas.edu/academic-support-resources. The University of Texas at Dallas is committed to " \
        "providing reasonable accommodations for all persons with disabilities. The syllabus is available in " \
        "alternate formats upon request. If you are seeking classroom accommodations under the Americans with " \
        "Disabilities Act (2008), you are required to register with the Office of Student AccessAbility, located in " \
        "the Administration Building, Suite 2.224. Their phone number is 972-883-2098, " \
        "email: studentaccess@utdallas.edu and website is https://studentaccess.utdallas.edu . To receive academic " \
        "accommodations for this class, please obtain the proper Office of Student AccessAbility letter of " \
        "accommodation and meet with me at the beginning of the semester. UT Dallas Syllabus Policies and Procedures " \
        "The information contained in the following link constitutes the University’s policies and procedures segment " \
        "of the course syllabus. Please review the catalog sections regarding the credit/no credit or pass/fail " \
        "grading option and withdrawal from class. Please go to http://go.utdallas.edu/syllabus-policies for these " \
        "policies. The descriptions and timelines contained in this syllabus are subject to change at the discretion " \
        "of the Professor. Course Syllabus Spring 2023 CS 4365_002 Page 7"
    """
    result = qa_model(question=q, context=c)
    # print(result['answer'])
    print(result)
