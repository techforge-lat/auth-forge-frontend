import { httpRequest } from "@/lib/api/http-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useToast } from "./use-toast";

interface DeleteResourceOptions<TData> {
	resource: string;
	queryKey: string[];
	onSuccess?: (data: TData) => void;
	onError?: (error: AxiosError) => void;
	invalidateQueries?: boolean;
}

interface DeleteResourceVariables {
	id: string;
}

export function useDeleteResource<TData = unknown>({
	resource,
	queryKey,
	onSuccess,
	onError,
	invalidateQueries = true,
}: DeleteResourceOptions<TData>) {
	const queryClient = useQueryClient();
	const { toast } = useToast();

	const mutation = useMutation<TData, AxiosError, DeleteResourceVariables>({
		mutationFn: async ({ id }) => {
			const response = await httpRequest.delete<TData>({
				endpoint: `${resource}/${id}`,
				version: "v1",
			});
			return response.data;
		},
		onSuccess: (data) => {
			if (invalidateQueries) {
				// Invalidate related queries to refetch the updated data
				queryClient.invalidateQueries({ queryKey });
			}

			toast({
				title: "Registro eliminado",
				description: "El registro se eliminó correctamente",
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
		deleteResource: mutation.mutate,
		deleteResourceAsync: mutation.mutateAsync,
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
}

const {
  deleteResource,
  isLoading,
  isError,
  error
} = useDeleteResource<User>({
  resource: 'users',
  queryKey: ['users'],
  onSuccess: (data) => {
    console.log('User deleted:', data);
  },
  onError: (error) => {
    console.error('Failed to delete user:', error);
  },
});

// Use it in your component
const handleDeleteUser = (userId: string) => {
  deleteResource({ id: userId });
};
*/
