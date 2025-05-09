import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { authGuard } from './auth.guard';
import { AuthService } from '../services/auth.service';
import { of } from 'rxjs';

describe('authGuard', () => {
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(() => {
    mockAuthService = jasmine.createSpyObj<AuthService>('AuthService', ['isAuthenticated$']);
    mockRouter = jasmine.createSpyObj<Router>('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter },
      ],
    });
  });

  it('should allow access when authenticated', (done) => {
    mockAuthService.isAuthenticated$.and.returnValue(of(true));

    const result$ = authGuard(null as any, null as any);

    result$.subscribe(result => {
      expect(result).toBeTrue();
      expect(mockRouter.navigate).not.toHaveBeenCalled();
      done();
    });
  });

  it('should deny access and redirect when not authenticated', (done) => {
    mockAuthService.isAuthenticated$.and.returnValue(of(false));

    const result$ = authGuard(null as any, null as any);

    result$.subscribe(result => {
      expect(result).toBeFalse();
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/login']);
      done();
    });
  });
});
