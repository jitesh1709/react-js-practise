import React, { useContext } from 'react';
import { MyContext } from './MyContext';
import useFetch from './useFetch';

function ChildComponent() {
    const { updateTaskFromChild } = useContext(MyContext);
    const setTaskFromChild = () => {
        updateTaskFromChild({
            task: 'task coming from child component',
            status: 'not-done'
        });
    }
    return (
        <>
            <button onClick={setTaskFromChild}>Click here to send the task from child component</button>
        </>
    )
}

export default ChildComponent