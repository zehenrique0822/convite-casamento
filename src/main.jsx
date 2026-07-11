import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Sem React.StrictMode de propósito: a montagem dupla do StrictMode em
// desenvolvimento faz o react-pageflip inicializar errado (páginas em branco
// / flip travado). Em produção isso não ocorreria, mas como o teste é em dev
// no celular, deixamos fora para o efeito de virar página funcionar sempre.
ReactDOM.createRoot(document.getElementById('root')).render(<App />)
