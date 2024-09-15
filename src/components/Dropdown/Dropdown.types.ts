import React from "react";

export interface DropdownOption {
  label: string;
  value: string;
}

export interface DropdownProps {
  options: DropdownOption[];
  onSelect: (option: DropdownOption) => void;
  className?: string;
  placeholder?: string;
  renderOption?: (option: DropdownOption ) => React.ReactNode;
  renderSelected?: (option: DropdownOption ) => React.ReactNode;
  handleAsyncSearch?: (query: string) => Promise<DropdownOption []>;
  handleSearch?: (query: string) => DropdownOption [];
}
