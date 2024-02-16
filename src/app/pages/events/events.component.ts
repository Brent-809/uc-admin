import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { colDef } from '@bhplugin/ng-datatable';
import { EventsApiService } from 'src/app/services/events-api.service';
import { Events } from 'src/app/shared/interfaces/events.interface';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
})
export class EventsComponent implements OnInit {
  events: Events[] = [];
  cols: Array<colDef> = [
    { field: '_id', title: 'ID', isUnique: true },
    { field: 'title', title: 'Title' },
    { field: 'date', title: 'Date' },
    { field: 'location', title: 'Location' },
    { field: 'allowJoin', title: 'Allow Join', type: 'boolean' },
    { field: 'hasTime', title: 'Has Time', type: 'boolean' },
    { field: 'actions', title: 'Actions' },
  ];
  constructor(private apiService: EventsApiService, private router: Router) {}

  ngOnInit(): void {
    this.getAllEvents();
  }

  getAllEvents() {
    this.apiService.getAllEvents().subscribe((response: Events[]) => {
      this.events = response;
    });
  }

  editEvent(id: string) {
    if (id) {
      this.router.navigateByUrl("/event/manage/" + id)
    }
  }
}
