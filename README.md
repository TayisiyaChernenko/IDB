# IDB
The Intelligent Discussion Board is a discussion board which allows students to post questions in their courses as well as reply to other students. Prior to posting their question, a trained AI attempts to answer the question from course documents such as Syllabi. If the student wants to post their question to the public after the AI response, they still can.  

To run the full project, there are three parts which must be run in tandem. 

First, the AI must be run by going into the AI directory, installing the 
requirements.txt file with the command pip install -r requirements.txt.
Then, the AI can be run with python3 AI1.py

Next, run the Node server found in the mern/server directory with node server.js

Finally, npm start the React app in the mern/client directory. 

The react app should open in localhost.
