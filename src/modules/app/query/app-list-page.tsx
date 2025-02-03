import DataTable from "@/components/data-table/data-table";
import { useSuspenseQuery } from "@tanstack/react-query";
import type { ColumnDef } from "@tanstack/react-table";
import { AppListTableActions } from "./components/app-list-table-actions";
import { AppListTableHeader } from "./components/app-list-table-header";
import { findAllQueryOptions } from "./services/query-options";
import type { App } from "./types/app";
import { useDataTable } from "@/hooks/use-data-table";
import { Route } from "@/routes/apps";
import { type ApiSearchParams, transformSearchParams } from "@/lib/criteria";
import { DataTableLink } from "@/components/data-table/data-table-link";
import { TZDate } from "@date-fns/tz";
import { format } from "date-fns";
import DataTablePagination from "@/components/data-table/data-table-pagination";

const getColumns = (criteria: ApiSearchParams) => {
  const columns: ColumnDef<App>[] = [
    {
      id: "nombre",
      accessorKey: "name",
      header: "Nombre",
      cell: ({ row }) => (
        <DataTableLink
          to={"./$appCode"}
          params={{ appCode: row.original.code }}
        >
          {row.original.name}
        </DataTableLink>
      ),
    },
    {
      id: "código",
      accessorKey: "code",
      header: "Código",
    },
    {
      id: "fecha creación",
      accessorKey: "created_at",
      header: "Fecha creación",
      cell: ({ row }) => {
        return format(
          new TZDate(row.original.createdAt, "America/Lima"),
          "PPpp",
        );
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        return <AppListTableActions data={row.original} />;
      },
      enableHiding: false,
      enablePinning: false,
      enableSorting: false,
      enableResizing: false,
      size: 10,
    },
  ];

  return columns;
};

export const AppListPage = () => {
  const search = Route.useSearch();

  const criteria = transformSearchParams(search);
  const query = useSuspenseQuery(findAllQueryOptions(criteria));

  const columns = getColumns(criteria);
  const { table } = useDataTable({
    data: query.data,
    columns,
  });

  return (
    <div className="space-y-4">
      <AppListTableHeader table={table} criteria={criteria} />
      <DataTable table={table} columns={columns} />
      <DataTablePagination
        currentPage={criteria.page}
        currentPageSize={criteria.limit}
        rowsCount={query.data.length}
      />
    </div>
  );
};
