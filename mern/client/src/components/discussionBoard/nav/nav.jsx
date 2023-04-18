import React, {useState, useEffect} from "react"
import {StyledNavTitle, StyledOpenNav} from "../../styles/styledIDB/styledNavs/styledNavBar"
import { NavAddClasses } from "./navAddClass";
export const Nav = () => {

    const [discussionBoards, setDiscussionBoards] = useState([])
    const userId = '643ec806b0c09a765b61875e';

    useEffect(() => {
        fetch("http://localhost:3000/discussion/courses/" + userId,{method: 'get'})
        .then(response => {return response.json()})
        .then(data => {setDiscussionBoards(data)})
    }, [])
    
    return(
        <div>
            <StyledOpenNav>
                <StyledNavTitle> Your Courses </StyledNavTitle>
                <hr></hr>
                <ul>
                {discussionBoards.map(discussionBoard => (
                <li key={discussionBoard._id}>{discussionBoard.course} {discussionBoard.section}</li>
                ))}
            </ul>
            <NavAddClasses/>
            </StyledOpenNav>
            
        </div>
    )
}



    