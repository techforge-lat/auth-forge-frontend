import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useUpdateResource } from "@/hooks/use-update-resource";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import type { App } from "../query/types/app";
import { appFormSchema } from "./types/schema";
import { appQueryKeys } from "../query/types/query-keys";

interface AppUpdateFormProps {
	currentValues: App;
	resourceId: string;
	actionFormId: string;
	// onSuccess is used to close the dialog after the form is submitted successfully
	onSuccess?: () => void;
}

export function AppUpdateForm({
	currentValues,
	resourceId,
	actionFormId,
	onSuccess,
}: AppUpdateFormProps) {
	const { updateResource } = useUpdateResource<
		App,
		z.infer<typeof appFormSchema>
	>({
		resource: "apps",
		queryKey: appQueryKeys.lists(),
		onSuccess: () => {
			onSuccess?.();
		},
	});

	const form = useForm<z.infer<typeof appFormSchema>>({
		resolver: zodResolver(appFormSchema),
		defaultValues: currentValues,
	});

	function onSubmit(values: z.infer<typeof appFormSchema>) {
		updateResource({ id: resourceId, data: values });
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="space-y-8"
				id={actionFormId}
			>
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Nombre</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormDescription>El nombre de la aplicación</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
			</form>
		</Form>
	);
}
