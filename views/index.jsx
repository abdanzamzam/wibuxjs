import React from 'react';
import { hydrateRoot } from 'react-dom/client'; // React 18

// Dynamic import to support CommonJS and ES Modules
import components from '../routes/pages';

// Retrieve the component name sent from the server
const componentName = window.__INITIAL_COMPONENT__;
const Component = components[componentName]?.default || components[componentName];

if (!Component) {
    throw new Error(`Component "${componentName}" not found.`);
}

// Target root element
const rootElement = document.getElementById('root');

// Perform rehydration
hydrateRoot(
    rootElement,
    <Component {...window.__INITIAL_PROPS__} />
);