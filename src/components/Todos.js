import styled from "styled-components";
import TodoList from "./TodoList";
import { nanoid } from "nanoid";
import { useState } from "react";

const TodoCard = styled.div`
	display: flex;
	flex-direction: column;
  text-align: center;
`

const TodoCardHeading = styled.div`
  background-color: rgba(29, 194, 35, 0.73);
	color: white;
  margin-bottom: 1em;
`

const AddTodoButton = styled.button`
	font-size: 1.5em;
	width: 20%;
`

const TodoButtonArea = styled.div`
	margin-bottom: 1em;
`

const defaultTodos = [{
	id: nanoid(),
	task: "Pay the bill",
	done: false
}]


export default function Todos() {
	
	const [todos, setTodos] = useState(defaultTodos);
	
	return <TodoCard>
		<TodoCardHeading>
			<h1>Todos</h1>
		</TodoCardHeading>
		
		<TodoButtonArea>
			<AddTodoButton>
				Add New Todo
			</AddTodoButton>
		</TodoButtonArea>
		
		<TodoList todos={todos} />
	</TodoCard>
}

