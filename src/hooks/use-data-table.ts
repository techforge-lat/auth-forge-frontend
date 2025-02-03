import {
	type ColumnDef,
	type ColumnPinningState,
	type SortingState,
	type Table,
	type VisibilityState,
	getCoreRowModel,
	useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";

interface UseDataTableProps<TData> {
	data: TData[];
	columns: ColumnDef<TData>[];
}

interface UseDataTableReturn<TData> {
	table: Table<TData>;
}

export function useDataTable<TData>({
	data,
	columns,
}: UseDataTableProps<TData>): UseDataTableReturn<TData> {
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
	const [sorting, setSorting] = useState<SortingState>([]);
	const [columnPinning, setColumnPinning] = useState<ColumnPinningState>({
		left: [],
		right: [],
	});
	const [columnOrder, setColumnOrder] = useState<string[]>(
		columns.map((column) => column.id as string),
	);

	const table = useReactTable({
		data,
		columns,
		enableMultiSort: true,
		manualSorting: true,
		columnResizeMode: "onChange",
		enableSortingRemoval: false,
		getCoreRowModel: getCoreRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
		state: {
			columnVisibility,
			sorting,
			columnPinning,
			columnOrder,
		},
		onColumnOrderChange: setColumnOrder,
		onSortingChange: setSorting,
		onColumnPinningChange: setColumnPinning,
		defaultColumn: {
			size: 100, //starting column size
			minSize: 10, //enforced during column resizing
			maxSize: 500, //enforced during column resizing
		},
	});

	return {
		table,
	};
}
