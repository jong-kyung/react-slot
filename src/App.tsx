import SlottedTemplate from "./components/Template";

export default function App() {
  return (
    <SlottedTemplate title="React Slots Demo">
      <div slot="header">
        <h2 style={{ margin: 0 }}>Custom Header</h2>
      </div>

      <ul slot="sidebar" style={{ margin: "8px 0", paddingLeft: 18 }}>
        <li>Item A</li>
        <li>Item B</li>
      </ul>

      <p>
        This is the default slot content. It will appear in the main area where
        the template renders <code>{"<Slot slots={slots} />"}</code> without a
        name.
      </p>

      <div slot="greeting">{(props: any) => <em>Hello, {props.user}!</em>}</div>

      <div slot="footer">
        <small>Custom Footer © {new Date().getFullYear()}</small>
      </div>
    </SlottedTemplate>
  );
}
