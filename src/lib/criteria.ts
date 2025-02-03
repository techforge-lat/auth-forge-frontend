export type FilterOperator =
	| "eq"
	| "ne"
	| "gt"
	| "gte"
	| "lt"
	| "lte"
	| "like"
	| "in"
	| "nin"
	| "contains"
	| "ncontains"
	| "is"
	| "isn";

export type ChainingKey = "and" | "or";
export type SortType = "asc" | "desc";

export interface ApiSearchParams {
	search?: string;
	filters?: Record<string, string>;
	sort?: Record<string, string>;
	page?: number;
	limit?: number;
}

export function transformSearchParams(
	params: Record<string, any>,
): ApiSearchParams {
	const apiParams: ApiSearchParams = {};

	apiParams.search = params.search;
	apiParams.filters = params.filter;
	apiParams.sort = params.sort;
	apiParams.page = params.page;
	apiParams.limit = params.limit;

	return apiParams;
}
