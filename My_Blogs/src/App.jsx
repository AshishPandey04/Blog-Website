import { useEffect, useState } from 'react'
import {useDispatch} from 'react-redux'

import authService from "./appwrite/auth"
import {login,logout} from './store/authSlice'
import {Header,Footer} from "./components"


function App() {
  const [loading,setLoading]=useState(true)
  const dispatch=useDispatch()

  useEffect(()=>{
    authService.getCurrentUser()
    .then((userData)=>{
      if(userData){
        dispatch(login({userData}))
      }else{
        dispatch(logout())
      }

    })
    .finally(()=> setLoading(false))
  },[])
  
return !loading?(
  <div className='min-h-screen flex flex-wrap content-between 
  bg-orange-100'>
    <div className='w-full block'>
      <Header/>
      <main>
        {/* <outlet/> */}
      </main>
      <Footer/>
    </div>
  </div>
):null
// loading ka mssg bhi dikha sakte hain
}

export default App
