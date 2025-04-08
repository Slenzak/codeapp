import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CodeEditor from "./components/codeeditor";
import supabase from "../supabase";

const TaskDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [userCode, setUserCode] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(true);
  const [iframeKey, setIframeKey] = useState(0);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const { data } = await supabase
          .from('user')
          .select('id')
          .eq('auth_uid', session.user.id)
          .single();
        setUserId(data?.id);
      }
    };
    getSession();
  }, []);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const { data, error } = await supabase
          .from('task')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        setTask(data);
        setUserCode(data.starting_code || "");
      } catch (error) {
        console.error("Error fetching task:", error);
        navigate("/task");
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [id, navigate]);

  const checkAnswer = async () => {
    if (!task || !userId) return;
    
    try {
      const parser = new DOMParser();
      const userDoc = parser.parseFromString(userCode, "text/html");
      const answerDoc = parser.parseFromString(task.solution_code, "text/html");
      const userText = userDoc.body.innerHTML.trim().toLowerCase().replace(/\s+/g, " ");
      const answerText = answerDoc.body.innerHTML.trim().toLowerCase().replace(/\s+/g, " ");
      
      const isCorrect = userText === answerText;
      setResult(isCorrect ? "Correct!" : "Try again.");

      if (isCorrect) {
        const { error } = await supabase
          .from('tasktouser')
          .upsert(
            { 
              task_id: task.id, 
              user_id: userId, 
              completed: true 
            },
            { onConflict: ['task_id', 'user_id'] }
          );

        if (error) throw error;
      }
    } catch (error) {
      console.error("Error:", error);
      setResult("Error checking solution");
    }
  };
  if (loading || !task) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#36393e]">
        <div className="text-white text-xl">Loading task...</div>
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col items-center p-6 bg-[#36393e]">
      <h1 className="text-2xl font-bold text-white mb-4">{task.title}</h1>
      <p className="text-gray-300 mb-4">{task.description}</p>

      <div className="flex gap-4 w-full">
        <div className="w-1/2">
          <CodeEditor 
            value={userCode} 
            onChange={setUserCode} 
            language="html" 
          />
        </div>
        <iframe
          key={iframeKey} 
          className="w-1/2 h-64 border bg-white"
          srcDoc={userCode}
          title="Live Preview"
          sandbox="allow-scripts"
        />
      </div>

      <button
        onClick={checkAnswer}
        className="mt-4 p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
      >
        Check Answer
      </button>

      {result && (
        <p className={`mt-2 text-lg ${
          result === "Correct!" ? "text-green-500" : "text-red-500"
        }`}>
          {result}
        </p>
      )}

      <button 
        onClick={() => navigate("/task")} 
        className="fixed bottom-5 right-5 p-2.5 px-5 bg-blue-600 text-white border-none rounded-md cursor-pointer hover:bg-blue-700 transition-colors"
      >
        Return to Task Page
      </button>
    </div>
  );
};

export default TaskDetail;