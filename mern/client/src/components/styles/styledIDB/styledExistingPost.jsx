import styled from "styled-components";

export const StyledExistingPost = styled.div `
display: flex;
flex-direction: row;
align-items: stretch;
justify-content:stretch;
border: 1px solid black;
border-radius: 25px;
width: 18vw;
height: 20vh;
background-color: #EEEEEE;
box-shadow: 2px 2px 2px 1px rgba(5, 60, 10, 0.8);
margin: 10px 0 20px 20px;
`;
export const StyledPostText = styled.div `
display: flex;
flex-direction: column;
float:right;
background-color: #EEEEEE;
width: 200px;
height: 40px; 
margin-top: 10px ;
margin-left: 20px;
`;

export const StyledRepliesButton = styled.button `
    color : rgb(5, 60, 10);
    font-family : sans-serif;
    border:0;
    width: 5vw;
    bottom:0;
    margin-left:auto;
    margin-bottom: 10px;
    border-radius: 20px;
`
export const StyledCourseName= styled.div`
    align-self:center;
`