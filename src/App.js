import logo from './logo.svg';
import { useState, useRef, useEffect } from 'react';
import './App.css';
import ChildComponent from './Child';
import { MyContext } from './MyContext';
import ChildTwo from './ChildTwo';

function App() {
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [])
  const [tasks, setTask] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef(null);

  const addTask = () => {
    if (!inputValue) return;
    const newTask = {
      task: inputValue, done: 'not-done'
    };
    setTask([...[newTask], ...tasks]);
    setInputValue('');
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }

  const updateTaskFromChild = (task) => {
    setTask([...[task], ...tasks]);
  }

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  }

  const handleKeyDown = (event) => {
    if (!event.target.value) return;
    if (event.keyCode === 13) {
      const newTask = {
        task: event.target.value, status: 'not-done'
      };
      setTask([...[newTask], ...tasks]);
      setInputValue('');
    }
  }

  const data = {
    one: 1,
    two: 2
  }

  const updateTask = (index) => {
    const updatedTasks = tasks.map((task, i) => index === i ? {...task, status: task.status === 'not-done' ? 'done' : 'not-done' }: task);
    setTask(updatedTasks);
  }

  return (
    <div className="App">
      <label>Type the task</label>
      <input ref={inputRef} value={inputValue} onChange={handleInputChange} onKeyDown={handleKeyDown} type="text" placeholder="Enter the task here" />
      <button onClick={addTask}>Fill up the task</button>
      <ul>
        {
          tasks.map((task, index) => {
            return <li className={task.status} key={index}><span onClick={() => updateTask(index)}>{task.task}</span></li>
          })
        }
      </ul>
      <MyContext.Provider value={{updateTaskFromChild}}>
        <ChildComponent/>
      </MyContext.Provider>
      <ChildTwo props={data}/>
    </div>
  );
}

export default App;
