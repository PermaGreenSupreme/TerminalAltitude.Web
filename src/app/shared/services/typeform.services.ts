import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';

import * as io from 'socket.io-client';

import {
    HttpClient,
} from '@angular/common/http';

@Injectable()
export class TypeFormService {
    idx = 0;
    
    messages: Array<any>;
    messageText: string;
    serviceBusClient: any;
    
    socket: any;
    // socket: SocketIOClient.Socket;
    
    constructor(public httpClient: HttpClient) {
                
    }
    
    initServiceBus(){
        this.socket = io.connect('http://terminal-altitude-api.azurewebsites.net');
        // this.socket = io.connect('http://localhost:3001');
        
        this.socket.emit('name', {
            name: 'Aaron'
        });
        
        this.socket.on('name', (data: any) => {
           console.log('name from server: ', data.name); 
        });
        
        // this.messages = [];
        
        /*this.socket.on('message-received', (msg: any) => {
            this.messages.push(msg);
            console.log(msg);
            console.log(this.messages);
        });*/
        /*this.socket.emit('event1', {
            msg: 'Client to server, can you hear me server?'
        });
        this.socket.on('event2', (data: any) => {
            console.log('event2 received (client)', data.msg);
            this.socket.emit('event3', {
                msg: 'Yes, its working for me!!'
            });
        });
        this.socket.on('event4', (data: any) => {
            console.log('event4 received (client)', data.msg);
        });*/

        /*let baseUrl = 'http://localhost:3001';

        const url = `${baseUrl}/api`;
        
        this.httpClient.get(url, {responseType: 'text'}).subscribe((result) => {
            // console.log('api result', result);
            return result;
        })*/
        
        /*return this.httpClient.post(url, formData)
                   .map(x => x.json())
                   .map((x: any[]) => x
                        // add a new field url to be used in UI later
                            .map(item => Object
                                .assign({}, item, { url: `${this.baseUrl}/images/${item.id}` }))
                   );*/
        
    }

    sendMessage() {
        const message = {
            text: this.messageText
        };
        this.socket.emit('send-message', message);
        // console.log(message.text);
        this.messageText = '';
    }
    
    /*public watchTAFormResponses(): Observable<IBifurcation> {
        const rIterator = Observable.from([]),
        // const rIterator = Observable.range(0, width - 1).delay(1).map(x => (4.0 * x) / width),
              sync = new Subject<any>();
              // sync = new Subject<IBifurcation>();

        let params = new HttpParams().set('test', '123');
        
        rIterator.subscribe(r => {
            // const params = new URLSearchParams();
            // params.set('r', r.toString());
            this.http.get('https://terminal-altitude-api.azurewebsites.net/api/receive-ta-form?code=nxcPdkTLWXz0u4tnLbUEPjqkt/OK1KegXma9qQia1txBzdUVYDWVOQ==&clientId=default', {
                params: params
                // search: params
            }).subscribe(res => {
                if (res){
                    console.log('TA API response', res);
                    sync.next(res);
                } else {
                    console.warn('TA API response error', res);
                }
            });
        });
        return sync.asObservable();
    }*/
}