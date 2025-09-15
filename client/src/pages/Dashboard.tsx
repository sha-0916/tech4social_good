export default function Dashboard() {
  return (
    <div>
      <div className="mb-3 md:mb-4 text-slate-700">
        <span className="font-semibold">Berlin</span> snapshot
        <span className="text-slate-500"> — Germany</span>
      </div>

      {/* Example grid frame; keep your working tiles here */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="cl-card cl-card-pad hover-lift h-48 flex items-center justify-center">
          <span className="text-slate-600">Sky Mood (AQI)</span>
        </div>
        <div className="cl-card cl-card-pad hover-lift h-48 flex items-center justify-center">
          <span className="text-slate-600">Tree Buddy (Renewables)</span>
        </div>
        <div className="cl-card cl-card-pad hover-lift h-48 flex items-center justify-center">
          <span className="text-slate-600">Water Droplet (Stress)</span>
        </div>
        <div className="cl-card cl-card-pad hover-lift h-48 flex items-center justify-center">
          <span className="text-slate-600">City Thermometer</span>
        </div>
        <div className="cl-card cl-card-pad hover-lift h-48 flex items-center justify-center">
          <span className="text-slate-600">Coastline Shield</span>
        </div>
        <div className="cl-card cl-card-pad hover-lift h-48 flex items-center justify-center">
          <span className="text-slate-600">Action Streak</span>
        </div>
      </div>
    </div>
  );
}
