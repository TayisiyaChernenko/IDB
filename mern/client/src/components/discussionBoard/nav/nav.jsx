import React, {useState, useEffect} from "react"
import {StyledNavTitle, StyledOpenNav, StyledPostHistory} from "../../styles/styledIDB/styledNavs/styledNavBar"
import { NavAddClasses } from "./navAddClass";
import { Link } from "react-router-dom";
export const Nav = (props) => {

    const [discussionBoards, setDiscussionBoards] = useState([]);
    const userId = props.userId;

    useEffect(() => {
        console.log(userId);
        fetch("http://localhost:3000/discussion/courses?id=" + userId,{method: 'get'})
        .then(response => {return response.json()})
        .then(data => {setDiscussionBoards(data)})
    },[])
    
    return(
        <div>
            <StyledOpenNav>
                <StyledNavTitle> Your Courses </StyledNavTitle>
                <hr></hr>
                <ul>
                {discussionBoards.map(discussionBoard => (
                <li key={discussionBoard._id}><Link to = "/users/board/"  state={{id: userId, course: discussionBoard.course, section: discussionBoard.section }}> {discussionBoard.course} {discussionBoard.section}</Link></li>
                ))}
            </ul>
            <Link to="/users/history" state={{id:userId}} >Your Posts</Link>
            <NavAddClasses {...props}/>
            </StyledOpenNav>
        </div>
    )
}



    