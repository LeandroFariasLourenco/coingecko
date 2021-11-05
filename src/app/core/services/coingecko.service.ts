import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICoinList, IPing, ITrendingCoin } from '../models';
import { IExchange } from '../models/IExchange';

@Injectable({
  providedIn: 'root'
})
export class CoingeckoService {
  private serviceUrl = 'https://api.coingecko.com/api/v3/';

  constructor(private httpClient: HttpClient) { }

  ping(): Observable<IPing> {
    return this.httpClient.get<IPing>(`${this.serviceUrl}ping`);
  }

  getCoinsList(): Observable<ICoinList[]> {
    return this.httpClient.get<ICoinList[]>(`${this.serviceUrl}coins/list`);
  }

  getTrendingCoins(): Observable<{ coins: ITrendingCoin[] }> {
    return this.httpClient.get<{ coins: ITrendingCoin[] }>(`${this.serviceUrl}search/trending`);
  }

  getExchanges(perPage = 10): Observable<IExchange[]> {
    return this.httpClient.get<IExchange[]>(`${this.serviceUrl}exchanges?per_page=${perPage}`);
  }
}
