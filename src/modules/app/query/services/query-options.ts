import type { ApiSearchParams } from "@/lib/criteria";
import { keepPreviousData, queryOptions } from "@tanstack/react-query";
import { appQueryKeys } from "../types/query-keys";
import { findAllApps } from "./api";

export const findAllQueryOptions = (criteria: ApiSearchParams) => {
	return queryOptions({
		queryKey: appQueryKeys.list(criteria),
		placeholderData: keepPreviousData,
		queryFn: () => {
			return findAllApps(criteria);
		},
	});
};
