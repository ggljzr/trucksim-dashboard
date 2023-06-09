import Table from 'react-bootstrap/Table';
import { Bullseye, GeoAltFill, BuildingFill, StopwatchFill, CurrencyExchange, BoxSeamFill, Globe, CupHotFill } from "react-bootstrap-icons";


import Body from '../components/Body';
import { gameMinutesToDate, dateShortStr, timeDeltaStr, timeDeltaMinutes, etaStr } from '../utils';
import { Job } from '../types';

import { useGameInfo } from '../contexts/GameInfoProvider';

interface Props {
    job: Job | null,
    // time to next rest stop in minutes
    nextRestStop: number | null,
}

/**
 * Page displaying current job info.
 */
export default function JobPage({ job, nextRestStop }: Props) {
    const iconSize = 24;

    const { gameInfo, gameTime } = useGameInfo();

    var deliveryTimeStr = "";
    if (job !== null) {
        const deliveryTimeDate = gameMinutesToDate(job.delivery_time);
        // calculate delivery time delta in minutes by subtracting current game time
        const deliveryTimeDelta = timeDeltaMinutes(deliveryTimeDate, gameTime);

        deliveryTimeStr = dateShortStr(deliveryTimeDate) + " (" + timeDeltaStr(deliveryTimeDelta) + ")";
    }

    const content = (
        <div>
            <h2>Current job</h2>
            <Table size='sm' className='DashboardTable' bordered>
                <tbody>
                    <tr>
                        <td><GeoAltFill className='DashboardTableIcon' size={iconSize} /></td>
                        <td className='DashboardTableHeader'>Job route</td>
                        <td> {job?.source_city} &gt; {job?.destination_city}</td>
                    </tr>
                    <tr>
                        <td><BuildingFill className='DashboardTableIcon' size={iconSize} /></td>
                        <td className='DashboardTableHeader'>Company</td>
                        <td>{job?.source_company} &gt; {job?.destination_company}</td>
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
                        <td>{job?.income} {gameInfo?.game_id === 'ats' ? '$' : '€'}</td>
                    </tr>
                    <tr>
                        <td><BoxSeamFill className='DashboardTableIcon' size={iconSize} /></td>
                        <td className='DashboardTableHeader'>Cargo</td>
                        <td>{job?.cargo} ({job?.cargo_mass.toFixed(1)} kg)</td>
                    </tr>
                    <tr>
                        <td><Globe className='DashboardTableIcon' size={iconSize} /></td>
                        <td className='DashboardTableHeader'>Market</td>
                        <td>{job?.job_market.replace("_", " ")}</td>
                    </tr>
                </tbody>
            </Table>
        </div>
    )

    return (
        <Body>
            <div>
                {job === null ? <h1>No job selected</h1> : content}
                {nextRestStop === null ?
                    <></> :
                    <div><CupHotFill className='DashboardTableIcon' /> Next rest stop: {etaStr(gameTime, nextRestStop)}</div>}
            </div>
        </Body>
    );
}
