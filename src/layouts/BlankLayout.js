import { Outlet } from "react-router-dom";
import Logo from "../components/Logo";

function BlankLayout() {
  return (
    <div className="bg-cover min-h-screen flex justify-center items-center bg-[url(https://w0.peakpx.com/wallpaper/939/868/HD-wallpaper-neon-waves-purple-reflection-abstract.jpg)]">
      <div className="absolute lg:top-10 lg:left-16 md:top-2 xs:top-0">
        <Logo sx={{ width: 200, height: 200 }} />
      </div>
      <div className="lg:h-[600px] xs:h-[550px] md:mt-10 xs:mt-6 xs:w-[350px] md:h-[550px] md:w-[700px] lg:w-[850px] flex bg-[#fff] rounded-3xl overflow-hidden relative">
        <Outlet />
      </div>
    </div>
  );
}

export default BlankLayout;
