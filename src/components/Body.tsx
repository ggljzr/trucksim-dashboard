import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack';

interface Props {
    sidebar?: boolean,
    children?: React.ReactNode;
}

export default function Body({ children }: Props) {
    return (
        <Container fluid>
            {children}
        </Container>
    );
}
