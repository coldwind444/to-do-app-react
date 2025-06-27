import { Route, Routes } from 'react-router-dom'
import AuthLayout from './components/layouts/AuthLayout/AuthLayout'
import AuthPage from './pages/AuthPage/AuthPage'
import AppPage from './pages/AppPage/AppPage'
import { ResetPasswordPage } from './pages/ResetPasswordPage/ResetPassword'
import { OAuth2SuccessPage } from './pages/AuthPage/OAuth2SuccessPage'

function App() {

  return (
    <Routes>
      <Route path='/' element={<AuthLayout><AuthPage/></AuthLayout>}/>
      <Route path='/app' element={<AppPage/>}/>
      <Route path='/password-recover' element={<AuthLayout><ResetPasswordPage/></AuthLayout>}/>
      <Route path='/auth/google/oauth2-success' element={<OAuth2SuccessPage/>}/>
    </Routes>
  )
}

export default App
