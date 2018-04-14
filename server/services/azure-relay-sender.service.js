module.exports = () => {
    
    const WebSocket = require('hyco-ws');
    const readline = require('readline')
        .createInterface({
            input: process.stdin,
            output: process.stdout
        });

    const ns = 'terminal-altitude-relay.servicebus.windows.net';
    const path = 'ta_mailing_list_response';
    const keyrule = 'RootManageSharedAccessKey';
    const key = '+noff9wQJ65C1RC+tlsdTLWmBJzZgSHjvRXRIm9xrHQ=';

    WebSocket.relayedConnect(
        WebSocket.createRelaySendUri(ns, path),
        WebSocket.createRelayToken('http://'+ns, keyrule, key),
        function (wss) {
            readline.on('line', (input) => {
                wss.send(input, null);
            });

            console.log('Started client interval.');
            wss.on('close', function () {
                console.log('stopping client interval');
                process.exit();
            });
        }
    );
    
    return 'relay sender connected';
};