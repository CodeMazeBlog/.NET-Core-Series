import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Owner } from './../../_interfaces/owner.model';
import { OwnerRepositoryService } from './../../shared/services/owner-repository.service';
import { ErrorHandlerService } from './../../shared/services/error-handler.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-owner-list',
  templateUrl: './owner-list.component.html',
  styleUrls: ['./owner-list.component.css']
})
export class OwnerListComponent implements OnInit {
  owners: Owner[];
  errorMessage: string = '';

  constructor(private repository: OwnerRepositoryService, private errorHandler: ErrorHandlerService,
    private router: Router) { }

  ngOnInit(): void {
    this.getAllOwners();
  }

  private getAllOwners = () => {
    const apiAddress: string = 'api/owner';
    this.repository.getOwners(apiAddress)
    .subscribe({
      next: (own: Owner[]) => this.owners = own,
      error: (err: HttpErrorResponse) => {
          this.errorHandler.handleError(err);
          this.errorMessage = this.errorHandler.errorMessage;
      }
    })
  }

  public getOwnerDetails = (id) => { 
    const detailsUrl: string = `/owner/details/${id}`; 
    this.router.navigate([detailsUrl]); 
  }

}
