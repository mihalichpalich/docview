import { ChangeEvent } from 'react';
import { Box, TextField } from '@mui/material';

interface FileInputProps {
    onFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

function FileInput({ onFileChange }: FileInputProps) {
    return (
        <Box sx={{ marginBottom: 3 }}>
            <TextField
                type="file"
                slotProps={{ htmlInput: { accept: '.docx,.pdf' } }}
                onChange={onFileChange}
                fullWidth
                variant="outlined"
            />
        </Box>
    );
}

export default FileInput;