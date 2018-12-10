//Add todo
function addTodo(title, description) {
  return {
    type: 'ADD_TASK',
    title,
    description
  }
}

//Update todo
function updateTodo(id) {
  return {
    type: 'UPDATE_TASK',
    id
  }
}

//Delete todo
function removeTodo(id) {
  return {
    type: 'REMOVE_TASK',
    id
  }
}

//Replace data

function loadTasks() {
  return dispatch => {
    return fetch('/api/tasks')
      .then(res => res.json())
      .then(data => {
        const newData = data.map(item => {
          return {
            ...item,
            edit: false,
            formTitle: item.title,
            formDescription: item.description
          }
        });

        dispatch({
          type: 'REPLACE_TASKS',
          tasks: newData
        })
      })
  }
}
