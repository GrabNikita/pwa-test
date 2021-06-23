function initApp() {
    checkNotificationPermissions();
    loadTasks();
}

function checkNotificationPermissions() {
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

function showNotification(notificationText, options = {}) {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.ready.then(function(registration) {
            registration.showNotification(notificationText, options);
        });
    }
    addMessage(notificationText);
}

function loadTasks() {
    fetch('/data/tasks.json').then(
        response => {
            return response.json().then(
                json => {
                    updateTasksView(json.tasks);
                    showNotificationAboutNotViewedTasks(json.tasks);
                    return json;
                }
            );
        },
        error => {
            addError(error);
        }
    );
}

function updateTasksView(tasks) {
    let tasksWrapper = document.querySelector('#tasks-wrapper');
    if (!tasksWrapper instanceof Node) {
        addError('Not found place for display tasks.');
        return;
    }
    let tasksHtml = '<table>' +
        '<thead>' +
            '<tr>' +
                '<td>Id</td>' +
                '<td>Name</td>' +
                '<td>Deadline</td>' +
                '<td>Status</td>' +
            '</tr>'
        '</thead>' +
    '<tbody>';

    tasks.every(task => {
        tasksHtml += '<tr>' +
            '<td>' + task.id + '</td>' +
            '<td>' + task.name + '</td>' +
            '<td>' + task.deadline + '</td>' +
            '<td>' + task.status + '</td>' +
        '</tr>';
        return true;
    });

    tasksHtml += '</tbody></table>';

    tasksWrapper.innerHTML = tasksHtml;
}

function showNotificationAboutNotViewedTasks(tasks) {
    tasks.every(task => {
        if (task.viewed) return true;
        showNotification('New task "' + task.name + '".');
        return true;
    });
}

function addError(error) {
    let errorWrapper = document.querySelector('#error-wrapper');
    if (!errorWrapper instanceof Node) return;
    errorWrapper.innerHTML += '<div class="error">' + error + '</div>';
}

function addMessage(message) {
    let messageWrapper = document.querySelector('#message-wrapper');
    if (!messageWrapper instanceof Node) return;
    messageWrapper.innerHTML += '<div class="message">' + message + '</div>';
}