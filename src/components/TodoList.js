import PropTypes from 'prop-types';
import styled from "styled-components";

const TodoItem = styled.div`
	border-bottom: 1px solid black;
	font-size: 1.6em;
  text-decoration: ${props => props.done ? 'line-through' : ''};
  color: ${props => props.done ? '#9e9e9e' : '#000'};
	padding: 1em;
`

export default function TodoList({ todos, handleDone }) {
	if (!todos.length) {
		return <h1>You don't have any todos left!</h1>
	}
	
	return (
		<div>
			{
				todos.map((todo, index) => (
					<TodoItem done={todo.done} key={todo.id}>
						{todo.task} <button onClick={() => handleDone(index)}>{todo.done ? 'Undone' : 'Done'}</button> {" "} <button>Edit</button>
					</TodoItem>
				))
			}
		</div>
	)
}

TodoList.propTypes = {
	todos: PropTypes.array.isRequired,
	handleDone: PropTypes.func.isRequired
};