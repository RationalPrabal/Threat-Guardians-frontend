import { useToast } from "@chakra-ui/react";
import axios from "axios";
import React from "react";

export default function SingleStudent({
  name,
  email,
  enrolledAt,
  blocked,
  _id,
}) {
  const toast = useToast();
  const BlockFunction = async (id, status) => {
    try {
      const headers = {
        Authorization: localStorage.getItem("token"),
      };

      await axios.patch(
        `http://localhost:4500/users/update/${id}`,
        {
          blocked: status,
        },
        { headers }
      );
      if (status) {
        toast({
          title: "User blocked successfully",
          status: "success",
        });
      } else {
        toast({
          title: "User Unblocked Successfully",
          status: "success",
        });
      }
    } catch (error) {
      if (status) {
        toast({
          title: "Couldn't Block user",
          status: "error",
        });
      } else {
        toast({
          title: "Couldn't Unblock user",
          status: "error",
        });
      }
    }
  };
  return (
    <div className="shadow-lg py-4">
      <p className="text-xl font-bold ">{name}</p>

      <p className="font-bold text-blue-400">{email}</p>

      <p className="text-xs font-bold text-red-500">
        Student enrolled at {new Date(enrolledAt).toLocaleString()}
      </p>
      {blocked ? (
        <button
          className="bg-green-500 text-white font-bold text-sm p-2 rounded-sm mt-2"
          onClick={() => BlockFunction(_id, false)}
        >
          Unblock Student
        </button>
      ) : (
        <button
          className="bg-red-500 text-white font-bold text-sm p-2 rounded-sm mt-2"
          onClick={() => BlockFunction(_id, true)}
        >
          Block Student
        </button>
      )}
    </div>
  );
}
