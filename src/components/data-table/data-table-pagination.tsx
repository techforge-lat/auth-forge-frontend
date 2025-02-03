import { Button } from "@/components/ui/button";
import {
	Pagination,
	PaginationContent,
	PaginationItem,
} from "@/components/ui/pagination";
import { Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DataTablePaginationRowsCountSelector } from "./data-table-pagination-rows-count-selector";
import { useState } from "react";

type PaginationProps = {
	currentPage?: number;
	currentPageSize?: number;
	rowsCount: number;
};

export default function DataTablePagination({
	currentPage = 1,
	currentPageSize = 10,
	rowsCount,
}: PaginationProps) {
	const [rowsPerPage, setRowsPerPage] = useState(currentPageSize.toString());

	return (
		<Pagination>
			<PaginationContent className="w-full gap-3 justify-between">
				<div className="flex gap-2 items-center text-sm text-muted-foreground">
					Filas por página
					<DataTablePaginationRowsCountSelector
						rowsPerPage={rowsPerPage}
						setRowsPerPage={setRowsPerPage}
					/>
				</div>

				<div className="flex gap-3 items-center">
					<PaginationItem>
						<Button
							variant="outline"
							className="aria-disabled:pointer-events-none aria-disabled:opacity-50"
							aria-disabled={currentPage === 1 ? true : undefined}
							role={currentPage === 1 ? "link" : undefined}
							asChild
						>
							<Link
								to="."
								search={(prev) => ({
									...prev,
									page: currentPage - 1,
								})}
							>
								Anterior
								<ChevronLeft
									className="-me-1 ms-2 opacity-60"
									size={16}
									strokeWidth={2}
									aria-hidden="true"
								/>
							</Link>
						</Button>
					</PaginationItem>
					<PaginationItem>
						<Button
							variant="outline"
							className="aria-disabled:pointer-events-none aria-disabled:opacity-50"
							aria-disabled={rowsCount < +rowsPerPage ? true : undefined}
							role={rowsCount <= +rowsPerPage ? "link" : undefined}
							asChild
						>
							<Link
								to="."
								search={(prev) => ({
									...prev,
									page: currentPage + 1,
								})}
							>
								Siguiente
								<ChevronRight
									className="-me-1 ms-2 opacity-60"
									size={16}
									strokeWidth={2}
									aria-hidden="true"
								/>
							</Link>
						</Button>
					</PaginationItem>
				</div>
			</PaginationContent>
		</Pagination>
	);
}
