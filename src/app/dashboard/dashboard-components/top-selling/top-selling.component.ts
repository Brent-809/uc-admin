import { Component, OnInit } from '@angular/core';
import { TopSelling } from './top-selling-data';
import { ApiService } from 'src/app/services/api.service';

export interface Product {
  image: string;
  uname: string;
  gmail: string;
  verified: boolean;
  userName: string;
  age: number;
  _id: string;
}

@Component({
  selector: 'app-top-selling',
  templateUrl: './top-selling.component.html',
})
export class TopSellingComponent implements OnInit {
  users: any[] = [];
  email!: string;
  name!: string;
  verified!: boolean;
  userName!: string;
  age!: number;

  topSelling: Product[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    this.apiService.getAllUsers().subscribe((response) => {
      console.log(response);
      if (response && response.length > 0) {
        this.users = response;
        this.topSelling = this.users.map((user) => ({
          image: 'assets/images/users/user2.jpg',
          uname: user.name,
          gmail: user.email,
          userName: user.username,
          verified: user.verified,
          age: user.age,
          _id: user._id
        }));
        console.log(this.users);
      }
    });
  }
}
