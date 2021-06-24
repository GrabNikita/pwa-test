import { createSlice } from '@reduxjs/toolkit';

export const tasksSlice = createSlice({
    name: 'tasks',
    initialState: {
        tasks: [
            {
                "id": 1,
                "name": "Active task",
                "deadline": "14:04 18.06.2021",
                "status": "active",
                "viewed": true
            },
            {
                "id": 2,
                "name": "New task",
                "deadline": "12:45 01.07.2021",
                "status": "new",
                "viewed": false
            },
            {
                "id": 3,
                "name": "done task",
                "deadline": "12:45 01.07.2021",
                "status": "done",
                "viewed": false
            }
        ],
    },
    reducers: {
        add: (state, action) => {
            state.tasks.push(action.payload);
        },
        remove: (state, action) => {
            state.tasks.every((task, index) => {
                if (task.id === action.payload) {
                    state.tasks.splice(index, 1);
                }
            })
        }
    },
});

export const {add, remove} = tasksSlice.actions;

export default tasksSlice.reducer;