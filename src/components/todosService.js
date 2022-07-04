export function todosReducer(todos, action) {
	switch(action.type) {
		case TODO_ACTIONS.ADD_NEW_TODO:
			return [...todos, action.todo]
		
		case TODO_ACTIONS.MARK_AS_DONE:
			return todos.map((todo, index) => {
				if(index === action.index) {
					return {
						...todo,
						done: !todo.done
					}
				}
				return todo;
			})
		
		case TODO_ACTIONS.DELETE_TODO:
			return todos.filter(todo => todo.id !== action.id)
		
		case TODO_ACTIONS.UPDATE_TODO:
			const {task, id} = action.todo;
			
			return todos.map(todo => {
				if(todo.id === id) {
					return {
						...todo,
						task
					}
				}
				
				return todo;
			});
		
		default:
			return todos;
	}
}