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
  const [sources, setSources] = useState([]);
  const [authors] = useState([
    { value: "john-doe", label: "John Doe" },
    { value: "jane-smith", label: "Jane Smith" },
    { value: "alex-johnson", label: "Alex Johnson" },
  ]);

  const dispatch = useDispatch();

  const appliedCategories = useSelector((state) => state.user.category);
  const appliedSources = useSelector((state) => state.user.source);
  const appliedAuthor = useSelector((state) => state.user.author);

  const handleCategoryChange = (selectedOptions) => {
    dispatch(setPreference({ type: "category", value: selectedOptions }));
  };

  const handleSourceChange = (selectedOptions) => {
    dispatch(setPreference({ type: "source", value: selectedOptions }));
  };

  const handleAuthorChange = (selectedOptions) => {
    dispatch(setPreference({ type: "author", value: selectedOptions }));
  };

  const { useGetQuery } = useApi();

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
      <h1 className="text-2xl font-semibold mb-6">Filter Options</h1>
      <div className="w-full max-w-md space-y-4">
        <Select
          isMulti
          options={categories.map((category) => ({
            value: category.toLowerCase(),
            label: category,
          }))}
          styles={customStyles}
          placeholder="Select Categories"
          onChange={handleCategoryChange}
          defaultValue={appliedCategories}
        />
        <Select
          isMulti
          options={sources}
          styles={customStyles}
          placeholder="Select Sources"
          onChange={handleSourceChange}
          defaultValue={appliedSources}
        />
        <Select
          isMulti
          options={authors}
          styles={customStyles}
          placeholder="Select Authors"
          onChange={handleAuthorChange}
          defaultValue={appliedAuthor}
        />
      </div>
    </div>
  );
};

export default ManagePreferences;
