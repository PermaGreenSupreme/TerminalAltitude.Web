import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';

import {
    HttpClient,
} from '@angular/common/http';

@Injectable()
export class TypeFormService {
    idx = 0;
    serviceBusClient: any;
    
    constructor(public httpClient: HttpClient) {
                
    }
    
    initServiceBus(){

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