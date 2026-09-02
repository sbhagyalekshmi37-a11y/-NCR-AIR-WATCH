self.addEventListener("install", event => {
    console.log("NCR AIR WATCH Service Worker installed");
    self.skipWaiting();
});

self.addEventListener("activate", event => {
    console.log("NCR AIR WATCH Service Worker activated");
    event.waitUntil(
        self.clients.claim()
    );
});

self.addEventListener("push", event => {

    let data = {
        title: "NCR AIR WATCH 🚨",
        body: "Air quality conditions have changed in NCR."
    };

    if (event.data) {
        try {
            data = event.data.json();
        } catch (error) {
            data.body = event.data.text();
        }
    }

    event.waitUntil(
        self.registration.showNotification(
            data.title,
            {
                body: data.body,
                icon: "/-NCR-AIR-WATCH/icon.png",
                badge: "/-NCR-AIR-WATCH/icon.png",
                tag: "ncr-air-alert",
                renotify: true
            }
        )
    );

});

self.addEventListener("notificationclick", event => {

    event.notification.close();

    event.waitUntil(
        clients.matchAll({
            type: "window",
            includeUncontrolled: true
        }).then(clientList => {

            for (const client of clientList) {

                if ("focus" in client) {
                    return client.focus();
                }

            }

            if (clients.openWindow) {
                return clients.openWindow(
                    "./index.html"
                );
            }

        })
    );

});
