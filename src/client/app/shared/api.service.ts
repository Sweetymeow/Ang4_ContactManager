import { Injectable } from '@angular/core';
import { Http, Headers, Request, RequestOptions, RequestMethod, Response } from '@angular/http';
import 'rxjs/add/operator/map'; // map emitter values from our HTTP requests
import { environment } from '../../environments/environment'; //

@Injectable()
export class ApiService {

  private baseUrl = environment.apiUrl;

  constructor(private http: Http) { }

  get(url: string){
    return this.request(url, RequestMethod.Get);
  }

  post(url: string, body:Object){
    return this.request(url, RequestMethod.Post, body);
  }

  put(url: string, body:Object){
    return this.request(url, RequestMethod.Put, body);
  }

  delete(url: string){
    return this.request(url, RequestMethod.Delete);
  }

  request(url: string, method: RequestMethod, body?:Object){
    // Create new http request based on Environment and other arguments
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const requestOptions = new RequestOptions({
      method: method,
      url: `${this.baseUrl}/${url}`,
      headers: headers
    }); // url from environment

    if(body){
      requestOptions.body = body; // Body to be used when creating a Request.
    }

    const request = new Request(requestOptions);

    return this.http.request(request)
      .map((res: Response) => res.json());
  }
}
