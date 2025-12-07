'use client';


import { FilterState } from '@/types';
import { Search, Filter, X } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PropertyFiltersProps {
    filters: FilterState;
    onFilterChange: (filters: FilterState) => void;
}

export default function PropertyFilters({ filters, onFilterChange }: PropertyFiltersProps) {
    const [localSearch, setLocalSearch] = useState(filters.search || '');
    const [isOpen, setIsOpen] = useState(false);

    const handleChange = (key: keyof FilterState, value: string | undefined) => {
        onFilterChange({ ...filters, [key]: value });
    };

    const FilterInputs = () => (
        <>
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
                className="border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                value={filters.type || ''}
                onChange={(e) => handleChange('type', e.target.value || undefined)}
            >
                <option value="">All Types</option>
                <option value="Flat">Flat</option>
                <option value="Villa">Villa</option>
                <option value="Office">Office</option>
                <option value="Shop">Shop</option>
                <option value="Land">Land</option>
                <option value="Plot">Plot</option>
                <option value="Warehouse">Warehouse</option>
            </select>

            {/* Sale Mode */}
            <select
                className="border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                value={filters.saleMode || ''}
                onChange={(e) => handleChange('saleMode', e.target.value || undefined)}
            >
                <option value="">Any Sale Mode</option>
                <option value="Fresh">Fresh</option>
                <option value="Resale">Resale</option>
            </select>

            {/* Usage */}
            <select
                className="border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 bg-white"
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
                className="text-sm text-gray-500 hover:text-red-500 underline text-left"
            >
                Clear Filters
            </button>
        </>
    );

    return (
        <>
            {/* Desktop View: Top Bar */}
            <div className="hidden md:block pointer-events-auto bg-white p-4 rounded-lg shadow-2xl border border-gray-200 w-full max-w-6xl mx-auto mt-4">
                <div className="grid grid-cols-5 gap-4">
                    <FilterInputs />
                </div>
            </div>

            {/* Mobile View: Toggle Button + Sidebar */}
            <div className="md:hidden pointer-events-auto">
                <button
                    onClick={() => setIsOpen(true)}
                    className="bg-white p-3 rounded-full shadow-lg border border-gray-200 mt-4 ml-4 flex items-center gap-2 text-blue-600 font-medium"
                >
                    <Filter className="w-5 h-5" />
                    Filters
                </button>

                <AnimatePresence>
                    {isOpen && (
                        <>
                            {/* Backdrop */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 0.5 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setIsOpen(false)}
                                className="fixed inset-0 bg-black z-40"
                            />
                            {/* Sidebar */}
                            <motion.div
                                initial={{ x: '-100%' }}
                                animate={{ x: 0 }}
                                exit={{ x: '-100%' }}
                                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                                className="fixed top-0 left-0 bottom-0 w-[80%] max-w-sm bg-white z-50 shadow-2xl p-6 flex flex-col gap-6"
                            >
                                <div className="flex items-center justify-between">
                                    <h2 className="text-xl font-bold text-gray-800">Filters</h2>
                                    <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-gray-100 rounded-full">
                                        <X className="w-6 h-6 text-gray-500" />
                                    </button>
                                </div>
                                <div className="flex flex-col gap-4">
                                    <FilterInputs />
                                </div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
            </div>
        </>
    );
}
