import { useNavigate } from "react-router-dom";

const Mainpage = () =>{
    const navigate = useNavigate();
    return(
        <div className="flex h-screen">
            <div className="w-1/2 h-full bg-[url('/public/learn.jpg')] bg-cover bg-center flex items-center justify-center cursor-pointer" onClick={() => navigate("/task")}>
            <div className="absolute inset-0 bg-black bg-opacity-50 hover:bg-opacity-30 transition duration-300"></div>
                <h1 className="drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] text-white text-2xl">Go to Task</h1>
            </div> 

            <div className="w-1/2 h-full bg-[url('/public/code.jpg')] bg-cover bg-center flex items-center justify-center cursor-pointer relative" onClick={() => navigate("/sandbox")}>
                <div className="absolute inset-0 bg-black bg-opacity-50 hover:bg-opacity-30 transition duration-300"></div>
                <h1 className="relative text-white text-2xl">Go to Sandbox</h1>
            </div>
        </div>
    )
}
export default Mainpage;