import React from 'react';
import Editor from '@monaco-editor/react';

const CodeEditor = ({ value, onChange }) => {
  return (
    <Editor
      height="50vh"
      defaultLanguage="javascript"
      value={value}
      onChange={onChange}
    />
  );
};

export default CodeEditor;