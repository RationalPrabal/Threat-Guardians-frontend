import { useContext } from "react";
import Navbar from "./components/Sidebar";
import AllRoutes from "./pages/AllRoutes";
import { AuthContext } from "./context/Auth.Context";


function App() {
  const {isAuth}=useContext(AuthContext)
  return (
    <div className="flex justify-between">
     {isAuth&& <div className="w-[15%]">
      <Navbar/>
      </div>
}
      <div className="w-[80%] px-6">
  <AllRoutes/>
  </div>
    </div>
  );
}

export default App;
