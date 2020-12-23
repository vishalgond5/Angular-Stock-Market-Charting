import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { StockExchangeService } from 'src/app/services/stock-exchange.service';
import { StockExchange } from '../stock-exchange';

@Component({
  selector: 'app-view-stock-exchanges',
  templateUrl: './view-stock-exchanges.component.html',
  styleUrls: ['./view-stock-exchanges.component.css']
})
export class ViewStockExchangesComponent implements OnInit {

  constructor(private stockExchangeService: StockExchangeService) { }

  stockExchanges: Observable<StockExchange[]>;

  ngOnInit(): void {
    this.stockExchanges = this.stockExchangeService.getStockExchangeList();
  }
}
