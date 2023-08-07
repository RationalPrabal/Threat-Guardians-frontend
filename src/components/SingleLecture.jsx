import React from "react";
import { DeleteModal } from "./DeleteModal";
import { EditModal } from "./EditModal";
import { useContext } from "react";
import { AuthContext } from "../context/Auth.Context";
import axios from "axios";

export default function SingleLecture({
  title,
  content,
  createdAt,
  _id,
  text,
  getLectures,
}) {
  const { user, getUser } = useContext(AuthContext);
  console.log(user);
  let lecture = {
    title,
    content,
    createdAt,
    _id,
    text,
  };

  const setWatchStatus = async (id) => {
    if (user.role === "admin") return;
    let watched = [...user.watched, _id];
    const headers = {
      Authorization: localStorage.getItem("token"),
    };
    try {
      await axios.patch(
        `${process.env.REACT_APP_BASE_URL}/users/update/${id}`,
        {
          watched,
        },
        {
          headers,
        }
      );
    } catch (error) {}
    getUser();
  };

  return (
    <div className="shadow-lg py-4" onClick={() => setWatchStatus(user._id)}>
      <p className="text-xl font-bold text-[#7146e5]">{title}</p>
      <a href={content} target="_blank">
        <p className="font-bold text-blue-400">Content Link</p>
      </a>
      <p className="text-xs font-bold text-red-500">
        Lecture scheduled at {new Date(createdAt).toLocaleString()}
      </p>
      {user?.role === "admin" && (
        <div className="flex mt-4">
          <DeleteModal _id={_id} getLectures={getLectures} />
          <EditModal lecture={lecture} getLectures={getLectures} />
        </div>
      )}
      {user?.role === "student" && (
        <div>
          {user?.watched.includes(_id) ? (
            <div className="bg-green-400 font-bold p-2">
              Hurray 🥳 !! You have already watched the lecture
            </div>
          ) : (
            <div className="bg-red-300 p-2 font-bold">
              You have not watched the lecture yet!
            </div>
          )}
        </div>
      )}
    </div>
  );
}
