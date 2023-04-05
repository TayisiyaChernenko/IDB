import React from "react"
import { IDBLayout, StyledBoard } from "../styles/styledIDB/styledIDBHome"
import { Nav } from "./nav"
import { StyledMark ,StyledRings} from "../styles/styledDesign"
import { Mark ,Rings} from "../design"
import { StyledTitle } from "../styles/authStyles/styledLogin"

export const Welcome = () => {
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