import React from "react";
import { useContext } from "react";
import { AuthContext } from "../context/Auth.Context";
import { BarChart } from "react-chartkick";
import "chartkick/chart.js";
export default function Profile() {
  const { user } = useContext(AuthContext);

  let score = user?.completedQuizzes.reduce((acc, currentValue) => {
    return acc + currentValue.score;
  }, 0);
  return (
    <div>
      <p className="text-xl font-bold text-slate-700">{user.name} 🚀</p>

      <div className="text-lg text-blue-600">
        <span>Total Lectures Watched :</span>
        <span>{user.watched.length}</span>
      </div>
      <div className="text-lg text-blue-600">
        <span>Total Quizzes Attempted :</span>
        <span>{user.completedQuizzes.length}</span>
      </div>
      <div className="text-lg text-blue-600">
        <span>Total Quizz Score :</span>
        <span>{score}</span>
      </div>

      <BarChart
        data={[
          ["Lecture Watched", user.watched.length],
          ["Quizzes Attempted", user.completedQuizzes.length],
          ["Total Quizz Score", score],
        ]}
      />

      <div className="text-blue-600">
        <p className="text-xl font-bold text-pink-600 ">Quiz History 🔥</p>
        {user.completedQuizzes.map((el) => (
          <div className="shadow-lg p-4">
            <p className="text-lg font-bold">{el.quizTitle}</p>
            <p className="text-sm font-bold text-green-600">
              <span>Score</span>: <span>{el.score}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
