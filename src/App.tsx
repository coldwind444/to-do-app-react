import { Route, Routes } from 'react-router-dom'
import AuthLayout from './components/layouts/AuthLayout/AuthLayout'
import AuthPage from './pages/AuthPage/AuthPage'
import AppPage from './pages/AppPage/AppPage'

function App() {

  return (
    <Routes>
      <Route path='/' element={<AuthLayout><AuthPage/></AuthLayout>}/>
      <Route path='/app' element={<AppPage/>}/>
    </Routes>
  )
}

export default App
