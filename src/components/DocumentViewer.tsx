import { useEffect } from 'react';
import { renderAsync } from 'docx-preview';
import { Viewer, Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import { Box } from '@mui/material';

import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

interface DocumentViewerProps {
    fileType: 'docx' | 'pdf' | null;
    fileUrl: string;
    docxArrayBuffer: ArrayBuffer | null;
    viewerRef: React.RefObject<HTMLDivElement>;
}

function DocumentViewer({ fileType, fileUrl, docxArrayBuffer, viewerRef }: DocumentViewerProps) {
    const defaultLayoutPluginInstance = defaultLayoutPlugin();

    useEffect(() => {
        if (docxArrayBuffer && viewerRef.current) {
            viewerRef.current.innerHTML = '';
            renderAsync(docxArrayBuffer, viewerRef.current).catch((err) => {
                console.error('Error rendering DOCX:', err);
            });
        }
    }, [docxArrayBuffer, viewerRef]);

    if (fileType === 'pdf') {
        return (
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                <Box sx={{ height: '500px', overflow: 'hidden' }}>
                    <Viewer fileUrl={fileUrl} plugins={[defaultLayoutPluginInstance]} />
                </Box>
            </Worker>
        );
    }

    return (
        <Box
            ref={viewerRef}
            sx={{
                height: '500px',
                overflow: 'scroll',
                padding: 2,
                border: '1px solid #ccc',
                borderRadius: 1,
            }}
        />
    );
}

export default DocumentViewer;