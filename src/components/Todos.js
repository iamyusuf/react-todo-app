import styled from "styled-components";
import TodoList from "./TodoList";
import { nanoid } from "nanoid";
import { useMemo, useReducer, useState } from "react";
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
		
		case 'MARK_AS_DONE':
			return state.map((todo, index) => {
				if(index === action.index) {
					return {
						...todo,
						done: !todo.done
					}
				}
				return todo;
			})
		
		case 'DELETE_TODO':
			return state.filter(todo => todo.id !== action.id)
		
		case 'UPDATE_TODO':
			// const index = action.payload.index;
			// const todo = action.payload.todo;
			return state
	}
}

export default function Todos() {
	
	const [todos, dispatch] = useReducer(reducer, defaultTodos);
	const [todoText, setTodoText] = useState('');
	
	const dueTodosCount = useMemo(
		() => todos.filter(todo => !todo.done).length,
		[todos]
	);
	
	const handleClickAddTodo = () => {
		if(!todoText) {
			return
		}
		
		const todo = {
			id: nanoid(),
			task: todoText,
			done: false
		}
		
		dispatch({type: 'ADD_NEW_TODO', todo})
		setTodoText('')
	}
	
	const placeholder = dueTodosCount === 0 ? 'All tasks are done!' : `${dueTodosCount} un-finished ${pluralize(dueTodosCount, 'task', 'tasks')}...`
	
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
		
		<TodoList handleDelete={id => dispatch({type: 'DELETE_TODO', id})} handleDone={index => dispatch({type: 'MARK_AS_DONE', index})} todos={todos}/>
	</TodoCard>
}

