"use client"

import * as React from "react"
import { useTheme } from "next-themes"



export function ModeToggle() {
  const { setTheme } = useTheme()

  return (
    <>
      <div>
        <button>

          <span className="sr-only">Toggle theme</span>
        </button>
      </div>
      <div className="flex gap-4">
        <div onClick={() => setTheme("light")}>
          Light
        </div>
        <div onClick={() => setTheme("dark")}>
          Dark
        </div>
        {/* <div onClick={() => setTheme("system")}>
          System
        </div> */}
      </div>
    </>
  )
}
