import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { INewsResponse } from '../models/INewsResponse';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private serviceUrl = 'https://free-news.p.rapidapi.com/v1/search';
  private auth = {
    'x-rapidapi-host': 'free-news.p.rapidapi.com',
    'x-rapidapi-key': '6bee2226a3msh1b46eeca00e0f7ep1b9c63jsn3b1da8d62b52'
  };

  constructor(
    private httpClient: HttpClient
  ) { }

  getCryptoNews(): Observable<INewsResponse> {
    return this.httpClient.get<INewsResponse>(`${this.serviceUrl}`, {
      params: {
        q: 'crypto',
        lang: 'en',
      },
      headers: {
        ...this.auth
      }
    });
  }
}
