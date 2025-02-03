import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/use-debounce";
import { Search } from "lucide-react";
import { useEffect, useId, useState } from "react";

interface InputSearchProps {
	placeholder?: string;
	value?: string;
	onChange?: (value?: string) => void;
}

export default function InputSearch({
	placeholder,
	value,
	onChange,
}: InputSearchProps) {
	const id = useId();
	const [search, setSearch] = useState(value);
	const debouncedValue = useDebounce(search, 500);

	useEffect(() => {
		if (onChange) onChange(debouncedValue);
	}, [debouncedValue, onChange]);

	return (
		<div className="space-y-2">
			<div className="relative">
				<Input
					id={id}
					value={search}
					className="peer pe-9 ps-9"
					placeholder={placeholder}
					type="search"
					onChange={(e) => {
						setSearch(e.target.value);
					}}
				/>
				<div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
					<Search size={16} strokeWidth={2} />
				</div>
			</div>
		</div>
	);
}
