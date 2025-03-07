import { Label } from "./ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "./ui/select";
import { useState } from "react";

interface SelectPairProps {
	label: string;
	description?: string;
	name: string;
	required?: boolean;
	placeholder: string;
	options: { label: string; value: string }[];
}

export default function SelectPair({
	label,
	description,
	name,
	required,
	placeholder,
	options,
}: SelectPairProps) {
	const [open, setOpen] = useState(false);
	return (
		<div className="space-y-2 flex flex-col w-full">
			<Label className="flex flex-col gap-1" onClick={() => setOpen(true)}>
				{label}
				<small className="text-muted-foreground">{description}</small>
			</Label>
			<Select
				name={name}
				required={required}
				onOpenChange={setOpen} // 다시 닫아주는 역할
				open={open}
			>
				<SelectTrigger className="w-full">
					<SelectValue placeholder={placeholder} />
				</SelectTrigger>
				<SelectContent>
					{options.map((option) => (
						<SelectItem key={option.value} value={option.value}>
							{option.label}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</div>
	);
}
