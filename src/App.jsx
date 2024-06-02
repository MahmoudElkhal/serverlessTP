import { useEffect, useState } from 'react'
import AddTodoForm from './components/addTodoForm.jsx';
import axios from 'axios';


function App() {
  const [todos, setTodos] = useState([]);
  const backendURL = 'https://nctv5e5ggb.execute-api.us-east-1.amazonaws.com';

  useEffect(() => {
    const fetchTodos = async () => {
      const response = await axios.get(`${backendURL}/getAllTodo`);
      setTodos(response.data);
    };

    fetchTodos();
  }, []);

  const addTodo = async (title) => {
    const response = await axios.post(`${backendURL}/addToDo`, { title });
    setTodos((prev) => [...prev, response.data]);
  };

  const deleteTodo = async (id) => {
    await axios.delete(`${backendURL}/deleteTodo`, { data: { itemId: id } });
    setTodos((prev) => prev.filter((todo) => todo.itemId !== id));
  };

  const completeTodo = async (id) => {
    const response = await axios.put(`${backendURL}/updateTodoTask`, { itemId: id, isComplete: true });
    console.log(response);
    setTodos((prev) =>{
      return prev.map((todo) => (todo.itemId === id ? { ...todo, IsComplete: response.data.isComplete } : todo))
    });
  };

  return (
    <div >
      <h1 >ToDo App</h1>
      <AddTodoForm onAdd={addTodo} />

      <ul className="mt-4">
        {todos.map((todo) => (
          <li
            key={todo.itemId}
          >
            <span
            >
              {todo.Title}
            </span>
            <div>
              {!todo.IsComplete && (
                <button
                  onClick={() => completeTodo(todo.itemId)}
                >
                  Complete
                </button>
              )}
              <button
                onClick={() => deleteTodo(todo.itemId)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App