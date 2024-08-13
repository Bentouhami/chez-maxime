'use client';
import { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const MapComponent = () => {
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const map = L.map("map", {
                center: [50.406379, 3.893144], // Coordonnées pour Rue de France 23, 7080 Frameries
                zoom: 15,
                layers: [
                    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    })
                ]
            });

            const popupContent = `
                <b>Boulangerie Chez Maxime</b><br>
                Rue de France 23, 7080 Frameries<br>
                <a href="https://maps.app.goo.gl/SmuAiDnE1se7kDDH9" target="_blank" rel="noopener noreferrer">
                <img src="/chez-maxime-map-photo.jpg" alt="Google Maps" style="width: 50px; height: 50px; vertical-align: middle; margin-right: 8px;" />
                    Ouvrir dans Google Maps
                </a>
            `;

            L.marker([50.406379, 3.893144]).addTo(map)
                .bindPopup(popupContent)
                .openPopup();

            // Redimensionner la carte lors du redimensionnement de la fenêtre
            const handleResize = () => {
                setTimeout(() => {
                    map.invalidateSize();
                }, 200);
            };

            window.addEventListener('resize', handleResize);

            return () => {
                window.removeEventListener('resize', handleResize);
                map.remove();
            };
        }
    }, []);

    return <div className="rounded-3" id="map" style={{ height: "400px", width: "100%" }} />;
};

export default MapComponent;
