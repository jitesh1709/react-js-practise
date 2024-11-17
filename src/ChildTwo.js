import React from 'react';
import './ChildTwo.css'

function ChildTwo({children}) {
    return (
        <div className='child-two'>
            <h2>This is Child two component</h2>
            {children}
        </div>
    )
}

export default ChildTwo