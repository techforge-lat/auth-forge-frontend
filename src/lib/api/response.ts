export interface Response<T> {
	data: T;
	type: string;
	title?: string;
	detail?: string;
	debugError?: string;
	status: number;
	statusCode?: string;
	instance?: string;
}
