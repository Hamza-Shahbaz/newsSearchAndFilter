import React, { useEffect, useState } from "react";
import Select from "react-select";
import CustomDatePicker from "../DatePicker/DatePicker";
import { useApi } from "../../hooks/useQueryHook";

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

const categories = ['business','entertainment','health','science','sports','technology','general', 'all'];

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

const Filters = ({setToDate, setFromDate, setCategories, setSources}) => {

  const [sourcesFromApi, setSourcesFromApi] = useState([]);

  const {useGetQuery} = useApi();

  const {data, isLoading, isError} = useGetQuery(['news'], 'https://newsapi.org/v2/top-headlines/sources/api/proxy?apiKey=f2263b2809c4472b835f660f61726a1f');

  
  useEffect(() => {
    if (data && data.sources) {
      setSourcesFromApi(data.sources.map((source) => ({ value: source.id, label: source.name })));
      console.log(data.sources)
    }
  }, [data]);

  if (isLoading) {
    return <div className="flex flex-col fl:flex-row gap-4 justify-between items-stretch lg:min-w-[600px]">Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching news sources</div>;
  }

  return (
    <div className="flex flex-col fl:flex-row gap-4 justify-between items-stretch lg:min-w-[600px]">
      <div className="flex flex-col xs:flex-row gap-4 flex-grow">
        <Select
          options={categories.map((category) => ({ value: category, label: category }))}
          styles={customStyles}
          placeholder="Filter Category"
          className="flex-grow"
          onChange={({ value }) => setCategories(value)}
        />
        <Select
          options={sourcesFromApi}
          styles={customStyles}
          placeholder="Filter Source"
          className="flex-grow"
          onChange={({ value }) => setSources(value)}
        />
      </div>
      <div className="flex-grow">
        <CustomDatePicker setFromDate={setFromDate} setToDate={setToDate}/>
      </div>
    </div>
  );
};

export default Filters;
