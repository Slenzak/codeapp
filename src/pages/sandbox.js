import {useState} from "react";
import FileExplorer from './components/fileexplorer';
import CodeEditor from './components/codeeditor';
import { useNavigate } from "react-router-dom";

const Sandbox = () =>{
    const navigate = useNavigate();
    const [files, setFiles] = useState({
        'App.js': `function App() {\n  return <h1>Hello, World!</h1>;\n}`
      });
      const [activeFile, setActiveFile] = useState('App.js');
      const handleCreateFile = (fileName) => {
        setFiles((prevFiles) => ({
          ...prevFiles,
          [fileName]: '',
        }));
        setActiveFile(fileName);
      };
      const handleDeleteFile = (fileName) => {
        if(fileName === 'App.js'){
            alert("You can not delete App.js")
            return 
        }
        setFiles((prevFiles) => {
          const newFiles = { ...prevFiles };
          delete newFiles[fileName];
          return newFiles;
        });
        if (activeFile === fileName) {
          setActiveFile(Object.keys(files)[0]);
        }
      };
      const handleSelectFile = (fileName) => {
        setActiveFile(fileName);
      };
    
      const handleUpdateFileContent = (fileName, content) => {
        setFiles((prevFiles) => ({
          ...prevFiles,
          [fileName]: content,
        }));
      };
      const generateHTML = () => {
        const appCode = files['App.js'] || '';
        
        const cssFiles = Object.entries(files)
        .filter(([name]) => name.endsWith('.css'))
        .map(([name, content]) => `<style>${content}</style>`)
        .join('\n');

        const jsFiles = Object.entries(files)
        .filter(([name]) => name.endsWith('.js'))
        .map(([name, content]) => `
          window.modules = window.modules || {};
          window.modules['./${name}'] = \`
          ${content}
        \`;`)
        .join('\n');
          
        return `
        <!DOCTYPE html>
        <html>
          <head>
            ${cssFiles}
            <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
            <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
            <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
          </head>
          <body>
            <div id="root"></div>
            <script>
              window.modules = window.modules || {};
              ${jsFiles}
    
              function customImport(modulePath) {
                return eval(window.modules[modulePath] || '');
              }
            </script>
            <script type="text/babel">
              ${appCode}
              ReactDOM.createRoot(document.getElementById("root")).render(React.createElement(App));
            </script>
          </body>
        </html>
      `;
      };
      const getLanguageFromExtension = (fileName) => {
        const ext = fileName.split('.').pop();
        const languageMap = {
          js: "javascript",
          css: "css",
          html: "html",
          json: "json",
        };
        return languageMap[ext] || "plaintext";
      };

      return (
    <div className="flex h-screen">
      <FileExplorer
        files={files}
        activeFile={activeFile}
        onSelectFile={handleSelectFile}
        onCreateFile={handleCreateFile}
        onDeleteFile={handleDeleteFile}
      />
      <div className="flex-1 flex flex-col">
        <div className="flex-1 p-2.5">
          <CodeEditor
            value={files[activeFile]}
            onChange={(value) => handleUpdateFileContent(activeFile, value)}
            language={getLanguageFromExtension(activeFile)}
          />
        </div>
        <div className="flex-1 p-2.5 border-t border-gray-300">
          <h3>Live Preview</h3>
          <iframe
            key={Date.now()}
            title="preview"
            srcDoc={generateHTML()}
            className="w-full h-full border border-gray-300"
          />
        </div>
        <button onClick={() => navigate("/")} className="fixed bottom-5 right-5 p-2.5 px-5 bg-blue-600 text-white border-none rounded-md cursor-pointer">
            Return to Main Page
        </button>
      </div>
    </div>
  );

}
export default Sandbox;