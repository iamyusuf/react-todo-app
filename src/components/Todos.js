import styled from "styled-components";
import TodoList from "./TodoList";
import { nanoid } from "nanoid";
import { useReducer, useState } from "react";
import { pluralize } from "../lib/helpers";

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

const TodoForm = styled.div`
  margin-bottom: 1em;
`

const TodoTaskInput = styled.input`
	font-size: 2em;
`

const defaultTodos = [{
	id: nanoid(),
	task: "Pay the bill",
	done: false
}]

function reducer(state, action) {
	switch(action.type) {
		case 'ADD_NEW_TODO':
			return [...state, action.todo]
			
		case 'UPDATE_TODO':
			// const index = action.payload.index;
			// const todo = action.payload.todo;
			return state
	}
}

export default function Todos() {
	
	const [todos, dispatch] = useReducer(reducer, defaultTodos);
	const [todoText, setTodoText] = useState('');
	
	const unDoneTasks = todos.filter(todo => !todo.done).length;
	
	const handleClickAddTodo = () => {
		if (!todoText) {
			return
		}
		
		const todo = {
			id: nanoid(),
			task: todoText,
			done: false
		}
		
		dispatch({ type: 'ADD_NEW_TODO', todo })
		setTodoText('')
	}
	
	const placeholder = `${unDoneTasks} un-finished ${pluralize(unDoneTasks, 'task', 'tasks')}...`
	
	return <TodoCard>
		<TodoCardHeading>
			<h1>Todos</h1>
		</TodoCardHeading>
		
		<TodoForm>
			
			<TodoForm>
				<TodoTaskInput placeholder={`${placeholder}`} value={todoText} onChange={e => setTodoText(e.target.value)} type="text"/>
			</TodoForm>
			
			<AddTodoButton onClick={handleClickAddTodo}>
				Add New Todo
			</AddTodoButton>
		</TodoForm>
		
		<TodoList todos={todos} />
	</TodoCard>
}

