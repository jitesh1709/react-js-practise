import logo from './logo.svg';
import { useState, useRef, useEffect } from 'react';
import './App.css';
import ChildComponent from './Child';
import { MyContext } from './MyContext';
import ChildTwo from './ChildTwo';
import NestedChild from './NestedChild';
import FolderStructure from './FolderStructure';

function App() {
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [])
  const [tasks, setTask] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef(null);

  const fileData = [
    {
      id: 'A1B2C3',
      name: 'SRC',
      children: [
        {
          id: 'D4E5F6',
          name: 'file1.txt',
        },
        {
          id: 'G7H8I9',
          name: 'folder1',
          children: [
            {
              id: 'J1K2L3',
              name: 'folder1-nested',
              children: [
                {
                  id: 'M4N5O6',
                  name: 'folder1',
                  children: [
                    {
                      id: 'P7Q8R9',
                      name: 'text-file.txt',
                    },
                    {
                      id: 'S1T2U3',
                      name: 'new-file.txt',
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'V4W5X6',
      name: 'DEST',
      children: [
        {
          id: 'Y7Z8A9',
          name: 'abc.txt',
        },
        {
          id: 'B1C2D3',
          name: 'def.txt',
        },
      ],
    },
    {
      id: 'E4F5G6',
      name: 'only-file.txt',
    },
    {
      id: 'H7I8J9',
      name: 'log.txt',
    },
    {
      id: 'K1L2M3',
      name: 'EXTRA',
      children: [
        {
          id: 'N4O5P6',
          name: 'extra-file1.txt',
        },
        {
          id: 'Q7R8S9',
          name: 'extra-folder1',
          children: [
            {
              id: 'T1U2V3',
              name: 'nested-extra-file.txt',
            },
          ],
        },
      ],
    },
  ];

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

  const updateTask = (index) => {
    const updatedTasks = tasks.map((task, i) => index === i ? { ...task, status: task.status === 'not-done' ? 'done' : 'not-done' } : task);
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
      <MyContext.Provider value={{ updateTaskFromChild }}>
        <ChildComponent />
      </MyContext.Provider>
      <div className='nested-child-container'>
        <ChildTwo>
          <NestedChild></NestedChild>
        </ChildTwo>
      </div>
      <FolderStructure data={fileData}/>
    </div>
  );
}

export default App;
