'use client'

import Image from 'next/image'
import React, { useState } from 'react';
import UploadPDF from './UploadPDF.tsx';
import VerifyResults from './VerifyResults.tsx';

export default function Home() {
  const [results, setResults] = useState(undefined);
  const handleUploadSuccess = (resultsJson : any[]) => {
      setResults(resultsJson[0]["certificado"][0]["datosUsuario"]);
  };
  const handleUploadError = (error : any) => {
      console.log(error);
  }
  return (
    <div className="App">
      {results !== undefined ? (
        <VerifyResults results={results} />
      ) : (
        <UploadPDF onUploadSuccess={handleUploadSuccess} onUploadError={handleUploadError} />
      )}
    </div>
  )
}
