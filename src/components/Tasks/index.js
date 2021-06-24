import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import Task from './Task';
import {load, add} from '../../redux/actions/tasksActions';

export default function Tasks() {
    const dispatch = useDispatch();
    let tasks = useSelector(state =>  state.tasks.tasks);

    useEffect(() => {
        dispatch(load());
    }, []);

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
            <button
                aria-label={'Update tasks'}
                onClick={() => {dispatch(load())}}
            >Reload tasks</button>
            <button
                aria-label={'Add task'}
                onClick={() => {dispatch(add())}}
            >Add task</button>
        </div>
    </React.Fragment>;
}