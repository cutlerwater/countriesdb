import React,{useState} from 'react'
import img from "./1x/outline_mode_night_black_24dp.png"
import imgw from "./1x/baseline_mode_night_white_24dp.png"
const Header = () => {
 const [isDark,setIsDark] = useState(false)
 const [mainIMG,setMainIMG] = useState(img)
const darkHandler = ()=>{
 if(isDark){
   setIsDark(!isDark)
   document.getElementById("app").classList.toggle('dark')
   setMainIMG(img)
 }else{
   setIsDark(!isDark)
   document.getElementById("app").classList.toggle('dark')
   setMainIMG(imgw)
 }

}
 return (
  <header id="header" className="flex bg-gray-50 text-gray-800 dark:text-gray-100 dark:bg-gray-700 flex-row font-extrabold lg:text-lg text-md justify-between py-10 px-4 lg:py-9 lg:px-20">
   <h1>Where in the world?</h1>
   <p className="text-md"><a href="https://cutlerwater-profile.netlify.app/">Go Home!</a></p>
   <div className="flex flex-row cursor-pointer" onClick={darkHandler}>
   
    <img id="moon" src={mainIMG} alt="Half moon" className="transform -rotate-180"/>
    
    <p className="text-md">Dark mode</p>
   </div>
  </header>

   )
}

export default Header