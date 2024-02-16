import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

export interface topcard {
  bgcolor: string;
  icon: string;
  title: string | number;
  page: string;
  subtitle: string;
}

@Component({
  selector: 'app-top-cards',
  templateUrl: './top-cards.component.html',
})
export class TopCardsComponent implements OnInit {
  users: number = 0;
  groups: number = 0;
  yetToVerify: number = 0;
  page!: string;
  topcards: topcard[];

  info: any[] = [
    {
      bgcolor: 'warning',
      icon: 'bi bi-people',
      title: 0,
      subtitle: 'Gebruikers',
      page: '/users'
    },
    {
      bgcolor: 'danger',
      icon: 'bi bi-grid',
      title: 0,
      subtitle: 'Groepen',
      page: '/groups'
    },
    {
      bgcolor: 'success',
      icon: 'bi bi-patch-check',
      title: 0,
      subtitle: 'Nog te verifiëren',
      page: '/verify'
    }
  ];

  constructor(private apiService: ApiService) {
    this.topcards = this.info;
  }

  fetchUserCount(): void {
    this.apiService.countUsers().subscribe(
      (response) => {
        console.log(response);
        this.users = response.count;
        this.info[0].title = this.users;
      },
      (error) => {
        console.error('Error fetching user count:', error);
      }
    );
  }

  fetchGroupCount(): void {
    this.apiService.countGroups().subscribe(
      (response) => {
        console.log(response);
        this.groups = response.count;
        this.info[1].title = this.groups;
      },
      (error) => {
        console.error('Error fetching user count:', error);
      }
    );
  }

  fetchYetToVerifyCount(): void {
    this.apiService.countYetToVerify().subscribe(
      (response) => {
        console.log(response);
        this.yetToVerify = response.count;
        this.info[2].title = this.yetToVerify;
      },
      (error) => {
        console.error('Error fetching user count:', error);
      }
    );
  }

  ngOnInit(): void {
    this.fetchUserCount();
    this.fetchGroupCount();
    this.fetchYetToVerifyCount();
  }
}
