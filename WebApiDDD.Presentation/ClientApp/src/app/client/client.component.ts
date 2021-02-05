import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ClientService } from '../services/client.service';
import { Client } from '../models/client';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {
  client: Observable<Client>;
  Id: number;

  constructor(private clientService: ClientService, private avRoute: ActivatedRoute) {
    const idParam = 'id';
    if (this.avRoute.snapshot.params[idParam]) {
      this.Id = this.avRoute.snapshot.params[idParam];
    }
  }

  ngOnInit() {
    this.loadClient();
  }

  loadClient() {
    this.client = this.clientService.getClient(this.Id);
  }
}
