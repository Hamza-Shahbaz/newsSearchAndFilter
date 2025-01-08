import React, { useEffect, useState } from "react";
import Select from "react-select";
import axios from "axios";
import { useApi } from "../../hooks/useQueryHook";
import { useDispatch, useSelector } from "react-redux";
import { setPreference } from "../../store/slices/userSlice";

const customStyles = {
  control: (provided) => ({
    ...provided,
    border: "2px solid #E5E7EB", // Tailwind's `border-gray-300`
    borderRadius: "0.5rem", // Tailwind's `rounded-lg`
    padding: "0.375rem", // Adjust padding
    boxShadow: "none",
    "&:hover": {
      borderColor: "#3B82F6", // Tailwind's `border-blue-500`
    },
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "#6B7280", // Tailwind's `text-gray-500`
  }),
  multiValue: (provided) => ({
    ...provided,
    backgroundColor: "#EFF6FF", // Tailwind's `bg-blue-100`
    color: "#1E40AF", // Tailwind's `text-blue-900`
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    color: "#1E40AF", // Tailwind's `text-blue-900`
  }),
};

const ManagePreferences = () => {
  const [categories] = useState([
    "Business",
    "Entertainment",
    "Health",
    "Science",
    "Sports",
    "Technology",
    "General",
  ]);
  const [sourcesPrefix, setSourcesPrefix] = useState("");
  const [sourcesPrefixDebounce, setSourcesPrefixDebounce] = useState("");
  const [authorPrefix, setAuthorPrefix] = useState("");
  const [authorPrefixDebounce, setAuthorPrefixDebounce] = useState("");
  const [categoryPrefix, setCategoryPrefix] = useState("");
  const [categoryPrefixDebounce, setCategoryPrefixDebounce] = useState("");

  const dispatch = useDispatch();

  const appliedCategories = useSelector((state) => state.user.category);
  const appliedSources = useSelector((state) => state.user.source);
  const appliedAuthor = useSelector((state) => state.user.author);

  const handleCategoryChange = (selectedOptions) => {
    if (selectedOptions) {
      dispatch(setPreference({ type: "category", value: selectedOptions }));
    } else {
      dispatch(setPreference({ type: "category", value: [] }));
    }
  };

  const handleSourceChange = (selectedOptions) => {
    dispatch(setPreference({ type: "source", value: selectedOptions }));
  };

  const handleAuthorChange = (selectedOptions) => {
    dispatch(setPreference({ type: "author", value: selectedOptions }));
  };

  const { useGetQuery } = useApi();

  const { data: authorData, isLoading: authorLoading } = useGetQuery(
    ["authors", authorPrefixDebounce],
    "https://eventregistry.org/api/v1/suggestAuthorsFast",
    {
      apiKey: "3a59952e-f5ad-45cf-b056-ba7b3a8a3971",
      prefix: authorPrefixDebounce,
    }
  );

  const { data: catData, isLoading: catLoading } = useGetQuery(
    ["categories", categoryPrefixDebounce],
    "https://eventregistry.org/api/v1/suggestCategoriesFast",
    {
      apiKey: "3a59952e-f5ad-45cf-b056-ba7b3a8a3971",
      prefix: categoryPrefixDebounce,
    }
  );

  const { data: sourceData, isLoading: sourceLoading } = useGetQuery(
    ["sources", sourcesPrefixDebounce],
    "https://eventregistry.org/api/v1/suggestSourcesFast",
    {
      apiKey: "3a59952e-f5ad-45cf-b056-ba7b3a8a3971",
      prefix: sourcesPrefixDebounce,
    }
  );

  const handleAuthorPrefixChange = (e) => {
    setAuthorPrefix(e.target.value);
    const timer = setTimeout(() => {
      setAuthorPrefixDebounce(e.target.value);
    }, 800);
    return () => clearTimeout(timer);
  };

  const handleCategoryPrefixChange = (e) => {
    setCategoryPrefix(e.target.value);
    const timer = setTimeout(() => {
      setCategoryPrefixDebounce(e.target.value);
    }, 800);
    return () => clearTimeout(timer);
  };

  const handleSourcesPrefixChange = (e) => {
    setSourcesPrefix(e.target.value);
    const timer = setTimeout(() => {
      setSourcesPrefixDebounce(e.target.value);
    }, 800);
    return () => clearTimeout(timer);
  };

  //   const { data, isLoading, isError } = useGetQuery(
//     ["news"],
//     "https://newsapi.org/v2/top-headlines/sources?apiKey=f2263b2809c4472b835f660f61726a1f"
//   );

//   useEffect(() => {
//     if (data && data.sources) {
//       setSources(
//         data.sources.map((source) => ({ value: source.id, label: source.name }))
//       );
//     }
//   }, [data]);

//   if (isLoading) {
//     return (
//       <div className="flex flex-col fl:flex-row gap-4 justify-between items-stretch lg:min-w-[600px]">
//         Loading...
//       </div>
//     );
//   }

//   if (isError) {
//     return <div>Error fetching news sources</div>;
//   }

  return (
    <div className="flex flex-col items-center h-screen bg-gray-50 p-4">
      <h1 className="text-2xl font-semibold mb-6">Manage Preferences</h1>
      <div
        className="grid gap-4 w-full max-w-md"
        style={{
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        }}
      >
        {/* Category Row */}
        <div className="flex flex-col md:flex-row md:items-center gap-2">
          <input
            type="text"
            value={categoryPrefix}
            onChange={handleCategoryPrefixChange}
            placeholder="Enter Category Prefix"
            className="w-full md:w-auto flex-1 p-2 border-2 border-gray-300 rounded-lg"
          />
          {catLoading ? (
            <div>Loading...</div>
          ) : (
            <Select
              options={catData?.map((category) => ({
                value: category.uri,
                label: category.label,
              }))}
              styles={customStyles}
              placeholder="Select Categories"
              onChange={handleCategoryChange}
              defaultValue={appliedCategories}
              isClearable
              className="w-full md:w-auto flex-1"
            />
          )}
        </div>
  
        {/* Source Row */}
        <div className="flex flex-col md:flex-row md:items-center gap-2">
          <input
            type="text"
            value={sourcesPrefix}
            onChange={handleSourcesPrefixChange}
            placeholder="Enter Source Prefix"
            className="w-full md:w-auto flex-1 p-2 border-2 border-gray-300 rounded-lg"
          />
          {sourceLoading ? (
            <div>Loading...</div>
          ) : (
            <Select
              options={sourceData?.map((source) => ({
                value: source.uri,
                label: source.title,
              }))}
              styles={customStyles}
              placeholder="Select Sources"
              onChange={handleSourceChange}
              defaultValue={appliedSources}
              isClearable
              className="w-full md:w-auto flex-1"
            />
          )}
        </div>
  
        {/* Author Row */}
        <div className="flex flex-col md:flex-row md:items-center gap-2">
          <input
            type="text"
            value={authorPrefix}
            onChange={handleAuthorPrefixChange}
            placeholder="Enter Author Prefix"
            className="w-full md:w-auto flex-1 p-2 border-2 border-gray-300 rounded-lg"
          />
          {authorLoading ? (
            <div>Loading...</div>
          ) : (
            <Select
              options={authorData?.map((author) => ({
                value: author.uri,
                label: author.name,
              }))}
              styles={customStyles}
              placeholder="Select Authors"
              onChange={handleAuthorChange}
              defaultValue={appliedAuthor}
              isClearable
              className="w-full md:w-auto flex-1"
            />
          )}
        </div>
      </div>
    </div>
  );
  
};

export default ManagePreferences;
