"use client";

import { type Editor } from "@tiptap/react";

// --- Hooks ---
import { useTiptapEditor } from "@/hooks/use-tiptap-editor";

// --- UI Primitives ---
import type { ButtonProps } from "@/components/tiptap-ui-primitive/button";
import { Button } from "@/components/tiptap-ui-primitive/button";

export interface TableProps extends Omit<ButtonProps, "type"> {
  editor?: Editor | null;
}

export const TableButton = ({ editor: providedEditor }: TableProps) => {
  const editor = useTiptapEditor(providedEditor);

  return (
    <Button
      type="button"
      onClick={() => {
        if (editor) {
          editor
            .chain()
            .focus()
            .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
            .run();
        }
      }}
    >
      Table
    </Button>
  );
};
