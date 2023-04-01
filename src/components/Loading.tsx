import Spinner from 'react-bootstrap/Spinner';

interface Props {
    mqttConnected: boolean,
}

/**
 * Component for displaying loading screen before the game is started.
 * @param param0 
 */
export default function Loading({ mqttConnected }: Props) {
    return (
        <div className='m-5'>
            <h1>Waiting for game...</h1>
            MQTT Client: {mqttConnected ? 'Connected' : 'Disconnected'}
            <br />
            <Spinner animation='border' className='m-5' />
        </div>
    );
}