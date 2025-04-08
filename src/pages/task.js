import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../supabase";

const Task = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        // Get the numeric user ID from our user table
        const { data } = await supabase
          .from('user')
          .select('id')
          .eq('auth_uid', session.user.id)
          .single();
        setUserId(data?.id);
      }
      setAuthChecked(true);
    };
    getSession();
  }, []);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const { data: tasksData, error: tasksError } = await supabase
          .from('task')
          .select('*')
          .order('created_at', { ascending: true });

        if (tasksError) throw tasksError;
        setTasks(tasksData || []);

        if (userId) {
          const { data: completedData, error: completedError } = await supabase
            .from('tasktouser')
            .select('task_id')
            .eq('user_id', userId)
            .eq('completed', true);

          if (!completedError) {
            setCompletedTasks(completedData.map(item => item.task_id));
          }
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        setLoading(false);
      }
    };

    if (authChecked) {
      fetchTasks();
    }
  }, [userId, authChecked]);

  if (!authChecked || loading) {
    return (
      <div className="bg-[#36393e] h-screen w-screen p-4 flex items-center justify-center">
        <div className="text-white text-xl">Loading tasks...</div>
      </div>
    );
  }

  return (
    <div className="bg-[#36393e] h-screen w-screen p-4 flex flex-wrap gap-4">
      {tasks.map((task) => (
        <div
          key={task.id}
          className={`bg-[#2f3136] p-4 rounded-lg shadow-lg w-64 max-h-64 cursor-pointer hover:bg-[#40444b] transition-colors ${
            completedTasks.includes(task.id) ? 'border-2 border-green-500' : ''
          }`}
          onClick={() => navigate(`/task/${task.id}`)}
        >
          <h2 className="text-white text-lg font-semibold mb-2 text-center">
            {task.title}
            {completedTasks.includes(task.id) && (
              <span className="ml-2 text-green-500">✓</span>
            )}
          </h2>
          <p className="text-gray-400 text-sm line-clamp-3">
            {task.description}
          </p>
        </div>
      ))}
      
      <button
        onClick={() => navigate("/")}
        className="fixed bottom-5 right-5 p-2.5 px-5 bg-blue-600 text-white border-none rounded-md cursor-pointer"
      >
        Return to Main Page
      </button>
      <button 
        onClick={() => navigate("/login")} 
        className="absolute top-5 right-5 p-2.5 bg-blue-600 w-10 h-10 rounded-full shadow-lg bg-[url('/public/avatar.png')] bg-cover bg-center"
      ></button>
    </div>
  );
};

export default Task;