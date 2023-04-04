import React from "react";
import { StyledBox} from "../styles/styledIDB/styledCreatePost";
import { useState } from "react";

//This is the file for the user to create a post

export const CreatePost = () => {
    const pInput = useInput();
    return(
    <div>
    <StyledBox
        {...pInput}
        placeholder = "Your question ... " 
        />
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

//Functionality to create : 
// route to the next page, where the AI will respond 
// if user chooses to post their question after AI responds,
// input is stored into the databse

