import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { IPost } from 'src/app/types/post.interface';
import { FormGroup } from '@angular/forms';
import { PostsService } from 'src/app/services/posts.service';

@Component({
    selector: 'app-post',
    templateUrl: './post.component.html',
    styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
    @Input() post: IPost;
    // Using Template driven forms in this instance because I think it's useful in this instance
    @ViewChild('postForm') public postForm: FormGroup;
    public isSubmitAttempt: boolean = false;
    constructor(private _postsService: PostsService) { }

    ngOnInit(): void { }

    updatePost(): void {
        if (this.postForm.valid) {
            this._postsService.updatePost(this.post)
        } else {
            this.isSubmitAttempt = true;
        }
    }
}
