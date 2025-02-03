import type { ApiSearchParams } from "@/lib/criteria";

export const appQueryKeys = {
	all: ["apps"] as const,
	lists: () => [...appQueryKeys.all, "list"],
	list: (criteria: ApiSearchParams) =>
		[...appQueryKeys.lists(), { ...criteria }] as const,
	details: () => [...appQueryKeys.all, "detail"] as const,
	detail: (id: number) => [...appQueryKeys.details(), id] as const,
};
