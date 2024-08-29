import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Rectangle, useMapEvents } from 'react-leaflet';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-geosearch/dist/geosearch.css';

const Map = () => {
  const mapRef = useRef();
  const [position, setPosition] = useState(null);
  const [rectangle, setRectangle] = useState(null);
  const [drawingMode, setDrawingMode] = useState(false);
  const [hoveredCoords, setHoveredCoords] = useState(null);

  const MapEvents = () => {
    const map = useMapEvents({
      click(e) {
        if (drawingMode) {
          if (!rectangle) {
            setRectangle([e.latlng, e.latlng]);
          } else {
            setRectangle([rectangle[0], e.latlng]);
            setDrawingMode(false);
          }
        }
      },
      mousemove(e) {
        setHoveredCoords(e.latlng);
        if (drawingMode && rectangle && rectangle.length === 2) {
          setRectangle([rectangle[0], e.latlng]);
        }
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

  const handleStartDrawing = () => {
    setDrawingMode(true);
    setRectangle(null);
  };

  const handleSendCoordinates = () => {
    if (rectangle && rectangle.length === 2) {
      const [topLeft, bottomRight] = rectangle;
      const coordinates = {
        topLeft: { lat: topLeft.lat, lng: topLeft.lng },
        topRight: { lat: topLeft.lat, lng: bottomRight.lng },
        bottomLeft: { lat: bottomRight.lat, lng: topLeft.lng },
        bottomRight: { lat: bottomRight.lat, lng: bottomRight.lng },
        userLocation: position ? { lat: position.lat, lng: position.lng } : null,
      };
      console.log('Sending coordinates to the backend:', JSON.stringify(coordinates, null, 2));
    } else {
      console.log('Please draw a rectangle first.');
    }
  };

  const handleLocateUser = () => {
    mapRef.current.locate({
      setView: true,
      maxZoom: 16,
    });
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

        {rectangle && rectangle.length === 2 && (
          <Rectangle bounds={rectangle} pathOptions={{ color: 'blue' }}>
            <Popup>
              Selected area:<br />
              Top-left: {rectangle[0].lat.toFixed(6)}, {rectangle[0].lng.toFixed(6)}<br />
              Bottom-right: {rectangle[1].lat.toFixed(6)}, {rectangle[1].lng.toFixed(6)}
            </Popup>
          </Rectangle>
        )}

        <MapEvents />
      </MapContainer>

      <div className="absolute top-10 right-10 bg-white p-4 rounded shadow-lg z-[1000] flex flex-col gap-4">
        <button
          onClick={handleStartDrawing}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded text-lg font-bold transition-colors duration-200"
        >
          {drawingMode ? 'Drawing...' : 'Draw Rectangle'}
        </button>

        <button
          onClick={handleSendCoordinates}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded text-lg font-bold transition-colors duration-200"
        >
          Send Coordinates
        </button>

        <button
          onClick={handleLocateUser}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded text-lg font-bold transition-colors duration-200"
        >
          Use My Location
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
