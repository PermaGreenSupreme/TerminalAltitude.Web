let azure = require('azure-sb');

module.exports = (request, handler) => {
    
    let serviceBusService = azure.createServiceBusService('Endpoint=sb://terminal-altitude.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=OznA34wKNaH0vm4n37XYdf9T+2EPC1AYNprzNhYpwIU=');

    let rule={
        deleteDefault: function(){
            serviceBusService.deleteRule('ta-mailing-list-response-T',
                'HighMessages',
                azure.Constants.ServiceBusConstants.DEFAULT_RULE_NAME,
                rule.handleError);
        },
        create: function(){
            let ruleOptions = {
                sqlExpressionFilter: 'messagenumber > 1'
            };
            rule.deleteDefault();
            serviceBusService.createRule('ta-mailing-list-response-T',
                'HighMessages',
                'HighMessageFilter',
                ruleOptions,
                rule.handleError);
        },
        handleError: function(error){
            if(error){
                console.log('HighMessages rule error', error)
            }
        }
    };
    
    let topicOptions = {
        MaxSizeInMegabytes: '1024',
        // DefaultMessageTimeToLive: 'PT1M'
    };

    serviceBusService.createTopicIfNotExists('ta-mailing-list-response-T', topicOptions, (error) => {
        if(!error){
            // topic was created or exists
            // console.log('ta-mailing-list-response-T created/exists');
        } else {
            // topic already exists;
            // console.log('ta-mailing-list-response-T topic already exists');
        }
    });

    serviceBusService.createSubscription('ta-mailing-list-response-T','AllMessages',(error) => {
        if(!error){
            // subscription created
            // console.log('AllMessages subscription created');

            rule.create();
        } else{
            // message entity already exists
            // console.log('AllMessages subscription creation error', error);
        }
    });

    serviceBusService.receiveQueueMessage('ta-mailing-list-response-Q', { isPeekLock: true }, (error, receivedMessage) => {
        if(!error){
            // Message received and deleted
            console.log('ta-mailing-list-response-Q SUCCESS', receivedMessage);

            serviceBusService.deleteMessage(receivedMessage, function (deleteError){
                if(!deleteError){
                    // Message deleted
                    console.log('queue message has been deleted');
                }
            });
        } else {
            console.warn('ta-mailing-list-response-Q ERROR', error);
        }
    });

    serviceBusService.receiveSubscriptionMessage('ta-mailing-list-response-T', 'AllMessages', { isPeekLock: true }, (error, receivedMessage) => {
        if(!error){
            // Message received and deleted
            console.log('ta-mailing-list-response-T SUCCESS', receivedMessage);

            serviceBusService.deleteMessage(receivedMessage, function (deleteError){
                if(!deleteError){
                    // Message deleted
                    console.log('topic message has been deleted');
                }
            });
        } else {
            console.log('ta-mailing-list-response-T ERROR', error);
        }
    });

    return 'service bus connected';

    /*const user = request.params.user ?
    encodeURIComponent(request.params.user) :
    'stranger';

    return `Hello ${user}!`;*/
};