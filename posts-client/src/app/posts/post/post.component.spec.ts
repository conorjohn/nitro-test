import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostComponent } from './post.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MomentDatePipe } from 'src/app/pipes/moment-date.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Component } from '@angular/core';

describe('PostComponent', () => {
    let testHostComponent: TestHostComponent;
    let testHostFixture: ComponentFixture<TestHostComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, ReactiveFormsModule, FormsModule],
            declarations: [PostComponent, TestHostComponent, MomentDatePipe]
        }).compileComponents();
    });

    beforeEach(() => {
        testHostFixture = TestBed.createComponent(TestHostComponent);
        testHostComponent = testHostFixture.componentInstance;
        
        testHostFixture.detectChanges();
    });

    it('should create', () => {
        expect(testHostComponent).toBeTruthy();
    });

    it('should have author form input rendered', () => {
        const fixture = TestBed.createComponent(TestHostComponent);
        fixture.detectChanges();
        
        const compiled = fixture.nativeElement;
        expect(compiled.querySelector('form div.form-group input#author')).toBeTruthy();
    });
});

@Component({
    selector: `host-component`,
    template: `<app-post [post]="post"></app-post>`
})
class TestHostComponent {
    public post = { id: 1, author: 'Conor', text: 'Testing post service', location: 'Inchicore', time: '1552571173', week: 14 };
}