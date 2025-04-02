import { useNavigate } from "react-router-dom";

const tasks = [
  {
    id: 1,
    title: "Basic HTML Structure",
    task: "Write hello world in h1.",
    givenCode: `<html>\n  <body>\n    <!-- Add your code here -->\n  </body>\n</html>`,
    answerCode: `<html>\n  <body>\n    <h1>Hello, World!</h1>   </body>\n</html>`
  },
  {
    id: 2,
    title: "JavaScript Alert",
    task: "Write a JavaScript function that shows an alert when called with no text.",
    givenCode: `function showAlert() {\n  // Add your code here\n}`,
    answerCode: `function showAlert() {\n  alert();\n}`
  }
];

const Task = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#36393e] h-screen w-screen p-4 flex flex-wrap gap-4">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="bg-[#2f3136] p-4 rounded-lg shadow-lg w-64 max-h-64"
        >
          <h2
            className="text-white text-lg font-semibold mb-2 text-center cursor-pointer hover:underline"
            onClick={() => navigate(`/task/${task.id}`, { state: task })}
          >
            {task.title}
          </h2>
        </div>
      ))}
      <button
        onClick={() => navigate("/")}
        className="fixed bottom-5 right-5 p-2.5 px-5 bg-blue-600 text-white border-none rounded-md cursor-pointer"
      >
        Return to Main Page
      </button>
      <button onClick={() => navigate("/login")} className="absolute top-5 right-5 p-2.5 bg-blue-600 w-10 h-10 rounded-full shadow-lg bg-[url('/public/avatar.png')] bg-cover bg-center">
            </button>
    </div>
    
  );
};

export default Task;
