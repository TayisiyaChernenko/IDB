import React from "react";
import { Link } from "react-router-dom";
import { StyledLogIn, StyledTitle, StyledAuthInput, StyledAuthLink} from "../../styles/authStyles/styledLogin";
import { StyledRBgBox, StyledAuthButton } from "../../styles/authStyles/styledRegister";
import { StyledPage } from "../../styles/styledPage";
import { StyledCircles, StyledRings } from "../../styles/styledDesign";
import { Circles, Rings } from "../../design";
import { useState } from "react";

export const Register = () => {
    const usernameInput = useUsername();
    const passwordInput = usePassword();  
    const password2Input = useConfirmPassword(); 
    
    return(
   <StyledPage>
    <StyledCircles><Circles/></StyledCircles>
    <StyledLogIn>
            <StyledTitle><h1>Intellegent Discussion Board</h1></StyledTitle>
            <StyledRBgBox>
            <StyledTitle><h3>Make an Account</h3></StyledTitle>
            <StyledAuthInput 
                {...usernameInput}
                placeholder= "New UTD Username" />
            <StyledAuthInput 
                {...passwordInput}
                placeholder= "New Password" />
            <StyledAuthInput 
                {...password2Input}
                placeholder= "Confirm New Password" />
            <StyledAuthButton> Make An Account</StyledAuthButton>
            </StyledRBgBox>
            <StyledAuthLink><Link to="/"> Already have an account? Log in here</Link></StyledAuthLink>
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

const useConfirmPassword = () => {
    const [password, setPassword] = useState('');
    
    function onChange(e) {
        setPassword(e.target.value);
      }
      
    return{
        password,
        onChange,
    };
};