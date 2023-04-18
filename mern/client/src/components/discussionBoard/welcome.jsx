import React from "react"
import { IDBLayout, StyledBoard } from "../styles/styledIDB/styledIDBHome"
import { Nav } from "./nav/nav"
import { StyledMark ,StyledRings} from "../styles/styledDesign"
import { Mark ,Rings} from "../design"
import { StyledTitle } from "../styles/authStyles/styledLogin"
import {useLocation} from 'react-router-dom';

export const Welcome = () => {
    const location = useLocation();
    const userId = location.state.id;
    console.log(userId);

    return(
    
    <IDBLayout>
        <Nav></Nav>
        <StyledBoard>
            <StyledTitle><h1>Intellegent Discussion Board</h1></StyledTitle>
            <h2>Select a class to see what people are posting!</h2>
            <StyledMark><Mark/></StyledMark>
        </StyledBoard>
        <StyledRings><Rings/></StyledRings>
    </IDBLayout>
    );
}