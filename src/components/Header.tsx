import Link from 'next/link';
import { MapPin } from 'lucide-react';

interface HeaderProps {
    onListPropertyClick?: () => void;
}

export default function Header({ onListPropertyClick }: HeaderProps) {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 text-blue-600 font-bold text-xl">
                    <MapPin className="w-6 h-6" />
                    <span>EstateMap</span>
                </Link>
                <nav className="flex items-center gap-6">
                    <Link href="/" className="hidden md:block text-gray-600 hover:text-blue-600 font-medium">Map View</Link>
                    <button
                        onClick={onListPropertyClick}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                    >
                        List Property
                    </button>
                </nav>
            </div>
        </header>
    );
}
