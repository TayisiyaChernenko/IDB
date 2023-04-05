import styled from "styled-components";

export const StyledInputBox = styled.input `
    display: flex;
    flex-direction: column;
    position:fixed;
    bottom:15px;
    rows = {4};
    border-radius: 25px;
    width: 25vw;
    right:130px;
    height: 13vh;
    background-color: #EEEEEE;
    border:0;
   
    
`
export const StyledBox = styled.text `
    display: flex;
    flex-direction: row-reverse;
    align-items:center;
    justify-items:center;
    position:fixed;
    bottom:10px;
    border: 1px solid black;
    border-radius: 25px;
    width: 35vw;
    right:0;
    height: 15vh;
    background-color:none;
    background-color: #EEEEEE;
    box-shadow: 2px 2px 2px 1px rgba(5, 60, 10, 0.8);
`
export const StyledCharCount = styled.text `
align-self:right;
color:#7a7979;
`