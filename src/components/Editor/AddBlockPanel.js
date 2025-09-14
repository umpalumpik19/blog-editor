import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background: #2d2d2d;
  border: 1px solid #404040;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 20px;
`;

const Title = styled.h4`
  margin: 0 0 15px 0;
  font-size: 16px;
  font-weight: 600;
  color: #ffffff;
`;

const ButtonsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 10px;
`;

const BlockButton = styled.button`
  padding: 15px;
  background: #404040;
  color: #ffffff;
  border: 1px solid #606060;
  border-radius: 6px;
  cursor: pointer;
  text-align: left;
  transition: all 0.2s;
  font-size: 14px;

  &:hover {
    background: #505050;
    border-color: #0066cc;
  }
`;

const BlockName = styled.div`
  font-weight: 600;
  margin-bottom: 5px;
`;

const BlockDescription = styled.div`
  font-size: 12px;
  color: #cccccc;
  line-height: 1.3;
`;

const blockTypes = [
  {
    type: 'intro',
    name: 'Intro Block',
    description: 'Вводный текст с заголовком. Обычно первый блок на странице.'
  },
  {
    type: 'text',
    name: 'Text Block',
    description: 'Простой текстовый блок с опциональным заголовком. Текст не центрируется.'
  },
  {
    type: 'imageText',
    name: 'Image + Text',
    description: 'Блок с изображением и текстом. Адаптивное позиционирование.'
  },
  {
    type: 'central',
    name: 'Central Block',
    description: 'Центрированный блок с опциональным hero-изображением.'
  }
];

const AddBlockPanel = ({ onAddBlock }) => {
  return (
    <Container>
      <Title>Добавить блок</Title>
      
      <ButtonsGrid>
        {blockTypes.map(blockType => (
          <BlockButton
            key={blockType.type}
            onClick={() => onAddBlock(blockType.type)}
          >
            <BlockName>{blockType.name}</BlockName>
            <BlockDescription>{blockType.description}</BlockDescription>
          </BlockButton>
        ))}
      </ButtonsGrid>
    </Container>
  );
};

export default AddBlockPanel;