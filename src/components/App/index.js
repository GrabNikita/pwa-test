import React from 'react';

import TasksList from '../TasksList';
import Notifications from '../Notifications';

export default function App() {
    return <React.Fragment>
        <h1>PWA test</h1>
        <Notifications />
        <TasksList />
    </React.Fragment>;
}