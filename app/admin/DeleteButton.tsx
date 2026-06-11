"use client";

import { IconTrash } from "./icons";
import { iconDangerButtonClass } from "./ui";

export default function DeleteButton({ confirmMessage }: { confirmMessage: string }) {
  return (
    <button
      type="submit"
      aria-label="Supprimer"
      title="Supprimer"
      className={iconDangerButtonClass}
      onClick={(e) => {
        if (!confirm(confirmMessage)) {
          e.preventDefault();
        }
      }}
    >
      <IconTrash />
    </button>
  );
}
