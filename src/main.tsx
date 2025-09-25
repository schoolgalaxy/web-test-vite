import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from "./App.tsx";
import "./index.css";
import reportWebVitals from "./util/reportWebVitals";
import { sendToAnalytics } from "./util/analytics"
import { Amplify } from "aws-amplify";
import outputs from "../amplify_outputs.json";

import '@aws-amplify/ui-react/styles.css';

Amplify.configure(outputs);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

reportWebVitals(sendToAnalytics);
