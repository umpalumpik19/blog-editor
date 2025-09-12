import React, { useState } from 'react';
import styled from 'styled-components';
import { downloadFile, copyToClipboard } from '../../utils/fileHandler';

const ButtonsContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const Button = styled.button`
  padding: 8px 16px;
  background: ${props => props.primary ? '#0066cc' : '#404040'};
  color: #ffffff;
  border: 1px solid ${props => props.primary ? '#0066cc' : '#606060'};
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;

  &:hover {
    background: ${props => props.primary ? '#0052a3' : '#505050'};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const DropdownContainer = styled.div`
  position: relative;
`;

const Dropdown = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 5px;
  background: #2d2d2d;
  border: 1px solid #606060;
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  z-index: 1000;
  min-width: 150px;
`;

const DropdownItem = styled.button`
  width: 100%;
  padding: 10px 15px;
  background: transparent;
  color: #ffffff;
  border: none;
  text-align: left;
  cursor: pointer;
  font-size: 14px;
  transition: background 0.2s;

  &:hover {
    background: #404040;
  }

  &:first-child {
    border-radius: 6px 6px 0 0;
  }

  &:last-child {
    border-radius: 0 0 6px 6px;
  }

  &:only-child {
    border-radius: 6px;
  }
`;

const ExportButton = ({ code, onToggleCode, showingCode }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [copyStatus, setCopyStatus] = useState('');

  const handleCopy = async () => {
    const success = await copyToClipboard(code);
    setCopyStatus(success ? 'Скопировано!' : 'Ошибка копирования');
    setTimeout(() => setCopyStatus(''), 2000);
    setShowDropdown(false);
  };

  const handleDownload = () => {
    downloadFile(code, 'blogContent.js');
    setShowDropdown(false);
  };

  return (
    <ButtonsContainer>
      <Button onClick={onToggleCode}>
        {showingCode ? 'Скрыть код' : 'Показать код'}
      </Button>
      
      <DropdownContainer>
        <Button 
          primary
          onClick={() => setShowDropdown(!showDropdown)}
        >
          Export {showDropdown ? '▲' : '▼'}
        </Button>
        
        {showDropdown && (
          <Dropdown>
            <DropdownItem onClick={handleCopy}>
              {copyStatus || 'Скопировать код'}
            </DropdownItem>
            <DropdownItem onClick={handleDownload}>
              Скачать файл
            </DropdownItem>
          </Dropdown>
        )}
      </DropdownContainer>
    </ButtonsContainer>
  );
};

export default ExportButton;