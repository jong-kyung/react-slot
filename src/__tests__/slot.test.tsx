import React from "react";
import { afterEach, describe, it, expect } from "vitest";
import { cleanup, render, screen, within } from "@testing-library/react";

import { createSlotComponent } from "../createSlotComponent";
import { Slot } from "../Slot";
import type { SlotsMap } from "../types";

function Template({ slots, title }: { slots: SlotsMap; title?: string }) {
  return (
    <div>
      <h1>{title ?? "Untitled"}</h1>
      <header data-testid="header">
        <Slot name="header" slots={slots} />
      </header>
      <main data-testid="main">
        <Slot slots={slots}>Main default</Slot>
      </main>
      <footer data-testid="footer">
        <Slot name="footer" slots={slots} />
      </footer>
      <section data-testid="scoped">
        <Slot name="scoped" slots={slots} hint="HINT" />
      </section>
    </div>
  );
}

const SlottedTemplate = createSlotComponent(Template);

describe("Slots", () => {
  afterEach(() => cleanup());
  it("renders default slot content when no named slot is provided", () => {
    render(
      <SlottedTemplate>
        <p>Hello default</p>
      </SlottedTemplate>
    );

    const main = screen.getByTestId("main");
    expect(within(main).getByText("Hello default")).toBeTruthy();
  });

  it("renders named slot content in the right place", () => {
    render(
      <SlottedTemplate title="Page">
        <div slot="header">Header content</div>
        <p>Body content</p>
      </SlottedTemplate>
    );

    const header = screen.getByTestId("header");
    expect(within(header).getByText("Header content")).toBeTruthy();

    const main = screen.getByTestId("main");
    expect(within(main).getByText("Body content")).toBeTruthy();
  });

  it("accumulates multiple children into the same named slot", () => {
    render(
      <SlottedTemplate>
        <span slot="footer">A</span>
        <span slot="footer">B</span>
      </SlottedTemplate>
    );

    const footer = screen.getByTestId("footer");
    expect(within(footer).getByText("A")).toBeTruthy();
    expect(within(footer).getByText("B")).toBeTruthy();
  });

  it("supports render-prop style slot as element children", () => {
    // We pass a DOM element whose children is a function.
    // Slot detects and invokes it with forwarded props.
    render(
      <SlottedTemplate>
        <div slot="scoped">{(props: unknown) => <em>{props.hint}</em>}</div>
      </SlottedTemplate>
    );

    const scoped = screen.getByTestId("scoped");
    expect(within(scoped).getByText("HINT")).toBeTruthy();
  });
});
