'use client';
import { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup, Circle, ZoomControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const MapComponent = () => {
    useEffect(() => {
        // Vérifier si le code s'exécute côté client
        if (typeof window !== 'undefined') {
            // Initialiser la carte centrée sur l'adresse
            const map = L.map("map", {
                center: [50.405048, 3.902564], // Coordonnées pour Rue de France 23, 7080 Frameries
                zoom: 15,
                layers: [
                    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    })
                ]
            });

            // Ajouter un marqueur à l'adresse
            const popupContent = `
                <b>Boulangerie Chez Maxime</b><br>
                Rue de France 23, 7080 Frameries<br>
                <a href="https://maps.app.goo.gl/SmuAiDnE1se7kDDH9" target="_blank" rel="noopener noreferrer">
                <img src="/chez-maxime-map-photo.jpg" alt="Google Maps" style="width: 50px; height: 50px; vertical-align: middle; margin-right: 8px;" />
                    Ouvrir dans Google Maps
                </a>
            `;

            L.marker([50.405048, 3.902564]).addTo(map)
                .bindPopup(popupContent)
                .openPopup();

            return () => {
                map.remove();
            };
        }
    }, []);

    return <div className="rounded-3" id="map" style={{ height: "400px", width: "100%" }}></div>;
};

export default MapComponent;
