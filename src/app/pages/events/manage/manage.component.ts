import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EventsApiService } from 'src/app/services/events-api.service';

@Component({
  selector: 'app-manage',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss'],
})
export class EventsManageComponent implements OnInit {
  eventsForm!: FormGroup;

  constructor(
    private apiService: EventsApiService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.eventsForm = fb.group({
      title: [
        '',
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
      ],
      
    });
  }

  ngOnInit(): void {
    this.getEventById();
  }

  getEventById() {
    const eventId = this.activatedRoute.snapshot.paramMap.get('id');

    this.apiService.getEventById(eventId).subscribe((response) => {
      console.log(response);
    });
  }

  onSubmit() {}
}
