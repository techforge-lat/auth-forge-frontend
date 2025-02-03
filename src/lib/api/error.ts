import type { Response } from "./response";

export class ApiError extends Error {
	title?: string;
	detail?: string;
	debugError?: string;
	status?: number;

	constructor(public response: Response<any>) {
		super(response.detail || "An API error occurred");

		this.name = "ApiError";
		this.title = response.title;
		this.detail = response.detail;
		this.debugError = response.debugError;
		this.status = response.status;

		// Maintain proper stack trace
		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, ApiError);
		}
	}

	toJSON() {
		return {
			name: this.name,
			message: this.message,
			title: this.title,
			detail: this.detail,
			status: this.status,
			debugError: this.debugError,
		};
	}
}
