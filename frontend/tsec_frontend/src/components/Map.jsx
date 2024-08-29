import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import 'leaflet-draw';

const Map = () => {
  const mapRef = useRef();

  useEffect(() => {
    const map = mapRef.current;

    if (!map) return;

    // Initialize the Leaflet Draw control and add it to the map
    const drawnItems = new L.FeatureGroup();
    map.addLayer(drawnItems);

    const drawControl = new L.Control.Draw({
      edit: {
        featureGroup: drawnItems,
      },
      draw: {
        polygon: true,
        rectangle: true,
        circle: false,
        polyline: false,
        marker: true,
        circlemarker: false,
      },
    });

    map.addControl(drawControl);

    map.on(L.Draw.Event.CREATED, (event) => {
      const layer = event.layer;
      drawnItems.addLayer(layer);
    });
  }, []);

  return (
    <div className="h-screen w-full">
      <MapContainer
        center={[51.505, -0.09]}
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: '100%', width: '100%' }}
        ref={mapRef}
      >
        {/* TileLayer for satellite view */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* Optional: You can use Mapbox Satellite Tiles as well */}
        {/* <TileLayer
          url="https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/{z}/{x}/{y}?access_token=your_mapbox_access_token"
          attribution='&copy; <a href="https://www.mapbox.com/about/maps/">Mapbox</a>'
        /> */}
      </MapContainer>
    </div>
  );
};

export default Map;
