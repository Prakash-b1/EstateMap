'use client';

import { useState } from 'react';
import { X, Send, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface EnquiryFormProps {
    isOpen: boolean;
    onClose: () => void;
    propertyTitle: string;
}

export default function EnquiryForm({ isOpen, onClose, propertyTitle }: EnquiryFormProps) {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        console.log('Submitting Enquiry:', { ...data, property: propertyTitle }); // Log to console

        try {
            const res = await fetch('/api/enquiry', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...data, property: propertyTitle }),
            });

            if (res.ok) {
                setSuccess(true);
                setTimeout(() => {
                    setSuccess(false);
                    onClose(); // Close after success
                }, 2000);
            }
        } catch (err) {
            alert('Failed to send enquiry');
        } finally {
            setLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.5 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black"
                    />

                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        className="bg-white w-full max-w-md rounded-2xl shadow-xl relative z-10 overflow-hidden"
                    >
                        {success ? (
                            <div className="p-8 flex flex-col items-center justify-center text-center space-y-4">
                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                                    <Send className="w-8 h-8" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-800">Enquiry Sent!</h3>
                                <p className="text-gray-600">We will get back to you shortly.</p>
                            </div>
                        ) : (
                            <>
                                <div className="flex items-center justify-between p-4 border-b">
                                    <h3 className="font-bold text-lg">Enquire Now</h3>
                                    <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full">
                                        <X className="w-5 h-5 text-gray-500" />
                                    </button>
                                </div>

                                <form onSubmit={handleSubmit} className="p-5 space-y-4">
                                    <div className="bg-blue-50 text-blue-800 text-sm p-3 rounded-lg mb-4">
                                        Enquiring for: <strong>{propertyTitle}</strong>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                        <input name="name" required className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="John Doe" />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Mobile</label>
                                        <input name="mobile" required type="tel" className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="+91 9876543210" />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                        <input name="email" required type="email" className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="john@example.com" />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                                        <textarea name="message" className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none" rows={3} placeholder="I am interested in this property..." />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-bold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                                    >
                                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Submit Enquiry'}
                                    </button>
                                </form>
                            </>
                        )}
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
