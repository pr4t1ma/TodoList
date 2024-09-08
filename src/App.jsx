import { Filter, Menu } from "lucide-react";
import "./App.css";
import TodoItem from "./TodoItem";
import { useEffect, useState } from "react";

function App() {
  const [items, setItems] = useState();
  const [newItem, setNewItem] = useState("");
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
    <div className="max-w-screen-sm container mx-auto my-10 px-4">
      <div className="flex justify-between between mb-10">
        <Menu className="red-500" color="white" size={24} />
        <h1>Todo List</h1>
        <Filter className="red-500" color="white" size={24} />
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setItems([...items, { name: e.target[0].value, id: Math.random() }]);
          setNewItem("");
        }}
        className="border-1 mb-4 flex border-black bg-red-500"
      >
        <input
          name="text"
          className="border py-2 flex-1 p-4"
          type="text"
          required
          placeholder="New Item"
          onChange={(e) => setNewItem(e.target.value)}
          value={newItem}
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
