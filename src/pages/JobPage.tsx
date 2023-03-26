import Table from 'react-bootstrap/Table';
import { Bullseye, GeoAltFill, BuildingFill, StopwatchFill, CurrencyExchange, BoxSeamFill, Globe } from "react-bootstrap-icons";


import Body from '../components/Body';
import { minutesToDate, dateShortStr, timedelatStr } from '../utils';
import { Job } from '../types';

interface Props {
    job?: Job,
    // time to next rest stop in minutes
    nextRestStop?: number,
}

export default function JobPage({ job, nextRestStop }: Props) {
    const iconSize = 24;

    var deliveryTimeStr = "";
    if (job !== undefined) {
        deliveryTimeStr = dateShortStr(minutesToDate(job.delivery_time));
    }

    var nextRestStopStr = "";
    if (nextRestStop !== undefined) {
        nextRestStopStr = timedelatStr(nextRestStop);
    }

    const content = (
        <div>
            <h2>Current job</h2>
            <Table size='sm' bordered className='DashboardTable'>
                <tbody>
                    <tr>
                        <td><GeoAltFill className='DashboardTableIcon' size={iconSize} /></td>
                        <td className='DashboardTableHeader'>Destination</td>
                        <td>{job?.destination_city}</td>
                    </tr>
                    <tr>
                        <td><BuildingFill className='DashboardTableIcon' size={iconSize} /></td>
                        <td className='DashboardTableHeader'>Company</td>
                        <td>{job?.destination_company}</td>
                    </tr>
                    <tr>
                        <td><Bullseye className='DashboardTableIcon' size={iconSize} /></td>
                        <td className='DashboardTableHeader'>Planned distance</td>
                        <td>{job?.planned_distance_km} km</td>
                    </tr>
                    <tr>
                        <td><StopwatchFill className='DashboardTableIcon' size={iconSize} /></td>
                        <td className='DashboardTableHeader'>Delivery time</td>
                        <td>{deliveryTimeStr}</td>
                    </tr>
                    <tr>
                        <td><CurrencyExchange className='DashboardTableIcon' size={iconSize} /></td>
                        <td className='DashboardTableHeader'>Income</td>
                        <td>{job?.income}</td>
                    </tr>
                    <tr>
                        <td><BoxSeamFill className='DashboardTableIcon' size={iconSize} /></td>
                        <td className='DashboardTableHeader'>Cargo</td>
                        <td>{job?.cargo} ({job?.cargo_mass.toFixed(1)} kg)</td>
                    </tr>
                    <tr>
                        <td><Globe className='DashboardTableIcon' size={iconSize} /></td>
                        <td className='DashboardTableHeader'>Market</td>
                        <td>{job?.job_market}</td>
                    </tr>
                </tbody>
            </Table>
        </div>
    )

    return (
        <Body>
            <div>
                {job === undefined ? <h1>No job selected</h1> : content}
                {nextRestStop === undefined ? "" : <div>Next rest stop in: {nextRestStopStr}</div>}
            </div>
        </Body>
    );
}
