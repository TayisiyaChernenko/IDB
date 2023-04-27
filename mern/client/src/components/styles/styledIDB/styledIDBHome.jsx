import styled from "styled-components";

export const StyledPrevPosts = styled.div`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    align-self: center;
    border: 1px solid black;
    border-radius: 25px;
    width: 75vw;
    height: 75vh;
    margin-right: 5%;
    background-color: #d3d3d3;
    box-shadow: 2px 2px 2px 1px rgba(5, 60, 10, 0.8);
    overflow-y: scroll;
    li{
    list-style-type: none;
    margin-bottom: 2px;
    }
    ul{
    display: flex;
    flex-direction: column;
    padding: 0;
    }
    li a {
 // increases the surface area of the anchor tag to span more than just the anchor text
    text-decoration: none;
    display: block;
    width: 100%;   
   }

`;


export const StyledBoard= styled.div `
    display:flex;
    flex-direction:column;
    align-items: center;
    width: 85vw;
    height: 100vh;
    padding-left: 4vw;
    `;

export const IDBLayout= styled.div `
display:flex;
flex-direction:row;
width: 100vw;
height: 100vh;
`

export const StyledPrompt = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    align-self: center;
    border: 1px solid black;
    border-radius: 25px;
    width: 75vw;
    height: 75vh;
    margin-right: 5%;
    background-color: #EEEEEE;
    box-shadow: 2px 2px 2px 1px rgba(5, 60, 10, 0.8);
    overflow-y: scroll;
`
