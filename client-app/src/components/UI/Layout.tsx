import './Layout.css'
import React, { PropsWithChildren } from 'react'

export const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className='layout'>
        {children}
    </div>
  )
}

export default Layout
