import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '../Pages/Home/Home'
import Header from '../Components/Header/Header'

const MainRoute = () => {
  return (
    <>
    <Header/>
    <Routes>
        <Route path="/" element={<Home />} />
    </Routes>
    </>
  )
}

export default MainRoute