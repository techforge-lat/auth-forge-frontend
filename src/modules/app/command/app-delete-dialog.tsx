import DeleteDialog from "@/components/delete-dialog";
import { useDeleteResource } from "@/hooks/use-delete-resource";
import type { App } from "../query/types/app";
import { appQueryKeys } from "../query/types/query-keys";

interface AppDeleteDialog {
	isOpen: boolean;
	setIsOpen: (isOpen: boolean) => void;
	id: string;
}

export const AppDeleteDialog = ({ isOpen, setIsOpen, id }: AppDeleteDialog) => {
	const { deleteResource } = useDeleteResource<App>({
		resource: "apps",
		queryKey: appQueryKeys.lists(),
		onSuccess: () => {
			setIsOpen(false);
		},
	});

	return (
		<DeleteDialog
			isOpen={isOpen}
			setIsOpen={setIsOpen}
			onConfirm={() => deleteResource({ id })}
		/>
	);
};
