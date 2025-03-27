import React, { useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, GeoJSON, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-draw/dist/leaflet.draw.css';
import 'leaflet.heat';
import "./map.css";

const Map = () => {
  // Eksempel på GeoJSON-data (polygon)
  const geojsonData = {
    type: 'Feature',
    geometry: {
      type: 'Polygon',
      coordinates: [[[10.2, 59.7], [10.3, 59.7], [10.3, 59.8], [10.2, 59.8], [10.2, 59.7]]] // Et enkelt firkantområde i nærheten av Drammen
    }
  };

  // Heatmap-støtte
  const HeatmapLayer = () => {
    const map = useMap();

    useEffect(() => {
      const heat = L.heatLayer(
        [
          //sensorer
        ],
        { radius: 30, blur: 15, maxZoom: 17 } // Maks zoom for heatmap laget
      );
      heat.addTo(map);
    }, [map]);

    return null;
  };

  return (
    <div className='map_data'>
      <MapContainer 
        center={[59.743, 10.204]} // Sentrering på Drammen
        zoom={13} 
        style={{ height: '480px', width: '100%', borderRadius: "1rem" }}
        minZoom={4}  // Setter minimum zoom-nivå
        maxZoom={17} // Setter maksimum zoom-nivå
        maxBounds={[
          [59.3, 9.8],  // Sørvestlig hjørne (bittelitt sørligere og vestligere)
          [60.2, 10.7]  // Nordøstlig hjørne (bittelitt nordligere og østligere)
        ]}
        maxBoundsViscosity={1.0} // Sørger for at kartet ikke går utenfor grensene
      >
        {/* Bruk en blåere flisestil */}
        <TileLayer
          url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
          attribution="&copy; <a href='https://stadiamaps.com/'>Stadia Maps</a> contributors"
        />

        {/* Heatmap-lag */}
        <HeatmapLayer />
      </MapContainer>
    </div>
  );
};

export default Map;
