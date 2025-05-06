import { BrowserRouter, Route, Routes } from 'react-router-dom'
import '../src/index.css'
import Register from './pages/Register'
import Login from './pages/Login'
import Home from './pages/Home'
import { AuthProvider } from './context/authContext'
import ActivityDetails from './pages/ActivityDetail'
import Cart from './pages/Cart'

function App() {
  
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home/>}></Route>
            <Route path='/home' element={<Home/>}></Route>
            <Route path='/register' element={<Register />}></Route>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/activity/:id' element={<ActivityDetails />}></Route>
            <Route path='/cart' element={<Cart/>}></Route> 
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  )
}

export default App
