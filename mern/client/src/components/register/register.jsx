import React from "react";
import { Link } from "react-router-dom";
import { StyledLogIn, StyledTitle, StyledAuthInput, StyledAuthButton, StyledAuthLink} from "../styles/styledLogin";
import { StyledRBgBox } from "../styles/styledRegister";
import { StyledPage } from "../styles/styledPage";
import { StyledCircles, StyledRings } from "../styles/styledDesign";
import { Circles, Rings } from "../design";

export const Register = () => (
    <StyledPage>
    <StyledCircles><Circles/></StyledCircles>
    <StyledLogIn>
            <StyledTitle><h1>Intellegent Discussion Board</h1></StyledTitle>
            <StyledRBgBox>
            <StyledTitle><h3>Make an Account</h3></StyledTitle>
            <StyledAuthInput placeholder= "New UTD Username" />
            <StyledAuthInput placeholder= "New Password" />
            <StyledAuthInput placeholder= "Confirm New Password" />
            <StyledAuthButton>Log In</StyledAuthButton>
            </StyledRBgBox>
            <StyledAuthLink><Link to="/"> Already have an account? Log in here</Link></StyledAuthLink>
        </StyledLogIn>
        <StyledRings><Rings/></StyledRings>
        </StyledPage>
        
)
