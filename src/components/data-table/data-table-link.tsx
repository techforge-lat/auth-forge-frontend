import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import type { PropsWithChildren } from "react";

interface DataTableLinkProps extends PropsWithChildren {
	to: string;
	params: Record<string, string>;
}

export const DataTableLink = ({ to, params, children }: DataTableLinkProps) => {
	return (
		<Button asChild variant={"link"} className="pl-0">
			<Link to={to} params={params}>
				{children}
			</Link>
		</Button>
	);
};
