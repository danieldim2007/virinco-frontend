import React, { useEffect, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-draw/dist/leaflet.draw.css';
import 'leaflet.heat';
import "./map.css";

const Map = () => {
  const [sensorData, setSensorData] = useState([]);
  const [heatData, setHeatData] = useState([]);

  // Hente data fra API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8884/api/sensors');
        const data = await response.json();

        console.log("Data fra API:", data); // Logg API-responsen

        if (data && data.sensors && Array.isArray(data.sensors)) {
          const validSensors = data.sensors.filter(sensor => 
            sensor.Latitude && sensor.Longitude && sensor.Temp
          );

          console.log("Gyldige sensorer:", validSensors); // Logg gyldige sensorer

          setSensorData(validSensors);

          const heatMapPoints = validSensors.map(sensor => [
            sensor.Latitude, 
            sensor.Longitude, 
            sensor.Temp // Bruker Temp som verdi for Heatmap
          ]);
          setHeatData(heatMapPoints);
        } else {
          console.error("Forventet 'sensors' nøkkel med en array, men fikk noe annet:", data);
        }
      } catch (error) {
        console.error('Error fetching sensor data:', error);
      }
    };

    fetchData();
  }, []);

  // Heatmap-lag
  const HeatmapLayer = () => {
    const map = useMap();

    useEffect(() => {
      if (heatData.length > 0) {
        const heat = L.heatLayer(heatData, {
          radius: 10,  // Gjør sirklene mindre, endre denne verdien etter behov
          blur: 15, 
          maxZoom: 17
        });
        heat.addTo(map);
      }
    }, [heatData, map]);

    return null;
  };

  return (
    <div className='map_data'>
      <MapContainer
        center={[59.743, 10.204]} // Sentrering på Drammen
        zoom={12} 
        style={{ height: '480px', width: '100%', borderRadius: "1rem" }}
        minZoom={10}  // Setter minimum zoom-nivå
        maxZoom={23} // Setter maksimum zoom-nivå
        maxBounds={[
          [59.3, 9.8],  // Sørvestlig hjørne
          [60.2, 10.7]  // Nordøstlig hjørne
        ]}
        maxBoundsViscosity={1.0} // Sørger for at kartet ikke går utenfor grensene
      >
        {/* Bruk en blåere flisestil */}
        <TileLayer
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* Legg til Heatmap-lag */}
        <HeatmapLayer />
      </MapContainer>
    </div>
  );
};

export default Map;
