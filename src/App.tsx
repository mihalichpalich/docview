import React, { useRef, useState, ChangeEvent } from 'react';
import { renderAsync } from 'docx-preview';
import Modal from './Modal';
import PdfViewer from './PdfViewer';
import './App.css';

function App() {
    const [error, setError] = useState<string>("");
    const [fileName, setFileName] = useState<string>("");
    const [fileType, setFileType] = useState<'docx' | 'pdf' | null>(null);
    const [fileUrl, setFileUrl] = useState<string>("");
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const viewerRef = useRef<HTMLDivElement | null>(null);

    const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (!file) {
            setError("Please upload a file.");
            return;
        }

        // Проверяем тип файла
        if (
            file.type !== "application/vnd.openxmlformats-officedocument.wordprocessingml.document" &&
            file.type !== "application/pdf"
        ) {
            setError("Please upload a valid .docx or .pdf file.");
            return;
        }

        setError("");
        setFileName(file.name); // Устанавливаем название файла
        setIsModalOpen(true); // Открываем модальное окно

        if (file.type === "application/pdf") {
            setFileType('pdf');
            setFileUrl(URL.createObjectURL(file)); // Создаем URL для PDF
        } else {
            setFileType('docx');
            const arrayBuffer = await file.arrayBuffer();

            if (viewerRef.current) {
                renderAsync(arrayBuffer, viewerRef.current!).catch(() => {
                    setError("An error occurred rendering the document");
                });
            }
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setFileName("");
        setFileType(null);
        setFileUrl("");
        if (viewerRef.current) {
            if ("innerHTML" in viewerRef.current) {
                viewerRef.current.innerHTML = "";
            } // Очищаем содержимое просмотрщика
        }
    };

    return (
        <div className="container mt-4">
            <div className="mb-3">
                <h1>Document Viewer</h1>
            </div>
            <div className="mb-3">
                <form>
                    <div className="form-group">
                        <label>Upload a Document (.docx or .pdf)</label>
                        <input
                            type="file"
                            accept=".docx,.pdf"
                            onChange={handleFileChange}
                            className="form-control"
                        />
                    </div>
                </form>
            </div>

            {error && <div className="error-message">{error}</div>}

            <Modal isOpen={isModalOpen} onClose={closeModal} title={fileName}>
                {fileType === 'pdf' ? (
                    <PdfViewer fileUrl={fileUrl} />
                ) : (
                    <div
                        ref={viewerRef}
                        className="docx-viewer"
                    >
                        {/* Здесь будет отображаться DOCX документ */}
                    </div>
                )}
            </Modal>
        </div>
    );
}

export default App;