import { Route, Routes } from 'react-router-dom'
import AuthLayout from './components/layouts/AuthLayout/AuthLayout'
import AuthPage from './pages/AuthPage/AuthPage'
import AppPage from './pages/AppPage/AppPage'
import { ResetPasswordPage } from './pages/ResetPasswordPage/ResetPassword'

function App() {

  return (
    <Routes>
      <Route path='/' element={<AuthLayout><AuthPage/></AuthLayout>}/>
      <Route path='/app' element={<AppPage/>}/>
      <Route path='/password-recover' element={<AuthLayout><ResetPasswordPage/></AuthLayout>}/>
    </Routes>
  )
}

export default App
