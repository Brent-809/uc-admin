import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss'],
})
export class GroupsComponent implements OnInit {
  groups: any[] = [];
  private deleteGroupSubscription!: Subscription;
  id!: string;

  constructor(private apiService: ApiService, private router: Router) {}

  getGroups() {
    return this.apiService.getGroups();
  }

  ngOnInit(): void {
    this.getGroups().subscribe((response) => {
      this.groups = response;
    });
  }

  deleteGroup(groupId: string) {
    const groupIndex = this.groups.findIndex(group => group._id === groupId);
  
    if (groupIndex !== -1) {
      this.groups.splice(groupIndex, 1);
  
      // Subscribe to the Observable to execute the API call
      this.deleteGroupSubscription = this.apiService.deleteGroup(groupId)
        .subscribe(
          response => {
            console.log('Group deleted successfully.');
          },
          error => {
            console.error('Error deleting the group:', error);
          }
        );
    } else {
      console.warn('Group not found with the given ID.');
    }
  }
  
  ngOnDestroy() {
    if (this.deleteGroupSubscription) {
      this.deleteGroupSubscription.unsubscribe();
    }
  }
  
}
