'use client';

import { Property } from '@/types';
import { X, MapPin, Ruler, Tag, Home, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface PropertyDrawerProps {
    property: Property | null;
    onClose: () => void;
    onEnquire: () => void;
}

export default function PropertyDrawer({ property, onClose, onEnquire }: PropertyDrawerProps) {
    return (
        <AnimatePresence>
            {property && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.5 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black z-40"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed right-0 top-0 h-full w-full sm:w-[400px] bg-white z-50 shadow-2xl overflow-y-auto"
                    >
                        {/* Header */}
                        <div className="sticky top-0 bg-white z-10 p-4 border-b flex items-center justify-between">
                            <h2 className="font-bold text-lg text-gray-800">Property Details</h2>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                                aria-label="Close"
                            >
                                <X className="w-5 h-5 text-gray-500" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-0">
                            {/* Image */}
                            <div className="h-48 bg-gray-200 relative">
                                {/* Fallback image if actual image fails or used dummy */}
                                <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-400">
                                    <Home className="w-12 h-12 opacity-50" />
                                </div>
                                {property.images && property.images[0] && (
                                    <Image
                                        src={property.images[0]}
                                        alt={property.title}
                                        fill
                                        className="object-cover relative z-10"
                                        sizes="400px"
                                    />
                                )}
                            </div>

                            <div className="p-5 space-y-6">
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full font-medium">
                                            {property.type}
                                        </span>
                                        <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-medium">
                                            {property.saleMode}
                                        </span>
                                        <span className="bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded-full font-medium">
                                            {property.usage}
                                        </span>
                                    </div>
                                    <h1 className="text-2xl font-bold text-gray-900 mb-2">{property.title}</h1>
                                    <div className="flex items-center text-gray-600 text-sm">
                                        <MapPin className="w-4 h-4 mr-1" />
                                        {property.locality}, {property.city}
                                    </div>
                                </div>

                                <div className="border-t border-b py-4">
                                    <div className="text-3xl font-bold text-blue-600">
                                        ₹{(property.price / 100000).toFixed(1)} Lakhs
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-gray-50 p-3 rounded-lg">
                                        <div className="text-gray-500 text-xs mb-1 flex items-center gap-1">
                                            <Ruler className="w-3 h-3" /> Area
                                        </div>
                                        <div className="font-semibold">{property.area} sq.ft</div>
                                    </div>
                                    <div className="bg-gray-50 p-3 rounded-lg">
                                        <div className="text-gray-500 text-xs mb-1 flex items-center gap-1">
                                            <Tag className="w-3 h-3" /> Type
                                        </div>
                                        <div className="font-semibold">{property.type}</div>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="font-semibold mb-2 text-gray-800">Description</h3>
                                    <p className="text-gray-600 text-sm leading-relaxed">
                                        {property.description}
                                    </p>
                                </div>

                                <div className="pt-4">
                                    <button
                                        onClick={onEnquire}
                                        className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-blue-200"
                                    >
                                        <Mail className="w-5 h-5" />
                                        Send Enquiry
                                    </button>
                                    <div className="text-center text-xs text-gray-400 mt-2">
                                        Lat: {property.lat.toFixed(4)}, Lng: {property.lng.toFixed(4)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
