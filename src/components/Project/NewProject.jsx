import Input from "../Utils/Input.jsx";
import {useRef} from "react";
import Modal from "../Utils/Modal.jsx";

export default function NewProject({addProject, onCancel}) {
  const modal = useRef();
  
  const titleRef = useRef();
  const descriptionRef = useRef();
  const dueDateRef = useRef();
  
  function handleSave() {
    const title = titleRef.current.value;
    const description = descriptionRef.current.value;
    const dueDate = dueDateRef.current.value;
    
    if (title.trim() === '' || description.trim() === '' || dueDate.trim() === '') {
      modal.current.open();
      return;
    }
    
    addProject({
      title, description, dueDate
    })
  }
  
  function handleCancel() {
    onCancel(undefined);
  }
  
  return (<>
    <Modal ref={modal} closeBtnCaption="Close">
      <h2 className="text-xl font-bold text-stone-700 my-4">Invalid data</h2>
      <p className="text-stone-600 mb-4">Oops ... looks like you forgot to enter a value.</p>
      <p className="text-stone-600 mb-4">Please make sure you entered a valid value for every input field.</p>
    </Modal>
    <div className="w-[35rem] mt-16">
      <menu className="flex items-center justify-end gap-4 my-4">
        <li>
          <button onClick={handleCancel} className="text-stone-800 hover:text-stone-950">Cancel</button>
        </li>
        <li>
          <button className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950"
                  onClick={handleSave}>Save
          </button>
        </li>
      </menu>
      <div>
        <Input type="text" label="Title" id="title" ref={titleRef}/>
        <Input label="Description" id="description" ref={descriptionRef} isTextarea/>
        <Input type="date" label="Due date" id="due-date" ref={dueDateRef}/>
      </div>
    </div>
  </>);
}
