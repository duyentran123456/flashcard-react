import { db } from "./app";
import { collection, getDocs, addDoc, updateDoc, getDoc, doc, deleteDoc, onSnapshot, query } from "firebase/firestore";

const lessonsCol = collection(db, "lessons");

const getAllLessons = async () => {
  const lessonSnapshot = await getDocs(lessonsCol);
  const lessonList = lessonSnapshot.docs.map((doc) => {
    return {
      ...doc.data(),
      id: doc.id,
    };
  });
  return lessonList;
};

const getAllLessonsRealtime = async (callback) => {
  const q = query(lessonsCol);
  onSnapshot(q, (querySnapshot) => {
    const lessons = [];
    querySnapshot.forEach((doc) => {
        lessons.push({...doc.data(), id: doc.id});
    });
    console.log('lessons', lessons);
    callback(lessons);
  });
}

const getLessonById = async (id) => {
  const lessonRef = doc(lessonsCol, id);
  const lessonSnapshot = await getDoc(lessonRef);
  const lesson = {
    ...lessonSnapshot.data(),
    id: lessonSnapshot.id,
  }
  return lesson;
};

const addLesson = async (lesson) => {
  try {
    const docRef = await addDoc(lessonsCol, lesson);
    return docRef;
  } catch (e) {
    console.error("Error adding document: ", e);
    return null;
  }
};

const updateLesson = async (lesson) => {
  try {
    const docRef = doc(lessonsCol, lesson.id);
    const { id, ...lessonData } = lesson;
    await updateDoc(docRef, {...lessonData});
  } catch (e) {
    console.error("Error updating document: ", e);
  }
};

const deleteLesson = async (id) => {
  try {
    const docRef = doc(lessonsCol, id);
    await deleteDoc(docRef);
  } catch (e) {
    console.error("Error deleting document: ", e);
  }
};

export { getAllLessons, getLessonById, addLesson, updateLesson, deleteLesson, getAllLessonsRealtime };
