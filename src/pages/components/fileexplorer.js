import React, { useState } from 'react';

const FileExplorer = ({ files, activeFile, onSelectFile, onCreateFile, onDeleteFile }) => {
  const [newFileName, setNewFileName] = useState('');
  const [error, setError] = useState('');

  const handleCreateFile = () => {
    setError('');
    const validExtensions = ['.js', '.html', '.css', '.jsx', '.json'];
    const hasValidExtension = validExtensions.some((ext) => newFileName.endsWith(ext));

    if (!hasValidExtension) {
      setError('File must have a valid extension (.js, .html, .css, .jsx, .json).');
      return;
    }
    if (files[newFileName]) {
      setError('A file with this name already exists.');
      return;
    }
    onCreateFile(newFileName);
    setNewFileName('');
  };

  return (
    <div className="w-[200px] border-r border-gray-300 p-2.5">
      <div>
        <input
          type="text"
          placeholder="New file name"
          value={newFileName}
          onChange={(e) => setNewFileName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setNewFileName(e.target.value);
              handleCreateFile();
            }
          }
          }
        />
        <button onClick={handleCreateFile}>Create</button>
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <ul className="list-none p-0">
        {Object.keys(files).map((fileName) => (
          <li
            key={fileName}
            className={`p-1.5 cursor-pointer ${fileName === activeFile ? 'bg-gray-300' : 'bg-transparent'}`}
            onClick={() => onSelectFile(fileName)}
          >
            {fileName}
            <button
              className="ml-10 bg-red-600 text-white rounded"
              onClick={(e) => {
                e.stopPropagation();
                onDeleteFile(fileName);
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FileExplorer;