import ListGroup from 'react-bootstrap/ListGroup';

import Body from '../components/Body';

import { Job } from '../types';

interface Props {
    job?: Job,
}



export default function JobPage({ job }: Props) {
    // render job as a list if it exists
    const jobContent = (
        <ListGroup>
            <ListGroup.Item>Cras justo odio</ListGroup.Item>
            <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
            <ListGroup.Item>Morbi leo risus</ListGroup.Item>
            <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
            <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
        </ListGroup>
    )

    return (
        <Body>
            {
                job === undefined ?
                    <div className='d-flex justify-content-center'>
                        <h1>No job selected</h1>
                    </div>
                    :
                    jobContent
            }
        </Body>
    );
}
