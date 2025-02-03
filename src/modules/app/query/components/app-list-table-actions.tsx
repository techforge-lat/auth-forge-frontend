import { DataTableActions } from "@/components/data-table/data-table-actions";
import FormDialog from "@/components/form-dialog";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import type { App } from "../types/app";
import { AppDeleteDialog } from "@/modules/app/command/app-delete-dialog";
import { AppUpdateForm } from "@/modules/app/command/app-update-form";

interface AppListTableActionsProps {
  data: App;
}

export const AppListTableActions = ({ data }: AppListTableActionsProps) => {
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [isDeleteOpen, setIsDeletOpen] = useState(false);

  return (
    <>
      <DataTableActions>
        <DropdownMenuItem asChild>
          <Link to={"/apps/$appCode"} params={{ appCode: data.code }}>
            Ver detalle
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => setIsUpdateOpen(!isUpdateOpen)}>
          Actualizar
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setIsDeletOpen(!isDeleteOpen)}>
          Eliminar
        </DropdownMenuItem>
      </DataTableActions>

      <AppDeleteDialog
        isOpen={isDeleteOpen}
        setIsOpen={setIsDeletOpen}
        id={data.code}
      />

      <FormDialog
        isOpen={isUpdateOpen}
        setIsOpen={setIsUpdateOpen}
        title="Actualizar aplicación"
        actionTitle="Actualizar"
        actionFormId="app-update-form"
      >
        <AppUpdateForm
          currentValues={data}
          resourceId={data.code}
          actionFormId="app-update-form"
          onSuccess={() => setIsUpdateOpen(false)}
        />
      </FormDialog>
    </>
  );
};
