window.onload = () => {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./service-worker.js').then(
            response => {
                console.log('success sw register', response);
            },
            error => {
                console.error('error', error);
            }
        );
    }
}