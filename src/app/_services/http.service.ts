import {
	HttpClient,
	HttpErrorResponse,
	HttpHeaders,
	HttpStatusCode,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ErrorHandlerHelper } from 'src/app/shared/helpers/error-handler.helper';
import { firstValueFrom } from 'rxjs';
import { isEmpty } from 'radash';
import { UiHelper } from '../shared/helpers/ui.helper';

@Injectable({ providedIn: 'root' })
export class HttpService {
	constructor(
		private http: HttpClient,
		private errorHandler: ErrorHandlerHelper,
	) {}

	createAuthorizationHeader() {
		const headers = {
			'Content-Type': 'application/json',
		};

		return new HttpHeaders(headers);
	}

	initOption(options = {}) {
		return {
			...options,
			headers: this.createAuthorizationHeader()
		};
	}

  async getOne(url: string, params: any, isBlocked: boolean = true): Promise<any> {
    if (isBlocked) UiHelper.block();

		return firstValueFrom(this.http.get(url, this.initOption({params})))
			.catch(err => {
				return this.handleError(err);
			})
			.finally(() => {
				if (isBlocked) UiHelper.unBlock();
			});
  }

	async get(url: string, isBlocked: boolean = true): Promise<any> {
		if (isBlocked) UiHelper.block();

		return firstValueFrom(this.http.get(url, this.initOption()))
			.catch(err => {
				return this.handleError(err);
			})
			.finally(() => {
				if (isBlocked) UiHelper.unBlock();
			});
	}

	async post(
		url: string,
		body: any = null,
		isBlocked: boolean = true,
	): Promise<any> {
		if (isBlocked) UiHelper.block();

		return firstValueFrom(this.http.post(url, body, this.initOption()))
			.catch(err => {
				return this.handleError(err);
			})
			.finally(() => {
				if (isBlocked) UiHelper.unBlock();
			});
	}

	async put(
		url: string,
		body: any = null,
		isBlocked: boolean = true,
	): Promise<any> {
		if (isBlocked) UiHelper.block();
		return firstValueFrom(this.http.put(url, body, this.initOption()))
			.catch(err => {
				return this.handleError(err);
			})
			.finally(() => {
				if (isBlocked) UiHelper.unBlock();
			});
	}

	async delete(
		url: string,
		body: any = null,
		isBlocked: boolean = true,
	): Promise<any> {
		if (isBlocked) UiHelper.block();
		return firstValueFrom(this.http.delete(url, this.initOption({ body })))
			.catch(err => {
				return this.handleError(err);
			})
			.finally(() => {
				if (isBlocked) UiHelper.unBlock();
			});
	}

	convertQueryString(queryObject: any): string {
		if (isEmpty(queryObject)) return '';
		let query = '?';
		Object.keys(queryObject).forEach(key => {
			if (queryObject[key] != null) {
				query += `${key}=${queryObject[key]}&`;
			}
		});

		query = query.substring(0, query.length - 1);

		return query;
	}

	handleError(err: any) {
		if (
			err instanceof HttpErrorResponse &&
			err.status != HttpStatusCode.Unauthorized
		) {
			return err.error;
		}
		this.errorHandler.handleError(err);
	}
}
