import { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import districtBranches from "../../public/data/warehouses.json"; // Or keep in this file if not separate

// Fix Leaflet icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
});

// 👇 Component to center map programmatically
const FlyToMarker = ({ position }) => {
  const map = useMap();

  useEffect(() => {
    if (position) {
      map.flyTo(position, 11, { duration: 1.5 });
    }
  }, [position, map]);

  return null;
};

const CoverageMap = () => {
  const [search, setSearch] = useState("");
  const [flyToPosition, setFlyToPosition] = useState(null);

  const filteredBranches = districtBranches.filter((branch) =>
    branch.district.toLowerCase().includes(search.toLowerCase())
  );

  // Auto center when one district matches
  useEffect(() => {
    if (search.trim() === "") {
      setFlyToPosition(null);
      return;
    }
  
    const matched = districtBranches.filter((branch) =>
      branch.district.toLowerCase().includes(search.toLowerCase())
    );
  
    if (
      matched.length === 1 &&
      (flyToPosition === null ||
        flyToPosition[0] !== matched[0].latitude ||
        flyToPosition[1] !== matched[0].longitude)
    ) {
      setFlyToPosition([matched[0].latitude, matched[0].longitude]);
    }
  }, [search]);
  
  

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold text-center mb-6">
        We are available in 64 districts
      </h2>

      <input
        type="text"
        placeholder="Search District..."
        className="input input-bordered w-full max-w-md mx-auto block mb-6"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <MapContainer
        center={[23.685, 90.3563]} // Default center
        zoom={7}
        scrollWheelZoom={true}
        className="h-[800px] w-full rounded shadow"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {flyToPosition && <FlyToMarker position={flyToPosition} />}

        {filteredBranches.map((branch, index) => (
          <Marker
            key={index}
            position={[branch.latitude, branch.longitude]}
          >
            <Popup>
              <div className="text-sm">
                <h3 className="font-bold text-base">{branch.district}</h3>
                <p>City: {branch.city}</p>
                <p>
                  Areas:{" "}
                  <span className="text-xs text-gray-700">
                    {branch.covered_area.join(", ")}
                  </span>
                </p>
                <img
                  src={branch.flowchart}
                  alt={`${branch.district} Flowchart`}
                  className="mt-2 rounded w-full h-24 object-cover"
                />
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default CoverageMap;
