import React from 'react'
import ReactDOM from 'react-dom/client'
import routes from "./pages/RountingHUB.jsx"
import { RouterProvider } from 'react-router-dom';
import "./scss/style.scss"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={routes} />
  </React.StrictMode>,
)
