import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment as env } from 'src/environments/environment';
import * as moment from 'moment';
import { IGroupOptions } from '../types/group-options.type';
import { IPost } from '../types/post.interface';
// import {  } from 'lodash';

@Injectable({
    providedIn: 'root'
})
export class PostsService {

    constructor(private _http: HttpClient) { }

    private _filterOptions: Array<IGroupOptions> = ['author', 'location', 'week'];
    public posts$: BehaviorSubject<IPost[]> = new BehaviorSubject<IPost[]>([])
    public posts: Array<IPost> = [];

    public getPosts(): Observable<Array<IPost>> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8', "Access-Control-Allow-Origin": "*" });

        return this._http.get<Array<IPost>>(env.baseUrl + '/posts', { headers: headers }).pipe(
            map((posts: IPost[]) => {
                posts.map(post => post.week = moment(+post.time).isoWeek());
                return posts;
            })
        );
    }

    
    setPosts(posts: Array<IPost>): void {
        this.posts = posts;
        this.posts$.next(posts);
    }

    getFilterOptions(): Array<IGroupOptions> {
        return this._filterOptions;
    }

    updatePost(post: IPost): void {
        let newPosts = this.posts.map(p => p.id === post.id ? post : p);
        this.posts$.next(newPosts)
    }
}
