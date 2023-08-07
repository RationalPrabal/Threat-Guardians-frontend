import axios from "axios";
import React, { useEffect, useState } from "react";
import SingleLecture from "../components/SingleLecture";
import { CreateModal } from "../components/CreateModal";
import SingleStudent from "../components/SingleStudent";
import Quiz from "react-quiz-component";
import { CreateQuizzModal } from "../components/CreateQuizzModal";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useToast } from "@chakra-ui/react";
import { useContext } from "react";
import { AuthContext } from "../context/Auth.Context";
import Profile from "../components/Profile";
import DottedLoader from "../components/Loader";

export default function Dashboard() {
  const [lectures, setLectures] = useState([]);
  const [students, setStudents] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [loader, setLoader] = useState(false);
  const { show, user, getUser } = useContext(AuthContext);
  const toast = useToast();
  //! making an array of quizz ids to check whether user has attempted it or not
  const quizzIds = user?.completedQuizzes.map((el) => el._id);

  //! getting the lectures when page being mounted. token is being send in the headers to verfiry the authenticated user
  const getLectures = async () => {
    setLoader(true);
    const headers = {
      Authorization: localStorage.getItem("token"),
    };
    try {
      let response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/lectures/`,
        {
          headers,
        }
      );
      setLectures(response.data);
    } catch (error) {
      console.log("can not get lectures");
    }
    setLoader(false);
  };
  const getStudents = async () => {
    const headers = {
      Authorization: localStorage.getItem("token"),
    };
    try {
      let response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/users/`,
        {
          headers,
        }
      );
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
      let response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/quizzes/`,
        {
          headers,
        }
      );
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
      await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/quizzes/delete/${id}`,
        {
          headers,
        }
      );
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

  //! when user is completing the an object then this function is being invoked to register the user's score
  const completeQuiz = async (id, quizId, obj, quizTitle) => {
    if (
      obj.numberOfCorrectAnswers + obj.numberOfIncorrectAnswers !==
      obj.numberOfQuestions
    ) {
      return;
    }
    //! if role is admin then return because quizz history is not for admin
    if (user.role === "admin") {
      return;
    }
    //! if user has already attempted the quizz then compare the existing score and current score and then save max of them as new score
    let completedQuizzes;
    let isExists = user.completedQuizzes.filter((el) => el._id === quizId);
    let afterMap = user.completedQuizzes.map((el) => {
      if (el._id === quizId) {
        el.score = Math.max(el.score, obj.correctPoints);
      }
      return el;
    });

    if (isExists.length > 0) {
      completedQuizzes = afterMap;
    }
    //! if user is attempting it for the first time then simply add quizz's id , title and score into the databse
    else {
      completedQuizzes = [
        ...user.completedQuizzes,
        { quizTitle, score: obj.correctPoints, _id: quizId },
      ];
    }

    const headers = {
      Authorization: localStorage.getItem("token"),
    };
    try {
      await axios.patch(
        `${process.env.REACT_APP_BASE_URL}/users/update/${id}`,
        {
          completedQuizzes,
        },
        {
          headers,
        }
      );
      toast({
        title: "Quiz completed successfully",
        description: `Your Score: ${obj.correctPoints}`,
        status: "success",
      });
    } catch (error) {}
    getUser();
  };

  //! when the page is first time being loaded then fetch all the required data
  useEffect(() => {
    getLectures();
    getStudents();
    getQuizzes();
  }, []);

  return (
    <div>
      {show === "Lectures" &&
        (!loader ? (
          <>
            <p className="text-[26px] font-bold bg-slate-600 text-white px-4 mt-2">
              {" "}
              Lectures List
            </p>
            {user?.role === "admin" && (
              <CreateModal getLectures={getLectures} />
            )}
            {lectures.map((el) => (
              <SingleLecture key={el._id} {...el} getLectures={getLectures} />
            ))}
          </>
        ) : (
          <DottedLoader />
        ))}
      {show === "Quizzes" && (
        <>
          <p className="text-[26px] font-bold bg-slate-600 text-white px-4 mt-2">
            {" "}
            Quizzes List
          </p>
          {user?.role === "admin" && (
            <CreateQuizzModal getQuizzes={getQuizzes} />
          )}
          {quizzes.map((quiz) => (
            <div className="shadow-lg py-4">
              <Quiz
                quiz={quiz}
                onComplete={(obj) =>
                  completeQuiz(user._id, quiz._id, obj, quiz.quizTitle)
                }
              />
              {user?.role === "admin" && (
                <RiDeleteBin5Line
                  className="text-red-500 cursor-pointer text-xl ml-6"
                  onClick={() => deleteQuiz(quiz._id)}
                />
              )}
              {user?.role === "student" && (
                <div>
                  {quizzIds.includes(quiz._id) ? (
                    <div className="bg-green-400 font-bold p-2">
                      Hurray 🥳 !! You have already completed the Quiz
                    </div>
                  ) : (
                    <div className="bg-red-300 p-2 font-bold">
                      You have not completed the quiz yet!
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </>
      )}

      {show === "Students" && (
        <>
          <p className="text-[26px] font-bold bg-slate-600 text-white px-4 mt-2">
            Students List
          </p>
          {students.map((el) => (
            <SingleStudent key={el._id} {...el} getStudents={getStudents} />
          ))}
        </>
      )}

      {show === "Profile" && (
        <>
          <p className="text-[26px] font-bold bg-slate-600 text-white px-4 mt-2">
            Profile & Reports
          </p>
          <Profile />
        </>
      )}
    </div>
  );
}
