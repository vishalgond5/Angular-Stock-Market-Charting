import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CompanyService } from 'src/app/services/company.service';
import { Company } from '../manage-company/company';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  searchText: string;
  searchForm: FormGroup;
  company: Company = new Company();
  dataLoaded: boolean = false;

  constructor(private companyService: CompanyService) { 
    this.searchForm = new FormGroup({
      search: new FormControl('')
    })
  }

  ngOnInit(): void {
  }

  search() {
    console.log(this.searchText);
    this.companyService.getCompanyByName(this.searchText).subscribe(data => {
      console.log(data);
      this.company = data;
      this.dataLoaded = true;
    })
  }

}
