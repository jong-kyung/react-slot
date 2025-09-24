import { createSlotComponent } from "../createSlotComponent";
import { Slot } from "../Slot";
import type { SlotsMap } from "../types";

interface TemplateProps {
  slots: SlotsMap;
  title?: string;
}

function Template({ slots, title = "Slots Demo" }: TemplateProps) {
  return (
    <div
      style={{
        fontFamily: "system-ui, -apple-system, Arial",
        padding: 16,
        lineHeight: 1.5,
      }}
    >
      <header style={{ borderBottom: "1px solid #ddd", marginBottom: 12 }}>
        <h1 style={{ margin: 0, fontSize: 20 }}>{title}</h1>
        <div>
          <Slot name="header" slots={slots}>
            <small style={{ color: "#666" }}>Default Header</small>
          </Slot>
        </div>
      </header>

      <div
        style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: 16 }}
      >
        <aside style={{ borderRight: "1px solid #eee", paddingRight: 12 }}>
          <strong>Sidebar</strong>
          <div>
            <Slot name="sidebar" slots={slots}>
              <em style={{ color: "#999" }}>No sidebar content</em>
            </Slot>
          </div>
        </aside>
        <main>
          <Slot slots={slots}>
            <p>Default main content</p>
          </Slot>

          <section
            style={{
              marginTop: 16,
              padding: 12,
              background: "#fafafa",
              border: "1px solid #eee",
            }}
          >
            <strong>Scoped Slot Example:</strong>
            <div>
              <Slot name="greeting" slots={slots} user="Alice" />
            </div>
          </section>
        </main>
      </div>

      <footer
        style={{ borderTop: "1px solid #ddd", marginTop: 16, paddingTop: 8 }}
      >
        <Slot name="footer" slots={slots}>
          <small style={{ color: "#666" }}>Default Footer</small>
        </Slot>
      </footer>
    </div>
  );
}

const SlottedTemplate = createSlotComponent(Template);

export default SlottedTemplate;
