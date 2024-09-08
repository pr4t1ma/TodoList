import classNames from "classnames";
import { Ellipsis } from "lucide-react";
import { useState } from "react";

const TodoItem = ({ text, completed, onUpdate }) => {
  const [isComplete, setIsComplete] = useState(completed);
  return (
    <div className="flex gap-4  border border-gray-200 py-2 px-4">
      <input
        onChange={(e) => {
          setIsComplete(e.target.checked);
          onUpdate(e.target.checked);
        }}
        type="checkbox"
        checked={isComplete}
      />
      <p className={classNames("flex-1", isComplete ? "line-through" : "")}>
        {text}
      </p>
      <button>
        <Ellipsis className="red-500" color="black" size={24} />
      </button>
    </div>
  );
};

export default TodoItem;
