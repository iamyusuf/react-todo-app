import PropTypes from 'prop-types';
import styled from "styled-components";

const TodoItem = styled.div`
	border-bottom: 1px dashed black;
	font-size: 1.6em;
  text-decoration: ${props => props.done ? 'line-through' : ''};
  color: ${props => props.done ? '#9e9e9e' : '#000'};
	padding: 1em;
`

const TodoTask = styled.span`
	padding-right: 1em;
`

const TodoActions = styled.span`

`

export default function TodoList({ todos, handleDone, handleDelete }) {
	if (!todos.length) {
		return <h1>You don't have any todos left!</h1>
	}
	
	return (
		<div>
			{
				todos.map((todo, index) => (
					<TodoItem done={todo.done} key={todo.id}>
						<TodoTask>
							{todo.task}
						</TodoTask>
						
						<TodoActions>
							<button onClick={() => handleDone(index)}>{todo.done ? 'Undone' : 'Done'}</button> {" "}
							<button>Edit</button> {" "}
							<button onClick={() => handleDelete(todo.id)}>Delete</button>
						</TodoActions>
					</TodoItem>
				))
			}
		</div>
	)
}

TodoList.propTypes = {
	todos: PropTypes.array.isRequired,
	handleDone: PropTypes.func.isRequired,
	handleDelete: PropTypes.func.isRequired
};