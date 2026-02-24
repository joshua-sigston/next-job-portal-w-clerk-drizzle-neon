import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SelectComponentProps {
  options: string[];
  name: string;
  id: string;
  defaultValue?: string;
  placeholder: string;
}

export default function SelectComponent({
  options,
  name,
  id,
  defaultValue = "",
  placeholder,
}: SelectComponentProps) {
  return (
    <Select defaultValue={defaultValue || ""} name={name}>
      <SelectTrigger className="w-full" id={id}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All {placeholder}s</SelectItem>
        {options.map((option, i) => (
          <SelectItem key={i} value={option}>
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
