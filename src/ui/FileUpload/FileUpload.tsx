import { ChangeEvent, useState } from 'react';
import { useDropzone } from './useDropzone';

export function FileUpload() {
  const [files, setFiles] = useState<File[]>([]);
  const { inputRef, rootProps, isDragOver } = useDropzone({
    onDrop: handleFiles
  });

  function handleFiles(fileList: FileList) {
    const newFiles = Array.from(fileList);
    setFiles(prev => [...prev, ...newFiles]);
  }

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      handleFiles(e.target.files);
    }
  }

  return (
    <>
      <div
        {...rootProps}
        style={{
          border: isDragOver ? '2px dashed #007bff' : '2px dashed #ccc',
          borderRadius: '8px',
          padding: '40px 20px',
          textAlign: 'center',
          cursor: 'pointer',
          backgroundColor: isDragOver ? '#f8f9fa' : '#fff',
          transition: 'all 0.3s ease'
        }}
      >
        <input
          ref={inputRef}
          type="file"
          multiple
          onChange={handleInputChange}
          style={{ display: 'none' }}
        />
        <p>{isDragOver ? 'Drop files here' : 'Drag files here or click to select'}</p>
        {files.length > 0 && (
          <div style={{ marginTop: '16px' }}>
            <h4>Selected files:</h4>
            <ul style={{ textAlign: 'left' }}>
              {files.map((file, index) => (
                <li key={index}>
                  {file.name} ({Math.round(file.size / 1024)}KB)
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}
