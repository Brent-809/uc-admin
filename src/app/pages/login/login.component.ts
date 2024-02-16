import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { emailValidator } from 'src/app/validators/email.validators';
import { passwordValidator } from 'src/app/validators/password.validator';
import { jwtDecode } from 'jwt-decode';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, emailValidator]],
      password: [null, [Validators.required, passwordValidator]],
    });
  }

  async loginUser() {
    const user = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };

    this.apiService.loginUser(user).subscribe(
      async (response: any) => {
        if (response.token) {
          const decodedToken = jwtDecode(response.token) as any;
          console.log('decodedToken:', decodedToken);

          const userId = decodedToken.userId;
          console.log('userId:', userId);

          if (userId) {
            console.log('Verificatieproces gestart');
            this.apiService.getUserById(userId.toString()).subscribe(
              async (adminStatus: any) => {
                console.log(adminStatus);
                if (adminStatus.isAdmin === true) {
                  console.log('Gebruiker is admin');
                  setTimeout(() => {
                    this.router.navigate(['/']);
                  }, 1500);
                } else {
                  alert('Gebruiker is geen admin');
                  this.apiService.logout();
                }
              },
              async (error) => {
                console.log(
                  'Fout bij het ophalen van de verificatiestatus:',
                  error
                );

                this.apiService.logout();
              }
            );
          } else {
            console.log('Verificatieproces mislukt');
            this.apiService.logout();
          }
        } else {
          console.log('Inloggen mislukt:', response.message);
          this.apiService.logout();
        }
      },
      async (error: HttpErrorResponse) => {
        console.log('Gebruiker is NIET ingelogd!', error);

        if (error.status === 401) {
          alert(
            'Ongeautoriseerd\nOngeldige inloggegevens. Controleer uw gebruikersnaam en wachtwoord.'
          );
        } else if (error.status === 404) {
          alert('Niet gevonden\nDe gevraagde bron is niet gevonden.');
        } else {
          alert(
            'Fout\nEr is een onverwachte fout opgetreden. Probeer het later opnieuw.'
          );
        }
      }
    );
  }
}
