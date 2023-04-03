import React from "react";
import { StyledLogIn, StyledTitle, StyledBgBox, StyledAuthInput, StyledAuthLink, StyledAuthButton} from "../../styles/authStyles/styledLogin";
import { Link } from "react-router-dom";
import { Circles, Rings } from "../../design";
import { StyledCircles, StyledRings } from "../../styles/styledDesign";
import { StyledPage } from "../../styles/styledPage";
import { useState } from "react";


export const LogIn = () => {
    const usernameInput = useUsername();
    const passwordInput = usePassword();   
    
    return(
       <StyledPage>
            <StyledCircles><Circles/></StyledCircles>
        <StyledLogIn>
            <StyledTitle><h1>Intelligent Discussion Board</h1></StyledTitle>
            <StyledBgBox>
            <StyledTitle><h3>Sign In</h3></StyledTitle>
            <StyledAuthInput 
                {...usernameInput}
                placeholder= "Username"  />
            <span>Value: {usernameInput.username} </span>
            <StyledAuthInput 
                {...passwordInput}
                placeholder= "Password" />
            <span>Value: {passwordInput.password} </span>
            <StyledAuthButton>Log In
            </StyledAuthButton>
            </StyledBgBox>
            <StyledAuthLink> 
                <Link to="/register"> No account? Make one here</Link>
            </StyledAuthLink>
        </StyledLogIn>
        <StyledRings><Rings/></StyledRings>
        </StyledPage>  
       );
}

const useUsername = () => {
    const [username, setUsername] = useState('');
    
    function onChange(e) {
        setUsername(e.target.value);
      }

    return{
        username,
        onChange,
    };
};



const usePassword = () => {
    const [password, setPassword] = useState('');
    
    function onChange(e) {
        setPassword(e.target.value);
      }
      
    return{
        password,
        onChange,
    };
};
