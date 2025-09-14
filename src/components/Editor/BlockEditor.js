import React, { useState } from 'react';
import styled from 'styled-components';
import { useDrag, useDrop } from 'react-dnd';
import IntroBlockEditor from '../Blocks/IntroBlockEditor';
import ImageTextEditor from '../Blocks/ImageTextEditor';
import CentralBlockEditor from '../Blocks/CentralBlockEditor';
import TextBlockEditor from '../Blocks/TextBlockEditor';

const Container = styled.div`
  background: #2d2d2d;
  border: 1px solid #404040;
  border-radius: 8px;
  position: relative;
  transition: all 0.2s;

  ${props => props.isDragging && `
    opacity: 0.5;
  `}

  ${props => props.isOver && `
    border-color: #0066cc;
    background: rgba(0, 102, 204, 0.05);
  `}
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 20px;
  border-bottom: 1px solid #404040;
  background: #333333;
  border-radius: 8px 8px 0 0;
`;

const BlockType = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  font-weight: 600;
  color: #ffffff;
`;

const BlockNumber = styled.span`
  background: #0066cc;
  color: #ffffff;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 600;
`;

const Actions = styled.div`
  display: flex;
  gap: 8px;
`;

const ActionButton = styled.button`
  padding: 6px 8px;
  background: ${props => props.danger ? '#dc3545' : '#404040'};
  color: #ffffff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  transition: background 0.2s;

  &:hover {
    background: ${props => props.danger ? '#c82333' : '#505050'};
  }
`;

const DragHandle = styled.div`
  cursor: move;
  color: #888888;
  font-size: 16px;
  padding: 4px;
  
  &:hover {
    color: #ffffff;
  }
`;

const Content = styled.div`
  padding: 20px;
`;

const ToggleButton = styled.button`
  background: none;
  border: none;
  color: #888888;
  cursor: pointer;
  font-size: 16px;
  padding: 4px;
  
  &:hover {
    color: #ffffff;
  }
`;

const blockTypeNames = {
  intro: 'Intro Block',
  text: 'Text Block',
  imageText: 'Image + Text',
  central: 'Central Block'
};

const BlockEditor = ({ block, index, onChange, onDelete, onMove }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const [{ isDragging }, drag, dragPreview] = useDrag({
    type: 'block',
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [{ isOver }, drop] = useDrop({
    accept: 'block',
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        onMove(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const renderBlockEditor = () => {
    switch (block.type) {
      case 'intro':
        return <IntroBlockEditor block={block} onChange={onChange} />;
      case 'imageText':
        return <ImageTextEditor block={block} onChange={onChange} />;
      case 'central':
        return <CentralBlockEditor block={block} onChange={onChange} />;
      case 'text':
        return <TextBlockEditor block={block} onChange={onChange} />;
      default:
        return <div>Неизвестный тип блока: {block.type}</div>;
    }
  };

  return (
    <Container
      ref={(node) => dragPreview(drop(node))}
      isDragging={isDragging}
      isOver={isOver}
    >
      <Header>
        <BlockType>
          <DragHandle ref={drag}>
            ⋮⋮
          </DragHandle>
          <BlockNumber>{index + 1}</BlockNumber>
          {blockTypeNames[block.type] || block.type}
        </BlockType>
        
        <Actions>
          <ToggleButton
            onClick={() => setIsExpanded(!isExpanded)}
            title={isExpanded ? 'Свернуть' : 'Развернуть'}
          >
            {isExpanded ? '▲' : '▼'}
          </ToggleButton>
          <ActionButton
            danger
            onClick={onDelete}
            title="Удалить блок"
          >
            ×
          </ActionButton>
        </Actions>
      </Header>
      
      {isExpanded && (
        <Content>
          {renderBlockEditor()}
        </Content>
      )}
    </Container>
  );
};

export default BlockEditor;