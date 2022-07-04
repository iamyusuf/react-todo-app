import styled from "styled-components";
import TodoList from "./TodoList";
import { nanoid } from "nanoid";
import { useMemo, useReducer, useState } from "react";
import { pluralize } from "../lib/helpers";
import { TODO_ACTIONS } from "./todosConstant";
import { todosReducer } from "./todosService";

const TodoCard = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
`

const TodoCardHeading = styled.div`
  background-color: #af2f2f;
  color: white;
  margin-bottom: 1em;
`;

const AddTodoButton = styled.button`
  background-color: #af2f2f;
  font-size: 1.5em;
  width: 20%;
  cursor: pointer;
`;

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

export default function Todos() {
	
	const [todos, dispatch] = useReducer(todosReducer, defaultTodos);
	const [todoText, setTodoText] = useState('');
	const [editId, setEditId] = useState(null);
	
	const dueTodosCount = useMemo(
		() => todos.filter(todo => !todo.done).length,
		[todos]
	);
	
	const handleClickAddTodo = () => {
		if(!todoText) {
			return
		}
		
		
		if(!!editId) {
			dispatch({
				type: TODO_ACTIONS.UPDATE_TODO, todo: {
					task: todoText,
					id: editId
				}
			})
			
			setEditId(null);
			setTodoText('')
			return;
		}
		
		const todo = {
			id: nanoid(),
			task: todoText,
			done: false
		}
		
		dispatch({type: TODO_ACTIONS.ADD_NEW_TODO, todo})
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
				{editId ? "Update todo" : "Add New Todo"}
			</AddTodoButton>
		</TodoForm>
		
		<TodoList
			handleEdit={id => {
				setEditId(id);
				const todoText = todos.find(todo => todo.id === id)?.task;
				setTodoText(todoText);
			}}
			handleDelete={id => dispatch({type: TODO_ACTIONS.DELETE_TODO, id})}
			handleDone={index => dispatch({type: TODO_ACTIONS.MARK_AS_DONE, index})}
			todos={todos}
		/>
	</TodoCard>
}

