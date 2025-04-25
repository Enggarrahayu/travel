import { BrowserRouter, Route, Routes } from 'react-router-dom'
import '../src/index.css'
import Register from './components/Register'
import Login from './components/Login'

function App() {
  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/register' element={<Register />}></Route>
          <Route path='/login' element={<Login/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
