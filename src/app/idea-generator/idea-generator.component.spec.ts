import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdeaGeneratorComponent } from './idea-generator.component';

describe('IdeaGeneratorComponent', () => {
  let component: IdeaGeneratorComponent;
  let fixture: ComponentFixture<IdeaGeneratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IdeaGeneratorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IdeaGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
