import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  flexRender,
  type Column,
  type ColumnDef,
  type Table as TableType,
} from "@tanstack/react-table";
import {
  ArrowLeftToLine,
  ArrowRightToLine,
  Ellipsis,
  EyeOff,
  Pin,
  PinOff,
} from "lucide-react";
import type { CSSProperties } from "react";

// Helper function to compute pinning styles for columns
const getPinningStyles = (column: Column<any>): CSSProperties => {
  const isPinned = column.getIsPinned();
  return {
    left: isPinned === "left" ? `${column.getStart("left")}px` : undefined,
    right: isPinned === "right" ? `${column.getAfter("right")}px` : undefined,
    position: isPinned ? "sticky" : "relative",
    width: column.getSize(),
    zIndex: isPinned ? 1 : 0,
  };
};

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  table: TableType<TData>;
}

export default function DataTable<TData, TValue>({
  columns,
  table,
}: DataTableProps<TData, TValue>) {
  return (
    <div>
      <Table className="border table-fixed [&_td]:border-border [&_tfoot_td]:border-t [&_th]:border-b [&_th]:border-border [&_tr:not(:last-child)_td]:border-b [&_tr]:border-none">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="bg-muted/50">
              {headerGroup.headers.map((header) => {
                const { column } = header;
                const isPinned = column.getIsPinned();
                const isLastLeftPinned =
                  isPinned === "left" && column.getIsLastColumn("left");
                const isFirstRightPinned =
                  isPinned === "right" && column.getIsFirstColumn("right");

                return (
                  <TableHead
                    key={header.id}
                    className="relative h-10 truncate border-t [&:not([data-pinned]):has(+[data-pinned])_div.cursor-col-resize:last-child]:opacity-0 [&[data-last-col=left]_div.cursor-col-resize:last-child]:opacity-0 [&[data-pinned=left][data-last-col=left]]:border-r [&[data-pinned=right]:last-child_div.cursor-col-resize:last-child]:opacity-0 [&[data-pinned=right][data-last-col=right]]:border-l [&[data-pinned][data-last-col]]:border-border [&[data-pinned]]:bg-muted/90 [&[data-pinned]]:backdrop-blur-sm"
                    colSpan={header.colSpan}
                    style={{ ...getPinningStyles(column) }}
                    data-pinned={isPinned || undefined}
                    data-last-col={
                      isLastLeftPinned
                        ? "left"
                        : isFirstRightPinned
                          ? "right"
                          : undefined
                    }
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="truncate flex items-center">
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                        {header.column.getIsPinned() && (
                          <Pin className="ml-2 w-4" />
                        )}
                      </span>
                      {/* Pin/Unpin column controls with enhanced accessibility */}
                      {!header.isPlaceholder &&
                        (header.column.getCanHide() ||
                          header.column.getCanPin()) && (
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                size="icon"
                                variant="ghost"
                                className="-mr-1 size-7 shadow-none"
                                aria-label={`Pin options for ${header.column.columnDef.header as string} column`}
                                title={`Pin options for ${header.column.columnDef.header as string} column`}
                              >
                                <Ellipsis
                                  className="opacity-60"
                                  size={16}
                                  strokeWidth={2}
                                  aria-hidden="true"
                                />
                              </Button>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent align="end">
                              {header.column.getCanHide() && (
                                <DropdownMenuItem
                                  onClick={() =>
                                    header.column.toggleVisibility(false)
                                  }
                                >
                                  <EyeOff className="mr-2 size-3.5 text-muted-foreground/70" />
                                  Ocultar
                                </DropdownMenuItem>
                              )}

                              {header.column.getIsPinned() ? (
                                <DropdownMenuItem
                                  onClick={() => header.column.pin(false)}
                                >
                                  <PinOff
                                    className="opacity-60"
                                    size={16}
                                    strokeWidth={2}
                                    aria-hidden="true"
                                  />
                                  No fijar
                                </DropdownMenuItem>
                              ) : (
                                header.column.getCanPin() && (
                                  <>
                                    <DropdownMenuItem
                                      onClick={() => header.column.pin("left")}
                                    >
                                      <ArrowLeftToLine
                                        size={16}
                                        strokeWidth={2}
                                        className="opacity-60"
                                        aria-hidden="true"
                                      />
                                      Fijar a la izquierda
                                    </DropdownMenuItem>

                                    <DropdownMenuItem
                                      onClick={() => header.column.pin("right")}
                                    >
                                      <ArrowRightToLine
                                        size={16}
                                        strokeWidth={2}
                                        className="opacity-60"
                                        aria-hidden="true"
                                      />
                                      Fijar a la derecha
                                    </DropdownMenuItem>
                                  </>
                                )
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        )}
                      {header.column.getCanResize() && (
                        <div
                          {...{
                            onDoubleClick: () => header.column.resetSize(),
                            onMouseDown: header.getResizeHandler(),
                            onTouchStart: header.getResizeHandler(),
                            className:
                              "absolute top-0 h-full w-4 cursor-col-resize user-select-none touch-none -right-2 z-10 flex justify-center before:absolute before:w-px before:inset-y-0 before:bg-border before:-translate-x-px",
                          }}
                        />
                      )}
                    </div>
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => {
                  const { column } = cell;
                  const isPinned = column.getIsPinned();
                  const isLastLeftPinned =
                    isPinned === "left" && column.getIsLastColumn("left");
                  const isFirstRightPinned =
                    isPinned === "right" && column.getIsFirstColumn("right");

                  return (
                    <TableCell
                      key={cell.id}
                      className="truncate [&[data-pinned=left][data-last-col=left]]:border-r [&[data-pinned=right][data-last-col=right]]:border-l [&[data-pinned][data-last-col]]:border-border [&[data-pinned]]:bg-background/90 [&[data-pinned]]:backdrop-blur-sm"
                      style={{ ...getPinningStyles(column) }}
                      data-pinned={isPinned || undefined}
                      data-last-col={
                        isLastLeftPinned
                          ? "left"
                          : isFirstRightPinned
                            ? "right"
                            : undefined
                      }
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No se encontraron resultados.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
