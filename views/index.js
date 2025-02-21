import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import pages from './pages';

const componentName = window.__INITIAL_COMPONENT__;
const Component = pages[componentName]?.default || pages[componentName];

if (!Component) throw new Error(`Component "${componentName}" not found.`);

const rootElement = document.getElementById('root');

hydrateRoot(
    rootElement,
    <Component {...window.__INITIAL_PROPS__} />
);