//Add todo
function addTodo(title, description) {
  return dispatch => {
    return fetch('/api/tasks', {
      method: 'POST',
      body: JSON.stringify({ title, description }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        dispatch({
          type: 'ADD_TASK',
          title,
          description
        })
      })
      .catch(err => console.error(err))
  }
}

//Complete todo
function completeTodo(title, description, completed, id) {
  return dispatch => {
    return fetch(`/api/tasks/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ title, description, completed }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        dispatch({
          type: 'COMPLETE_TASK',
          completed,
          id
        })
      })
      .catch(err => console.error(err))
  }
}

//Update todo
function updateTodo(title, description, id) {
  return dispatch => {
    return fetch(`/api/tasks/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ title, description, completed: false }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        dispatch({
          type: 'UPDATE_TASK',
          title,
          description,
          id
        })
      })
      .catch(err => console.error(err))
  }
}

//Delete todo
function removeTodo(id) {
  return dispatch => {
    return fetch(`/api/tasks/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        dispatch({
          type: 'REMOVE_TASK',
          id
        })
      })
      .catch(err => console.error(err))
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
        console.log(newData)
        dispatch({
          type: 'LOAD_TASKS',
          tasks: newData
        })
      })
  }
}
