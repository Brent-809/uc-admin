import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventsApiService } from 'src/app/services/events-api.service';

@Component({
  selector: 'app-create',
  standalone: false,
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateEventsComponent implements OnInit {
  @ViewChild('location')
  location!: string;
  CreateEventForm!: FormGroup;
  categories: any[] = [{ name: 'Release' }];

  constructor(private fb: FormBuilder, private api: EventsApiService) {}

  ngOnInit(): void {
    this.CreateEventForm = this.fb.group({
      title: ['', Validators.required],
      category: ['', Validators.required],
      image: ['', Validators.required],
      date: ['', Validators.required],
      description: [''],
      hasTime: [false, Validators.required],
      time: [''],
      location: ['', Validators.required],
      allowJoin: [true, Validators.required],
    });
  }

  onSubmit() {
    const selectedCategory = this.CreateEventForm.get('category')?.value;
    if (selectedCategory) {
      this.CreateEventForm.patchValue({ category: selectedCategory.name });
    }
    if (this.CreateEventForm.valid) {
      this.api.createEvent(this.CreateEventForm.value).subscribe((response) => {
        console.log('Created event succesfully');
      });
    }
  }
}
