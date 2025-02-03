import { useNavigate } from "@tanstack/react-router";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface DataTablePaginationRowsCountSelectorProps {
  rowsPerPage?: string;
  setRowsPerPage: (rowsPerPage: string) => void;
}

export const DataTablePaginationRowsCountSelector = ({
  rowsPerPage,
  setRowsPerPage,
}: DataTablePaginationRowsCountSelectorProps) => {
  const navigate = useNavigate();

  return (
    <Select
      onValueChange={(value) => {
        setRowsPerPage(value);
        navigate({
          to: ".",
          search: (prev) => ({
            ...prev,
            limit: Number(value),
          }),
        });
      }}
      value={rowsPerPage}
      defaultValue="10"
    >
      <SelectTrigger className="w-fit">
        <SelectValue placeholder="Cantidad de filas" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="5">5</SelectItem>
        <SelectItem value="10">10</SelectItem>
        <SelectItem value="20">20</SelectItem>
        <SelectItem value="50">50</SelectItem>
        <SelectItem value="100">100</SelectItem>
      </SelectContent>
    </Select>
  );
};
