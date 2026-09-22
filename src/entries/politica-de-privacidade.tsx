import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../index.css'
import { PoliticaDePrivacidadePage } from '../pages/PoliticaDePrivacidadePage'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PoliticaDePrivacidadePage />
  </StrictMode>,
)
