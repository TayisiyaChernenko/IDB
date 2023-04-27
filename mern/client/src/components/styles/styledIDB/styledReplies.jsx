import styled from "styled-components";

export const StyledExistingReply = styled.div `
display: flex;
flex-direction: reverse;
align-items: stretch;
justify-content:stretch;
position:relative;
border: 1px solid black;
width: 75vw;
height: 10vh;
background-color: #EEEEEE;
box-shadow: 2px 2px 2px 1px rgba(5, 60, 10, 0.8);
margin-left: auto;
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
margin-left: auto;
`;

export const StyledReplyInputBox = styled.input `
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

export const StyledPostDate = styled.div`
    color: grey;
    font-family: sans-serif;
    position: relative;
    margin-top: 10px;
    margin-right: 10px
`

export const StyledPostButton = styled.button `
align-self:right;
color:white;
background-color:rgba(5, 60, 10, 0.8);
border-radius: 5px;
height: 4vh;
`