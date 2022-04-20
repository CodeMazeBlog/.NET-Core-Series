import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-error-modal',
  templateUrl: './error-modal.component.html',
  styleUrls: ['./error-modal.component.css']
})
export class ErrorModalComponent implements OnInit {
  modalHeaderText: string;
  modalBodyText: string;
  okButtonText: string;

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit(): void {
  }

}
