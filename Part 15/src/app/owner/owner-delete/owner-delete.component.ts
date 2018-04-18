import { Component, OnInit } from '@angular/core';
import { ErrorHandlerService } from 'app/shared/services/error-handler.service';
import { RepositoryService } from 'app/shared/services/repository.service';
import { Owner } from './../../_interfaces/owner.model';
import { Router, ActivatedRoute } from '@angular/router';
 
@Component({
  selector: 'app-owner-delete',
  templateUrl: './owner-delete.component.html',
  styleUrls: ['./owner-delete.component.css']
})
export class OwnerDeleteComponent implements OnInit {
  public errorMessage: string = '';
  public owner: Owner;
 
constructor(private repository: RepositoryService, private errorHandler: ErrorHandlerService, private router: Router,
  private activeRoute: ActivatedRoute) { }
 
  ngOnInit() {
    this.getOwnerById();
  }
   
  private getOwnerById() {
    let ownerId: string = this.activeRoute.snapshot.params['id'];
    let ownerByIdUrl: string = `api/owner/${ownerId}`;
   
    this.repository.getData(ownerByIdUrl)
      .subscribe(res => {
        this.owner = res as Owner;
      },
      (error) => {
        this.errorHandler.handleError(error);
        this.errorMessage = this.errorHandler.errorMessage;
      })
  }
   
  public redirectToOwnerList() {
    this.router.navigate(['/owner/list']);
  }

  public deleteOwner() {
    let deleteUrl: string = `api/owner/${this.owner.id}`;
    this.repository.delete(deleteUrl)
      .subscribe(res => {
        $('#successModal').modal();
      },
      (error) => {
        this.errorHandler.handleError(error);
        this.errorMessage = this.errorHandler.errorMessage;
      })
  }
}
