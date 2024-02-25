import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App'; // 追加

const container = document.getElementById('app');
const root = createRoot(container!);

root.render(
  <React.StrictMode>
    <div className="text-red">
        Hello World!
    </div>
    <App /> {/* 追加 */}
    </React.StrictMode>,
);