import React, { useEffect, useState } from "react";
import Select from "react-select";
import CustomDatePicker from "../DatePicker/DatePicker";
import { useApi } from "../../hooks/useQueryHook";
import { useSelector } from "react-redux";

const categoriesForOrg = [
  "business",
  "entertainment",
  "health",
  "science",
  "sports",
  "technology",
  "general",
  "all",
];

// React-Select custom styles
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
  singleValue: (provided) => ({
    ...provided,
    color: "#374151", // Tailwind's `text-gray-800`
  }),
};

const Filters = ({ setToDate, setFromDate, setCategories, setSources }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSource, setSelectedSource] = useState(null);
  const userPreference = useSelector((state) => state.user);

  const { useGetQuery } = useApi();

  const { data, isLoading, isError } = useGetQuery(
    ["sources", userPreference.selectedOutlet],
    `${
      userPreference.selectedOutlet === "NewsApi.AI"
        ? "https://eventregistry.org/api/v1/suggestSources"
        : ""
    }`,
    {
      apiKey: "3a59952e-f5ad-45cf-b056-ba7b3a8a3971",
    }
  );

  const { data: categories, isLoading: categoriesLoading } = useGetQuery(
    ["categories", userPreference.selectedOutlet],
    `${
      userPreference.selectedOutlet === "NewsApi.AI"
        ? "https://eventregistry.org/api/v1/suggestCategoriesFast"
        : ""
    }`,
    {
      apiKey: "3a59952e-f5ad-45cf-b056-ba7b3a8a3971",
    }
  );

  const { data: sourcesFromOrg, isLoading: isLoadingOrg } = useGetQuery(
    ["sourcesOrg", userPreference.selectedOutlet],
    `${
      userPreference.selectedOutlet === "NewsApi.org"
        ? "https://newsapi.org/v2/top-headlines/sources?apiKey=f2263b2809c4472b835f660f61726a1f"
        : ""
    }`
  );

  const optionsForCategories =
    userPreference.selectedOutlet === "NewsApi.AI"
      ? categories?.map((category) => ({
          value: category?.uri,
          label: category?.label,
        }))
      : userPreference.selectedOutlet === "NewsApi.org"
      ? categoriesForOrg.map((category) => ({
          value: category,
          label: category,
        }))
      : [];

  const optionsForSources =
    userPreference.selectedOutlet === "NewsApi.AI"
      ? data?.map((source) => ({
          value: source?.uri,
          label: source?.title,
        }))
      : userPreference.selectedOutlet === "NewsApi.org"
      ? sourcesFromOrg?.sources.map((source) => ({
          value: source?.id,
          label: source?.name,
        }))
      : [];

  useEffect(() => {
    setSelectedCategory("");
    setSelectedSource("");
    setCategories("");
    setSources("");
  }, [userPreference.selectedOutlet]);

  return (
    <div className="flex flex-col fl:flex-row gap-4 justify-between items-stretch lg:min-w-[600px]">
      {userPreference.selectedOutlet !== "Guardian" ? (
        <div className="flex flex-col xs:flex-row gap-4 flex-grow">
          {categoriesLoading ? (
            <div>Loading categories...</div>
          ) : (
            <Select
              options={optionsForCategories}
              styles={customStyles}
              placeholder="Filter Category"
              className="flex-grow"
              value={selectedCategory}
              onChange={(selectedOption) => {
                setSelectedCategory(selectedOption);
                setCategories(selectedOption ? selectedOption.value : null);
              }}
              isClearable
            />
          )}
          {isLoading || isLoadingOrg ? (
            <div>Loading sources...</div>
          ) : (
            <Select
              options={optionsForSources}
              styles={customStyles}
              placeholder="Filter Source"
              className="flex-grow"
              value={selectedSource}
              onChange={(selectedOption) => {
                setSelectedSource(selectedOption);
                setSources(selectedOption ? selectedOption.value : null);
              }}
              isClearable
            />
          )}
        </div>
      ) : (
        <p className="text-center mt-4">Filters Not supported for Guardian</p>
      )}
      <div className="flex-grow">
        <CustomDatePicker setFromDate={setFromDate} setToDate={setToDate} />
      </div>
    </div>
  );
};

export default Filters;
