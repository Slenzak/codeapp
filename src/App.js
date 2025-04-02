
import ReactDOM from "react-dom/client"
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import './App.css';
import Mainpage from './pages/mainpage';
import Sandbox from './pages/sandbox';
import Task from "./pages/task";
import TaskDetail from "./pages/taskdetail";
import Login from "./pages/registerlogin"

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Mainpage />}/>
          <Route path="/task" element={<Task />} />
          <Route path="/task/:id" element={<TaskDetail />} />
          <Route path="/sandbox" element={<Sandbox />} />
          <Route path="/login" element={<Login />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
