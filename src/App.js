import Todos from "./components/Todos";
import TodoArchive from "./components/archive/TodoArchive";
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="" exact element={<Todos />} />
      <Route path="archives" exact element={<TodoArchive />} />
    </Routes>
  );
}

export default App;
