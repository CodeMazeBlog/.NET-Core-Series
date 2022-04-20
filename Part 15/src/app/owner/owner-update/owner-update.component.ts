import { Component, OnInit } from '@angular/core';
import { OwnerForUpdate } from './../../_interfaces/ownerForUpdate.model';
import { HttpErrorResponse } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Owner } from './../../_interfaces/owner.model';
import { OwnerRepositoryService } from 'src/app/shared/services/owner-repository.service';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ModalOptions, BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { SuccessModalComponent } from 'src/app/shared/modals/success-modal/success-modal.component';

@Component({
  selector: 'app-owner-update',
  templateUrl: './owner-update.component.html',
  styleUrls: ['./owner-update.component.css']
})
export class OwnerUpdateComponent implements OnInit {
  owner: Owner;
  ownerForm: FormGroup;
  bsModalRef?:BsModalRef;

  constructor(private repository: OwnerRepositoryService, private errorHandler: ErrorHandlerService, 
    private router: Router, private activeRoute: ActivatedRoute, private datePipe: DatePipe,
    private modal: BsModalService) { }

  ngOnInit(): void {
    this.ownerForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      dateOfBirth: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required, Validators.maxLength(100)])
    });

    this.getOwnerById();
  }

  private getOwnerById = () => {
    const ownerId: string = this.activeRoute.snapshot.params['id'];
    const ownerByIdUri: string = `api/owner/${ownerId}`;

    this.repository.getOwner(ownerByIdUri)
    .subscribe({
      next: (own: Owner) => {
        this.owner = { ...own, 
          dateOfBirth: new Date(this.datePipe.transform(own.dateOfBirth, 'MM/dd/yyyy'))
        };
        this.ownerForm.patchValue(this.owner);
      },
      error: (err: HttpErrorResponse) => this.errorHandler.handleError(err)
    })
  }

  validateControl = (controlName: string) => {
    if (this.ownerForm.get(controlName).invalid && this.ownerForm.get(controlName).touched)
      return true;
    
    return false;
  } 

  hasError = (controlName: string, errorName: string) => {
    if (this.ownerForm.get(controlName).hasError(errorName))
      return true;
    
    return false;
  }

  public updateOwner = (ownerFormValue) => {
    if (this.ownerForm.valid)
      this.executeOwnerUpdate(ownerFormValue);
  }

  private executeOwnerUpdate = (ownerFormValue) => {
    const ownerForUpd: OwnerForUpdate = {
      name: ownerFormValue.name,
      dateOfBirth: this.datePipe.transform(ownerFormValue.dateOfBirth, 'yyyy-MM-dd'),
      address: ownerFormValue.address
    }

    const apiUri: string = `api/owner/${this.owner.id}`;

    this.repository.updateOwner(apiUri, ownerForUpd)
    .subscribe({
      next: (_) => {
        const config: ModalOptions = {
          initialState: {
            modalHeaderText: 'Success Message',
            modalBodyText: 'Owner updated successfully',
            okButtonText: 'OK'
          }
        };

        this.bsModalRef = this.modal.show(SuccessModalComponent, config);
        this.bsModalRef.content.redirectOnOk.subscribe(_ => this.redirectToOwnerList());
      },
      error: (err: HttpErrorResponse) => this.errorHandler.handleError(err)
    })
  }

  public redirectToOwnerList = () => {
    this.router.navigate(['/owner/list']);
  }

}
