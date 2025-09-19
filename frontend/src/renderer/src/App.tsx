// import Navbar from "./components/ui/Navbar";
import Sidebar from "./components/ui/Sidebar";
import { Outlet } from "react-router-dom";
const App = () => {
  return (
    <>
      {/* <Navbar /> */}
      {/* <div className="mx-10">
        <Outlet />
      </div> */}
      <div className="h-[100vh] w-full flex bg-primary">
        <Sidebar />
        <div className="bg-background flex-grow rounded-l-3xl overflow-y-auto">
          <div className="mx-10">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
