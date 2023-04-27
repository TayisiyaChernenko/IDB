The Discussion Board FE is composed of several components inside each other.

The Layout wrapper formats the page stylistically, to organize the main
 components of the page - the Navigation and Board

Nav
The Nav component allows a user to traverse their course boards, 
see their unique posting history, and add classes to their nav 

Board 
The Board component is what handles the discussion board elements for each course/section, 
and it consists of a varitey of components. The board contains both the view of what posts 
have been already shown, which is the PrevPost component, as well as the ability to ask 
and create posts. These come in the form of the AskQuestion component and the CreatePost component.

PrevPost 
The prevPost component is where the history of what's already been posted is displayed. The
user should be able to scroll up through all the previous postsin this section. As such, this 
component fetches database root posts of a course/section (posts which start a thread) and  
creates a Post component for each to then display. 

Post 
A Post shows the time of creation, the name of the poster, the document the poster is searching, the content, 
and the replies upon press of a button. Posts made by the logged in user should also display options for editting 
and deleting. Deleting a post deletes the whole thread. It should be able to pull the replies to itself from the 
database to display to the viewer under itself. This project defines a post as a thread starter, and as such it's 
replyingTo field is simply "root".

Reply
The reply component is a post document in the database, but it has a difference in certain fields.
It's replyingTo field set to the id of the post it is replying to. There is no thread title, as 
this is defined in the root post of each thread already. It does not bother storing the course/section 
pair, as the posts it refer to eventually lead to a root post with this information. Replies can chain, 
replying to a reply is done by setting the replyingTo field accordingly, and pressing the reply button 
fetches all posts who's replyTo id matches the current post being expanded. 

AskQuestion
The AskQuestion component allows the users to formulate their question.  As such, it takes user input in
the form of text.It also takes a document or thread title the user can specify. Upon asking, the component changes 
the state of the Board, to display a view which shows the question asked and the AI response. This view,
prompted by the Board, allows the user to post their question, which is handled in the CreatePost component,
or to simply not post, which takes the user view back to seeing previous posts.



CreatePost
The CreatePost component is where the user can create a post. In order to do so, it is passed the text and thread
information by the Board if the ser stated they want to post their question. Creating a post sets the replyingtTo
field to "root" as only thread starters can be made within this component. 




 

