'use client';

import { useState } from 'react';
import { X, Loader2, Image as ImageIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ListPropertyModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

const PROPERTY_TYPES = ['Flat', 'Villa', 'Office', 'Shop', 'Land', 'Plot', 'Warehouse'];
const SALE_MODES = ['Fresh', 'Resale'];
const USAGES = ['Residential', 'Commercial'];

// Unsplash Image Collections
const UNSPLASH_IMAGES: Record<string, string[]> = {
    Flat: [
        'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80'
    ],
    Villa: [
        'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80'
    ],
    Office: [
        'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=80'
    ],
    Shop: [
        'https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80'
    ],
    Land: [
        'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=800&q=80'
    ],
    Plot: [
        'https://images.unsplash.com/photo-1524813686514-a5756c97759e?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1629079447841-d642f4cbe066?auto=format&fit=crop&w=800&q=80'
    ],
    Warehouse: [
        'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1565610261709-5c293f5385e5?auto=format&fit=crop&w=800&q=80'
    ]
};

export default function ListPropertyModal({ isOpen, onClose, onSuccess }: ListPropertyModalProps) {
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);

        // Auto-assign Lat/Lng if missing (random jitter around Mumbai/Pune for demo)
        const lat = 19.0 + (Math.random() * 0.5 - 0.25);
        const lng = 72.8 + (Math.random() * 0.5 - 0.25);

        const type = formData.get('type') as string;

        // Pick a random dummy image based on type from UNSPLASH_IMAGES
        const typeImages = UNSPLASH_IMAGES[type] || UNSPLASH_IMAGES['Flat'];
        const randomImage = typeImages[Math.floor(Math.random() * typeImages.length)];
        const images = [randomImage];

        const newProperty = {
            title: formData.get('title'),
            type,
            saleMode: formData.get('saleMode'),
            usage: formData.get('usage'),
            price: Number(formData.get('price')),
            area: Number(formData.get('area')),
            city: formData.get('city'),
            locality: formData.get('locality'),
            description: formData.get('description'),
            lat,
            lng,
            images
        };

        console.log('Submitting New Property:', newProperty); // Log to console

        try {
            const res = await fetch('/api/properties', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newProperty),
            });

            if (res.ok) {
                onSuccess();
                onClose();
            } else {
                alert('Failed to list property');
            }
        } catch (err) {
            console.error(err);
            alert('Error listing property');
        } finally {
            setLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center px-4 overflow-y-auto py-8">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.5 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black"
                    />

                    <motion.div
                        initial={{ scale: 0.95, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 20 }}
                        className="bg-white w-full max-w-2xl rounded-2xl shadow-xl relative z-10 overflow-hidden flex flex-col max-h-[90vh]"
                    >
                        <div className="flex items-center justify-between p-4 border-b">
                            <h3 className="font-bold text-lg text-gray-800">List Your Property</h3>
                            <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
                                <X className="w-5 h-5 text-gray-500" />
                            </button>
                        </div>

                        <div className="overflow-y-auto p-4 md:p-6">
                            <form id="list-property-form" onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Property Title</label>
                                        <input name="title" required className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="e.g. Spacious 2BHK in Bandra" />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
                                            <input name="price" required type="number" className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="e.g. 15000000" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Area (sq.ft)</label>
                                            <input name="area" required type="number" className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="e.g. 1200" />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                                            <select name="type" required className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none bg-white">
                                                {PROPERTY_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Sale Mode</label>
                                            <select name="saleMode" required className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none bg-white">
                                                {SALE_MODES.map(m => <option key={m} value={m}>{m}</option>)}
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Usage</label>
                                            <select name="usage" required className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none bg-white">
                                                {USAGES.map(u => <option key={u} value={u}>{u}</option>)}
                                            </select>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                                            <input name="city" required className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="e.g. Mumbai" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Locality</label>
                                            <input name="locality" required className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="e.g. Juhu" />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                        <textarea name="description" required rows={3} className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Describe the property..." />
                                    </div>

                                    <div className="bg-blue-50 p-4 rounded-lg flex items-start gap-3">
                                        <ImageIcon className="w-5 h-5 text-blue-600 mt-0.5" />
                                        <div>
                                            <h4 className="text-sm font-bold text-blue-800">Photos</h4>
                                            <p className="text-xs text-blue-600 mt-1">High-quality image from Unsplash will be automatically assigned based on property type.</p>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>

                        <div className="p-4 border-t bg-gray-50 flex justify-end gap-3">
                            <button
                                onClick={onClose}
                                type="button"
                                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-white transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                form="list-property-form"
                                type="submit"
                                disabled={loading}
                                className="px-6 py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors flex items-center gap-2"
                            >
                                {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                                List Property
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
