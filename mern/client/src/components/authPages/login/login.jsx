import React from "react";
import { StyledLogIn, StyledTitle, StyledBgBox, StyledAuthInput, StyledAuthLink, StyledAuthButton} from "../../styles/authStyles/styledLogin";
import { Link } from "react-router-dom";
import {Rings } from "../../design";
import { StyledRings } from "../../styles/styledDesign";
import { StyledPage } from "../../styles/styledPage";
import { useState } from "react";
import { isExpired, decodeToken } from "react-jwt";


export const LogIn = () => {
    const emailInput = useEmail();
    const passwordInput = usePassword();  
    const  loginInfo = {
        email : emailInput.email,
        password: passwordInput.password
    };
    
    const handleClick = () => {
        fetch("http://localhost:3000/api/users",{
            method: 'post',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(emailInput.email),
            }).then((response) => {
            if (response.statusText === "OK"){
                const decoded = decodeToken(response.body);
                var userId = decoded.id  
                console.log(userId)  
            } else {
                alert ('Incorrect Login Credentials');
            }
        })
        } 
    return(
       <StyledPage>
        <StyledLogIn>
            <StyledTitle><h1>Intelligent Discussion Board</h1></StyledTitle>
            <StyledBgBox>
            <StyledTitle><h3>Sign In</h3></StyledTitle>
            <StyledAuthInput 
                {...emailInput}
                placeholder= "Username"  />
            <span>Value: {emailInput.email} </span>
            <StyledAuthInput 
                {...passwordInput}
                placeholder= "Password" />
            <StyledAuthButton>
                  <Link to = "/users/board">Log In</Link>
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

const useEmail = () => {
    const [email, setEmail] = useState('');
    
    function onChange(e) {
        setEmail(e.target.value);
      }

    return{
        email,
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
