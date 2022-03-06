import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../../components/Header";
import LessonForm from "../components/LessonForm";

import { updateLesson, getLessonById } from "../../../firebase/lesson";

function EditLesson() {
  const { lessonId } = useParams();
  const navigate = useNavigate();

  const [lesson, setLesson] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    const getLesson = async () => {
      const lesson = await getLessonById(lessonId);
      setLesson(lesson);
      setIsLoading(false);
    };
    getLesson();
  }, [lessonId]);

  const handleSubmit = async (values) => {
    await updateLesson(values);
    setSubmitSuccess(true);
    navigate(`/lesson/${lessonId}`);
  };

  return (
    <>
      <Header />
      <div className="main-content-container">
        <h1>Update Lesson</h1>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <LessonForm
            onSubmit={handleSubmit}
            initialValues={lesson}
            isAddMode={false}
          />
        )}
        {submitSuccess && <div style={{color: 'blue'}}>Cập nhật bài học thành công</div>}
      </div>
    </>
  );
}

export default EditLesson;
