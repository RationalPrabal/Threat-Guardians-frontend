import axios from "axios";
import React, { useEffect, useState } from "react";
import SingleLecture from "../components/SingleLecture";
import { CreateModal } from "../components/CreateModal";
import SingleStudent from "../components/SingleStudent";
import Quiz from "react-quiz-component";
import { CreateQuizzModal } from "../components/CreateQuizzModal";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useToast } from "@chakra-ui/react";
export default function Dashboard() {
  const [lectures, setLectures] = useState([]);
  const [students, setStudents] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const toast = useToast();
  const getLectures = async () => {
    const headers = {
      Authorization: localStorage.getItem("token"),
    };
    try {
      let response = await axios.get("http://localhost:4500/lectures/", {
        headers,
      });
      setLectures(response.data);
    } catch (error) {
      console.log("can not get lectures");
    }
  };
  const getStudents = async () => {
    const headers = {
      Authorization: localStorage.getItem("token"),
    };
    try {
      let response = await axios.get("http://localhost:4500/users/", {
        headers,
      });
      setStudents(response.data);
    } catch (error) {
      console.log("can not get students");
    }
  };
  const getQuizzes = async () => {
    const headers = {
      Authorization: localStorage.getItem("token"),
    };
    try {
      let response = await axios.get("http://localhost:4500/quizzes/", {
        headers,
      });
      setQuizzes(response.data);
    } catch (error) {
      console.log("can not get quizzes");
    }
  };
  const deleteQuiz = async (id) => {
    const headers = {
      Authorization: localStorage.getItem("token"),
    };
    try {
      await axios.delete(`http://localhost:4500/quizzes/delete/${id}`, {
        headers,
      });
      toast({
        title: "Quizz Deleted",
        status: "success",
      });
    } catch {
      toast({
        title: "Could not delete",
        status: "error",
      });
    }
    getQuizzes();
  };
  useEffect(() => {
    getLectures();
    getStudents();
    getQuizzes();
  }, []);

  return (
    <div>
      <p className="text-xl font-bold bg-slate-600 text-white mt-10">
        {" "}
        Lectures List
      </p>
      <CreateModal getLectures={getLectures} />
      {lectures.map((el) => (
        <SingleLecture key={el._id} {...el} getLectures={getLectures} />
      ))}
      <p className="text-xl font-bold bg-slate-600 text-white mt-12">
        {" "}
        Quizzes List
      </p>
      <CreateQuizzModal getQuizzes={getQuizzes} />
      {quizzes.map((quiz) => (
        <div className="shadow-lg py-4">
          <Quiz quiz={quiz} />
          <RiDeleteBin5Line
            className="text-red-500 cursor-pointer text-xl ml-6"
            onClick={() => deleteQuiz(quiz._id)}
          />
        </div>
      ))}
      <p className="text-xl font-bold bg-slate-600 text-white mt-12">
        Students List
      </p>
      {students.map((el) => (
        <SingleStudent key={el._id} {...el} />
      ))}
    </div>
  );
}
