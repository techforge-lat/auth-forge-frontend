import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import type { PropsWithChildren } from "react";

interface AddButtonProps extends PropsWithChildren {
	onClick: () => void;
}

export default function AddButton({ onClick, children }: AddButtonProps) {
	return (
		<Button variant="outline" className="max-sm:p-0" onClick={onClick}>
			<Plus
				className="opacity-60 sm:-ms-1 sm:me-2"
				size={16}
				strokeWidth={2}
				aria-hidden="true"
			/>
			<span className="max-sm:sr-only">{children}</span>
		</Button>
	);
}
