import { Component, OnInit } from '@angular/core';
import { Post } from '../../model/post';
import { CompaniesService } from '../../services/companies.service';
import { NgForm, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxInvalidFormComponent } from 'src/app/public/register/dialog-box-invalid-form/dialog-box-invalid-form.component';

@Component({
  selector: 'app-make-post',
  templateUrl: './make-post.component.html',
  styleUrls: ['./make-post.component.css']
})
export class MakePostComponent implements OnInit {
  post: Post;
  postForm! : FormGroup;
  constructor(private service: CompaniesService,public dialog: MatDialog, private formBuilder: FormBuilder,) {
    this.post = {} as Post;

    this.postForm = this.formBuilder.group({
      title: new FormControl('', [Validators.required]),
      imageUrl: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
    });
   }

  ngOnInit(): void {
 
  }
  eventAddPost(){
    this.post.id = 0;
    this.post.title = this.postForm.get('title')?.value;
    this.post.imageUrl = this.postForm.get('imageUrl')?.value;
    this.post.description = this.postForm.get('description')?.value;
    this.service.AddPost(this.post).subscribe((response) => {
        console.log(response);
      }
    );
  }

  onSubmit(){
    if(this.postForm.valid){
      this.eventAddPost();
      this.dialog.open(DialogBoxInvalidFormComponent, { 
        data: {message: 'You added a post successfully!'},
      });
    }
    else{
      this.dialog.open(DialogBoxInvalidFormComponent, { 
        data: {message: 'Please complete all the fields'},
      });
    }
  }
  get title() { return this.postForm.get('title'); }
  get imageUrl() { return this.postForm.get('imageUrl'); }
  get description() { return this.postForm.get('description'); }
}
