import React, { useEffect, useMemo, useState } from "react";
import { useApi } from "../../hooks/useQueryHook";
import { useSelector } from "react-redux";
import { sources as sourcesForNewsApi } from "./sourcesForNewsApiOrg";

const demo = [
  {
    image:
      "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600",
    title: "Lorem Ipsum",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, nemo.",
    source: "https://google.com",
    id: 1,
    author: "John Doe",
  },
  {
    image:
      "https://images.pexels.com/photos/3184298/pexels-photo-3184298.jpeg?auto=compress&cs=tinysrgb&w=600",
    title: "Second News",
    description: "This is a description of the second news item.",
    source: "https://example.com",
    id: 2,
    author: "Jane Smith",
  },
  {
    image:
      "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600",
    title: "Lorem Ipsum",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, nemo.",
    source: "https://google.com",
    id: 3,
    author: "John Doe",
  },
  {
    image:
      "https://images.pexels.com/photos/3184298/pexels-photo-3184298.jpeg?auto=compress&cs=tinysrgb&w=600",
    title: "Second News",
    description: "This is a description of the second news item.",
    source: "https://example.com",
    id: 4,
    author: "Jane Smith",
  },
  {
    image:
      "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600",
    title: "Lorem Ipsum",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, nemo.",
    source: "https://google.com",
    id: 5,
    author: "John Doe",
  },
  {
    image:
      "https://images.pexels.com/photos/3184298/pexels-photo-3184298.jpeg?auto=compress&cs=tinysrgb&w=600",
    title: "Second News",
    description: "This is a description of the second news item.",
    source: "https://example.com",
    id: 6,
    author: "Jane Smith",
  },
];

const categoriesForNewsApi = [
  "all",
  "business",
  "entertainment",
  "health",
  "science",
  "sports",
  "technology",
  "general",
];

const formatDate = (date) => {
  if (!date) return null;
  return new Date(date).toISOString().split("T")[0]; // Extract YYYY-MM-DD
};

const NewsFeed = ({ sources, categories, toDate, fromDate, searchTerm }) => {
  const { useGetQuery } = useApi();

  const userPreferences = useSelector((state) => state.user);
  const allSources = sources || userPreferences.source?.value;
  const newsapiCurrentCategory = categories
    ? categories
    : userPreferences.category?.value;
  const allAuthor = userPreferences.author?.value;

  const categoreisForNewsApiOrg = newsapiCurrentCategory
    ? categoriesForNewsApi.includes(
        newsapiCurrentCategory.split("/")[1].toLowerCase()
      )
      ? newsapiCurrentCategory.split("/")[1].toLowerCase()
      : "general"
    : "";

  const sourcesForNewsApiOrg = allSources
    ? sourcesForNewsApi.find((item) => item.url === "https://" + allSources)?.id || "notfound"
    : "";

  const authorForNewsApiOrg = allAuthor ? userPreferences?.author?.label : "";

  const [page, setPage] = useState(1);
  console.log(authorForNewsApiOrg, userPreferences);
  const { data, isLoading, isError } = useGetQuery(
    [
      "news",
      searchTerm,
      sourcesForNewsApiOrg,
      categoreisForNewsApiOrg,
      toDate,
      fromDate,
    ],
    `${userPreferences.selectedOutlet === "NewsApi.org" ? 'https://newsapi.org/v2/' : ""}${
      (categoreisForNewsApiOrg && categoreisForNewsApiOrg !== "all" || (!categoreisForNewsApiOrg && !sourcesForNewsApiOrg && !searchTerm))
        ? "top-headlines"
        : "everything"
    }?page=${page}${searchTerm ? `&q=${searchTerm}` : ""}${
      sourcesForNewsApiOrg ? `&sources=${sourcesForNewsApiOrg}` : ""
    }${
      categoreisForNewsApiOrg && categoreisForNewsApiOrg !== "all"
        ? `&category=${categoreisForNewsApiOrg}`
        : ""
    }${toDate ? `&to=${toDate}` : ""}${
      fromDate ? `&from=${fromDate}` : ""
    }&apiKey=f2263b2809c4472b835f660f61726a1f`
  );

  const {
    data: newApiAiData,
    isLoading: newApiAiIsLoading,
    isError: newApiAiIsError,
  } = useGetQuery(
    [
      "newsapiai",
      searchTerm,
      allSources,
      newsapiCurrentCategory,
      toDate,
      fromDate,
      allAuthor,
      userPreferences.selectedOutlet
    ],
    `${userPreferences.selectedOutlet === "NewsApi.AI" ? 'https://eventregistry.org/api/v1/article/getArticles' : ""}`,
    {
      keyword: searchTerm,
      sourceUri: allSources,
      authorUri: allAuthor,
      categoryUri: newsapiCurrentCategory,
      dateStart: formatDate(fromDate),
      dateEnd: formatDate(toDate),
      apiKey: "3a59952e-f5ad-45cf-b056-ba7b3a8a3971",
    }
  );

  if (isLoading && newApiAiIsLoading) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <div className="p-4 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {(authorForNewsApiOrg
        ? data?.articles.filter(
            (article) => article.author === authorForNewsApiOrg
          )
        : data?.articles
      )?.map((newsItem) => (
        <div
          key={newsItem.id}
          className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col"
        >
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
              <div className="flex flex-row justify-between">
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
      {newApiAiData?.articles?.results?.map((newsItem) => (
        <div
          key={newsItem.url}
          className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col"
        >
          <img
            src={newsItem.image}
            alt={newsItem.title}
            className="h-48 object-contain"
          />
          <div className="p-4 flex-1 flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-semibold mb-2">{newsItem.title}</h2>
              <p className="text-gray-600 mb-4">
                {newsItem.body.length > 50
                  ? `${newsItem.body.slice(0, 50)}...`
                  : newsItem.body}
              </p>
            </div>
            <div>
              <div className="flex flex-row justify-between">
                <p className="text-gray-500 text-sm">
                  By {newsItem?.authors?.join(" ")}
                </p>
                <p>{newsItem.source?.title}</p>
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
      {
        !(authorForNewsApiOrg
          ? data?.articles.filter(
              (article) => article.author === authorForNewsApiOrg
            )
          : data?.articles
        )?.length && !newApiAiData?.articles?.results?.lengthc && !isLoading && !newApiAiIsLoading &&
        <p className="p-4">Could not find anything, try searching for something</p>
      }
      {/* {demo.map((newsItem) => (
        <div
          key={newsItem.id}
          className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col"
        >
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
              <div className="flex flex-row justify-between">
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
      ))} */}
    </div>
  );
};

export default NewsFeed;
