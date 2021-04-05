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
        this.setupSubscriptions();
    }

    /**
     * The base logic behind the sorting and grouping, each sort needs to be passed through here
     * It accepts both the Form selection and the flat Array of posts
     * 
     * @param groupOption 
     * @param posts 
     */
    groupPosts(groupOption: IGroupOptions, posts: Array<IPost>): void {
        let groupTypes: Array<string> = this.getUniqueGroupingProperties(posts, groupOption);
        this.posts = this.getGroupedPosts(groupOption, groupTypes, posts);
    }

    /**
     * 
     * @param posts An instance of posts from the server
     * @param groupOption The option the user would like to group by as per the form input
     * @returns An array of strings of unique values to group posts by. "Sydney" if groupOption is location, 14 if groupOption is week
     */
    getUniqueGroupingProperties(posts: Array<IPost>, groupOption: IGroupOptions): Array<string> {
        return <Array<string>>_.uniqBy(posts, groupOption).map((x: IPost) => x[groupOption]);
    }

    /**
     * 
     * @param formInput The form input, typically of type 'author' | 'location' | 'week'
     */
    groupBy(formInput: IGroupOptions): void {
        // Get a fresh instance of the posts from the service
        this.groupPosts(formInput, this._postService.posts)
    }

    /**
     * 
     * @param posts Receiving the posts from our subscription to the Posts$ Observable
     */
    updateGroupedPosts(posts: Array<IPost>): void {
        let groupOption: IGroupOptions = this.filterForm.value.filterBy;
        this.groupPosts(groupOption, posts)
    }

    /**
     * 
     * @param groupOption The form input, typically of type 'author' | 'location' | 'week'
     * @param groupTypes The unique values we will group posts by, if groupOption is 'location', then these types may be e.g. ['Sydney', 'Dublin']
     * @param posts A clean list of IPost objects, ideally fresh from the server
     * @returns 
     */
    getGroupedPosts(groupOption: IGroupOptions, groupTypes: Array<string>, posts: Array<IPost>): IGroupedPosts {
        // Allows me to access an interface's property using a string variable, which Typescript doesnt allow for otherwise
        const getKeyValue = <T extends object, U extends keyof T>(obj: T) => (key: U) => obj[key];
        let composedObj: any = new Object();

        groupTypes.forEach((type) => {
            let filteredPosts = posts.filter(post => type === getKeyValue(post)(groupOption));
            Object.assign(composedObj, { [type]: filteredPosts });
        });

        return composedObj;
    }

    /**
     * Subscriptions for the component to manage
     */
    setupSubscriptions(): void {
        this.getPosts();
        this.subscribeToFormChanges();
        this.subscribeToPosts();
    }

    getPosts(): void {
        let sub = this._postService.getPosts()
            .subscribe((res: Array<IPost>) => {
                this._postService.setPosts(res);
                this.groupPosts(this.groupOptions[0], res);
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
     * End of subscriptions
     */
}
