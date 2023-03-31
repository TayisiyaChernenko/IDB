import styled from "styled-components";

export const StyledPosts = styled.div `
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px solid black;
    border-radius: 25px;
    width: 18vw;
    height: 16vh;
    background-color: #EEEEEE;
    box-shadow: 2px 2px 2px 1px rgba(5, 60, 10, 0.8);
    margin: 0 0 20px 0;
`;
export const StyledResponse = styled.div `
    display: flex;
    flex-direction: column;
    float:right;
    background-color: #EEEEEE;
    width: 10vw;
    height: 8vh; 
    margin: 10px 0px 20px 0;
`;
export const StyledPrevPosts = styled.div`
    display: flex;
    flex-direction: column;
    align-items: left;
    float:left;
    margin: 10px 0px 20px 300px;
`;

export const StyledTextBox = styled.input `
    display: flex;
    flex-direction: column;
    position:fixed;
    bottom:10px;
    border: 1px solid black;
    border-radius: 25px;
    width: 30vw;
    right: 0px;
    height: 50px;
    background-color: #EEEEEE;
    box-shadow: 2px 2px 2px 1px rgba(5, 60, 10, 0.8);
    margin: 100px 0 20px 0;
`;


export const StyledBoard= styled.div `
    flex-direction: column;
    border-radius: 25px;
`;