import { Account } from './../../_interfaces/account.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Owner } from './../../_interfaces/owner.model';
import { Router, ActivatedRoute } from '@angular/router';
import { OwnerRepositoryService } from './../../shared/services/owner-repository.service';
import { ErrorHandlerService } from './../../shared/services/error-handler.service';

@Component({
  selector: 'app-owner-details',
  templateUrl: './owner-details.component.html',
  styleUrls: ['./owner-details.component.css']
})
export class OwnerDetailsComponent implements OnInit {
  owner: Owner;
  errorMessage: string = '';

  constructor(private repository: OwnerRepositoryService, private router: Router, 
              private activeRoute: ActivatedRoute, private errorHandler: ErrorHandlerService) { }

  ngOnInit() {
    this.getOwnerDetails()
  }

  getOwnerDetails = () => {
    const id: string = this.activeRoute.snapshot.params['id'];
    const apiUrl: string = `api/owner/${id}/account`;

    this.repository.getOwner(apiUrl)
    .subscribe({
      next: (own: Owner) => this.owner = own,
      error: (err: HttpErrorResponse) => {
        this.errorHandler.handleError(err);
        this.errorMessage = this.errorHandler.errorMessage;
      }
    })
  }

  printToConsole= (param: Account) => {
    console.log('Account parameter from the child component', param)
  }

}