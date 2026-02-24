import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import SelectComponent from "./select-component";
import { Button } from "../button";
import Link from "next/link";
import SubmitBtn from "@/components/submit-btn";
import { JobFilterValues } from "@/lib/validation";

interface FilterFormProps {
  filterValues: JobFilterValues;
  uniqueLocations: string[];
  uniqueTypes: string[];
  action: (formData: FormData) => Promise<void>;
}

export default function FilterForm({
  filterValues,
  uniqueLocations,
  uniqueTypes,
  action,
}: FilterFormProps) {
  return (
    <form action={action}>
      <div className="space-y-1">
        <Label className="text-sm font-medium">Search</Label>
        <Input
          type="text"
          placeholder="Title, company, etc."
          name="search"
          id="search"
          defaultValue={filterValues?.search}
        />
      </div>
      <div className="space-y-1">
        <Label className="text-sm font-medium">Job Type</Label>
        <SelectComponent
          placeholder="Job Type"
          options={uniqueTypes}
          name="jobType"
          id="jobType"
          defaultValue={filterValues?.jobType}
        />
      </div>
      <div className="space-y-1">
        <Label className="text-sm font-medium">Location</Label>
        <SelectComponent
          placeholder="Location"
          options={uniqueLocations}
          name="location"
          id="location"
          defaultValue={filterValues?.location}
        />
      </div>
      <div className="mt-4 flex space-x-4">
        {/* <SubmitBtn /> handles the pending state automatically during form submission */}
        <SubmitBtn>Filter</SubmitBtn>

        {/* 
              Reset button is implemented as a Link to the root URL (/).
              This clears all search params from the URL, which in turn resets the filterValues prop passed to this component.
            */}
        <Button asChild variant="destructive" className="flex-1">
          <Link href="/">Reset</Link>
        </Button>
      </div>
    </form>
  );
}
