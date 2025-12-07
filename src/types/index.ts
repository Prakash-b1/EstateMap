export interface Property {
    id: number;
    title: string;
    type: 'Land' | 'Plot' | 'Flat' | 'Villa' | 'Office' | 'Shop' | 'Warehouse';
    saleMode: 'Fresh' | 'Resale';
    usage: 'Residential' | 'Commercial';
    price: number;
    area: number;
    city: string;
    locality: string;
    lat: number;
    lng: number;
    images: string[];
    description: string;
}

export interface FilterState {
    type?: string;
    saleMode?: string;
    usage?: string;
    minPrice?: number;
    maxPrice?: number;
    search?: string;
}
