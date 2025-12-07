'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Map from '@/components/Map';
import PropertyFilters from '@/components/Filters/PropertyFilters';
import PropertyDrawer from '@/components/Property/PropertyDrawer';
import EnquiryForm from '@/components/Forms/EnquiryForm';
import ListPropertyModal from '@/components/Forms/ListPropertyModal';
import { Property, FilterState } from '@/types';
import { Loader2 } from 'lucide-react';

export default function Home() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<FilterState>({});
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [isListPropertyOpen, setIsListPropertyOpen] = useState(false);

  const fetchProperties = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters.type) params.append('type', filters.type);
      if (filters.saleMode) params.append('saleMode', filters.saleMode);
      if (filters.usage) params.append('usage', filters.usage);
      if (filters.search) params.append('city', filters.search);
      // Cache buster
      params.append('t', Date.now().toString());

      const res = await fetch(`/api/properties?${params.toString()}`, { cache: 'no-store' });
      const data = await res.json();
      console.log('Fetched properties:', data); // Log for debugging
      setProperties(data);
    } catch (error) {
      console.error('Failed to fetch properties', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch properties when filters change
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchProperties();
    }, 300);

    return () => clearTimeout(timer);
  }, [filters]);

  return (
    <main className="h-screen flex flex-col bg-gray-50 overflow-hidden">
      <Header onListPropertyClick={() => setIsListPropertyOpen(true)} />

      <div className="flex-1 relative mt-16">
        {/* Filters Overlay */}
        {/* Filters Overlay Container - Layout handled by PropertyFilters */}
        <div className="absolute inset-0 z-[20] pointer-events-none">
          <PropertyFilters filters={filters} onFilterChange={setFilters} />
        </div>

        {/* Map */}
        <div className="w-full h-full relative z-0">
          <Map
            properties={properties}
            onMarkerClick={(p) => setSelectedProperty(p)}
          />

          {/* Loading Indicator */}
          {loading && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white px-4 py-2 rounded-full shadow-lg z-[400] flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
              <span className="text-sm font-medium text-gray-600">Updating map...</span>
            </div>
          )}
        </div>

        {/* Property Drawer */}
        <PropertyDrawer
          property={selectedProperty}
          onClose={() => setSelectedProperty(null)}
          onEnquire={() => setIsEnquiryOpen(true)}
        />

        {/* Enquiry Modal */}
        <EnquiryForm
          isOpen={isEnquiryOpen}
          onClose={() => setIsEnquiryOpen(false)}
          propertyTitle={selectedProperty?.title || ''}
        />

        {/* List Property Modal */}
        <ListPropertyModal
          isOpen={isListPropertyOpen}
          onClose={() => setIsListPropertyOpen(false)}
          onSuccess={() => {
            fetchProperties(); // Refresh map
          }}
        />
      </div>
    </main>
  );
}
