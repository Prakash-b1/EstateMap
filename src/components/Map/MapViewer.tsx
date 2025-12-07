'use client';

import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Property } from '@/types';
import { useEffect } from 'react';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';

interface MapViewerProps {
    properties: Property[];
    onMarkerClick: (property: Property) => void;
}

// Component to handle map center updates
function MapUpdater({ properties }: { properties: Property[] }) {
    const map = useMap();

    useEffect(() => {
        if (properties.length > 0) {
            const bounds = properties.map((p) => [p.lat, p.lng] as [number, number]);
            // Use a timeout to prevent render loop issues
            setTimeout(() => {
                try {
                    map.fitBounds(bounds, { padding: [50, 50], maxZoom: 15 });
                } catch (e) {
                    console.warn('Map bounds update failed', e);
                }
            }, 100);
        }
    }, [properties, map]);

    return null;
}

export default function MapViewer({ properties, onMarkerClick }: MapViewerProps) {
    const defaultCenter: [number, number] = [20.5937, 78.9629]; // India center

    return (
        <div className="h-full w-full z-0">
            <MapContainer
                center={defaultCenter}
                zoom={5}
                scrollWheelZoom={true}
                className="h-full w-full outline-none"
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <MapUpdater properties={properties} />

                {properties.map((property) => (
                    <Marker
                        key={property.id}
                        position={[property.lat, property.lng]}
                        eventHandlers={{
                            click: () => onMarkerClick(property),
                        }}
                    >
                        <Popup>
                            <div className="min-w-[200px] p-1">
                                <div className="h-24 w-full bg-gray-100 mb-2 rounded overflow-hidden relative">
                                    {property.images && property.images[0] && (
                                        <img src={property.images[0]} alt={property.title} className="w-full h-full object-cover"
                                            onError={(e) => e.currentTarget.style.display = 'none'} />
                                    )}
                                </div>
                                <h3 className="font-bold text-sm mb-1 leading-tight">{property.title}</h3>
                                <p className="text-blue-600 font-bold mb-1">
                                    ₹{(property.price / 100000).toFixed(1)} L
                                </p>
                                <div className="text-xs text-gray-600 mb-2">
                                    {property.type} • {property.city}
                                </div>
                                <button
                                    onClick={() => onMarkerClick(property)}
                                    className="w-full bg-blue-600 text-white text-xs py-2 rounded hover:bg-blue-700 font-medium transition-colors"
                                >
                                    View Details
                                </button>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
}
