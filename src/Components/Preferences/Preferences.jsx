import React from 'react';

const appliedPreferences = ["guardian", "mike wizowsky", "economy", "string", "another"];

const Preferences = () => {
  return (
    <div className="flex flex-row gap-2 p-4 bg-gray-100 rounded-lg shadow-sm">
      <p className="text-lg font-semibold text-gray-700">Preferences:</p>
      <div className="flex flex-wrap items-center gap-2">
        {appliedPreferences.length > 0 ? (
          appliedPreferences.map((pref, index) => (
            <div
              key={index}
              className="flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
            >
              <span>{pref}</span>
              <button
                type="button"
                aria-label={`Remove ${pref}`}
                className="text-red-600 hover:text-red-800"
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
