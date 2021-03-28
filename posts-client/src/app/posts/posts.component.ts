import { Component, OnInit, OnDestroy } from '@angular/core';
import { PostsService } from '../services/posts.service';
import { BaseComponent } from '../base/base.component';
import * as _ from 'lodash';
import { FormGroup, FormControl } from '@angular/forms';
import { IGroupOptions } from '../types/group-options.type';
import { IPost } from '../types/post.interface';
import { IGroupedPosts } from '../types/grouped-posts.interface';

@Component({
    selector: 'app-posts',
    templateUrl: './posts.component.html',
    styleUrls: ['./posts.component.scss']
})
export class PostsComponent extends BaseComponent implements OnInit, OnDestroy {
    public posts: IGroupedPosts;
    public defaultOption: IGroupOptions = 'author';
    public groupOptions: Array<IGroupOptions> = [];

    public filterForm: FormGroup = new FormGroup({
        filterBy: new FormControl(this.defaultOption)
    });

    constructor(private _postService: PostsService) {
        super();
    }

    ngOnInit(): void {
        this.groupOptions = this._postService.getGroupOptions();
        this.getPosts();
        this.subscribeToFormChanges();
        this.subscribeToPosts();
    }

    getPosts(): void {
        let sub = this._postService.getPosts()
            .subscribe((res: Array<IPost>) => {
                this._postService.setPosts(res);
                this.filterBy(this.groupOptions[0], res);
            });

        this.addSubscriptions(sub);
    }

    subscribeToFormChanges(): void {
        let sub = this.filterForm.controls.filterBy.valueChanges
            .subscribe((selection: IGroupOptions) => {
                this.groupBy(selection);
            });

        this.addSubscriptions(sub);
    }

    subscribeToPosts() {
        let sub = this._postService.posts$.subscribe(x => {
            this.updateGroupedPosts(x);
        });

        this.addSubscriptions(sub);
    }

    /**
     * The base logic behind the sorting and grouping, each sort needs to be passed through here
     * It accepts both the Form selection and the flat Array of posts
     * 
     * @param groupOption 
     * @param posts 
     */
    filterBy(groupOption: IGroupOptions, posts: Array<IPost>): void {
        // Allows me to access an interface's property using a string variable, 
        // Which Typescript doesnt allow for otherwise
        const getKeyValue = <T extends object, U extends keyof T>(obj: T) => (key: U) => obj[key];

        // Get a list of the unique values in the property we are filtering by
        let types = _.uniqBy(posts, groupOption).map((x: any) => x[groupOption]);

        let composedObj: any = new Object();

        // Loop over the types, create an array of posts that are from the same week | author | location
        // assign this array to the object we are composing
        types.forEach((type) => {
            let filteredPosts = posts.filter(post => type === getKeyValue(post)(groupOption));
            Object.assign(composedObj, { [type]: filteredPosts });
        })

        this.posts = composedObj;
    }

    /**
     * Passing the form input to inform what we are grouping by
     * @param formInput 
     */
    groupBy(formInput: IGroupOptions) {
        // Get a fresh instance of the posts from the service
        this.filterBy(formInput, this._postService.posts)
    }

    /**
     * Receiving the posts from our subscription to the Posts$ Observable
     * @param posts 
     */
    updateGroupedPosts(posts: IPost[]): void {
        let formInput = this.filterForm.value.filterBy;
        this.filterBy(formInput, posts)
    }
}
