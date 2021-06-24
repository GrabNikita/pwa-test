const initialState = {
    tasks: [],
};
export default function (state = initialState, action) {
    switch (action.type) {
        case 'tasks/add':
            var tasks = [...state.tasks];
            tasks.push(action.payload);
            return {
                ...state,
                tasks: tasks,
            };
        case 'tasks/load':
            var tasks = action.payload;
            return {
                ...state,
                tasks: tasks,
            };
        default:
            return state;
    }
}