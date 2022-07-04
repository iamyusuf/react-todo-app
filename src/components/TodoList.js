import PropTypes from 'prop-types';
import styled from "styled-components";

const TodoItem = styled.div`
	border: 1px solid black;
	font-size: 1.6em;
`

export default function TodoList({ todos }) {
	if (!todos.length) {
		return <h1>You don't have any todos left!</h1>
	}
	
	return (
		<div>
			{
				todos.map(todo => (
					<TodoItem>
						{todo.task}
					</TodoItem>
				))
			}
		</div>
	)
}

TodoList.propTypes = {
	todos: PropTypes.array.isRequired
};