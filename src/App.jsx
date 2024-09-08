import { Filter, Menu } from "lucide-react";
import "./App.css";
import TodoItem from "./TodoItem";
import { useEffect, useState } from "react";
const items = [
  { id: 1, name: "orange", completed: false },
  { id: 2, name: "apple", completed: true },
  { id: 3, name: "banana", completed: false },
  { id: 4, name: "grape", completed: true },
  { id: 5, name: "mango", completed: false },
  { id: 6, name: "pear", completed: true },
  { id: 7, name: "pineapple", completed: false },
];

function App() {
  const [items, setItems] = useState();

  useEffect(() => {
    const storeItems = localStorage.getItem("todoItems");
    if (storeItems) {
      setItems(JSON.parse(storeItems));
    }
  }, []);

  useEffect(() => {
    if (items) localStorage.setItem("todoItems", JSON.stringify(items));
  }, [items]);

  return (
    <div className="w-1/2 container mx-auto my-20">
      <div className="flex justify-between between mb-10">
        <Menu className="red-500" color="black" size={24} />
        <h1>Todo List</h1>
        <Filter className="red-500" color="black" size={24} />
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();

          setItems([...items, { name: e.target[0].value, id: Math.random() }]);
        }}
        className="border-1 mb-4 flex border-black bg-red-500"
      >
        <input
          name="text"
          className="border py-2 flex-1 p-4"
          type="text"
          required
          placeholder="New Item"
        />
        <button className="bg-blue-700 text-gray-200 px-5 py-2">Add</button>
      </form>
      <div className="itemlist">
        {items?.map((item) => {
          return (
            <TodoItem
              key={item.id}
              text={item.name}
              completed={item.completed}
              onDelete={() => {
                setItems(
                  [...items].filter((itm) => {
                    if (itm.id === item.id) {
                      return false;
                    } else {
                      return true;
                    }
                  })
                );
              }}
              onUpdate={(completed) => {
                setItems(
                  [...items].map((itm) => {
                    if (item.id === itm.id) {
                      itm.completed = completed;
                    }
                    return itm;
                  })
                );
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
