export type AgeBand = "5-10" | "11-15" | "16-20";

export default function AgeSelector({
  value,
  onChange,
}: {
  value: AgeBand;
  onChange: (a: AgeBand) => void;
}) {
  const bands: AgeBand[] = ["5-10", "11-15", "16-20"];
  return (
    <div className="flex items-center justify-center gap-2">
      {bands.map((band) => (
        <button
          key={band}
          type="button"
          onClick={() => onChange(band)}
          className={`rounded-full px-3 py-1.5 text-sm font-semibold transition ${
            value === band
              ? "bg-gradient-to-r from-green-500 via-blue-500 to-purple-600 text-white"
              : "bg-gray-200 text-gray-800 hover:bg-gray-300"
          }`}
          aria-pressed={value === band}
        >
          {band}
        </button>
      ))}
    </div>
  );
}
