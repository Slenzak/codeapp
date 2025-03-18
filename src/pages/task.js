const Task = () => {
    return (
      <div className="bg-[#36393e] h-screen w-screen p-4 flex flex-wrap gap-4">
        {Array.from({ length: 12 }).map((_, index) => (
          <div
            key={index}
            className="bg-[#2f3136] p-4 rounded-lg shadow-lg w-64 max-h-64"
          >
            <h2 className="text-white text-lg font-semibold mb-2 text-center">
              Topic {index + 1}
            </h2>
  
            <ul className="text-gray-300">
              <li>Task 1</li>
              <li>Task 2</li>
              <li>Task 3</li>
              <li>Task 4</li>
            </ul>
          </div>
        ))}
      </div>
    );
  };
  
  export default Task;