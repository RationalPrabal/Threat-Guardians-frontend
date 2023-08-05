import React from "react";

export default function SingleStudent({ name, email, enrolledAt }) {
  return (
    <div className="shadow-lg py-4">
      <p className="text-lg font-bold ">{name}</p>

      <p className="font-bold text-blue-400">{email}</p>

      <p className="text-xs font-bold text-red-500">
        {new Date(enrolledAt).toLocaleString()}
      </p>
    </div>
  );
}
