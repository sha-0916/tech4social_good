export type City = { name: string; country: string };

export default function CityAutocomplete({
  city,
  setCity,
  suggestions,
}: {
  city: string;
  setCity: (s: string) => void;
  suggestions: City[];
}) {
  return (
    <>
      <input
        list="city-list"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
        placeholder="Start typing…"
        required
      />
      <datalist id="city-list">
        {suggestions.map((c) => (
          <option key={`${c.name}-${c.country}`} value={c.name}>
            {c.name}, {c.country}
          </option>
        ))}
      </datalist>
    </>
  );
}
