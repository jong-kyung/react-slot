import { createRoot } from 'react-dom/client';

function App() {
  return <div>React Slot Demo</div>;
}

const rootEl = document.getElementById('root');
if (rootEl) {
  const root = createRoot(rootEl);
  root.render(<App />);
}
