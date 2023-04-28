import Table from 'react-bootstrap/Table';
import { FlagFill, PersonVcardFill } from "react-bootstrap-icons";


import Body from '../components/Body';

import { Truck } from '../types';

interface Props {
    truck: Truck | null,
}

/**
 * Page displaying current truck info.
 */
export default function TruckPage({ truck }: Props) {
    const iconSize = 24;
    const content = (
        <div>
            <h2>{truck?.brand} {truck?.name}</h2>
            <Table size='sm' className='DashboardTable' bordered>
                <tbody>
                    <tr>
                        <td><PersonVcardFill className='DashboardTableIcon' size={iconSize} /></td>
                        <td className='DashboardTableHeader'>License plate</td>
                        <td>{truck?.license_plate}</td>
                    </tr>
                    <tr>
                        <td><FlagFill className='DashboardTableIcon' size={iconSize} /></td>
                        <td className='DashboardTableHeader'>License country/state</td>
                        <td>{truck?.license_plate_country}</td>
                    </tr>
                </tbody>
            </Table>
        </div>
    )

    return (
        <Body>
            <div>
                {truck === null ? <h1>No truck configured</h1> : content}
            </div>
        </Body>
    );
}
