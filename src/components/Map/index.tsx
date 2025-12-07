'use client';

import dynamic from 'next/dynamic';
import { Property } from '@/types';

// Dynamic import with SSR disabled
const MapViewer = dynamic(() => import('./MapViewer'), {
    ssr: false,
    loading: () => (
        <div className="h-[calc(100vh-140px)] w-full rounded-xl bg-gray-100 animate-pulse flex items-center justify-center text-gray-400">
            Loading Map...
        </div>
    ),
});

export default function Map({ properties, onMarkerClick }: { properties: Property[], onMarkerClick: (p: Property) => void }) {
    return <MapViewer properties={properties} onMarkerClick={onMarkerClick} />;
}
