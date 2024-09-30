import React, { useContext } from 'react';
import { MyContext } from './MyContext';
import useFetch from './useFetch';
import Test from './Test';

function ChildComponent() {
    const { updateTaskFromChild } = useContext(MyContext);
    const setTaskFromChild = () => {
        updateTaskFromChild({
            task: 'task coming from child component',
            status: 'not-done'
        });
    }
    return (
        <div>
            <Test/>
            <button onClick={setTaskFromChild}>Click here to send the task from child component</button>
        </div>
    )
}

export default ChildComponent