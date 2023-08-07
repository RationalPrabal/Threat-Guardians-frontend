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
import React, { useEffect, useState } from "react";
import { MdAddCircleOutline } from "react-icons/md";
import axios from "axios";
import DottedLoader from "./Loader";

export function CreateModal({ getLectures }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [data, setData] = React.useState({
    title: "",
    content: "",
    text: "",
  });
  const [loader, setLoader] = useState(false);
  const [selected, setSelected] = useState("");
  const toast = useToast();
  const postLecture = async () => {
    try {
      const headers = {
        Authorization: localStorage.getItem("token"),
      };
      await axios.post(
        `${process.env.REACT_APP_BASE_URL}/lectures/create`,
        data,
        {
          headers,
        }
      );
      toast({
        title: "Lecture created",
        status: "success",
      });
    } catch (error) {
      toast({
        title: "Could not create lecture",
        status: "error",
      });
    }
    getLectures();
  };
  const getURL = async () => {
    setLoader(true);
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
      console.log(imageResponse.url);
      if (imageResponse.url) {
        setData({
          ...data,
          content: imageResponse.url,
        });
      }
    } catch (error) {}
    setLoader(false);
  };
  useEffect(() => {
    getURL();
  }, [selected]);
  return (
    <>
      <div
        onClick={onOpen}
        // className="flex w-[60%] sm:w-[20%] justify-around m-auto items-center bg-teal-500 rounded-md mt-8 cursor-pointer"
      >
        <button className="bg-purple-500 p-2 rounded-sm font-bold text-white mt-4">
          Create New Lecture
        </button>
        <MdAddCircleOutline className="text-white text-4xl" />
      </div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Lecture</ModalHeader>
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
            {loader ? (
              <DottedLoader />
            ) : (
              <div className="flex justify-between font-bold">
                <span>Content</span>-
                <input
                  type="file"
                  onChange={(e) => setSelected(e.target.files[0])}
                />
              </div>
            )}
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
                disabled={!data.title}
                onClick={() => {
                  postLecture();
                  setData({
                    title: "",
                    text: "",
                    content: "",
                  });
                  onClose();
                }}
                className="bg-green-500 text-white text-bold p-3 disabled:cursor-not-allowed"
              >
                Add
              </button>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
