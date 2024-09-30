import React, { useContext } from 'react';
import { MyContext } from './MyContext';

function Test() {
    const { updateTaskFromChild } = useContext(MyContext);
    const setTaskFromNestedChild = () => {
        updateTaskFromChild({
            task: 'task coming from nested child component',
            status: 'not-done'
        });
    }
    return (
        <>
            <h2>This is the nested child component!!!</h2>
            <button onClick={setTaskFromNestedChild}>Click to send data from nested child component</button>
        </>
    )
}
export default Test