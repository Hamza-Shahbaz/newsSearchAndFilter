import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { reducePreference } from "../../store/slices/userSlice";

const appliedPreferences = [
  "guardian",
  "mike wizowsky",
  "economy",
  "string",
  "another",
];

const Preferences = () => {
  const dispatch = useDispatch();
  const userPreferences = useSelector((state) => state.user);
  const appliedPreferences = [];

  appliedPreferences.push(
    ...userPreferences?.source?.map((item) => ({ type: 'source', value: item.label }))
  );
  appliedPreferences.push(
    ...userPreferences?.category?.map((item) => ({ type: 'category', value: item.label }))
  );
  appliedPreferences.push(
    ...userPreferences?.author?.map((item) => ({ type: 'author', value: item.label }))
  );
  
  const navigate = useNavigate();
  return (
    <div className="flex flex-row gap-2 p-4 bg-gray-100 rounded-lg shadow-sm">
      <p
        className="text-lg font-semibold text-gray-700 cursor-pointer"
        onClick={() => navigate("/my-profile")}
      >
        Current Preferences:
      </p>
      <div className="flex flex-wrap items-center gap-2">
        {appliedPreferences.length > 0 ? (
          appliedPreferences.map((pref, index) => (
            <div
              key={index}
              className="flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
            >
              <span>{pref.value}</span>
              <button
                type="button"
                aria-label={`Remove ${pref.value}`}
                className="text-red-600 hover:text-red-800"
                onClick={() => dispatch(reducePreference(pref))}
              >
                &times;
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500">None</p>
        )}
      </div>
    </div>
  );
};

export default Preferences;
