import { Account } from './../../../_interfaces/account.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-ownersaccounts',
  templateUrl: './ownersaccounts.component.html',
  styleUrls: ['./ownersaccounts.component.css']
})
export class OwnersaccountsComponent implements OnInit {

  constructor() { }

  @Input() public accounts: Account[] = [];

  ngOnInit() {
  }
  
}
