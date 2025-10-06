import type { ReactNode } from "react";

export type SlotRender = (props: Record<string, unknown>) => ReactNode;
export type SlotContent = ReactNode | SlotRender;

export type SlotsMap = Record<string, SlotContent>;

export interface SlotProps {
  name?: string;
  children?: ReactNode;
  slots: SlotsMap;
  [key: string]: unknown;
}
