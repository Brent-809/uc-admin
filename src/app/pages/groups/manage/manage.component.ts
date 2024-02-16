import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { UploadWidgetConfig, Uploader, UploadWidgetResult } from 'uploader';
type MyUploadWidgetResult = { fileUrl: string };

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss'],
})
export class ManageComponent implements OnInit {
  @ViewChild('uploadDropzone', { static: false }) uploadDropzone: any;

  groupForm: FormGroup;
  uploader: any;
  options: UploadWidgetConfig = {
    multi: true,
  };
  width = '600px';
  height = '375px';

  uploadedImageUrl: string | null = null;
  groups: any[] = [];

  groupId!: string;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private route: ActivatedRoute
  ) {
    this.uploader = Uploader({ apiKey: 'public_12a1yT33i6TGfac5csaUYpbaRXga' });
    this.groupForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      category: ['', [Validators.required]],
      featured: [false],
      image: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.groupId = this.route.snapshot.paramMap.get('id') as string;
    if (this.groupId) {
      this.apiService.getGroupById(this.groupId).subscribe(
        (groupData) => {
          console.log('groupData: ', groupData);
          this.groupForm.patchValue({
            name: groupData.name,
            description: groupData.description,
            category: groupData.category,
            featured: groupData.featured,
          });
          // this.uploadedImageUrl = groupData.image;
          // console.log('image', this.uploadedImageUrl);
          // this.onUpdate(
          //   this.uploadedImageUrl ? [{ fileUrl: this.uploadedImageUrl }] : null
          // );
        },
        (error) => {
          console.error('Error fetching group details:', error);
        }
      );
    } else {
      // this.onUpdate(null);
    }
  }

  // onUpdate = (files: MyUploadWidgetResult[] | null) => {
  //   if (files && files.length > 0) {
  //     this.uploadedImageUrl = files[0].fileUrl;

  //     this.groupForm.get('image')?.setValue(this.uploadedImageUrl);
  //   } else {
  //     this.uploadedImageUrl = null;

  //     this.groupForm.get('image')?.setValue(null);
  //   }
  //   console.log(this.uploadedImageUrl);
  // };

  async onSubmit() {
    if (this.groupForm.invalid) {
      return;
    }

    try {
      const groupId = this.groupId; // Replace this with the actual group ID you want to edit
      const groupData = {
        name: this.groupForm.get('name')?.value,
        description: this.groupForm.get('description')?.value,
        category: this.groupForm.get('category')?.value,
        featured: this.groupForm.get('featured')?.value,
        img: this.groupForm.get('img')?.value,
        // image: this.uploadedImageUrl,
      };

      const updatedGroup = await this.apiService
        .editGroup(groupId, groupData)
        .toPromise();
      console.log('Group updated successfully:', updatedGroup);
      location.reload();
    } catch (error) {
      console.error('Error updating group:', error);
    }
  }
}
