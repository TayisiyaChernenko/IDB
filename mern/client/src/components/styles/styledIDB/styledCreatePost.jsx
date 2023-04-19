import styled from "styled-components";

export const StyledInputBox = styled.input `
    display: flex;
    flex-direction: row;
    align-self:center;
    bottom:15px;
    border-radius: 25px;
    width: 40vw;
    left: 0%;
    height: 8vh;
    background-color: #EEEEEE;
    border:0;
   
    
`
export const StyledBox = styled.text `
    display: flex;
    flex-direction: reverse;
    align-items:center;
    justify-items:center;
    position:fixed;
    bottom:10px;
    border: 1px solid black;
    border-radius: 25px;
    width: 55vw;
    right:0;
    height: 10vh;
    background-color:none;
    background-color: #EEEEEE;
    box-shadow: 2px 2px 2px 1px rgba(5, 60, 10, 0.8);
`
export const StyledCharCount = styled.text `
align-self:right;
color:#7a7979;
margin-right: 5px;
`
export const StyledPostButton = styled.button `
align-self:right;
color:white;
background-color:rgba(5, 60, 10, 0.8);
border-radius: 5px;
`