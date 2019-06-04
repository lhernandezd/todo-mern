const initialState = [];

const tasksReducer = (state = initialState, action) => {
  let tasks;
  switch (action.type) {
    case 'ADD_TASK':
      const task = {
        ...action.payload
      }
      return [
        ...state,
        task
      ];
    case 'UPDATE_TASK':
      tasks = state.map(task => {
        if (task._id === action.payload._id) {
          return {
            ...action.payload
          }
        } else {
          return task
        }
      });
      return tasks;
    case 'REMOVE_TASK':
      tasks = state.filter(task => task._id !== action.payload);
      return tasks;
    case 'LOAD_TASKS':
      return [
        ...state,
        ...action.tasks
      ]
    default:
      return state;
  }
};

export default tasksReducer;
