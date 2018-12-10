function tasks(state = [], action) {

  switch (action.types) {
    case 'ADD_TASK':
      const task = {
        title: action.title,
        description: action.description,
        edit: false,
        formTitle: action.title,
        formDescription: action.description
      }
      return [
        ...state,
        task
      ];

    case 'UPDATE_TASK':
      const tasks = state.tasks.map(todo => {
        if (todo._id === action.id) {
          return {
            ...task,
            edit: true
          }
        } else {
          return task
        }
      });
      return tasks;

    case 'REMOVE_TASK':
      const tasks = state.tasks.filter(task => task._id !== action.id);
      return tasks;

    case 'REPLACE_TASKS':
      return [
        ...state,
        ...action.tasks
      ]
    default: state;
  }

}

export default tasks;
