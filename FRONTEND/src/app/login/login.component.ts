import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ClientService } from '../client.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';
  isLoading = false;
  showPassword = false;

  constructor(
    private service: ClientService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  submit(): void {
    const email = (this.email ?? '').trim();
    const password = (this.password ?? '').trim();

    if (!email || !password) {
      this.toastr.warning('Ingresa email y contraseña.');
      return;
    }
    this.email = email;
    this.password = password;
    this.isLoading = true;
    this.service.login({ email, password }).subscribe(
      (res) => {
        const token = res?.token || '';
        if (!token) {
          this.isLoading = false;
          this.toastr.error('No se recibió token.');
          return;
        }
        localStorage.setItem('pc_token', token);
        this.service.getUsuarioActual(token).subscribe(
          () => {
            this.isLoading = false;
            this.router.navigateByUrl('/tasasCambio');
          },
          () => {
            localStorage.removeItem('pc_token');
            this.isLoading = false;
            this.toastr.error('No se pudo validar el usuario actual.');
          }
        );
      },
      () => {
        this.isLoading = false;
        this.toastr.error('Credenciales incorrectas.');
      }
    );
  }
}
