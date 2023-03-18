export interface Truck {
    brand: string,
    name: string,
    fuel_capacity: number,
    adblue_capacity: number,
    rpm_limit: number,
    license_plate: string,
    license_plate_country: string,
}

/*
{"cargo":"Dynamite","cargo.id":"dynamite","cargo.loaded":1,"cargo.mass":23996.69921875,"cargo.unit.count":39,"cargo.unit.mass":615.2999877929688,"delivery.time":98448,"destination.city":"Twin Falls","destination.city.id":"twin_falls","destination.company":"Coastline Mining","destination.company.id":"cm_min_str","income":10860,"is.special.job":0,"job.market":"quick_job","planned_distance.km":205,"source.city":"Pocatello","source.city.id":"pocatello","source.company":"Chemso Ltd.","source.company.id":"chm_che_plnt"}'
*/
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