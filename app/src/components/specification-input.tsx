import { FC, useMemo } from "react";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Label } from "./ui/label";

type SpecificationInputProps = {
  specification: string;
  values: string[];

  value: string;
  onValueChange: (value: string) => void;
};

const SpecificationInput: FC<SpecificationInputProps> = ({
  specification,
  values,
  value,
  onValueChange,
}) => {
  const component = useMemo(() => {
    // If there are no values, return an input to add a new value
    if (values.length === 0) {
      return (
        <Input
          id={`specs-${specification}`}
          type="text"
          onChange={(e) => onValueChange(e.target.value)}
        />
      );
    }

    // If there is only one value, return an input with the value disabled
    if (values.length === 1) {
      console.log(specification, values);
      return <Input type="text" value={values[0]} disabled />;
    }

    // If there are multiple values, return a select with the values
    return (
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger id={`specs-${specification}`}>
          <SelectValue placeholder="Choisir une valeur" />
        </SelectTrigger>
        <SelectContent>
          {values.map((v) => (
            <SelectItem key={v} value={v}>
              {v}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  }, [specification, value, values, onValueChange]);

  return (
    <div className="flex flex-col gap-1">
      <Label htmlFor={`specs-${specification}`}>{specification}</Label>
      {component}
    </div>
  );
};

export default SpecificationInput;
