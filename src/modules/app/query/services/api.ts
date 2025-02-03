import { type RequestConfig, httpRequest } from "@/lib/api/http-client";
import type { AppList, AppListApiResponse } from "../types/app";
import type { ApiSearchParams } from "@/lib/criteria";

const RESOURCE = "apps";

export const findAllApps = async (
	criteria: ApiSearchParams,
): Promise<AppList> => {
	const response = await httpRequest.get<AppListApiResponse>({
		version: "v1",
		endpoint: `${RESOURCE}`,
		params: {
			...criteria.sort,
			...criteria.filters,
			pageNumber: `page:${criteria.page ?? 1}`,
			pageSize: `limit:${criteria.limit ?? 10}`,
		},
	} as RequestConfig);

	if (!response.data) return [];

	return response.data.map((app) => ({
		...app,
		createdAt: app.created_at,
		updatedAt: app.updated_at,
	}));
};
