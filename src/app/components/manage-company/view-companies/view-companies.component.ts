import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CompanyService } from 'src/app/services/company.service';
import { Company } from '../company';

@Component({
  selector: 'app-view-companies',
  templateUrl: './view-companies.component.html',
  styleUrls: ['./view-companies.component.css']
})
export class ViewCompaniesComponent implements OnInit {

  companies: Observable<Company[]>;

  constructor(private companyService: CompanyService, private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.companies = this.companyService.getCompanies();
  }

  updateCompany(name: String) {
    this.router.navigate(['../update', name], {relativeTo: this.route});
  }

  deleteCompany(id: number) {
    this.companyService.deleteCompany(id).subscribe(data => {
      console.log(data);
      // Reload the data
      this.companies = this.companyService.getCompanies();
    }, error => console.log(error)
    );
  }

}
