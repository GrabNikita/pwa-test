import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Task from './Task';
import {add} from '../../redux/reducers/tasksSlice';

export default function TasksList() {
    const tasks = useSelector(state => state.tasks.tasks);
    const dispatch = useDispatch();

    return <React.Fragment>
        <div id="tasks-wrapper">
            <table>
                <thead>
                <tr>
                    <td>Id</td>
                    <td>Name</td>
                    <td>Deadline</td>
                    <td>Status</td>
                </tr>
                </thead>
                <tbody>
                {tasks.map(task => {
                    return <Task task={task} key={task.id} />;
                })}
                </tbody>
            </table>
        </div>
        <div id="buttons-wrapper">
            <button>Обновить задачи</button>
            <button
                aria-label="Add task"
                    onClick={() => {dispatch(add({
                        "id": tasks.length + 1,
                        "name": "Added task",
                        "deadline": "14:04 18.06.2021",
                        "status": "active",
                        "viewed": false
                    }))}}
            >Добавить задачу</button>
        </div>
    </React.Fragment>;
}