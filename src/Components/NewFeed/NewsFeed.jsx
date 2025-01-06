import React, { useState } from 'react';
import { useApi } from '../../hooks/useQueryHook';
import { ENDPOINTS } from '../../Constants/Endpoints';

const demo = [
  {
    image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600",
    title: "Lorem Ipsum",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, nemo.",
    source: "https://google.com",
    id: 1,
    author: "John Doe",
  },
  {
    image: "https://images.pexels.com/photos/3184298/pexels-photo-3184298.jpeg?auto=compress&cs=tinysrgb&w=600",
    title: "Second News",
    description: "This is a description of the second news item.",
    source: "https://example.com",
    id: 2,
    author: "Jane Smith",
  },
  {
    image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600",
    title: "Lorem Ipsum",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, nemo.",
    source: "https://google.com",
    id: 3,
    author: "John Doe",
  },
  {
    image: "https://images.pexels.com/photos/3184298/pexels-photo-3184298.jpeg?auto=compress&cs=tinysrgb&w=600",
    title: "Second News",
    description: "This is a description of the second news item.",
    source: "https://example.com",
    id: 4,
    author: "Jane Smith",
  },
  {
    image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600",
    title: "Lorem Ipsum",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, nemo.",
    source: "https://google.com",
    id: 5,
    author: "John Doe",
  },
  {
    image: "https://images.pexels.com/photos/3184298/pexels-photo-3184298.jpeg?auto=compress&cs=tinysrgb&w=600",
    title: "Second News",
    description: "This is a description of the second news item.",
    source: "https://example.com",
    id: 6,
    author: "Jane Smith",
  },
];

const NewsFeed = ({sources, categories, toDate, fromDate, searchTerm}) => {
    const {useGetQuery} = useApi();
    
    const [page, setPage] = useState(1);
    const {data, isLoading, isError} = useGetQuery(['news', searchTerm, sources, categories, toDate, fromDate], `https://newsapi.org/v2/${categories === 'all' ? 'everything' : 'top-headlines'}?page=${page}${searchTerm ?`&q=${searchTerm}` : ''}${sources ? `&sources=${sources}` : ''}${categories && categories !== 'all' ? `&category=${categories}` : ''}${toDate ? `&to=${toDate}` : ''}${fromDate ? `&from=${fromDate}` : ''}&apiKey=f2263b2809c4472b835f660f61726a1f`);

    if (isLoading) {
        return <div className='p-4'>Loading...</div>
    }

    if (isError) {
        return <div className='p-4'>Error fetching news</div>
    }
  return (
    <div className="p-4 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {data.articles.map((newsItem) => (
        <div key={newsItem.id} className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col">
          <img
            src={newsItem.urlToImage}
            alt={newsItem.title}
            className="h-48 object-contain"
          />
          <div className="p-4 flex-1 flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-semibold mb-2">{newsItem.title}</h2>
              <p className="text-gray-600 mb-4">{newsItem.description}</p>
            </div>
            <div>
                <div className='flex flex-row justify-between'>
                    <p className="text-gray-500 text-sm">By {newsItem.author}</p>
                    <p>{newsItem.source?.name}</p>
                </div>
              <a
                href={newsItem.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline text-sm"
              >
                Read more
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NewsFeed;