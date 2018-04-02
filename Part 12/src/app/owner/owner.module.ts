import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
 
import { OwnerListComponent } from './owner-list/owner-list.component';
import { OwnerDetailsComponent } from './owner-details/owner-details.component';
import { OwnersaccountsComponent } from './owner-details/ownersaccounts/ownersaccounts.component';
 
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      { path: 'list', component: OwnerListComponent },
      { path: 'details/:id', component: OwnerDetailsComponent }
    ])
  ],
  declarations: [
    OwnerListComponent,
    OwnerDetailsComponent,
    OwnersaccountsComponent
  ]
})
export class OwnerModule { }