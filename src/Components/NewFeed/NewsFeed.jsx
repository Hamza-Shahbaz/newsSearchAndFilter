import React, { useEffect, useMemo, useState } from "react";
import { useApi } from "../../hooks/useQueryHook";
import { useSelector } from "react-redux";
import { use } from "react";
import { useGuardianAPI } from "../../context/GuardianApiContext";
import noImageFound from "../../assets/not.jpg";

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

  const [page, setPage] = useState(1);
  const { data, isLoading, isError } = useGetQuery(
    ["news", searchTerm, allSources, newsapiCurrentCategory, toDate, fromDate],
    `${
      userPreferences.selectedOutlet === "NewsApi.org"
        ? "https://newsapi.org/v2/"
        : ""
    }${
      newsapiCurrentCategory && newsapiCurrentCategory !== "all"
        ? "top-headlines"
        : "everything"
    }?page=${page}${searchTerm ? `&q=${searchTerm}` : ""}${
      allSources ? `&sources=${allSources}` : ""
    }${
      newsapiCurrentCategory && newsapiCurrentCategory !== "all"
        ? `&category=${newsapiCurrentCategory}`
        : ""
    }${toDate ? `&to=${toDate}` : ""}${
      fromDate ? `&from=${fromDate}` : ""
    }&apiKey=f2263b2809c4472b835f660f61726a1f`
  );

  const { fetchContent } = useGuardianAPI();
  const [guardianArticles, setGuardianArticles] = useState([]);
  const [guardianIsLoading, setGuardianIsLoading] = useState(false);

  useEffect(() => {
    const loadArticles = async () => {
      if (userPreferences.selectedOutlet !== "Guardian") return;
      try {
        let params = {
          pageSize: 50,
          "show-elements": "image",
        };
        if (fromDate) params["from-date"] = formatDate(fromDate);
        if (toDate) params["to-date"] = formatDate(toDate);
        setGuardianIsLoading(true);
        const response = await fetchContent(searchTerm, params);
        setGuardianArticles(response?.results);
        setGuardianIsLoading(false);
      } catch (err) {
        console.error(err);
        setGuardianIsLoading(false);
      }
    };

    loadArticles();
  }, [userPreferences.selectedOutlet, searchTerm, fromDate, toDate]);

  console.log(guardianArticles);

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
      userPreferences.selectedOutlet,
    ],
    `${
      userPreferences.selectedOutlet === "NewsApi.AI"
        ? "https://eventregistry.org/api/v1/article/getArticles"
        : ""
    }`,
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

  if (
    (isLoading && userPreferences.selectedOutlet == "NewsApi.org") ||
    (newApiAiIsLoading && userPreferences.selectedOutlet == "NewsApi.AI")
  ) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <div className="p-4 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {userPreferences.selectedOutlet == "NewsApi.org" &&
        data?.articles?.map((newsItem) => (
          <div
            key={newsItem.id}
            className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col"
          >
            <img
              src={newsItem.urlToImage || noImageFound}
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
      {userPreferences.selectedOutlet == "NewsApi.AI" &&
        newApiAiData?.articles?.results?.map((newsItem) => (
          <div
            key={newsItem.url}
            className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col"
          >
            <img
              src={newsItem.image || noImageFound}
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
                    By{" "}
                    {newsItem?.authors?.map((author) => author.name).join(", ")}
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

      {userPreferences.selectedOutlet == "Guardian" &&
        guardianArticles?.map((newsItem) => (
          <div
            key={newsItem?.webUrl + newsItem?.apiUrl}
            className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col"
          >
            <img
              src={newsItem?.elements?.[0]?.assets?.[0]?.file || noImageFound}
              alt={newsItem?.webTitle}
              className="h-48 object-contain"
            />
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <h2 className="text-xl font-semibold mb-2">
                  {newsItem?.webTitle}
                </h2>
              </div>
              <div>
                <div className="flex flex-row justify-between">
                  <a
                    href={newsItem.webUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline text-sm"
                  >
                    Read more
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      {(!data?.articles?.length &&
        userPreferences.selectedOutlet == "NewsApi.org" &&
        !isLoading) ||
        (!newApiAiData?.articles?.results?.length &&
          userPreferences.selectedOutlet == "NewsApi.AI" &&
          !newApiAiIsLoading) ||
        (userPreferences.selectedOutlet == "Guardian" &&
          !guardianIsLoading &&
          !guardianArticles.length) && (
            <p className="p-4">
              Could not find anything, try searching for something
            </p>
          )}
    </div>
  );
};

export default NewsFeed;
