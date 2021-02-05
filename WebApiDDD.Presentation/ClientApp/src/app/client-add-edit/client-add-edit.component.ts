import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ClientService } from '../services/client.service';
import { Client } from '../models/client';

@Component({
  selector: 'app-client-add-edit',
  templateUrl: './client-add-edit.component.html',
  styleUrls: ['./client-add-edit.component.scss']
})
export class ClientAddEditComponent implements OnInit {
  form: FormGroup;
  actionType: string;
  formNome: string;
  formSobrenome: string;
  formEmail: string;
  id: number;
  errorMessage: any;
  existingClient: Client;

  constructor(private clientService: ClientService, private formBuilder: FormBuilder, private avRoute: ActivatedRoute, private router: Router) {
    const idParam = 'id';
    this.actionType = 'Add';
    this.formNome = 'nome';
    this.formSobrenome = 'sobrenome';
    this.formEmail = 'email';

    if (this.avRoute.snapshot.params[idParam])
    {
      this.id = this.avRoute.snapshot.params[idParam];
    }

    this.form = this.formBuilder.group(
      {
        id: 0,
        nome: ['', [Validators.required]],
        sobrenome: ['', [Validators.required]],
        email: ['', [Validators.required]],
      }
    )
  }

  ngOnInit()
  {
    if (this.id > 0)
    {
      this.actionType = 'Edit';
      this.clientService.getClient(this.id)
        .subscribe(data => (
          this.existingClient = data,
          this.form.controls[this.formNome].setValue(data.nome),
          this.form.controls[this.formSobrenome].setValue(data.sobrenome),
          this.form.controls[this.formEmail].setValue(data.email)
        ));
    }
  }

  save()
  {
    if (!this.form.valid)
    {
      return;
    }

    if (this.actionType === 'Add')
    {
      let client: Client =
      {
        dataCadastro: new Date(),
        nome: this.form.get(this.formNome).value,
        sobrenome: this.form.get(this.formSobrenome).value,
        email: this.form.get(this.formEmail).value,
        ativo: true
      };

      this.clientService.saveClient(client)
        .subscribe((data) =>
        {
          this.router.navigate(['/Clientes', data.id]);
        });
    }

    if (this.actionType === 'Edit')
    {
      let client: Client =
      {
        id: this.existingClient.id,
        dataCadastro: this.existingClient.dataCadastro,
        ativo: this.existingClient.ativo,
        nome: this.form.get(this.formNome).value,
        sobrenome: this.form.get(this.formSobrenome).value,
        email: this.form.get(this.formEmail).value
      };

      this.clientService.updateClient(client)
        .subscribe((data) =>
        {
          this.router.navigate([this.router.url]);
        });
    }
  }

  cancel() {
    this.router.navigate(['/']);
  }

  get nome() { return this.form.get(this.formNome); }
  get sobrenome() { return this.form.get(this.formSobrenome); }
  get email() { return this.form.get(this.formEmail); }
}
