import {useState} from "react";

export default function NewTask({onAddTask}) {
  const [enteredTask, setEnteredTask] = useState('');
  
  function handleChange(event) {
    setEnteredTask(event.target.value);
  }
  
  function handleClick() {
    if (!enteredTask.trim()) return;
    onAddTask(enteredTask);
    setEnteredTask('');
  }
  
  return (<div className="flex items-center gap-4">
    <input
      type="text"
      value={enteredTask}
      onChange={handleChange}
      className="w-64 px-2 py-1 rounded-sm bg-stone-200"
    />
    <button
      className="text-color-700 hover:text-color-950"
      onClick={handleClick}
    >
      Add task
    </button>
  </div>);
}
