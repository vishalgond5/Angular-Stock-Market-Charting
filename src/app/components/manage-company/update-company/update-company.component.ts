import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { CompanyService } from "src/app/services/company.service";
import { Company } from "../company";

@Component({
  selector: "app-update-company",
  templateUrl: "./update-company.component.html",
  styleUrls: ["./update-company.component.css"],
})
export class UpdateCompanyComponent implements OnInit {
  name: String;
  company: Company;
  updateCompanyForm: FormGroup;

  constructor(
    private companyService: CompanyService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.company = new Company();

    this.name = this.route.snapshot.params["name"];
    //console.log(this.name);

    this.companyService.getCompanyByName(this.name).subscribe(
      (data) => {
        console.log(data);
        this.company = data;
        console.log("ID = " + this.company.companyId);
      },
      (error) => console.log(error)
    );

    this.updateCompanyForm = new FormGroup({
      companyName: new FormControl(""),
      description: new FormControl(""),
      ceo: new FormControl(""),
      boardOfDirectors: new FormControl(""),
      turnover: new FormControl(""),
      sector: new FormControl(""),
      stockExchanges: new FormControl(""),
    });
  }

  updateCompany() {
    this.companyService
      .updateCompany(this.company.companyId, this.company)
      .subscribe(
        (data) => {
          console.log(data);
          this.company = new Company();
          this.router.navigate(["../view"], { relativeTo: this.route });
        },
        (error) => console.log(error)
      );

    console.log("update worked");
  }
}
