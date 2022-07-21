import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { quillModules } from 'app/app-constants';
import { Article, Field, TimelineArticle } from 'app/core/backend/models';
import { ArticlesService, FieldsService } from 'app/core/backend/services';
import { NgxDropzoneChangeEvent } from 'ngx-dropzone';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-create-article-dialog',
  templateUrl: './create-article-dialog.component.html',
  styleUrls: ['./create-article-dialog.component.scss']
})
export class CreateArticleDialogComponent implements OnInit {


  mode: 'NEW' | 'UPDATE' = 'NEW';

  @Output() publish = new EventEmitter<Article>()


  /**
   * Constructor
   */
  constructor(
    private toastr: ToastrService,
    private fieldsService: FieldsService,
    private articleService: ArticlesService,
    @Inject(MAT_DIALOG_DATA) private _data: { article: TimelineArticle },
    private _matDialogRef: MatDialogRef<CreateArticleDialogComponent>
  ) {

  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  selectedField = '';
  filteredOptions: Field[];
  fields: Field[] = [

  ];

  saving = false;
  articleForm = new FormGroup({
    content: new FormControl('', Validators.required),
    field: new FormControl('', Validators.required),
  });


  setForm() {
    this.articleForm.patchValue({
      content: this._data.article.content,
      field: this.fields.find(f => f.fieldId === this._data.article.fieldId),
    });

    if(this._data.article.images){
      if (typeof this._data.article.images === 'object') {
        this._data.article.images.forEach(imgUrl => {
          this.blobUrlToFile(imgUrl).then(file => {
            this.images.push(file);
          })
        });
      } else {
        this.blobUrlToFile(this._data.article.images).then(file => {
          this.images.push(file);
        });
      }
    }
  }

  blobUrlToFile(blobUrl: string): Promise<File> {
    return new Promise((resolve) => {
      fetch('https://' + blobUrl).then((res) => {
        res.blob().then((blob) => {
          // please change the file.extension with something more meaningful
          // or create a utility function to parse from URL
          const ext = blobUrl.match(/\.\w{3,4}($|\?)/gmi);
          const file = new File([blob], `file${ext[0]}`, { type: blob.type });
          resolve(file)
        })
      })
    })
  }

  ngOnInit(): void {
    this.articleForm.disable();
    this.fieldsService.getFields().subscribe((fields) => {
      this.fields = fields;
      this.filteredOptions = this.fields;
      if (this._data && this._data.article) {
        this.mode = 'UPDATE';
        this.setForm();
      }
      this.articleForm.enable();
    })
  }

  filter(e: any) {
    this.filteredOptions = this._filter(e.target.value)
  }


  private _filter(value: string): Field[] {
    const filterValue = value.toLowerCase();
    return this.fields.filter(option => option.fieldName.toLowerCase().includes(filterValue));
  }

  quillModules: any = quillModules;

  onNoClick(): void {
    this._matDialogRef.close();
  }



  displayFn(field: Field): string {
    return field && field.fieldName ? field.fieldName : '';
  }



  // files - images
  images: File[] = [];



  onSelect(event: NgxDropzoneChangeEvent) {
    this.images.push(...event.addedFiles);
    if(event.rejectedFiles && event.rejectedFiles.length){
      this.toastr.error('This image exceeded the max size (1MB)')
    }
  }

  onRemove(event) {
    this.images.splice(this.images.indexOf(event), 1);
  }


  publishPost() {
    if (this.articleForm.valid) {

      this.saving = true;
      this.articleService.postArticle({
        body: {
          Content: this.articleForm.value.content,
          FieldId: this.articleForm.value.field.fieldId,
          PostImage: this.images.length ?  this.images :  'null',
        }
      }).subscribe({
        next: () => {
          this.saving = false;
          this.toastr.success('', 'Article has been published');
          this._matDialogRef.close(true);
        },
        error: (err) => {
          this.saving = false;
          this.toastr.error(err?.error || '', 'Error has been occurred!')
        },
      })
    }
  }
  updatePost() {
    if (this.articleForm.valid) {

      this.saving = true;
      this.articleService.updatePost({
        body: {
          Content: this.articleForm.value.content,
          FieldId: this.articleForm.value.field.fieldId,
          PostImage:  this.images.length?  this.images :  'null',
          postId: this._data.article.id
        }
      }).subscribe({
        next: (data) => {
          this.saving = false;
          this.toastr.success('', 'Article has been updates');
          this._matDialogRef.close(data);
        },
        error: (err) => {
          this.saving = false;
          this.toastr.error(err?.error || '', 'Error has been occurred!')
        },
      })
    }
  }

}
