// import { TestBed } from '@angular/core/testing';
// import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

// describe('AppComponent', () => {
//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [
//         RouterTestingModule
//       ],
//       declarations: [
//         AppComponent
//       ],
//     }).compileComponents();
//   });

//   it('should create the app', () => {
//     const fixture = TestBed.createComponent(AppComponent);
//     const app = fixture.componentInstance;
//     expect(app).toBeTruthy();
//   });

//   it(`should have as title 'apod-sharer'`, () => {
//     const fixture = TestBed.createComponent(AppComponent);
//     const app = fixture.componentInstance;
//     expect(app.title).toEqual('apod-sharer');
//   });

//   it('should render title', () => {
//     const fixture = TestBed.createComponent(AppComponent);
//     fixture.detectChanges();
//     const compiled = fixture.nativeElement as HTMLElement;
//     expect(compiled.querySelector('.content span')?.textContent).toContain('apod-sharer app is running!');
//   });
// });

describe('AppComponent', () => {
  let fixture: AppComponent;
  
  beforeEach(() => {
    fixture = new AppComponent();
  })

  it('should have the correct title', () => {
    expect(fixture.title).toEqual('apod-sharer');
  })
})