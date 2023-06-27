import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import './UploadPDF.css'

const UploadPDF = ({ onUploadSuccess, onUploadError }) => {
  const [file, setFile] = useState(null);

  const onDrop = (acceptedFiles) => {
    setFile(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleUpload = async () => {
    if (file) {
      const formData = new FormData();
      formData.append('pdfFile', file);

      try {
        const response = await fetch('/api/verifyDocument', {
          method: 'POST',
          body: formData,
        });
        const json = await response.json();
        onUploadSuccess(json);

      } catch (error) {
        onUploadError(error);
      }
    }
  };

  return (
    <div className="upload-container">
      <div {...getRootProps()} className={`dropzone ${isDragActive ? 'active' : ''}`}>
        <input {...getInputProps()} accept=".pdf" />
        {file ? (
          <p>Archivo seleccionado: {file.name}</p>
        ) : (
          <p>
            {isDragActive ? 'Suelta el archivo aquí' : 'Arrastra y suelta un archivo PDF aquí'}
          </p>
        )}
      </div>
      <button disabled={!file} onClick={handleUpload}>
        Subir
      </button>
    </div>
  );
};

export default UploadPDF;
