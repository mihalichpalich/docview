import { Typography } from '@mui/material';

interface ErrorMessageProps {
    error: string;
}

function ErrorMessage({ error }: ErrorMessageProps) {
    return error ? (
        <Typography color="error" sx={{ marginBottom: 2 }}>
            {error}
        </Typography>
    ) : null;
}

export default ErrorMessage;