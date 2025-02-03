import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { CircleAlert } from "lucide-react";

interface DeleteDialogProps {
	isOpen: boolean;
	setIsOpen: (isOpen: boolean) => void;
	onConfirm: () => void;
}

export default function DeleteDialog({
	isOpen,
	setIsOpen,
	onConfirm,
}: DeleteDialogProps) {
	return (
		<AlertDialog onOpenChange={setIsOpen} open={isOpen}>
			<AlertDialogContent>
				<div className="flex flex-col gap-2 max-sm:items-center sm:flex-row sm:gap-4">
					<div
						className="flex size-9 shrink-0 items-center justify-center rounded-full border border-border"
						aria-hidden="true"
					>
						<CircleAlert className="opacity-80" size={16} strokeWidth={2} />
					</div>
					<AlertDialogHeader>
						<AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
						<AlertDialogDescription>
							Estas a punto de eliminar este elemento. Esta acción no se puede
							deshacer.
						</AlertDialogDescription>
					</AlertDialogHeader>
				</div>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancelar</AlertDialogCancel>
					<AlertDialogAction onClick={() => onConfirm()}>
						Eliminar
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
