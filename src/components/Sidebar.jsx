import { MdOutlineAssignmentTurnedIn, MdOutlineQuiz } from "react-icons/md";
import { PiStudent } from "react-icons/pi";
import { CiLogout } from "react-icons/ci";
import { FiUserCheck } from "react-icons/fi";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/Auth.Context";

export default function Navbar() {
  const { setShow, setAuth, user, getUser } = useContext(AuthContext);
  //! if user is refreshing the page then if token is stored in local storage then keep the user logged in otherwise log out
  //! Benefit is that even after refreshing the tab user will be logged in
  if (localStorage.getItem("token")) {
    setAuth(true);
  }

  //! after logout remove the token and userId from localStorage
  const Logout = () => {
    setAuth(false);
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
  };
  //!when page is mounting then get the user data based on user id
  useEffect(() => {
    getUser();
  }, []);
  return (
    <Sidebar className="font-bold">
      <Menu
        menuItemStyles={{
          button: {
            // the active class will be added automatically by react router
            // so we can use it to style the active menu item
            [`&.active`]: {
              backgroundColor: "#13395e",
              color: "#b6c8d9",
            },
          },
        }}
      >
        <MenuItem onClick={() => setShow("Lectures")}>
          <div className="flex">
            <MdOutlineAssignmentTurnedIn className="text-xl text-blue-500 mr-2" />{" "}
            Lectures
          </div>
        </MenuItem>
        <MenuItem onClick={() => setShow("Quizzes")}>
          <div className="flex">
            <MdOutlineQuiz className="text-xl text-blue-500 mr-2" /> Quizzes
          </div>
        </MenuItem>
        {user?.role === "admin" && (
          <MenuItem onClick={() => setShow("Students")}>
            <div className="flex">
              <PiStudent className="text-xl text-blue-500 mr-2" /> Students{" "}
            </div>
          </MenuItem>
        )}
        {user?.role === "student" && (
          <MenuItem onClick={() => setShow("Profile")}>
            <div className="flex">
              <FiUserCheck className="text-xl text-blue-500 mr-2" /> Profile{" "}
            </div>
          </MenuItem>
        )}
        <MenuItem onClick={() => Logout()}>
          <div className="flex">
            <CiLogout className="text-xl text-red-500 mr-2" /> LogOut{" "}
          </div>
        </MenuItem>
      </Menu>
    </Sidebar>
  );
}
