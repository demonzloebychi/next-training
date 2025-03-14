"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { useState } from "react"
import { Button } from "../Button"


export function ModeToggle() {
  const { setTheme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)

  function HandleToggleTheme(e: any) {
    setIsOpen(!isOpen)
    if(!isOpen){
      setTimeout(()=>setIsOpen(false), 3000)
    }
  }




  return (
    <>
      <div className="toggle-menu">
        {/* <button 
          id="toggleButton"
          // onClick={()=> setIsOpen(!isOpen)}
          onClick={HandleToggleTheme}
          className="toggle-button"
        >
          Switch theme

          

        </button> */}

        <Button 
          className={'toggle-button'}
          id='toggleButton' 
          onClick={HandleToggleTheme}
          
        >
          Сменить тему
        </Button>



        <div 
            className={`actions-menu ${isOpen ? 'active' : ''}`}
          >
            <button onClick={() => setTheme("light")}>
              Light
            </button>
     
            <button 
              onClick={() => setTheme("dark")}
            >
              Dark
            </button>
            {/* <div onClick={() => setTheme("system")}>
              System
            </div> */}
          </div>
      </div>
     
    </>
  )
}
