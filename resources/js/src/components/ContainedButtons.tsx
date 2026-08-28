import Button from '@mui/material/Button';

export default function ContainedButtons() {
    return (
        <div
            style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '8px',
            }}
        >
            <Button variant="contained">Default</Button>

            <Button variant="contained" color="primary">
                Primary
            </Button>

            <Button variant="contained" color="secondary">
                Secondary
            </Button>

            <Button variant="contained" disabled>
                Disabled
            </Button>

            <Button
                variant="contained"
                color="primary"
                href="#contained-buttons"
            >
                Link
            </Button>
        </div>
    );
}