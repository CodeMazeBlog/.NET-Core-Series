import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {

  public notFoundText: string = `404 SORRY COULDN'T FIND IT!!!`

  constructor() { }

  ngOnInit() {
  }
}