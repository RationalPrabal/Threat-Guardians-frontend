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
import axios from "axios";
import React, { useEffect, useState } from "react";
import { VscEdit } from "react-icons/vsc";

export function EditModal({ lecture, getLectures }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [data, setData] = React.useState({
    _id: lecture._id,
    title: lecture.title,
    content: lecture.content,
    text: lecture.text,
  });
  const [selected, setSelected] = useState("");
  const toast = useToast();
  const getURL = async () => {
    try {
      let fileData = new FormData();
      fileData.append("file", selected);
      fileData.append("cloud_name", "dlpujql2r");
      fileData.append("upload_preset", "ml_default");
      const xhr = new XMLHttpRequest();
      xhr.open(
        "POST",
        `https://api.cloudinary.com/v1_1/dlpujql2r/auto/upload`,
        false
      );
      xhr.send(fileData);
      const imageResponse = JSON.parse(xhr.responseText);
      if (imageResponse.url) {
        setData({
          ...data,
          content: imageResponse.url,
        });
      }
    } catch (error) {}
  };
  useEffect(() => {
    getURL();
  }, [selected]);
  //! Editing the lecture by capturing its id. token is being sent as headers for authorization.
  const EditLecture = async (id) => {
    const headers = {
      Authorization: localStorage.getItem("token"),
    };
    try {
      await axios.patch(
        `${process.env.REACT_APP_BASE_URL}/lectures/update/${id}`,
        data,
        {
          headers,
        }
      );
      toast({
        title: "Lecture updated",
        status: "success",
      });
    } catch (error) {
      toast({
        title: "Could not update the lecture",
        status: "error",
      });
    }
    getLectures();
  };
  return (
    <>
      <VscEdit
        onClick={onOpen}
        className="text-blue-600 cursor-pointer text-xl "
      />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit lecture Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className="flex justify-between font-bold">
              <span>Title</span>
              -
              <input
                placeholder="Enter Title"
                value={data.title}
                onChange={(e) => setData({ ...data, title: e.target.value })}
              />
            </div>
            <div className="flex justify-between font-bold">
              <span>Content</span>-
              <input
                type="file"
                onChange={(e) => setSelected(e.target.files[0])}
              />
            </div>
            <div className="flex justify-between font-bold">
              <span>Text Content</span>
              -
              <input
                placeholder="Enter Text Content"
                value={data.text}
                onChange={(e) => setData({ ...data, text: e.target.value })}
              />
            </div>

            <div className="flex justify-center mt-5">
              <button
                onClick={() => {
                  //    dispatch(updatelecture(lecture._id,data))
                  EditLecture(lecture._id);
                  onClose();
                }}
                className="bg-green-500 text-white text-bold p-3 "
              >
                Save Changes
              </button>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
