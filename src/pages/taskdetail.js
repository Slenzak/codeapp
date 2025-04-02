import { useLocation } from "react-router-dom";
import { useState } from "react";
import CodeEditor from "./components/codeeditor";
import { useNavigate } from "react-router-dom";

const TaskDetail = () => {
  const { state: task } = useLocation();
  const navigate = useNavigate();
  const [userCode, setUserCode] = useState(task?.givenCode || "");
  const [result, setResult] = useState("");

  const checkAnswer = () => {
    const parser = new DOMParser();
    const userDoc = parser.parseFromString(userCode, "text/html");
    const answerDoc = parser.parseFromString(task.answerCode, "text/html");
    const userText = userDoc.body.innerHTML.trim().toLowerCase().replace(/\s+/g, " ");
    const answerText = answerDoc.body.innerHTML.trim().toLowerCase().replace(/\s+/g, " ");
    if (userText === answerText) {
      setResult("Correct!");
    } else {
      setResult("Try again.");
    }
  };

  return (
    <div className="flex h-screen flex-col items-center p-6 bg-[#36393e]" >
      <h1 className="text-2xl font-bold text-white mb-4">{task.title}</h1>
      <p className="text-gray-300 mb-4">{task.task}</p>

      <div className="flex gap-4 w-full">
        <div className="w-1/2">
          <CodeEditor value={userCode} onChange={setUserCode} language="html" />
        </div>
        <iframe
            className="w-1/2 h-64 border bg-white"
            srcDoc={userCode}
            title="Live Preview"
            onLoad={(e) => setTimeout(() => e.target.contentWindow?.dispatchEvent(new Event("resize")), 100)}
        ></iframe>
      </div>

      <button
        onClick={checkAnswer}
        className="mt-4 p-2 bg-blue-600 text-white rounded"
      >
        Check Answer
      </button>

      {result && <p className="mt-2 text-lg text-white">{result}</p>}
      <button onClick={() => navigate("/Task")} className="fixed bottom-5 right-5 p-2.5 px-5 bg-blue-600 text-white border-none rounded-md cursor-pointer">
            Return to Task Page
      </button>
      <button onClick={() => navigate("/login")} className="absolute top-5 right-5 p-2.5 bg-blue-600 w-10 h-10 rounded-full shadow-lg bg-[url('/public/avatar.png')] bg-cover bg-center">
            </button>
    </div>
  );
};

export default TaskDetail;
