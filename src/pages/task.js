const Task = () => {
    return (
      <div className="bg-[#36393e] h-screen w-screen p-4 flex flex-wrap gap-4">
        {Array.from({ length: 12 }).map((_, index) => (
          <div
            key={index}
            className="bg-[#2f3136] p-4 rounded-lg shadow-lg w-64 max-h-64"
          >
            <h2 className="text-white text-lg font-semibold mb-2 text-center">
              Temat {index + 1}
            </h2>
  
            <ul className="text-gray-300">
              <li>Zadanie 1</li>
              <li>Zadanie 2</li>
              <li>Zadanie 3</li>
              <li>Zadanie 4</li>
            </ul>
          </div>
        ))}
      </div>
    );
  };
  
  export default Task;