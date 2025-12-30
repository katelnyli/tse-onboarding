import { useEffect, useRef, useState } from "react";
import styles from "src/components/Dropdown.module.css";

type Option = {
  label: string;
  value: string;
};

type DropdownProps = {
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
};

export function Dropdown({
  label,
  placeholder,
  disabled,
  options,
  value,
  onChange,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedLabel = options.find((o) => o.value === value)?.label || placeholder || "Select";

  return (
    <div
      ref={dropdownRef}
      className={`${styles.dropdownWrapper} ${disabled ? styles.disabled : ""}`}
    >
      {label && <label className={styles.dropdownLabel}>{label}</label>}

      <button
        type="button"
        className={styles.dropdownButton}
        onClick={() => !disabled && setIsOpen((prev) => !prev)}
      >
        {selectedLabel}
      </button>

      {isOpen && !disabled && (
        <ul className={styles.dropdownOptions}>
          {options.map((option) => (
            <li
              key={option.value}
              className={`${styles.dropdownOption} ${option.value === value ? styles.selected : ""}`}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
