import styled from "styled-components";
import TodoList from "./TodoList";
import TodoCard from "./todos/TodoCard";
import AddTodoButton from "./todos/AddTodoButton";
import TodoCardHeading from "./todos/TodoCardHeading";
import TodoForm from "./todos/TodoForm";
import TodoTaskInput from "./todos/TodoTaskInput";
import { nanoid } from "nanoid";
import { useEffect, useMemo, useReducer, useRef, useState } from "react";
import { pluralize } from "../lib/helpers";
import { TODO_ACTIONS } from "./todosConstant";
import { todosReducer } from "./todosService";

const defaultTodos = [{
	id: nanoid(),
	task: "Pay the bill",
	done: false
}]

export default function Todos() {
	
	const [todos, dispatch] = useReducer(todosReducer, defaultTodos);
	const [todoText, setTodoText] = useState('');
	const [editId, setEditId] = useState(null);
  const todoInputRef = useRef();
	
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

  useEffect(() => {
    const todoText = todos.find((todo) => todo.id === editId)?.task;
    setTodoText(todoText ?? '');
    todoInputRef.current.focus();
  }, [editId, todos])
	
	const placeholder = dueTodosCount === 0 ? 'All tasks are done!' : `${dueTodosCount} un-finished ${pluralize(dueTodosCount, 'task', 'tasks')}...`
	
	return (
    <TodoCard>
      <TodoCardHeading>
        <h1>Todos</h1>
      </TodoCardHeading>

      <TodoForm>
        <TodoForm>
          <TodoTaskInput
            ref={todoInputRef}
            placeholder={placeholder}
            value={todoText}
            onChange={(e) => setTodoText(e.target.value)}
            type="text"
          />
        </TodoForm>

        <AddTodoButton onClick={handleClickAddTodo}>
          {editId ? "Update todo" : "Add New Todo"}
        </AddTodoButton>
      </TodoForm>

      <TodoList
        handleEdit={setEditId}
        handleDelete={(id) => dispatch({ type: TODO_ACTIONS.DELETE_TODO, id })}
        handleDone={(index) =>
          dispatch({ type: TODO_ACTIONS.MARK_AS_DONE, index })
        }
        todos={todos}
      />
    </TodoCard>
  );
}

