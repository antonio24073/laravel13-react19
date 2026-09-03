export interface Vehicle {
    id: number;
    user_id: number | null;
    tag_id: number | null;

    zipCode: string | null;
    city: string | null;
    city_url: string | null;

    uf: string | null;
    uf_url: string | null;

    vehicle_type: number | null;
    vehicle_brand: number | null;
    vehicle_model: number | null;
    vehicle_version: number | null;
    vehicle_regdate: number | null;
    vehicle_gearbox: number | null;
    vehicle_fuel: number | null;
    vehicle_steering: number | null;
    vehicle_motorpower: number | null;
    vehicle_doors: number | null;
    vehicle_color: number | null;
    vehicle_cubiccms: number | null;
    vehicle_owner: number | null;
    vehicle_mileage: number | null;

    vehicle_features: Record<string, unknown> | null;
    vehicle_moto_features: Record<string, unknown> | null;
    vehicle_financial: Record<string, unknown> | null;

    vehicle_price: number | null;

    title: string | null;
    description: string | null;

    status: number;
    name: string | null;

    created_at: string | null;
    updated_at: string | null;
}

export interface VehiclePayload {
    tag_id?: number | null;

    zipCode?: string | null;
    city?: string | null;
    city_url?: string | null;

    uf?: string | null;
    uf_url?: string | null;

    vehicle_type?: number | null;
    vehicle_brand?: number | null;
    vehicle_model?: number | null;
    vehicle_version?: number | null;
    vehicle_regdate?: number | null;
    vehicle_gearbox?: number | null;
    vehicle_fuel?: number | null;
    vehicle_steering?: number | null;
    vehicle_motorpower?: number | null;
    vehicle_doors?: number | null;
    vehicle_color?: number | null;
    vehicle_cubiccms?: number | null;
    vehicle_owner?: number | null;
    vehicle_mileage?: number | null;

    vehicle_features?: Record<string, unknown> | null;
    vehicle_moto_features?: Record<string, unknown> | null;
    vehicle_financial?: Record<string, unknown> | null;

    vehicle_price?: number | null;

    title?: string | null;
    description?: string | null;

    status?: number;
    name?: string | null;
}


export interface VehiclesState {
    vehicles: Vehicle[];
    vehicle: Vehicle | null;

    loading: boolean;
    error: string | null;
}

export interface VehicleParams {
    query: string;
    isLoadMore: boolean;
}

