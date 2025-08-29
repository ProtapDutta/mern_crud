import { useEffect, useState } from "react";
import { MdOutlineDone } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { MdModeEditOutline } from "react-icons/md";
import { FaTrash } from "react-icons/fa6";
import axios from "axios";

const TodoDashboard = ({ user }) => {
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editingTodo, setEditingTodo] = useState(null);
  const [editedText, setEditedText] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTodos = async () => {
    try {
      const response = await axios.get("/api/todos");
      setTodos(response.data);
      setLoading(false);
    } catch (error) {
      console.log("Error fetching todos:", error);
      setError("Failed to fetch todos.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;
    try {
      const response = await axios.post("/api/todos", { text: newTodo });
      setTodos([...todos, response.data]);
      setNewTodo("");
    } catch (error) {
      console.log("Error adding todo:", error);
      setError("Failed to add todo.");
    }
  };

  const startEditing = (todo) => {
    setEditingTodo(todo._id);
    setEditedText(todo.text);
  };

  const saveEdit = async (id) => {
    try {
      const response = await axios.patch(`/api/todos/${id}`, {
        text: editedText,
      });
      setTodos(todos.map((todo) => (todo._id === id ? response.data : todo)));
      setEditingTodo(null);
    } catch (error) {
      console.log("Error updating todo:", error);
      setError("Failed to update todo.");
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`/api/todos/${id}`);
      setTodos(todos.filter((todo) => todo._id !== id));
    } catch (error) {
      console.log("Error deleting todo:", error);
      setError("Failed to delete todo.");
    }
  };

  const toggleTodo = async (id) => {
    try {
      const todo = todos.find((t) => t._id === id);
      const response = await axios.patch(`/api/todos/${id}`, {
        completed: !todo.completed,
      });
      setTodos(todos.map((t) => (t._id === id ? response.data : t)));
    } catch (error) {
      console.log("Error toggling todo:", error);
      setError("Failed to toggle todo status.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-600 text-lg">Loading tasks...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 md:p-8 h-full">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          {user.username}'s Tasks
        </h1>

        <form
          onSubmit={addTodo}
          className="flex items-center gap-2 shadow-sm border border-gray-200 p-2 rounded-lg"
        >
          <input
            className="flex-1 outline-none px-3 py-2 text-gray-700 placeholder-gray-400"
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="What needs to be done?"
            required
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md font-medium cursor-pointer flex-shrink-0"
          >
            Add Task
          </button>
        </form>
        <div className="mt-4">
          {todos.length === 0 ? (
            <div className="text-center text-gray-500 mt-8">
              <p>No tasks yet. Add one above!</p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {todos.map((todo) => (
                <div
                  key={todo._id}
                  className="bg-gray-50 p-4 rounded-lg shadow-sm flex items-center justify-between"
                >
                  {editingTodo === todo._id ? (
                    <div className="flex items-center gap-x-3 w-full">
                      <input
                        className="flex-1 p-2 border rounded-md border-gray-200 outline-none focus:ring-2 focus:ring-blue-300 text-gray-700"
                        type="text"
                        value={editedText}
                        onChange={(e) => setEditedText(e.target.value)}
                      />
                      <div className="flex flex-row gap-x-2">
                        <button
                          onClick={() => saveEdit(todo._id)}
                          className="p-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
                        >
                          <MdOutlineDone />
                        </button>
                        <button
                          className="p-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
                          onClick={() => setEditingTodo(null)}
                        >
                          <IoClose />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-x-4 overflow-hidden flex-1">
                        <button
                          onClick={() => toggleTodo(todo._id)}
                          className={`flex-shrink-0 h-6 w-6 border rounded-full flex items-center justify-center transition-colors ${
                            todo.completed
                              ? "bg-green-500 border-green-500 text-white"
                              : "border-gray-300 hover:border-blue-400"
                          }`}
                        >
                          {todo.completed && <MdOutlineDone />}
                        </button>
                        <span
                          className={`text-gray-800 break-words font-medium ${
                            todo.completed ? "line-through text-gray-500" : ""
                          }`}
                        >
                          {todo.text}
                        </span>
                      </div>
                      <div className="flex gap-x-2 flex-shrink-0">
                        <button
                          className="p-2 text-blue-500 hover:text-blue-700 rounded-lg hover:bg-blue-50 transition-colors"
                          onClick={() => startEditing(todo)}
                        >
                          <MdModeEditOutline />
                        </button>
                        <button
                          onClick={() => deleteTodo(todo._id)}
                          className="p-2 text-red-500 hover:text-red-700 rounded-lg hover:bg-red-50 transition-colors"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoDashboard;