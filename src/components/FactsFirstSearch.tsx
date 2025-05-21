import { useState } from "react";

export default function FactsFirstSearch() {
  const [query, setQuery] = useState("");

  return (
    <div className="mt-4">
      <label className="block text-sm font-medium mb-1">
        Search #FactsFirstPH
      </label>
      <div className="flex">
        <input
          type="text"
          placeholder="e.g. Martial Law, vaccines, education budget"
          className="flex-1 p-2 border rounded-l"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <a
          href={`https://factsfirst.ph/fact-checks?q=${encodeURIComponent(query)}`}
          target="_blank"
          className="px-4 py-2 text-white bg-blue-600 rounded-r hover:bg-blue-700"
        >
          Search
        </a>
      </div>
    </div>
  );
}
