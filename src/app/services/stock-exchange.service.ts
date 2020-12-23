import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { StockExchange } from "../components/manage-stock-exchange/stock-exchange";

@Injectable({
  providedIn: "root",
})
export class StockExchangeService {
  constructor(private httpClient: HttpClient) {}

  addStockExchange(
    stockExchangeRequestPayload: StockExchange
  ): Observable<any> {
    return this.httpClient.post<any>(
      "http://localhost:8083/smc/stockExchange/add",
      stockExchangeRequestPayload
    );
  }

  getStockExchangeById(id: number): Observable<any> {
    return this.httpClient.get(
      "http://localhost:8083/smc/stockExchange/findById/" + id
    );
  }

  // updateStockExchange(id: number, stockExchange: any) {
  //   return this.httpClient.put('http://localhost:8083/smc/stockExchange/update/'+id, stockExchange);
  // }

  getStockExchangeList(): Observable<any> {
    return this.httpClient.get("http://localhost:8083/smc/stockExchange/all");
  }
}
