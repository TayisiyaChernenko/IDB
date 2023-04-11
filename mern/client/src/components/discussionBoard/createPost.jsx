import React from "react";
import { StyledBox, StyledCharCount, StyledInputBox} from "../styles/styledIDB/styledCreatePost";
import { useState } from "react";

//This is the file for the user to create a post

export const CreatePost = () => {
    const pInput = useInput();
    const charInput = useCharInput();

    return(
    <div>
        <StyledBox>
        <StyledInputBox
        {...pInput} 
        {...charInput}
        maxLength={400}
        rows = {3}
        placeholder = "Your question ... " 
        >
        </StyledInputBox>
        <StyledCharCount>Char Count {charInput.charCount}/400</StyledCharCount>
        </StyledBox>
    </div>
    );
}

//Will take input

const useInput = () => {
    const [postInput, setInput] = useState('');
    
    function onChange(e) {
        setInput(e.target.value);
      }

    return{
        postInput,
        onChange,
    };
};
//word count

const useCharInput = () => {
    const [charCount, setCharCount] = useState(0);
    
    function onChange(e) {
        setCharCount(e.target.value.length);
    }
    return{
        charCount,
        onChange,
    };
};
//Functionality to create : 
// route to the next page, where the AI will respond 
// if user chooses to post their question after AI responds,
// input is stored into the databse

