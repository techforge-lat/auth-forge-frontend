import AddButton from "@/components/data-table/data-table-add-button";
import { DataTableColumnVisibility } from "@/components/data-table/data-table-column-visibility";
import InputSearch from "@/components/data-table/data-table-input-search";
import FormDialog from "@/components/form-dialog";
import type { ApiSearchParams } from "@/lib/criteria";
import { AppCreateForm } from "@/modules/app/command/app-create-form";
import { useNavigate } from "@tanstack/react-router";
import type { Table } from "@tanstack/react-table";
import { useState } from "react";

interface AppListTableHeaderProps<TData> {
  table: Table<TData>;
  criteria: ApiSearchParams;
}

export function AppListTableHeader<TData>({
  table,
  criteria,
}: AppListTableHeaderProps<TData>) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="flex justify-between gap-2">
      <div className="flex gap-2">
        <InputSearch
          placeholder="Buscar por nombre"
          value={criteria?.search}
          onChange={(value?: string) => {
            if (!value) {
              navigate({
                to: ".",
                search: (prev) => ({
                  ...prev,
                  search: undefined,
                  filter: undefined,
                }),
              });
              return;
            }
            navigate({
              to: ".",
              search: (prev) => ({
                ...prev,
                search: value,
                filter: {
                  name: `contains:%${value}%`,
                },
              }),
            });
          }}
        />
        <DataTableColumnVisibility table={table} />
      </div>
      <AddButton onClick={() => setIsOpen(!isOpen)}>Agregar</AddButton>
      <FormDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title="Agregar aplicación"
        actionTitle="Agregar"
        actionFormId="app-create-form"
      >
        <AppCreateForm
          actionFormId="app-create-form"
          onSuccess={() => setIsOpen(false)}
        />
      </FormDialog>
    </div>
  );
}
