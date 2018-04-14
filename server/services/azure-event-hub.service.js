let EventHubClient = require('azure-event-hubs').Client;

module.exports = (request, handler) => {

    let client = EventHubClient.fromConnectionString('Endpoint=sb://terminal-altitude-hub.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=xxXa04ZMFcMj3daGmeVKLAwjs0O431WFsUe1WsEW8ZU=', 'ta_mailing_list_response_hub');

    /* client.open()
         .then(function() {
             return client.getPartitionIds()
         })
         .then(function(ids) {
             ids.forEach(function(id) { console.log(id); });
         });*/

    client.open()
        .then(function () {
            return client.createReceiver('$Default', '0', { startAfterTime: Date.now() })
        })
        .then(function (rx) {
            rx.on('errorReceived', function (err) {
                console.log(err);
            });
            rx.on('message', function (message) {
                let body         = message.body;
                // See http://azure.github.io/amqpnetlite/articles/azure_sb_eventhubs.html for details on message annotation properties from EH. 
                let enqueuedTime = Date.parse(message.systemProperties['x-opt-enqueued-time']);

                console.log('event message received', body);

                return body;
            });
        });

    return 'event hub connected';

};