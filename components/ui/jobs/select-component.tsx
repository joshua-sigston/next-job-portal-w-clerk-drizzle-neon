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
  selectItem?: string;
}

export default function SelectComponent({
  options,
  name,
  id,
  defaultValue = "all",
  selectItem = "Select an option",
}: SelectComponentProps) {
  return (
    <Select defaultValue={defaultValue} name={name}>
      <SelectTrigger className="w-full" id={id}>
        <SelectValue placeholder="Select a location" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">{selectItem}</SelectItem>
        {options.map((option, i) => (
          <SelectItem key={i} value={option}>
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
