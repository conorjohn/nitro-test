import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsComponent } from './posts.component';
import { PostsService } from '../services/posts.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { mockPostsFactory } from '../mock-data/posts.mock';
import { IGroupedPosts } from '../types/grouped-posts.interface';

describe('PostsComponent', () => {
    let component: PostsComponent;
    let fixture: ComponentFixture<PostsComponent>;
    let posts = mockPostsFactory();

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, ReactiveFormsModule],
            declarations: [PostsComponent],
            providers: [{ provide: PostsService, useClass: PostsService }]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PostsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should create an instance of IGroupedPosts, grouped by locations Dublin and Inchicore', () => {
        let groupedPosts: IGroupedPosts = component.getGroupedPosts('location', ['Dublin', 'Inchicore'], posts);
        expect(Object.keys(groupedPosts)).toContain('Dublin') && expect(Object.keys(groupedPosts)).toContain('Inchicore');
    });

    it('should create grouped posts under Singapore with 0 posts', () => {
        let location = 'Singapore';
        let groupedPosts: IGroupedPosts = component.getGroupedPosts('location', [location], posts);
        expect(groupedPosts[location]).toBeDefined() && expect(groupedPosts[location].length).toEqual(0);
    });
});
