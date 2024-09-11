import { FC, useState, useRef, useEffect } from "react";
import { DropdownProps, Option } from "./Dropdown.types";
import clsx from "clsx";
import { useDebounce } from "../../hooks/useDebounce";

import styles from "./Dropdown.module.scss";

export const Dropdown: FC<DropdownProps> = ({
  options,
  onSelect,
  className,
  placeholder = "Select an option",
  renderOption,
  renderSelected,
  handleAsyncSearch,
  handleSearch,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredOptions, setFilteredOptions] = useState(options);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const debouncedSearchQuery = useDebounce(setSearchQuery, 500);

  const handleSelectOption = (option: Option) => {
    setSelectedOption(option);
    onSelect(option);
    setIsOpen(false);
  };

  const renderDropdownContent = () => {
    if (!selectedOption) {
      return placeholder;
    }

    return renderSelected
      ? renderSelected(selectedOption)
      : selectedOption.label;
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (handleAsyncSearch) {
      handleAsyncSearch(searchQuery).then((results) =>
        setFilteredOptions(results)
      );
    } else if (handleSearch) {
      setFilteredOptions(handleSearch(searchQuery));
    } else {
      setFilteredOptions(
        options.filter((option) =>
          option.label.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
  }, [searchQuery, options, handleAsyncSearch]);

  return (
    <div className={clsx(styles.dropdown, className)} ref={dropdownRef}>
      <div
        className={clsx(styles.selected, !selectedOption && styles.placeholder)}
        onClick={toggleDropdown}
      >
        {renderDropdownContent()}
        <span className={styles.arrow} />
      </div>
      {isOpen && (
        <div className={styles.dropdownContent}>
          <input
            type="text"
            onChange={(e) => debouncedSearchQuery(e.target.value)}
            className={styles.searchInput}
            placeholder="Пошук..."
          />
          <ul>
            {filteredOptions.map((option) => (
              <li key={option.value} onClick={() => handleSelectOption(option)}>
                {renderOption ? renderOption(option) : option.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
