import { TestBed } from '@angular/core/testing';

import { PostsService } from './posts.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('PostsService', () => {
    let service: PostsService;
    const post = jasmine.createSpyObj('PostsService', [{ id: 1, author: 'Conor', text: 'Testing post service', location: 'Inchicore', time: '1552571173', week: 14 }])

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [PostsService, 
                { provide: PostsService, useValue: post }
            ],
        });
        service = TestBed.inject(PostsService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
