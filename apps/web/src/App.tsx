/**
 * App Root Component
 * Provides Jotai context and renders the main application
 */

import { Provider } from 'jotai';
import { MermaidApp } from './components';

function App(): JSX.Element {
  return (
    <Provider>
      <MermaidApp />
    </Provider>
  );
}

export default App;
