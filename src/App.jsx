import { ReduxProvider } from './redux/provider';
import MainRouter from './routesConfig/MainRouter';
import './App.css'

function App() {
  return (
    <>
      <ReduxProvider>
        <MainRouter />
      </ReduxProvider>
    </>
  )
}

export default App
