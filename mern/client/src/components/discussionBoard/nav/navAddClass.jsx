import React, {useState} from 'react';
import { StyledNavAddButton,StyledNavAddInput, StyledNavAddCourses } from '../../styles/styledIDB/styledNavs/styledNavAdd';
import { useNavigate } from "react-router";

export const NavAddClasses = () => {
    const courseInput = useCourse();
    const sectionInput = useSection();
    const userId = '643ec806b0c09a765b61875e';
    const navigate = useNavigate();
    const courseInfo = {
        userId: userId,
        course : courseInput.course,
        section: sectionInput.section
    };


    const handleAddClass = () => {
        fetch("http://localhost:3000/api/courses",{
            method: 'post',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(courseInfo),
            }).then((response) => {
            if (response.statusText === "OK"){
            } else {
                alert ('Could not add class');
            }
        })
    }
    
    
    return(
        <StyledNavAddCourses>
        <StyledNavAddButton>Add A Course</StyledNavAddButton>
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