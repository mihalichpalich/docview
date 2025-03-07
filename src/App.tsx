import { useRef, useState, ChangeEvent } from 'react';
import { Box, Typography } from '@mui/material';
import FileInput from './components/FileInput';
import ErrorMessage from './components/ErrorMessage';
import DocumentModal from './components/DocumentModal';

function App() {
    const [error, setError] = useState<string>('');
    const [fileName, setFileName] = useState<string>('');
    const [fileType, setFileType] = useState<'docx' | 'pdf' | null>(null);
    const [fileUrl, setFileUrl] = useState<string>('');
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [docxArrayBuffer, setDocxArrayBuffer] = useState<ArrayBuffer | null>(null);
    const viewerRef = useRef<HTMLDivElement>(null);

    const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (!file) {
            setError('Please upload a file.');
            return;
        }

        if (
            file.type !== 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' &&
            file.type !== 'application/pdf'
        ) {
            setError('Please upload a valid .docx or .pdf file.');
            return;
        }

        setError('');
        setFileName(file.name);
        setIsLoading(true);
        setIsModalOpen(true);

        if (file.type === 'application/pdf') {
            setFileType('pdf');
            setFileUrl(URL.createObjectURL(file));
        } else {
            setFileType('docx');
            const arrayBuffer = await file.arrayBuffer();
            setDocxArrayBuffer(arrayBuffer);
        }

        setIsLoading(false);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setFileName('');
        setFileType(null);
        setFileUrl('');
        setDocxArrayBuffer(null);
        if (viewerRef.current) {
            viewerRef.current.innerHTML = '';
        }
    };

    if (!viewerRef) {
        return null;
    }

    return (
        <Box sx={{ padding: 3 }}>
            <Typography variant="h4" gutterBottom>
                Document Viewer
            </Typography>
            <FileInput onFileChange={handleFileChange} />
            <ErrorMessage error={error} />
            <DocumentModal
                isOpen={isModalOpen}
                fileName={fileName}
                fileType={fileType}
                fileUrl={fileUrl}
                docxArrayBuffer={docxArrayBuffer}
                isLoading={isLoading}
                onClose={closeModal}
                viewerRef={viewerRef}
            />
        </Box>
    );
}

export default App;