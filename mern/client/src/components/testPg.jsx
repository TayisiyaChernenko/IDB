import React, {useState} from "react";

export const TestPage = () => {
    const courseInput = useCourse();

    const userId = '643f27057d06bbd407a17eae';
    const postInfo = {
        userId: userId,
    };

    return(
        <div>
        <input {...courseInput}
        placeholder= "Course Name" />
        </div>


    )
    
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




