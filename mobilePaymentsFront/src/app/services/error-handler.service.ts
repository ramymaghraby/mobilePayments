import { Injectable, ErrorHandler, Injector, Inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService implements ErrorHandler {

  constructor(
    @Inject(Injector) private readonly injector: Injector,
  ) { }

  handleError(error) {
    if (Error instanceof HttpErrorResponse) {
      console.log(error.status);
      this.showError(error.status);
    } else {
      console.error('error:' + error.message);
      this.showError(error.message);
    }
  }

  showError(errorMessage: string) {
    this.toastrService.error(errorMessage, 'Critical Error', { onActivateTick: true } );
  }

  private get toastrService(): ToastrService {
    return this.injector.get(ToastrService);
}
}
