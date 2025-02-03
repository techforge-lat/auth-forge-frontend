import { httpRequest } from "@/lib/api/http-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { v4 as uuidv4 } from "uuid";
import type { AxiosError } from "axios";
import { useToast } from "./use-toast";

interface CreateResourceOptions<TData, TVariables> {
	resource: string;
	queryKey: string[];
	onSuccess?: (data: TData) => void;
	onError?: (error: AxiosError) => void;
	invalidateQueries?: boolean;
}

export function useCreateResource<TData = unknown, TVariables = unknown>({
	resource,
	queryKey,
	onSuccess,
	onError,
	invalidateQueries = true,
}: CreateResourceOptions<TData, TVariables>) {
	const queryClient = useQueryClient();
	const { toast } = useToast();

	const mutation = useMutation<TData, AxiosError, TVariables>({
		mutationFn: async (variables) => {
			const response = await httpRequest.post<TData>({
				endpoint: resource,
				version: "v1",
				data: {
					...variables,
					id: uuidv4(),
					created_at: new Date().toISOString(),
				},
			});
			return response.data;
		},
		onSuccess: (data) => {
			if (invalidateQueries) {
				// Invalidate related queries to refetch the updated data
				queryClient.invalidateQueries({ queryKey });
			}

			toast({
				title: "Registro creado",
				description: "El registro se creó correctamente",
			});

			onSuccess?.(data);
		},
		onError: (error) => {
			toast({
				title: "Oh no, hubo un error",
				description: error.message,
				variant: "destructive",
			});

			onError?.(error);
		},
	});

	return {
		createResource: mutation.mutate,
		createResourceAsync: mutation.mutateAsync,
		isLoading: mutation.isPending,
		isError: mutation.isError,
		isSuccess: mutation.isSuccess,
		error: mutation.error,
		reset: mutation.reset,
	};
}
