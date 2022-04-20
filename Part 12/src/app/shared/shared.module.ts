import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalModule } from 'ngx-bootstrap/modal';

import { ErrorModalComponent } from './modals/error-modal/error-modal.component';
import { SuccessModalComponent } from './modals/success-modal/success-modal.component';
import { AppendDirective } from './directives/append.directive';

@NgModule({
  declarations: [
    ErrorModalComponent,
    SuccessModalComponent,
    AppendDirective
  ],
  imports: [
    CommonModule,
    ModalModule.forRoot()
  ], 
  exports: [
    ErrorModalComponent,
    SuccessModalComponent,
    AppendDirective
  ]
})
export class SharedModule { }
