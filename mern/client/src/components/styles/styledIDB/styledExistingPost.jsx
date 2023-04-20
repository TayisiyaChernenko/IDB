import styled from "styled-components";

export const StyledExistingPost = styled.div `
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
export const StyledPostText = styled.div `
display: flex;
flex-direction: column;
float:right;
background-color: #EEEEEE;
width: 60vw;
height: 8vh; 
margin-top: 10px ;
margin-left: 20px;
`;

export const StyledButton = styled.button `
    color : rgb(5, 60, 10);
    font-family : sans-serif;
    border:0;
    width: 5vw;
    margin-left:auto;
    border-radius: 20px;
    bottom:0;
    margin-left: 5px;
`
export const StyledCourseName= styled.div`
    align-self:center;
`
export const StyledPostName = styled.div `
     font-family : sans-serif;
     color: black;
     align-self: left;
`
export const StyledPostDate = styled.div`
    color: grey;
    font-family: sans-serif;
    position: absolute;
    margin-top: 10px;
`

export const StyledDetails = styled.div`
    display: flex;
    flex-direction: row;
    border:0;
    bottom:0;
    margin-left:auto;
`