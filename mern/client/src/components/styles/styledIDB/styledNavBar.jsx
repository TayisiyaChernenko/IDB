import styled from "styled-components"


export const StyledOpenNav = styled.div `
#nav {
  display: none;
}

#nav.open {
  height: 400px;
  display: inline-block;
}
  height: 80vh;
  width: 7vw;
  display: flex;
  flex-direction:column;
  justify-items: center;
  position: relative;
  border-radius: 5px;
  background-color: rgba(0, 33, 3, 0.8);
  color: white;
  margin-right: auto;
  margin-bottom:auto;
  
  li{
    list-style-type: none;
    margin: 1rem 1rem;
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


`
export const StyledNavTitle = styled.nav`
margin-left:5px;
margin-top:5px;
`
 
export const StyledClosedNav = styled.button `
    height: 30px;
    width: 7vw;
    display: flex;
    border:0
    justify-items: center;
    position: relative;
    border-radius: 5px;
    background-color: rgba(0, 33, 3, 0.8);
    color: white;
    margin-right: auto;
`