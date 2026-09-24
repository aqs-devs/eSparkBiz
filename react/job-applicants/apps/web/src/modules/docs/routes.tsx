import type { RouteObject } from 'react-router';
import DocumentationPage from './pages/DocumentationPage';

export default [{ path: 'docs', element: <DocumentationPage /> }] satisfies RouteObject[];
