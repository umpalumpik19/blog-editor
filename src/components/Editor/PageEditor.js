import React, { useState } from 'react';
import styled from 'styled-components';
import { useDrop } from 'react-dnd';
import BlockEditor from './BlockEditor';
import AddBlockPanel from './AddBlockPanel';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const PageHeader = styled.div`
  background: #2d2d2d;
  border: 1px solid #404040;
  border-radius: 8px;
  padding: 20px;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-size: 14px;
  font-weight: 500;
  color: #ffffff;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  background: #1a1a1a;
  color: #ffffff;
  border: 1px solid #606060;
  border-radius: 6px;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: #0066cc;
  }

  &.error {
    border-color: #dc3545;
  }
`;

const ErrorText = styled.div`
  font-size: 12px;
  color: #dc3545;
  margin-top: 5px;
`;

const BlocksList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const DropZone = styled.div`
  min-height: 100px;
  border: 2px dashed #404040;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #888888;
  font-size: 14px;
  margin-top: 20px;
  transition: all 0.2s;

  ${props => props.isOver && `
    border-color: #0066cc;
    background: rgba(0, 102, 204, 0.1);
    color: #0066cc;
  `}
`;

const SectionTitle = styled.h3`
  margin: 0 0 15px 0;
  font-size: 18px;
  font-weight: 600;
  color: #ffffff;
`;

const PageEditor = ({ page, onChange }) => {
  const [urlError, setUrlError] = useState('');

  const validateUrl = (url) => {
    const urlPattern = /^[a-z0-9-]+$/;
    if (!urlPattern.test(url)) {
      setUrlError('URL должен содержать только латинские буквы, цифры и дефисы');
      return false;
    }
    setUrlError('');
    return true;
  };

  const handlePageChange = (field, value) => {
    if (field === 'url') {
      validateUrl(value);
    }
    onChange({ [field]: value });
  };

  const handleBlockChange = (blockIndex, updatedBlock) => {
    const newBlocks = [...(page.blocks || [])];
    newBlocks[blockIndex] = updatedBlock;
    onChange({ blocks: newBlocks });
  };

  const handleBlockDelete = (blockIndex) => {
    const newBlocks = [...(page.blocks || [])];
    newBlocks.splice(blockIndex, 1);
    onChange({ blocks: newBlocks });
  };

  const handleBlockMove = (fromIndex, toIndex) => {
    const newBlocks = [...(page.blocks || [])];
    const [movedBlock] = newBlocks.splice(fromIndex, 1);
    newBlocks.splice(toIndex, 0, movedBlock);
    onChange({ blocks: newBlocks });
  };

  const handleAddBlock = (blockType) => {
    const newBlock = {
      id: Date.now().toString(),
      type: blockType,
      title: '',
      text: ''
    };

    if (blockType === 'imageText') {
      newBlock.image = '';
      newBlock.position = 'left';
    }

    if (blockType === 'central') {
      newBlock.image = '';
    }

    if (blockType === 'text') {
      // Text block has optional title and text
      newBlock.title = '';
    }

    const newBlocks = [...(page.blocks || []), newBlock];
    onChange({ blocks: newBlocks });
  };

  const [{ isOver }, drop] = useDrop({
    accept: 'block',
    drop: (item) => {
      // Логика для drag & drop между блоками
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <Container>
      <PageHeader>
        <SectionTitle>Настройки страницы</SectionTitle>
        
        <FormGroup>
          <Label htmlFor="page-title">Заголовок страницы:</Label>
          <Input
            id="page-title"
            type="text"
            value={page.title || ''}
            onChange={(e) => handlePageChange('title', e.target.value)}
            placeholder="Введите заголовок страницы"
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="page-url">URL страницы:</Label>
          <Input
            id="page-url"
            type="text"
            value={page.url || ''}
            onChange={(e) => handlePageChange('url', e.target.value)}
            placeholder="page-url-example"
            className={urlError ? 'error' : ''}
          />
          {urlError && <ErrorText>{urlError}</ErrorText>}
          {!urlError && page.url && (
            <div style={{ fontSize: '12px', color: '#888888', marginTop: '5px' }}>
              Страница будет доступна по адресу: /blog/{page.url}
            </div>
          )}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="page-preview">Превью изображение:</Label>
          <Input
            id="page-preview"
            type="text"
            value={page.previewImage || ''}
            onChange={(e) => handlePageChange('previewImage', e.target.value)}
            placeholder="/blog-images/preview.jpg"
          />
          <div style={{ fontSize: '12px', color: '#888888', marginTop: '5px' }}>
            Изображение для отображения на карточке блога в списке. Оставьте пустым для черной карточки
          </div>
        </FormGroup>
      </PageHeader>

      <div>
        <SectionTitle>Блоки контента</SectionTitle>
        
        <AddBlockPanel onAddBlock={handleAddBlock} />

        <BlocksList>
          {(page.blocks || []).map((block, index) => (
            <BlockEditor
              key={block.id || index}
              block={block}
              index={index}
              onChange={(updatedBlock) => handleBlockChange(index, updatedBlock)}
              onDelete={() => handleBlockDelete(index)}
              onMove={handleBlockMove}
            />
          ))}
        </BlocksList>

        {(!page.blocks || page.blocks.length === 0) && (
          <DropZone ref={drop} isOver={isOver}>
            Добавьте первый блок контента
          </DropZone>
        )}
      </div>
    </Container>
  );
};

export default PageEditor;