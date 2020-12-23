import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";
import { CompanyService } from "src/app/services/company.service";
import { Company } from "../company";

@Component({
  selector: "app-create-company",
  templateUrl: "./create-company.component.html",
  styleUrls: ["./create-company.component.css"],
})
export class CreateCompanyComponent implements OnInit {
  addCompanyForm: FormGroup;
  companyRequestPayload: Company;
  company: Company = new Company();

  constructor(
    private comapnyService: CompanyService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.companyRequestPayload = {
      companyId: null,
      companyName: "",
      description: "",
      ceo: "",
      boardOfDirectors: "",
      turnover: 0,
      sector: "",
      stockExchanges: "",
    };
  }

  ngOnInit(): void {
    this.addCompanyForm = new FormGroup({
      companyName: new FormControl(""),
      description: new FormControl(""),
      ceo: new FormControl(""),
      boardOfDirectors: new FormControl(""),
      turnover: new FormControl(""),
      sector: new FormControl(""),
      stockExchanges: new FormControl(""),
    });
  }

  addCompany() {
    this.companyRequestPayload.companyName = this.addCompanyForm.get(
      "companyName"
    ).value;
    this.companyRequestPayload.description = this.addCompanyForm.get(
      "description"
    ).value;
    this.companyRequestPayload.ceo = this.addCompanyForm.get("ceo").value;
    this.companyRequestPayload.boardOfDirectors = this.addCompanyForm.get(
      "boardOfDirectors"
    ).value;
    this.companyRequestPayload.turnover = this.addCompanyForm.get(
      "turnover"
    ).value;
    this.companyRequestPayload.sector = this.addCompanyForm.get("sector").value;
    this.companyRequestPayload.stockExchanges = this.addCompanyForm.get(
      "stockExchanges"
    ).value;

    this.comapnyService
      .addCompany(this.companyRequestPayload)
      .subscribe((data) => {
        console.log(data);
        //  this.companyRequestPayload.id = data['companyId'];
        this.router.navigate(["../view"], { relativeTo: this.route });
        this.company = new Company();
      });
  }
}
