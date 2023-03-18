export interface Truck {
    brand: string,
    name: string,
    fuel_capacity: number,
    adblue_capacity: number,
    rpm_limit: number,
    license_plate: string,
    license_plate_country: string,
}

export interface Job {
    cargo_id: string,
    cargo: string,
    cargo_mass: number,
    destination_city: string,
    destination_company: string,
    is_cargo_loaded: boolean,
    job_market: string,
    delivery_time: string,
    income: number,
}