module.exports = () => {

    const WebSocket = require('hyco-ws');
    
    let ns = 'terminal-altitude-relay.servicebus.windows.net',
        path = 'ta_mailing_list_response',
        keyrule = 'RootManageSharedAccessKey',
        key = '+noff9wQJ65C1RC+tlsdTLWmBJzZgSHjvRXRIm9xrHQ=';

    let wss = WebSocket.createRelayedServer(
        {
            server: WebSocket.createRelayListenUri(ns, path),
            token : WebSocket.createRelayToken('http://' + ns, keyrule, key)
        },
        function (ws) {
            console.log('connection accepted');
            ws.onmessage = function (event) {
                console.log(event.data);
            };
            ws.on('close', function () {
                console.log('connection closed');
            });
        });

    console.log('listening');

    wss.on('error', (err) => {
        console.log('error: ' + err);
    });
    
    return 'relay receiver connected';
};