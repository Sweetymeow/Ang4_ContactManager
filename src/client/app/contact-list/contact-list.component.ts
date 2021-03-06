import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Contact } from '../shared/contact.model';
import 'rxjs/add/operator/map'; //  parse the response of http request

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.sass']
})
export class ContactListComponent implements OnInit {
  contacts: Contact[];

  constructor(public http: Http) { } //  public

  ngOnInit() {
    this.http.get('/api/contacts')
      .map( (res: Response) => res.json() )
      .subscribe(data => this.contacts = data );
  }

}
