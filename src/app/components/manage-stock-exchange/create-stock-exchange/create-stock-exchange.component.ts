import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { StockExchangeService } from "src/app/services/stock-exchange.service";
import { StockExchange } from "../stock-exchange";

@Component({
  selector: "app-create-stock-exchange",
  templateUrl: "./create-stock-exchange.component.html",
  styleUrls: ["./create-stock-exchange.component.css"],
})
export class CreateStockExchangeComponent implements OnInit {
  addStockExchangeForm: FormGroup;
  stockExchangeRequestPayload: StockExchange;
  stockExchange: StockExchange = new StockExchange();

  constructor(
    private stockExchangeService: StockExchangeService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.stockExchangeRequestPayload = {
      stockExchangeId: null,
      stockExchangeName: "",
      stockExchangeBrief: "",
      stockExchangeRemarks: "",
      stockExchangeAddress: "",
    };
  }

  ngOnInit(): void {
    this.addStockExchangeForm = new FormGroup({
      stockExchangeName: new FormControl("", [Validators.required]),
      stockExchangeBrief: new FormControl(""),
      stockExchangeRemarks: new FormControl(""),
      stockExchangeAddress: new FormControl(""),
    });
  }

  addStockExchange() {
    this.stockExchangeRequestPayload.stockExchangeName = this.addStockExchangeForm.get(
      "stockExchangeName"
    ).value;
    this.stockExchangeRequestPayload.stockExchangeBrief = this.addStockExchangeForm.get(
      "stockExchangeBrief"
    ).value;
    this.stockExchangeRequestPayload.stockExchangeRemarks = this.addStockExchangeForm.get(
      "stockExchangeRemarks"
    ).value;
    this.stockExchangeRequestPayload.stockExchangeAddress = this.addStockExchangeForm.get(
      "stockExchangeAddress"
    ).value;

    this.stockExchangeService
      .addStockExchange(this.stockExchangeRequestPayload)
      .subscribe((data) => {
        console.log(data);
        this.router.navigate(["../view"], { relativeTo: this.route });
        this.stockExchange = new StockExchange();
      });
  }
}
