import React from "react";
import { StyledPosts, StyledPrevPosts, StyledResponse } from "../styles/styledIDB/styledIDBHome";

export const PrevPosts = () => (
      <StyledPrevPosts>
        <StyledPosts>
            <StyledResponse>Hello this is an example of a response somone 
                might have already provided to the IDB.</StyledResponse>
        </StyledPosts>
        <StyledPosts><StyledResponse>
            Another response provided by a user .</StyledResponse></StyledPosts>
      </StyledPrevPosts>
)