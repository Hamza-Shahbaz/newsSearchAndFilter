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

  if(userPreferences.source?.value) {
    appliedPreferences.push({ type: 'source', value: userPreferences.source.value, label: userPreferences.source.label });
  }
  if(userPreferences.author?.value) {
    appliedPreferences.push({ type: 'author', value: userPreferences.author.value, label: userPreferences.author.label });
  }
  if(userPreferences.category?.value) {
    appliedPreferences.push({ type: 'category', value: userPreferences.category.value, label: userPreferences.category.label });
  }
  
  const navigate = useNavigate();
  return (
    <div className="flex flex-row gap-2 p-4 pl-20 bg-gray-100 rounded-lg shadow-sm">
      <p
        className="text-lg font-semibold text-gray-700 cursor-pointer text-blue-600 hover:text-blue-800"
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
          <>
            <p className="text-gray-500">None</p>
            <button onClick={() => navigate("/my-profile")} className="text-blue-600 hover:text-blue-800 mx-2">Set Preferences</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Preferences;
