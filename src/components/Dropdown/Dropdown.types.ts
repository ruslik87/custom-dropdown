export interface Option {
  label: string;
  value: string;
}

export interface DropdownProps {
  options: Option[];
  onSelect: (option: Option) => void;
  className?: string;
  placeholder?: string;
  renderOption?: (option: Option) => React.ReactNode;
  renderSelected?: (option: Option) => React.ReactNode;
  handleAsyncSearch?: (query: string) => Promise<Option[]>;
  handleSearch?: (query: string) => Option[];
}
