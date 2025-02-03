import { httpRequest } from "@/lib/api/http-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useToast } from "./use-toast";

interface UpdateResourceOptions<TData, TVariables> {
	resource: string;
	queryKey: string[];
	onSuccess?: (data: TData) => void;
	onError?: (error: AxiosError) => void;
	invalidateQueries?: boolean;
}

interface UpdateResourceVariables<T> {
	id: string;
	data: T;
}

export function useUpdateResource<TData = unknown, TVariables = unknown>({
	resource,
	queryKey,
	onSuccess,
	onError,
	invalidateQueries = true,
}: UpdateResourceOptions<TData, TVariables>) {
	const queryClient = useQueryClient();
	const { toast } = useToast();

	const mutation = useMutation<
		TData,
		AxiosError,
		UpdateResourceVariables<TVariables>
	>({
		mutationFn: async ({ id, data }) => {
			const response = await httpRequest.put<TData>({
				endpoint: `${resource}/${id}`,
				version: "v1",
				data: {
					...data,
					updated_at: new Date().toISOString(),
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
				title: "Registro actualizado",
				description: "El registro se actualizó correctamente",
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
		updateResource: mutation.mutate,
		updateResourceAsync: mutation.mutateAsync,
		isLoading: mutation.isPending,
		isError: mutation.isError,
		isSuccess: mutation.isSuccess,
		error: mutation.error,
		reset: mutation.reset,
	};
}

// Usage example:
/*
interface User {
  id: string;
  name: string;
  email: string;
  updated_at: string;
}

interface UpdateUserInput {
  name?: string;
  email?: string;
}

const {
  updateResource,
  isLoading,
  isError,
  error
} = useUpdateResource<User, UpdateUserInput>({
  resource: 'users',
  queryKey: ['users'],
  onSuccess: (data) => {
    console.log('User updated:', data);
  },
  onError: (error) => {
    console.error('Failed to update user:', error);
  },
});

// Use it in your component
const handleUpdateUser = (userId: string, userData: UpdateUserInput) => {
  updateResource({
    id: userId,
    data: userData
  });
};
*/
