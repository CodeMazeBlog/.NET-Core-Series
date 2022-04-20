import { HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandlerService } from './../../shared/services/error-handler.service';
import { OwnerRepositoryService } from './../../shared/services/owner-repository.service';
import { Owner } from './../../_interfaces/owner.model';
import { Component, OnInit } from '@angular/core';
import { BsModalRef, ModalOptions, BsModalService } from 'ngx-bootstrap/modal';
import { SuccessModalComponent } from 'src/app/shared/modals/success-modal/success-modal.component';

@Component({
  selector: 'app-owner-delete',
  templateUrl: './owner-delete.component.html',
  styleUrls: ['./owner-delete.component.css']
})
export class OwnerDeleteComponent implements OnInit {
  owner: Owner;
  bsModalRef?: BsModalRef;

  constructor(private repository: OwnerRepositoryService, private errorHandler: ErrorHandlerService,
    private router: Router, private activeRoute: ActivatedRoute, private modal: BsModalService) { }

  ngOnInit(): void {
    this.getOwnerById();
  }

  private getOwnerById = () => {
    const ownerId: string = this.activeRoute.snapshot.params['id'];
    const apiUri: string = `api/owner/${ownerId}`;

    this.repository.getOwner(apiUri)
    .subscribe({
      next: (own: Owner) => this.owner = own,
      error: (err: HttpErrorResponse) => this.errorHandler.handleError(err)
    })
  }

  deleteOwner = () => {
    const deleteUri: string = `api/owner/${this.owner.id}`;

    this.repository.deleteOwner(deleteUri)
    .subscribe({
      next: (_) => {
        const config: ModalOptions = {
          initialState: {
            modalHeaderText: 'Success Message',
            modalBodyText: `Owner deleted successfully`,
            okButtonText: 'OK'
          }
        };

        this.bsModalRef = this.modal.show(SuccessModalComponent, config);
        this.bsModalRef.content.redirectOnOk.subscribe(_ => this.redirectToOwnerList());
      },
      error: (err: HttpErrorResponse) => this.errorHandler.handleError(err)
    })
  }

  redirectToOwnerList = () => {
    this.router.navigate(['/owner/list']);
  }

}
