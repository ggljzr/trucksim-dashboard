import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack';

import Sidebar from './Sidebar';

interface Props {
    children?: React.ReactNode;
}

export default function Body({ children }: Props) {
    return (
        <Stack direction='horizontal' className='Body'>
            <Sidebar />
            <Container fluid className='Content'>
                {children}
            </Container>
        </Stack>

    );
}
