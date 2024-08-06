import React from 'react'
import { Outlet } from 'react-router-dom'

const PrivateLayout = () => {
  return (
    <div>
      Layout
      <Outlet></Outlet>
    </div>
  )
}

export default PrivateLayout
