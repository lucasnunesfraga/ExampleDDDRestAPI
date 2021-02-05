import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ClientService } from '../services/client.service';
import { Client } from '../models/client';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {
  clients$: Observable<Client[]>;

  constructor(private clientService: ClientService) {
  }

  ngOnInit() {
    this.loadClients();
  }

  loadClients() {
    this.clients$ = this.clientService.getClients();
  }

  delete(Id) {
    const ans = confirm('Do you want to delete cliente with id: ' + Id);
    if (ans) {
      this.clientService.deleteClient(Id).subscribe((data) => {
        this.loadClients();
      });
    }
  }
}