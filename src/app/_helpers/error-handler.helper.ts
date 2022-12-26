import { ErrorHandler, Injectable } from '@angular/core';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { AppEventService } from '../_services/app.event.service';

@Injectable({ providedIn: 'root' })
export class ErrorHandlerHelper implements ErrorHandler {
	handleError(error: any): void {
		if (
			error instanceof HttpErrorResponse &&
			error.status === HttpStatusCode.Unauthorized
		) {
			AppEventService.logout();
		}
	}
}
