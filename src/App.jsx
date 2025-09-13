import React from 'react';
import { Provider } from 'react-redux';
import store from '@/store';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Views from './views/Views';
import { Helmet } from 'react-helmet';

const SITE_TITLE = import.meta.env.VITE_SITE_TITLE || "Journal Florist | POS System";
const DESCRIPTION = import.meta.env.VITE_DESCRIPTION || "Journal Application";
const FAVICON = "/favicon.png";

function App() {
  return (
    <div className="App">
      <Helmet>
        {SITE_TITLE && <title>{SITE_TITLE}</title>}
        {FAVICON && <link rel="icon" href={FAVICON} />}
        {FAVICON && <meta property="og:image" content={FAVICON} />}
        {FAVICON && <link rel="apple-touch-icon" href={FAVICON} />}
        {DESCRIPTION && <meta name="description" content={DESCRIPTION} />}
      </Helmet>

      <Provider store={store}>
        <Router>
          <Routes>
            <Route path="/*" element={<Views />} />
          </Routes>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
