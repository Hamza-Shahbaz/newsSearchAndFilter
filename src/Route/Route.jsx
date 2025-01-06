import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '../Pages/Home/Home'
import Header from '../Components/Header/Header'
import ManagePreferences from '../Pages/ManagePreferences/ManagePreferences'

const MainRoute = () => {
  return (
    <>
    <Header/>
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/my-profile" element={<ManagePreferences />} />
    </Routes>
    </>
  )
}

export default MainRoute