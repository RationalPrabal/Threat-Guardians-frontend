import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { MdAddCircleOutline } from "react-icons/md";
import axios from "axios";

export function CreateQuizzModal({ getQuizzes }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [data, setData] = React.useState({
    quizTitle: "",
    questions: [],
  });

  const toast = useToast();

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...data.questions];
    updatedQuestions[index][field] = value;
    setData({ ...data, questions: updatedQuestions });
  };

  const handleAnswerChange = (questionIndex, answerIndex, value) => {
    const updatedQuestions = [...data.questions];
    updatedQuestions[questionIndex].answers[answerIndex] = value;
    setData({ ...data, questions: updatedQuestions });
  };

  const addQuestion = () => {
    const newQuestion = {
      question: "",
      answers: ["", "", "", ""], // Initialize with empty answer options
      correctAnswer: "",
      answerSelectionType: "single",
      messageForCorrectAnswer: "Correct answer. Good job.",
      messageForIncorrectAnswer: "Incorrect answer. Please try again.",
      point: 20,
      questionType: "text",
    };
    setData({ ...data, questions: [...data.questions, newQuestion] });
  };

  const postQuiz = async () => {
    try {
      const headers = {
        Authorization: localStorage.getItem("token"),
      };

      await axios.post("http://localhost:4500/quizzes/create", data, {
        headers,
      });
      toast({
        title: "Quiz created",
        status: "success",
      });
      onClose();
    } catch (error) {
      toast({
        title: "Could not create Quiz",
        status: "error",
      });
    }
    getQuizzes();
  };

  return (
    <>
      <div onClick={onOpen}>
        <button className="bg-purple-500 p-2 rounded-sm font-bold text-white mt-4">
          Create New Quizz
        </button>
        <MdAddCircleOutline className="text-white text-4xl" />
      </div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Quiz</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className="flex justify-between font-bold">
              <span>Title</span>
              -
              <input
                placeholder="Enter Title"
                value={data.quizTitle}
                onChange={(e) =>
                  setData({ ...data, quizTitle: e.target.value })
                }
              />
            </div>
            {data.questions.map((question, index) => (
              <div key={index}>
                <input
                  type="text"
                  placeholder="Enter Question Title"
                  value={question.question}
                  onChange={(e) =>
                    handleQuestionChange(index, "question", e.target.value)
                  }
                />
                {question.answers.map((answer, ansIndex) => (
                  <input
                    key={ansIndex}
                    type="text"
                    placeholder={`Option ${ansIndex + 1}`}
                    value={answer}
                    onChange={(e) =>
                      handleAnswerChange(index, ansIndex, e.target.value)
                    }
                  />
                ))}
                <select
                  value={question.correctAnswer}
                  onChange={(e) =>
                    handleQuestionChange(index, "correctAnswer", e.target.value)
                  }
                >
                  <option value="">Choose correct option</option>
                  {question.answers.map((_, ansIndex) => (
                    <option key={ansIndex} value={ansIndex}>
                      Option {ansIndex + 1}
                    </option>
                  ))}
                </select>
              </div>
            ))}
            <button
              onClick={addQuestion}
              className="bg-green-500 text-white text-bold p-3 disabled:cursor-not-allowed"
            >
              Add Question
            </button>
            <button
              onClick={postQuiz}
              className="bg-green-500 text-white text-bold p-3 disabled:cursor-not-allowed"
            >
              Add Quiz
            </button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
