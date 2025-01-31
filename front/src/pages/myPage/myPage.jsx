import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";

const MyPage = () => {
  return (
    <div className="max-w-9/10 mx-auto flex p-6 justify-center ">
      <Sidebar />
      <div className="flex-1 p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default MyPage;
