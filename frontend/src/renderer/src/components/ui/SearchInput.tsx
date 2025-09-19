import { Input } from "@renderer/components/ui/input";
import { cn } from "@renderer/lib/utils";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { useState } from "react";

type SearchInputProps = {
  className?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const SearchInput = ({ className = "", ...props }: SearchInputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <div
      className={cn(
        "w-full rounded-md border border-input bg-transparent px-3 shadow-sm flex",
        isFocused ? "ring-1 ring-ring" : "",
        className,
      )}
    >
      {/* <MagnifyingGlassIcon className="flex items-center" /> */}
      <div className="flex items-center mr-1">
        <MagnifyingGlassIcon />
      </div>
      <Input
        {...props}
        className={
          "border-0 border-input-0 ring-0 px-0 focus-visible:ring-0 shadow-none"
        }
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </div>
  );
};

export default SearchInput;
