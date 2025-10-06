import type { ComponentType, ReactNode } from "react";
import { useSlots } from "./useSlot";
import type { SlotsMap } from "./types";

export function createSlotComponent<T extends { slots: SlotsMap }>(
  TemplateComponent: ComponentType<T>
) {
  type Props = Omit<T, "slots"> & { children?: ReactNode };

  const SlottedComponent = (props: Props) => {
    const { children, ..._restProps } = props;
    const restProps = _restProps;

    const slots = useSlots(children ?? null);

    return <TemplateComponent {...(restProps as T)} slots={slots} />;
  };

  return SlottedComponent;
}
