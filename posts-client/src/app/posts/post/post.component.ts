import { Component, OnInit, Input } from '@angular/core';
import { IPost } from 'src/app/types/post.interface';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { PostsService } from 'src/app/services/posts.service';

@Component({
    selector: 'app-post',
    templateUrl: './post.component.html',
    styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
    @Input() post: IPost;
    public postForm: FormGroup;
    public isSubmitAttempt: boolean = false;
    constructor(private _fb: FormBuilder, private _postsService: PostsService) { }

    ngOnInit(): void {
        this.postForm = this._fb.group({
            id: this.post.id,
            author: new FormControl(this.post.author, { validators: [Validators.required] }),
            text: new FormControl(this.post.text, { validators: [Validators.required] }),
            location: new FormControl(this.post.location, { validators: [Validators.required] }),
            time: this.post.time,
            week: this.post.week
        })
    }

    updatePost(): void {
        if(this.postForm.valid) {
            this._postsService.updatePost(this.post)
        } else {
            this.isSubmitAttempt = true;
        }
    }
}
