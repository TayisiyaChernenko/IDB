import React, {useState} from 'react';
import { StyledNavAddButton,StyledNavAddInput, StyledNavAddCourses } from '../../styles/styledIDB/styledNavs/styledNavAdd';
import { useNavigate } from "react-router";
import {StyledNavTitle,} from "../../styles/styledIDB/styledNavs/styledNavBar"

export const NavAddClasses = (props) => {
    const courseInput = useCourse();
    const sectionInput = useSection();
    const userId = props.props.userId;
    const navigate = useNavigate();
    const courseInfo = {
        userId: userId,
        course : courseInput.course,
        section: sectionInput.section
    };


    const handleAddClass = () => {
        fetch(`${window.location.protocol}//${window.location.hostname}:3000/api/courses`,{
            method: 'post',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(courseInfo),
            }).then(response => {return response.json()})
            .then(data => {props.setDiscussionBoards([...props.discussionBoards,data])});
            console.log(props.discussionBoards);
    }
    
    
    return(
        <StyledNavAddCourses>
        <StyledNavTitle> Add A Class </StyledNavTitle>
        <StyledNavAddInput {...courseInput}
        placeholder= "Course Name" />
        <StyledNavAddInput {...sectionInput}
        placeholder= "Section Number" />
        <StyledNavAddButton onClick={handleAddClass}>Add course</StyledNavAddButton>
        </StyledNavAddCourses>
    );
}



const useCourse = () => {
    const [course, setCourse] = useState('');
        
    function onChange(e) {
        setCourse(e.target.value);
    }
    
    return{
        course,
        onChange,
    };
};
    
const useSection = () => {
        const [section, setSection] = useState('');
        
        function onChange(e) {
            setSection(e.target.value);
          }
    
        return{
            section,
            onChange,
        };
    };