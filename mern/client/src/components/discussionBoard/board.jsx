import React , {useState,useEffect}from "react";
import { IDBLayout, StyledBoard } from "../styles/styledIDB/styledIDBHome";
import { StyledTitle } from "../styles/authStyles/styledLogin";
import { Nav } from "./nav/nav";
import {useLocation} from 'react-router-dom';



import { PrevPosts } from "./posts/prevPosts";
import { CreatePost } from "./posts/createPost";
import { Mark } from "../design";
import { StyledMark } from "../styles/styledDesign";

// Creates the Page layout consisting of the posts already posted and visible
// to scroll through and view post/reply pairs (prev Posts component)
// and ability to post your own question (create Post component)
//The Board component is unique to each class and shoule be rendered when said class is picked from the nav menu

export const Board = () => {
    const location = useLocation();
    const userId = location.state.id;
    const course = location.state.course;
    const section = location.state.section;
    const [posts, setPosts] = useState([]);

    const props = {userId,course,section, posts,setPosts};

    return(
    <IDBLayout>
        <div>
        <Nav {...{userId,setPosts}}/>
        <StyledMark><Mark/></StyledMark>
        </div>
        <StyledBoard>
            <StyledTitle><h1>Intelligent Discussion Board</h1></StyledTitle>
            <PrevPosts {...props}/>
            <CreatePost {...props}/>
        </StyledBoard>
    </IDBLayout> )
    }
