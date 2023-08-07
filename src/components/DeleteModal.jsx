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
import { RiDeleteBin5Line } from "react-icons/ri";

export function DeleteModal({ _id, getLectures }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  //! Deleting the lecture by capturing its id. Id is being sent as a parameter
  const deleteLecture = async (id) => {
    const headers = {
      Authorization: localStorage.getItem("token"),
    };
    try {
      await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/lectures/delete/${id}`,
        {
          headers,
        }
      );
      toast({
        title: "Lecture Deleted",
        status: "success",
      });
    } catch {
      toast({
        title: "Could not delete",
        status: "error",
      });
    }
    getLectures();
  };
  return (
    <>
      <RiDeleteBin5Line
        onClick={onOpen}
        className="text-red-500 cursor-pointer text-xl mr-6"
      />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete Lecture</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className="font-bold">
              <p>You want to delete this Lecture for Sure? </p>
              <div className="flex justify-around mt-8">
                <button
                  onClick={() => {
                    deleteLecture(_id);
                    onClose();
                  }}
                  className="bg-red-700 text-white rounded-md px-4 py-2"
                >
                  Delete
                </button>
                <button
                  onClick={onClose}
                  className="bg-green-400 text-white rounded-md px-4 py-2"
                >
                  Cancel
                </button>
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
