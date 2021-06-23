window.addEventListener('load', function () {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./service-worker.js').catch(error => {
            console.error('register service worker error', error);
        });
    }
});