import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import 'leaflet/dist/leaflet.css';
import 'leaflet-geosearch/dist/geosearch.css';

const Map = () => {
  const mapRef = useRef();
  const [position, setPosition] = useState(null);
  const [selectedPoints, setSelectedPoints] = useState([]);
  const [hoveredCoords, setHoveredCoords] = useState(null);

  const MapEvents = () => {
    const map = useMapEvents({
      click(e) {
        fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${e.latlng.lat}&lon=${e.latlng.lng}`)
          .then(response => response.json())
          .then(data => {
            const cityName = data.address.city || data.address.town || data.address.village || 'Unknown location';
            const newPoint = {
              latlng: e.latlng,
              name: cityName
            };
            setSelectedPoints([...selectedPoints, newPoint]);
          })
          .catch(error => {
            console.error('Error fetching city name:', error);
          });
      },
      mousemove(e) {
        setHoveredCoords(e.latlng);
      },
      locationfound(e) {
        setPosition(e.latlng);
        map.flyTo(e.latlng, map.getZoom());
      },
    });

    useEffect(() => {
      const provider = new OpenStreetMapProvider();
      const searchControl = new GeoSearchControl({
        provider: provider,
        style: 'bar',
        showMarker: true,
        retainZoomLevel: false,
        animateZoom: true,
        autoClose: true,
        searchLabel: 'Enter coordinates or location...',
        keepResult: true,
      });

      map.addControl(searchControl);

      return () => {
        map.removeControl(searchControl);
      };
    }, [map]);

    return null;
  };

  const handleLocateUser = () => {
    mapRef.current.locate({
      setView: true,
      maxZoom: 16,
    });
  };

  const handleSendCoordinates = () => {
    console.log('Selected points:', selectedPoints);
    alert('Coordinates sent! Check the console for details.');
  };

  const handleEnd = () => {
    setSelectedPoints([]);
    alert('Selection ended. All points have been cleared.');
  };

  return (
    <div className="h-screen w-full relative">
      <MapContainer
        center={[20.5937, 78.9629]}
        zoom={5}
        scrollWheelZoom={true}
        style={{ height: '100%', width: '100%' }}
        ref={mapRef}
      >
        <TileLayer
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          attribution='&copy; <a href="https://www.esri.com/en-us/home">ESRI</a> contributors'
        />

        {position && (
          <Marker position={position}>
            <Popup>
              Your location: {position.lat.toFixed(6)}, {position.lng.toFixed(6)}
            </Popup>
          </Marker>
        )}

        {selectedPoints.map((point, index) => (
          <Marker key={index} position={point.latlng}>
            <Popup>
              {point.name}: {point.latlng.lat.toFixed(6)}, {point.latlng.lng.toFixed(6)}
            </Popup>
          </Marker>
        ))}

        <MapEvents />
      </MapContainer>

      <div className="absolute top-10 right-10 bg-white p-4 rounded shadow-lg z-[1000] flex flex-col gap-4">
        <button
          onClick={handleLocateUser}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded text-lg font-bold transition-colors duration-200"
        >
          Use My Location
        </button>

        <button
          onClick={handleSendCoordinates}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded text-lg font-bold transition-colors duration-200"
        >
          Send Coordinates
        </button>

        <button
          onClick={handleEnd}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded text-lg font-bold transition-colors duration-200"
        >
          End Selection
        </button>
      </div>

      {hoveredCoords && (
        <div className="absolute bottom-4 left-4 bg-white p-2 rounded shadow-lg z-[1000]">
          Hovered: {hoveredCoords.lat.toFixed(6)}, {hoveredCoords.lng.toFixed(6)}
        </div>
      )}
    </div>
  );
};

export default Map;
