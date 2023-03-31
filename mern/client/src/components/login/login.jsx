import React from "react";
import { StyledLogIn, StyledTitle, StyledBgBox, StyledAuthInput, StyledAuthLink, StyledAuthButton} from "../styles/styledLogin";
import { Link } from "react-router-dom";
import { Circles, Design, Mark, Rings } from "../design";
import { StyledCircles, StyledMark, StyledRings } from "../styles/styledDesign";
import { StyledPage } from "../styles/styledPage";



export const LogIn = () => (
        <StyledPage>
            <StyledCircles><Circles/></StyledCircles>
        <StyledLogIn>
            <StyledTitle><h1>Intelligent Discussion Board</h1></StyledTitle>
            <StyledBgBox>
            <StyledTitle><h3>Sign In</h3></StyledTitle>
            <StyledAuthInput placeholder= "Username" />
            <StyledAuthInput placeholder= "Password" />
            <StyledAuthButton>
                <Link to ="/users/board">Log In </Link>
            </StyledAuthButton>
            </StyledBgBox>
            <StyledAuthLink> 
                <Link to="/register"> No account? Make one here</Link>
            </StyledAuthLink>
        </StyledLogIn>
        <StyledRings><Rings/></StyledRings>
        </StyledPage>
    
)