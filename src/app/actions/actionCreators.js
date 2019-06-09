//Add todo
export function addTodo(title, description) {
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
          payload: data.dt
        })
      })
      .catch(err => console.error(err))
  };
};

//Update todo
export function updateTodo(task, id) {
  return dispatch => {
    return fetch(`/api/tasks/${id}`, {
      method: 'PUT',
      body: JSON.stringify(task),
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
          payload: data.dt
        })
      })
      .catch(err => console.error(err))
  };
};

//Delete todo
export function removeTodo(id) {
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
          payload: id
        })
      })
      .catch(err => console.error(err))
  };
};

//Load data
export function loadTodos() {
  return async (dispatch) => {
    await fetch('/api/tasks')
      .then(res => res.json())
      .then(data => {
        const newData = data.map(item => {
          return {
            ...item
          }
        });
        dispatch({ type: 'LOAD_TASKS', tasks: newData })
        console.log(newData)
      })
      .catch(err => console.error(err))
  };
};

//Load data by completed
export function loadDataByCompleted(bool) {
  return async (dispatch) => {
    await fetch(`/api/tasks/query/?completed=${bool}`)
      .then(res => res.json())
      .then(data => {
        const newData = data.map(item => {
          return {
            ...item
          }
        });
        dispatch({ type: 'LOAD_TASKS', tasks: newData })
        console.log(newData)
      })
      .catch(err => console.error(err))
  };
};
