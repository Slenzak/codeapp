import React from 'react';
import Editor from '@monaco-editor/react';

const CodeEditor = ({ value, onChange, language}) => {
  return (
    <Editor
      height="50vh"
      defaultLanguage="javascript"
      language={language}
      value={value}
      onChange={onChange}
      
    />
  );
}

export default CodeEditor;