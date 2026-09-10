import { Link } from "wouter";
import { lessons } from "@/lib/lessons";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin } from "lucide-react";
import { useState } from "react";
import { MapView } from "@/components/Map";

// All unique locations from lessons with coordinates
const mapLocations = [
  { lat: 42.36, lng: -71.06, label: "Boston", lessons: [1, 5, 7, 8, 10, 15, 16] },
  { lat: 39.95, lng: -75.17, label: "Philadelphia", lessons: [12, 17, 18, 19, 20, 21, 22, 73, 74] },
  { lat: 40.71, lng: -74.01, label: "New York City", lessons: [1, 26, 27, 32, 79] },
  { lat: 32.78, lng: -79.93, label: "Charleston", lessons: [1, 56] },
  { lat: 42.45, lng: -71.23, label: "Lexington", lessons: [13] },
  { lat: 42.46, lng: -71.35, label: "Concord", lessons: [14] },
  { lat: 40.22, lng: -74.76, label: "Trenton", lessons: [30] },
  { lat: 40.35, lng: -74.66, label: "Princeton", lessons: [31] },
  { lat: 43.00, lng: -73.63, label: "Saratoga", lessons: [33] },
  { lat: 40.10, lng: -75.44, label: "Valley Forge", lessons: [34, 35] },
  { lat: 37.24, lng: -76.51, label: "Yorktown", lessons: [63, 64, 65, 66, 67] },
  { lat: 48.86, lng: 2.35, label: "Paris", lessons: [36, 68] },
  { lat: 38.98, lng: -76.49, label: "Annapolis", lessons: [69] },
  { lat: 35.25, lng: -81.39, label: "Kings Mountain", lessons: [58] },
  { lat: 35.13, lng: -81.83, label: "Cowpens", lessons: [59] },
];

export default function MapPage() {
  const [selectedLocation, setSelectedLocation] = useState<typeof mapLocations[0] | null>(null);

  return (
    <div className="min-h-screen parchment-bg">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-[oklch(0.15_0.03_250/0.95)] border-b border-[oklch(1_0_0/0.08)]">
        <div className="container flex items-center justify-between h-14">
          <Link href="/" className="flex items-center gap-2 text-sm font-[var(--font-sans)] text-[oklch(0.7_0.02_250)] hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Home
          </Link>
          <h1 className="text-sm font-[var(--font-display)] font-bold">Map of the Revolution</h1>
          <Link href="/" className="flex items-center gap-2">
            <img src="https://files.manuscdn.com/user_upload_by_module/session_file/90544947/RzamISePlbcgDwAH.png" alt="" className="w-6 h-6" />
          </Link>
        </div>
      </header>

      <div className="flex flex-col lg:flex-row h-[calc(100vh-3.5rem)]">
        {/* Map */}
        <div className="flex-1 relative">
          <MapView
            onMapReady={(map) => {
              // Set map style and bounds
              map.setCenter({ lat: 39.5, lng: -60 });
              map.setZoom(4);

              // Add markers for each location
              mapLocations.forEach((loc) => {
                const marker = new google.maps.Marker({
                  position: { lat: loc.lat, lng: loc.lng },
                  map,
                  title: loc.label,
                  icon: {
                    path: google.maps.SymbolPath.CIRCLE,
                    scale: 8,
                    fillColor: "#c0392b",
                    fillOpacity: 0.9,
                    strokeColor: "#1a2744",
                    strokeWeight: 2,
                  },
                });

                marker.addListener("click", () => {
                  setSelectedLocation(loc);
                });
              });
            }}
          />
        </div>

        {/* Sidebar */}
        <div className="lg:w-80 xl:w-96 border-t lg:border-t-0 lg:border-l border-[oklch(1_0_0/0.08)] overflow-y-auto bg-[oklch(0.18_0.03_250)]">
          <div className="p-4 md:p-6">
            <h2 className="text-lg font-[var(--font-display)] font-bold mb-1">Key Locations</h2>
            <p className="text-sm text-[oklch(0.6_0.02_250)] font-[var(--font-body)] mb-4">
              Tap a location to see connected lessons.
            </p>

            {selectedLocation ? (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6"
              >
                <div className="bg-[oklch(0.95_0.02_80)] border border-[oklch(0.55_0.2_25/0.3)] rounded-sm p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <MapPin className="w-4 h-4 text-[oklch(0.6_0.25_25)]" />
                    <h3 className="font-[var(--font-display)] font-bold">{selectedLocation.label}</h3>
                  </div>
                  <div className="space-y-2">
                    {selectedLocation.lessons.map(lessonId => {
                      const lesson = lessons.find(l => l.id === lessonId);
                      if (!lesson) return null;
                      return (
                        <Link key={lessonId} href={`/lesson/${lessonId}`}>
                          <div className="p-2 bg-[oklch(0.18_0.03_250)] border border-[oklch(1_0_0/0.08)] rounded-sm hover:border-[oklch(0.55_0.2_25/0.4)] transition-colors">
                            <p className="text-xs text-[oklch(0.6_0.02_250)] font-[var(--font-sans)]">Night {lesson.id}</p>
                            <p className="text-sm font-[var(--font-display)] font-semibold">{lesson.title}</p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            ) : null}

            <div className="space-y-2">
              {mapLocations.filter(l => l.lat < 50).map((loc, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedLocation(loc)}
                  className={`w-full text-left flex items-center gap-3 p-3 rounded-sm border transition-colors ${selectedLocation?.label === loc.label ? 'border-[oklch(0.55_0.2_25/0.4)] bg-[oklch(0.95_0.02_80)]' : 'border-[oklch(1_0_0/0.08)] hover:border-[oklch(0.55_0.2_25/0.2)]'}`}
                >
                  <MapPin className="w-3.5 h-3.5 text-[oklch(0.6_0.25_25)]" />
                  <div>
                    <p className="text-sm font-[var(--font-sans)] font-medium">{loc.label}</p>
                    <p className="text-xs text-[oklch(0.6_0.02_250)]">{loc.lessons.length} lesson{loc.lessons.length > 1 ? 's' : ''}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

