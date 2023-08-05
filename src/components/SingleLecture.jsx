import React from "react";
import { DeleteModal } from "./DeleteModal";
import { EditModal } from "./EditModal";

export default function SingleLecture({
  title,
  content,
  createdAt,
  _id,
  text,
  getLectures,
}) {
  let lecture = {
    title,
    content,
    createdAt,
    _id,
    text,
  };
  return (
    <div className="shadow-lg py-4">
      <p className="text-lg font-bold ">{title}</p>
      <a href={content}>
        <p className="font-bold text-blue-400">Content Link</p>
      </a>
      <p className="text-xs font-bold text-red-500">
        {new Date(createdAt).toLocaleString()}
      </p>
      <div className="flex mt-4">
        <DeleteModal _id={_id} getLectures={getLectures} />
        <EditModal lecture={lecture} getLectures={getLectures} />
      </div>
    </div>
  );
}
