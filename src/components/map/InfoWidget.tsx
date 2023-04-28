import Table from 'react-bootstrap/Table';

import { GeoAltFill, StopwatchFill, CupHotFill } from "react-bootstrap-icons";

import { useGameInfo } from '../../contexts/GameInfoProvider';
import { etaStr, timeDeltaStr } from '../../utils';

interface Props {
    // navigation ETA (in minutes)
    navigationTime: number | null,
    // navigation distance (in km)
    navigationDistance: number | null,
    // next rest stop in minutes
    nextRestStop: number | null,
}

/**
 * Map widget for displaying navigation information.
 */
export default function InfoWidget({ navigationTime, navigationDistance, nextRestStop }: Props) {
    const iconSize = 24;
    const { gameTime } = useGameInfo();

    return (
        // the outer div is necessary for elements in the widget to be clickable
        <div className='leaflet-top leaflet-right'>
            <div className="InfoWidget leaflet-control">
                <Table size='sm' className='InfoWidgetTable' bordered>
                    <tbody>
                        <tr>
                            <td><GeoAltFill className='InfoWidgetTableIcon' size={iconSize} /></td>
                            <td>{(navigationDistance === null) ? '- - -' : navigationDistance.toFixed(0).toString() + ' km'}</td>
                        </tr>
                        <tr>
                            <td><StopwatchFill className='InfoWidgetTableIcon' size={iconSize} /></td>
                            <td>{etaStr(gameTime, navigationTime)}</td>
                        </tr>
                        <tr>
                            <td><CupHotFill className='InfoWidgetTableIcon' size={iconSize} /></td>
                            <td>{(nextRestStop === null) ? '-  -  -' : timeDeltaStr(nextRestStop)}</td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        </div>
    )
}