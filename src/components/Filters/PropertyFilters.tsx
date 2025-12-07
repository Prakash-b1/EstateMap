'use client';

import { FilterState } from '@/types';
import { Search } from 'lucide-react';
import { useState } from 'react';

interface PropertyFiltersProps {
    filters: FilterState;
    onFilterChange: (filters: FilterState) => void;
}

export default function PropertyFilters({ filters, onFilterChange }: PropertyFiltersProps) {
    const [localSearch, setLocalSearch] = useState(filters.search || '');

    const handleChange = (key: keyof FilterState, value: string | undefined) => {
        onFilterChange({ ...filters, [key]: value });
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {/* Search */}
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search location..."
                        className="w-full pl-9 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                        value={localSearch}
                        onChange={(e) => {
                            setLocalSearch(e.target.value);
                            handleChange('search', e.target.value);
                        }}
                    />
                </div>

                {/* Type Filter */}
                <select
                    className="border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                    value={filters.type || ''}
                    onChange={(e) => handleChange('type', e.target.value || undefined)}
                >
                    <option value="">All Types</option>
                    <option value="Land">Land</option>
                    <option value="Plot">Plot</option>
                    <option value="Flat">Flat</option>
                    <option value="Villa">Villa</option>
                    <option value="Office">Office</option>
                    <option value="Shop">Shop</option>
                    <option value="Warehouse">Warehouse</option>
                </select>

                {/* Sale Mode */}
                <select
                    className="border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                    value={filters.saleMode || ''}
                    onChange={(e) => handleChange('saleMode', e.target.value || undefined)}
                >
                    <option value="">Any Sale Mode</option>
                    <option value="Fresh">Fresh</option>
                    <option value="Resale">Resale</option>
                </select>

                {/* Usage */}
                <select
                    className="border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                    value={filters.usage || ''}
                    onChange={(e) => handleChange('usage', e.target.value || undefined)}
                >
                    <option value="">Any Usage</option>
                    <option value="Residential">Residential</option>
                    <option value="Commercial">Commercial</option>
                </select>

                {/* Clear Filters */}
                <button
                    onClick={() => onFilterChange({})}
                    className="text-sm text-gray-500 hover:text-red-500 underline"
                >
                    Clear Filters
                </button>
            </div>
        </div>
    );
}
