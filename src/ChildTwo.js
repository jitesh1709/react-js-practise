import React from 'react';


function ChildTwo({props}) {
    return (
        <>
            <h2>This is Child two component</h2>
            <div>{JSON.stringify(props)}</div>
        </>
    )
}

export default ChildTwo