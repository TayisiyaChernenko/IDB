import React, {useState} from "react";

export const TestPage = () => {
    const courseInput = useCourse();
    const sectionInput = useSection();
    const questionInput = useQuestion();

    const userId = '643f27057d06bbd407a17eae';
    const postInfo = {
        userId: userId,
        text: questionInput.question,
        courseName : courseInput.course,
        sectionNum: sectionInput.section,
    };

    const handleAddPost = () => {
        fetch("http://localhost:3000/api/posts",{
            method: 'post',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postInfo),
            }).then((response) => {
            if (response.statusText === "OK"){
            } else {
                alert ('Could not create post');
            }
        })
        }


    return(
        <div>
        <input {...courseInput}
        placeholder= "Course Name" />
        <input {...sectionInput}
        placeholder= "Section Number" />
         <input {...questionInput}
        placeholder= "Your Question" />
        <button onClick={handleAddPost}>Add Post</button>
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

const useQuestion = () => {
    const [question, setQuestion] = useState('');
    
    function onChange(e) {
        setQuestion(e.target.value);
      }

    return{
        question,
        onChange,
    };
};


