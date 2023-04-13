import React from "react";
import { Link } from "react-router-dom";
import { StyledLogIn, StyledTitle, StyledAuthLink} from "../../styles/authStyles/styledLogin";
import { StyledRBgBox, StyledAuthButton, StyledAuthInput } from "../../styles/authStyles/styledRegister";
import { StyledPage } from "../../styles/styledPage";
import { StyledRings } from "../../styles/styledDesign";
import { Rings } from "../../design";
import { useState, useEffect } from "react";

export const Register = () => {
   const emailInput = useEmail();
   const passwordInput = usePassword(); 
   const password2Input = useConfirmPassword();
   const firstInput = useFirstname();
   const lastInput = useLastname();
  
   function registeredNotif() {
            alert("You've made a new user profile")
   }

   return(
  <StyledPage>
   <StyledLogIn>
           <StyledTitle><h1>Intellegent Discussion Board</h1></StyledTitle>
           <StyledRBgBox>
           <StyledTitle><h3>Make an Account</h3></StyledTitle>
           <StyledAuthInput
               {...emailInput}
               placeholder= "UTD Email" />
<StyledAuthInput
               {...firstInput}
               placeholder= "Preferred First Name" />
           <StyledAuthInput
               {...lastInput}
               placeholder= "Last Name" />
           <StyledAuthInput
               {...passwordInput}
               placeholder= "New Password" />
           <StyledAuthInput
               {...password2Input}
               placeholder= "Confirm New Password" />
           <StyledAuthButton onClick = {registeredNotif}> Make An Account</StyledAuthButton>
           </StyledRBgBox>
           <StyledAuthLink><Link to="/"> Already have an account? Log in here</Link></StyledAuthLink>
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
 
 
 const useFirstname = () => {
    const [firstname, setFirstname] = useState('');
   
    function onChange(e) {
        setFirstname(e.target.value);
      }
 
 
    return{
        firstname,
        onChange,
    };
 };
 const useLastname = () => {
    const [lastname, setLastname] = useState('');
   
    function onChange(e) {
        setLastname(e.target.value);
      }
 
 
    return{
        lastname,
        onChange,
    };
 };
 
 
 
 