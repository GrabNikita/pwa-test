import React from 'react';

export default function Task({task}) {
    return <tr key={task.id}>
        <td>{task.id}</td>
        <td>{task.name}</td>
        <td>{task.deadline}</td>
        <td>{task.status}</td>
    </tr>;
}