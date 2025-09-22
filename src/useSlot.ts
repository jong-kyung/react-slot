import {
  Children,
  cloneElement,
  isValidElement,
  useMemo,
  type ReactElement,
  type ReactNode,
} from "react";
import type { SlotsMap } from "./types";

export function useSlots(children: ReactNode): SlotsMap {
  const slots = useMemo<SlotsMap>(() => {
    const slotsMap: SlotsMap = {};
    const defaultSlot: ReactNode[] = [];
    const counters: Record<string, number> = {};

    Children.forEach(children, (child) => {
      if (isValidElement(child)) {
        const el = child as ReactElement<{ slot?: string }>;
        const slotName = el.props?.slot;
        if (slotName) {
          const idx = (counters[slotName] = (counters[slotName] ?? 0) + 1);
          const keyAttr = el.key ?? `${slotName}-${idx}`;
          const content = cloneElement(el, { slot: undefined, key: keyAttr });
          const key = slotName;
          const prev = slotsMap[key];
          if (prev === undefined) {
            slotsMap[key] = content;
          } else if (typeof prev === "function") {
            slotsMap[key] = content;
          } else {
            const prevArray = Array.isArray(prev) ? prev : [prev];
            slotsMap[key] = [...prevArray, content];
          }
          return;
        }
      }
      defaultSlot.push(child);
    });

    if (defaultSlot.length > 0) {
      if (slotsMap.default === undefined) {
        slotsMap.default = defaultSlot;
      }
    }

    return slotsMap;
  }, [children]);

  return slots;
}
