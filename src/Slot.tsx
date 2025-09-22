import { isValidElement, type ReactElement } from "react";
import type { SlotProps } from "./types";

export function Slot({
  name = "default",
  children: fallback,
  slots,
  ...props
}: SlotProps) {
  const slotContent = slots[name];

  if (!slotContent) {
    return fallback || null;
  }

  if (typeof slotContent === "function") return slotContent(props);

  if (isValidElement(slotContent)) {
    const maybeFn = (slotContent as ReactElement<{ children?: unknown }>).props
      ?.children;
    if (typeof maybeFn === "function") return maybeFn(props);
  }

  return slotContent;
}
