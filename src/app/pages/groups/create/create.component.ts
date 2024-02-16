import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { Uploader, UploadWidgetConfig, UploadWidgetResult } from 'uploader';
import { Dropbox } from 'dropbox';
``;
import Dropzone, { DropzoneOptions } from 'dropzone'; // Import Dropzone and DropzoneOptions

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {
  uploader = Uploader({ apiKey: 'public_12a1yT33i6TGfac5csaUYpbaRXga' }); // Replace "free" with your API key.
  CreateGroupForm!: FormGroup;
  options: UploadWidgetConfig = {
    multi: false,
  };
  // 'onUpdate' vs 'onComplete' attrs on 'upload-dropzone':
  // - Dropzones are non-terminal by default (they don't have an end
  //   state), so by default we use 'onUpdate' instead of 'onComplete'.
  // - To create a terminal dropzone, use the 'onComplete' attribute
  //   instead and add the 'showFinishButton: true' option.
  onUpdate = (files: UploadWidgetResult[]) => {
    if (files.length > 0) {
      // Assuming the 'fileUrl' property holds the image URL
      const imageUrl = files[0].fileUrl;

      // Update the image control in the form with the obtained URL
      this.CreateGroupForm.get('image')?.setValue(imageUrl);
    }
  };

  width = '600px';
  height = '375px';

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.CreateGroupForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      category: ['', [Validators.required]],
      featured: [false],
      image: [null], // Add the image control with an initial value of null
    });
  }

  async onSubmit() {
    if (this.CreateGroupForm.invalid) {
      return;
    }

    try {
      // Initialize groupData object with name, description, category, and image set to the uploaded image URL
      const groupData = {
        name: this.CreateGroupForm.get('name')?.value,
        description: this.CreateGroupForm.get('description')?.value,
        category: this.CreateGroupForm.get('category')?.value,
        featured: this.CreateGroupForm.get('featured')?.value,
        image: this.CreateGroupForm.get('image')?.value,
      };
      // Call the ApiService to create the group
      const createdGroup = await this.apiService
        .createGroup(groupData)
        .toPromise();

      // Do something with the createdGroup, e.g., show a success message, navigate to the group page, etc.
      console.log('Group created:', createdGroup);
      window.location.reload();
    } catch (error) {
      // Handle any error during image upload or group creation
      console.error('Error creating group:', error);
    }
  }
}
