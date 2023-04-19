import React from "react";
import { StyledLogIn, StyledTitle, StyledBgBox, StyledAuthInput, StyledAuthLink, StyledAuthButton} from "../../styles/authStyles/styledLogin";
import { Link } from "react-router-dom";
import {Rings } from "../../design";
import { StyledRings } from "../../styles/styledDesign";
import { StyledPage } from "../../styles/styledPage";
import { useState } from "react";
//import { decodeToken } from "react-jwt";
import { useNavigate } from "react-router";


export const LogIn = () => {
    const emailInput = useEmail();
    const passwordInput = usePassword();  
    const  loginInfo = {
        email : emailInput.email,
        password: passwordInput.password
    };
    const [userId, setUserId] = useState("");
    const navigate = useNavigate();
    
    const handleClick = () => {
        fetch("http://localhost:3000/auth/login",{
            method: 'post',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginInfo),
            }).then((response) => {
            if (response.statusText === "OK"){
                response.json().then(id => {
                    setUserId(id);
                    navigate('/users/', {state:{id:id}});
                });
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
            <StyledAuthInput 
                {...passwordInput}
                placeholder= "Password" />
            <StyledAuthButton onClick={handleClick}> Log In
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
