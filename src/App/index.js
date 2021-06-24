import React from 'react';

export default class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            errors: [],
            notifications: [],
            tasks: [],
        };

        this.loadTasks = this.loadTasks.bind(this);
    }

    componentDidMount() {
        this.loadTasks();
        this.checkNotificationPermissions();
    }

    render() {
        let {errors, notifications, tasks} = this.state;

        return <React.Fragment>
            <h1>PWA test</h1>
            <div id="message-wrapper">
                {notifications.map((message, index) => {
                    return <div className={'message'} key={index}>{message}</div>;
                })}
            </div>
            <div id="error-wrapper">
                {errors.map((error, index) => {
                    return <div className={'error'} key={index}>{error}</div>;
                })}
            </div>
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
                            return <tr key={task.id}>
                                <td>{task.id}</td>
                                <td>{task.name}</td>
                                <td>{task.deadline}</td>
                                <td>{task.status}</td>
                            </tr>;
                        })}
                    </tbody>
                </table>
            </div>
            <div id="buttons-wrapper">
                <button onClick={this.loadTasks}>Обновить задачи</button>
            </div>
        </React.Fragment>;
    }

    loadTasks() {
        fetch('/data/tasks.json').then(
            response => {
                return response.json().then(
                    json => {
                        this.setState({tasks: json.tasks});
                        this.showNotificationAboutNotViewedTasks(json.tasks);
                        return json;
                    }
                );
            },
            error => {
                this.setState({errors: [...this.state.errors, error]});
            }
        );
    }

    checkNotificationPermissions() {
        if (!('Notification' in window)) {
            console.error('This browser does not support desktop notification');
            return;
        }
        if (Notification.permission === 'granted') {
            return;
        }
        if (Notification.permission === 'denied') {
            return;
        }

        Notification.requestPermission().catch(
            error => {
                console.error('request notification permission error', error);
            }
        );
    }

    showNotification(notificationText, options = {}) {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.ready.then(function(registration) {
                registration.showNotification(notificationText, options);
            });
        }
        this.setState({notifications: [...this.state.notifications, notificationText]});
    }

    showNotificationAboutNotViewedTasks(tasks) {
        tasks.every(task => {
            if (task.viewed) return true;
            this.showNotification('New task "' + task.name + '".');
            return true;
        });
    }
}