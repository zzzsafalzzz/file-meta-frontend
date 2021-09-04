import React, { useRef, useState } from 'react';
import styled from 'styled-components';

import { isValidFileType } from '@/utils/files';
import { useFileState } from '@/contexts/FileContext';
import { PrimaryButton } from '@/components/PrimaryButton';
import { SelectFileContainer } from '@/containers/SelectFileContainer';

const StyledFileInput = styled.input`
  border: 1px solid #979797;
  border-radius: 6px;
  padding: 12px 24px;
  margin: 12px 0;
`;

const StyledButtonWrapper = styled.div`
  display: flex;
`;

const FileInput: React.FC = () => {
  const { fileInput, addFileToHistory, getFileHistoryList } = useFileState();
  const [currentFile, setCurrentFile] = useState<File | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  const resetInput = () => {
    if (inputRef?.current) {
      inputRef.current.value = '';
    }

    setCurrentFile(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) {
      return;
    }

    const file = e.target.files[0];

    if (!isValidFileType(file)) {
      console.warn('Invalid file type! File must be one of PDF, DOCX or DOC!');
      resetInput();

      return;
    }

    setCurrentFile(file);
  };

  const handleSave = async () => {
    if (!currentFile) {
      console.warn('No file selected!');

      return;
    }

    const {
      name: fileName,
      type: fileType,
      size: fileSize,
      lastModified,
    } = currentFile;

    await addFileToHistory({
      fileName,
      fileType,
      fileSize,
      lastModified: new Date(lastModified),
    });
    getFileHistoryList();
  };

  return (
    <SelectFileContainer headline="Select a file">
      <StyledFileInput type="file" ref={inputRef} onChange={handleChange} />

      {inputRef?.current?.value && (
        <StyledButtonWrapper>
          <PrimaryButton onClick={resetInput} disabled={fileInput.isLoading}>
            Reset File
          </PrimaryButton>
          <PrimaryButton onClick={handleSave} disabled={fileInput.isLoading}>
            Save File
          </PrimaryButton>
        </StyledButtonWrapper>
      )}
    </SelectFileContainer>
  );
};

export default FileInput;
