export interface VehicleFieldItem {
    id?: number | string;
    label?: string | null;
    value?: string | number | null;
    name?: string | null;
    [key: string]: unknown;
}

export interface VehicleFieldsPayload {
    vehicle_types?: VehicleFieldItem[];
    regdate?: VehicleFieldItem[];
    gearbox?: VehicleFieldItem[];
    fuel?: VehicleFieldItem[];
    car_steering?: VehicleFieldItem[];
    motorpower?: VehicleFieldItem[];
    doors?: VehicleFieldItem[];
    features?: VehicleFieldItem[];
    exchange?: VehicleFieldItem[];
    financial?: VehicleFieldItem[];
    cubiccms?: VehicleFieldItem[];
    models?: VehicleFieldItem[];
    versions?: VehicleFieldItem[];
}

export interface VehicleFieldsState {
    vehicleFields: VehicleFieldsPayload;
    loading: boolean;
    error: string | null;
}
