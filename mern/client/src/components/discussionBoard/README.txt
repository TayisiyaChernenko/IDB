The Discussion Board FE is composed of several components inside each other.

The Layout wrapper formats the page stylistically, to organize the main components of the page - the Navigation and Board

Nav
The Nav component allows a user to traverse their course boards, see their unique posting history, and add classes to their nav 
Board 
The Board component is what brings it all together, and it consists of
both a prevPost component and a yourPost component

PrevPost 
The prevPost component is where the history of what's already been posted
is displayed. The user should be able to scroll up through all the previous posts
in this section. As such, this component utilizes the response component. 
It should be able to pull the responses from the database to display to the viewer.

Response 
The response component consists of text information, user info (name) and a reply button to 
open up and display the replies this post has recieved. As such, it should be able to pull
related replied from the database to display.

CreatePost
The CreatePost component is where the user can create a post. As such, it takes user input in
the form of text. 
 