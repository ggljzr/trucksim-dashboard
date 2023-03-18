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
            <ListGroup.Item>{job?.destination_city}</ListGroup.Item>
            <ListGroup.Item>{job?.destination_company}</ListGroup.Item>
            <ListGroup.Item>{job?.delivery_time}</ListGroup.Item>
            <ListGroup.Item>{job?.income}</ListGroup.Item>
            <ListGroup.Item>{job?.cargo}</ListGroup.Item>
            <ListGroup.Item>{job?.cargo} ({job?.cargo_mass} kg)</ListGroup.Item>
            <ListGroup.Item>{job?.job_market}</ListGroup.Item>
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
