import { Box, Modal, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DocumentViewer from './DocumentViewer';
import LoadingSpinner from './LoadingSpinner';

interface DocumentModalProps {
    isOpen: boolean;
    fileName: string;
    fileType: 'docx' | 'pdf' | null;
    fileUrl: string;
    docxArrayBuffer: ArrayBuffer | null;
    isLoading: boolean;
    onClose: () => void;
    viewerRef: React.RefObject<HTMLDivElement>;
}

function DocumentModal({
                           isOpen,
                           fileName,
                           fileType,
                           fileUrl,
                           docxArrayBuffer,
                           isLoading,
                           onClose,
                           viewerRef,
                       }: DocumentModalProps) {
    return (
        <Modal open={isOpen} onClose={onClose}>
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '80%',
                    maxWidth: 800,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    borderRadius: 2,
                    p: 3,
                    maxHeight: '90vh',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        borderBottom: '1px solid #ccc',
                        pb: 2,
                        mb: 2,
                    }}
                >
                    <Typography variant="h6">{fileName}</Typography>
                    <IconButton onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                </Box>
                {isLoading ? (
                    <LoadingSpinner />
                ) : (
                    <DocumentViewer
                        fileType={fileType}
                        fileUrl={fileUrl}
                        docxArrayBuffer={docxArrayBuffer}
                        viewerRef={viewerRef}
                    />
                )}
            </Box>
        </Modal>
    );
}

export default DocumentModal;