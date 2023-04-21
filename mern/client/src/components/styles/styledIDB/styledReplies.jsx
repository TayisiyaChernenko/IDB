import styled from "styled-components";

export const StyledExistingPost = styled.div `
display: flex;
flex-direction: row-reverse;
align-items: stretch;
justify-content:stretch;
position:relative;
border: 1px solid black;
width: 75vw;
height: 10vh;
background-color: #EEEEEE;
box-shadow: 2px 2px 2px 1px rgba(5, 60, 10, 0.8);
`;

export const StyledCreateReplyBox = styled.div `
display: flex;
flex-direction: row;
align-items: stretch;
justify-content:stretch;
position:relative;
border: 1px solid black;
width: 75vw;
height: 10vh;
background-color: #EEEEEE;
box-shadow: 2px 2px 2px 1px rgba(5, 60, 10, 0.8);
`;

export const StyledInputBox = styled.input `
    display: flex;
    flex-direction: row;
    align-self:center;
    bottom:15px;
    border-radius: 25px;
    width: 70%;
    left: 0%;
    height: 8vh;
    background-color: #EEEEEE;
    border:0;
`

export const StyledPostButton = styled.button `
align-self:right;
color:white;
background-color:rgba(5, 60, 10, 0.8);
border-radius: 5px;
height: 4vh;
`