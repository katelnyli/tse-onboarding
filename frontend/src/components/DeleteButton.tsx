import React from "react";
import styles from "src/components/DeleteButton.module.css";

export type DeleteButtonProps = {
  disabled?: boolean;
  onPress?: () => void;
  className?: string;
};

export const DeleteButton = function DeleteButton({
  ref,
  disabled,
  onPress,
  className,
}: DeleteButtonProps & { ref?: React.RefObject<HTMLButtonElement | null> }) {
  let buttonClass = styles.button;
  if (className) {
    buttonClass += ` ${className}`;
  }
  return (
    <button ref={ref} onClick={onPress} disabled={disabled} className={buttonClass} type="button">
      <img src={"/delete.png"} alt="" width={30} height={30} />
    </button>
  );
};
