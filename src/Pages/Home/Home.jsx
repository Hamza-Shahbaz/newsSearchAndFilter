import React, { useState } from 'react'
import Preferences from '../../Components/Preferences/Preferences'
import Search from '../../Components/Search/Search'
import Filters from '../../Components/Filters/Filters'
import NewsFeed from '../../Components/NewFeed/NewsFeed'
import { useSelector } from 'react-redux'

const Home = () => {

  const [sources, setSources] = useState('');
  const [categories, setCategories] = useState('');
  const [toDate, setToDate] = useState(null);
  const [fromDate, setFromDate] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const userPreference = useSelector((state) => state.user)

  return (
    <div className='flex flex-col grow'>
        <Preferences/>
        <div className='flex flex-col lg:flex-row gap-4 justify-between p-4'>
            <Search setSearchTerm={setSearchTerm}/>
            <Filters setSources={setSources} setCategories={setCategories} setToDate={setToDate} setFromDate={setFromDate}/>
        </div>
        {
          (searchTerm || sources || userPreference?.source?.value) ? 
          <NewsFeed sources={sources} categories={categories} toDate={toDate} fromDate={fromDate} searchTerm={searchTerm}/>
          : <p className='p-4 text-gray-500 text-center text-lg font-semibold'>Please enter a search term or select source</p>
        }
    </div>
  )
}

export default Home