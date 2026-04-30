import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { I18nProvider } from './context/I18nContext'
import { MarketplaceProvider } from './context/MarketplaceContext'
import { AuthProvider } from './context/AuthContext'
import { CatalogProvider } from './context/CatalogContext'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <I18nProvider>
        <MarketplaceProvider>
          <AuthProvider>
            <CatalogProvider>
              <App />
            </CatalogProvider>
          </AuthProvider>
        </MarketplaceProvider>
      </I18nProvider>
    </BrowserRouter>
  </StrictMode>,
)
