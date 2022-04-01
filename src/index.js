//import ReactDOM from 'react-dom';
import React from 'react';
import './index.css';
import App from './App';
import * as ReactDOMClient from 'react-dom/client';

const rootElement = document.getElementById("root");

const root = ReactDOMClient.createRoot(rootElement);
root.render(<App callback={() => console.log("Renderizado el app")} />);

