import { cn } from "@/lib/utils";
import { SelectIcon } from "@radix-ui/react-select";
import { useNavigate } from "@tanstack/react-router";
import type { Column } from "@tanstack/react-table";
import {
	ArrowDown,
	ArrowUp,
	ChevronsUpDown,
	EyeOff,
	Pin,
	PinOff,
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger } from "../ui/select";
import { useState } from "react";

interface DataTableColumnSortProps<TData, TValue>
	extends React.HTMLAttributes<HTMLDivElement> {
	title: string;
	searchParamName: string;
	from: string;
	column: Column<TData, TValue>;
	currentSorting?: string | undefined;
}

export function DataTableColumnSort<TData, TValue>({
	title,
	searchParamName,
	currentSorting,
	from,
	column,
	className,
}: DataTableColumnSortProps<TData, TValue>) {
	const navigate = useNavigate({ from: from });
	const [sorting, setSorting] = useState<string | undefined>(
		currentSorting !== undefined ? currentSorting.split(":")[1] : undefined,
	);

	if (!column.getCanSort() && !column.getCanHide()) {
		return <div className={cn(className)}>{title}</div>;
	}

	const ascValue = `${column.id}-asc`;
	const descValue = `${column.id}-desc`;
	const hideValue = `${column.id}-hide`;
	const pinValue = `${column.id}-pin`;

	return (
		<div className={cn("flex items-center gap-2", className)}>
			<Select
				value={
					sorting === "desc"
						? descValue
						: sorting === "asc"
							? ascValue
							: undefined
				}
				onValueChange={(value) => {
					if (value === ascValue) {
						setSorting("asc");

						navigate({
							search: (prev) => {
								return {
									...prev,
									sort: {
										...prev.sort,
										[searchParamName]: "sort:asc",
									},
								};
							},
						});
					} else if (value === descValue) {
						setSorting("desc");

						navigate({
							search: (prev) => {
								return {
									...prev,
									sort: {
										...prev.sort,
										[searchParamName]: "sort:desc",
									},
								};
							},
						});
					} else if (value === hideValue) column.toggleVisibility(false);
					else if (value === pinValue)
						column.pin(column.getIsPinned() ? false : "left");
				}}
			>
				<SelectTrigger className="-ml-3 h-8 w-fit border-none text-xs shadow-none focus-ring-[0px] hover:bg-accent hover:text-accent-foreground data-[state=open]:bg-accent [&>svg:last-child]:hidden">
					{column.getCanPin() && column.getIsPinned() === "left" && (
						<Pin className="ml-2.5 size-3" />
					)}
					{title}
					<SelectIcon asChild className="border-none">
						{column.getCanSort() && sorting === "desc" ? (
							<>
								<ArrowDown className="ml-2.5 size-4" />
							</>
						) : sorting === "asc" ? (
							<>
								<ArrowUp className="ml-2.5 size-4" />
							</>
						) : (
							<>
								<ChevronsUpDown className="ml-2.5 size-4" />
							</>
						)}
					</SelectIcon>
				</SelectTrigger>
				<SelectContent align="end">
					{column.getCanSort() && (
						<>
							<SelectItem value={ascValue}>
								<span className="flex items-center">
									<ArrowUp className="mr-2 size-3.5 text-muted-foreground/70" />
									Asc
								</span>
							</SelectItem>
							<SelectItem value={descValue}>
								<span className="flex items-center">
									<ArrowDown className="mr-2 size-3.5 text-muted-foreground/70" />
									Desc
								</span>
							</SelectItem>
						</>
					)}
					{column.getCanHide() && (
						<SelectItem value={hideValue}>
							<span className="flex items-center">
								<EyeOff className="mr-2 size-3.5 text-muted-foreground/70" />
								Ocultar
							</span>
						</SelectItem>
					)}

					{column.getCanPin() && !column.getIsPinned() && (
						<SelectItem value={pinValue}>
							<span className="flex items-center">
								<Pin className="mr-2 size-3.5 text-muted-foreground/70" />
								Fijar
							</span>
						</SelectItem>
					)}

					{column.getCanPin() && column.getIsPinned() && (
						<SelectItem value={pinValue}>
							<span className="flex items-center">
								<PinOff className="mr-2 size-3.5 text-muted-foreground/70" />
								No fijar
							</span>
						</SelectItem>
					)}
				</SelectContent>
			</Select>
		</div>
	);
}
