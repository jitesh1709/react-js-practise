import { useState } from 'react'

function FolderStructure({ data }) {
	const [expandedNodes, setExpandedNodes] = useState({});
	const [editableNodes, setEditableNode] = useState({});

	const handleToggle = (id = '') => {
		setExpandedNodes((prevState) => {
			return { ...prevState, [id]: !prevState[id] }
		})
	}

	const handleEdit = (id = '') => {
		setEditableNode((prevState) => {
			return {
				...prevState, [id]: {
					value: prevState[id]?.value,
					isInEditMode: !prevState[id]?.isInEditMode
				}
			}
		})
	}

	const handleEditValue = (id, value) => {
		setEditableNode((prevState) => {
			return {
				...prevState, [id]: {
					value,
					isInEditMode: prevState[id].isInEditMode
				}
			}
		})
	}

	const handleKeyDown = (id = '', event) => {
		if (event.key === 'Enter') {
			handleEdit(id);
		}
	};

	const renderTree = (nodes, level = 0) => {
		return nodes.map((node) => (
			<div key={node.id} style={{ marginLeft: level * 20, marginBottom: 5, marginTop: 5 }}>
				{
					node.children ?
						(<label onClick={(event) => handleToggle(node.id)}>{expandedNodes[node.id] ? <>📂</> : <>📁</>}{node.name}</label>) :
						(
							editableNodes[node.id]?.isInEditMode ? (
								<>
									<span onClick={(event) => handleEdit(node.id)}>✔️</span>
									<input type="text" onKeyDown={(event) => handleKeyDown(node.id, event)} value={editableNodes[node.id]?.value || node.name} onChange={(event) => handleEditValue(node.id, event.target.value)} />
								</>
							) : (
								<>
									<span onClick={(event) => handleEdit(node.id)}>✏️</span>
									<label>📄{editableNodes[node.id]?.value || node.name}</label>
								</>
							)
						)
				}
				{(expandedNodes[node.id] && node.children) && <div>{renderTree(node.children, level + 1)}</div>}
			</div>
		));
	};

	return (
		<div>
			<h3>File Structure</h3>
			<div>{renderTree(data)}</div>
		</div>
	);
}

export default FolderStructure