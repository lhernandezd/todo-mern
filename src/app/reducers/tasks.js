function tasks(state = [], action) {

  switch (action.types) {
    case 'ADD_TASK':
      const task = {
        title: action.title,
        description: action.description,
        completed: false
      }
      return [
        ...state,
        task
      ];

    case 'COMPLETE_TODO':
      const tasks = state.tasks.map(task => {
        if (task._id === action.id) {
          return {
            ...task,
            completed: !action.completed
          }
        } else {
          return task
        }
      });

    case 'UPDATE_TASK':
      const tasks = state.tasks.map(task => {
        if (task._id === action.id) {
          return {
            ...task,
            title: action.title,
            description: action.description,
            //edit: false
          }
        } else {
          return task
        }
      });
      return tasks;


    case 'REMOVE_TASK':
      const tasks = state.tasks.filter(task => task._id !== action.id);
      return tasks;

    case 'LOAD_TASKS':
      return [
        ...state,
        ...action.tasks
      ]
    default: state;
  }

}

export default tasks;
