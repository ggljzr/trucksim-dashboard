import Table from 'react-bootstrap/Table';

import { GeoAltFill, StopwatchFill, CupHotFill } from "react-bootstrap-icons";

import { timeDeltaStr } from '../../utils';

interface Props {
    // navigation ETA (in minutes)
    navigationTime: number | null,
    // navigation distance (in km)
    navigationDistance: number | null,
    // next rest stop in minutes
    nextRestStop: number | null,
}

export default function InfoWidget({ navigationTime, navigationDistance, nextRestStop }: Props) {
    const iconSize = 24;

    return (
        <div className="InfoWidget leaflet-control leaflet-top leaflet-right">
            <Table size='sm' className='InfoWidgetTable' bordered>
                <tbody>
                    <tr>
                        <td><GeoAltFill className='InfoWidgetTableIcon' size={iconSize} /></td>
                        <td>{(navigationDistance === null) ? '- - -' : navigationDistance.toFixed(0).toString() + ' km'}</td>
                    </tr>
                    <tr>
                        <td><StopwatchFill className='InfoWidgetTableIcon' size={iconSize} /></td>
                        <td>{(navigationTime === null) ? '- - -' : timeDeltaStr(navigationTime)}</td>
                    </tr>
                    <tr>
                        <td><CupHotFill className='InfoWidgetTableIcon' size={iconSize} /></td>
                        <td>{(nextRestStop === null) ? '-  -  -' : timeDeltaStr(nextRestStop)}</td>
                    </tr>
                </tbody>
            </Table>
        </div>
    )
}