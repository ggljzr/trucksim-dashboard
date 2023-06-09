/**
 * @file Types for the SCS SDK
 */

export interface GameInfo {
    game_id: string, // "ats" or "eut2"
    game_version: number,
}

/**
 * Generic value type, used in most channels.
 */
export interface Value {
    value: number,
}

export interface DPlacement {
    x: number,
    y: number,
    z: number,
    heading: number,
    pitch: number,
    roll: number,
}

export interface Position {
    x: number,
    y: number,
    z: number,
}

/*
{"adblue_capacity": 80.0,
 "adblue_warning_factor": 0.15000000596046448,
 "battery_voltage_warning": 11.880000114440918,
 "brake_air_pressure_emergency": 29.579999923706055,
 "brake_air_pressure_warning": 59.15999984741211,
 "brand": "Kenworth",
 "brand_id": "kenworth",
 "cabin_position": {"x": 0.0, "y": 3.0, "z": -2.0},
 "differential_ratio": 3.25,
 "forward_ratio": 0.7300000190734863,
 "fuel_capacity": 833.0,
 "fuel_warning_factor": 0.15000000596046448,
 "gears_forward": 18,
 "gears_reverse": 4,
 "head_position": {"x": -0.42330673336982727,
                   "y": -0.5754554271697998,
                   "z": 0.3827627897262573},
 "hook_position": {"x": 0.0, "y": 1.0, "z": 3.594026803970337},
 "id": "vehicle.kenworth.w900",
 "license_plate": "R56-9388",
 "license_plate_country": "Texas",
 "license_plate_country_id": "texas",
 "name": "W900",
 "oil_pressure_warning": 10.149999618530273,
 "retarder_steps": 3,
 "reverse_ratio": -3.430000066757202,
 "rpm_limit": 2100.0,
 "water_temperature_warning": 105.0,
 "wheel_position": {"x": 0.960354208946228,
                    "y": 0.5059999823570251,
                    "z": 4.1931939125061035},
 "wheel_powered": 1,
 "wheel_radius": 0.5072842240333557,
 "wheel_simulated": 1,
 "wheel_steerable": 0,
 "wheels_count": 6}
*/
export interface Truck {
    adblue_capacity: number,
    adblue_warning_factor: number,
    battery_voltage_warning: number,
    brake_air_pressure_emergency: number,
    brake_air_pressure_warning: number,
    brand: string,
    brand_id: string,
    cabin_position: Position,
    differential_ratio: number,
    forward_ratio: number,
    fuel_capacity: number,
    fuel_warning_factor: number,
    gears_forward: number,
    gears_reverse: number,
    head_position: Position,
    hook_position: Position,
    id: string,
    license_plate: string,
    license_plate_country: string,
    license_plate_country_id: string,
    name: string,
    oil_pressure_warning: number,
    retarder_steps: number,
    reverse_ratio: number,
    rpm_limit: number,
    water_temperature_warning: number,
    wheel_position: Position,
    wheel_powered: number,
    wheel_radius: number,
    wheel_simulated: number,
    wheel_steerable: number,
    wheels_count: number,
}

/*
{"cargo": "Space Container",
 "cargo_id": "space_cont",
 "cargo_loaded": 1,
 "cargo_mass": 12020.2001953125,
 "cargo_unit_count": 1,
 "cargo_unit_mass": 12020.2001953125,
 "delivery_time": 100135,
 "destination_city": "Raton",
 "destination_city_id": "raton",
 "destination_company": "Rail Export",
 "destination_company_id": "re_train",
 "income": 66445,
 "is_special_job": 0,
 "job_market": "quick_job",
 "planned_distance_km": 1375,
 "source_city": "Houston",
 "source_city_id": "houston",
 "source_company": "Space Center",
 "source_company_id": "spc_whs"}
*/
export interface Job {
    cargo: string,
    cargo_id: string,
    cargo_loaded: boolean,
    cargo_mass: number,
    cargo_unit_count: number,
    cargo_unit_mass: number,
    delivery_time: number,
    destination_city: string,
    destination_city_id: string,
    destination_company: string,
    destination_company_id: string,
    income: number,
    is_special_job: boolean,
    job_market: string,
    planned_distance_km: number,
    source_city: string,
    source_city_id: string,
    source_company: string,
    source_company_id: string,
}

/**
 * Interface for tile info from https://github.com/Unicor-p/SCS_Map_Tiles.
 */
export interface TileInfo {
    map: {
        maxX: number,
        maxY: number,
        x1: number,
        x2: number,
        y1: number,
        y2: number,
        tileSize: number,
        minZoom: number,
        maxZoom: number,
    },
    game: {
        id: string,
        game: string,
        name: string,
        version: string,
        generatedAt: string,
    }
}