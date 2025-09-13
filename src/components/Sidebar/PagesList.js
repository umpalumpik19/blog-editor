import React from 'react';
import styled from 'styled-components';
import { useDrag, useDrop } from 'react-dnd';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const Header = styled.div`
  padding: 20px;
  border-bottom: 1px solid #404040;
`;

const Title = styled.h2`
  margin: 0 0 15px 0;
  font-size: 18px;
  font-weight: 600;
  color: #ffffff;
`;

const AddButton = styled.button`
  width: 100%;
  padding: 10px;
  background: #0066cc;
  color: #ffffff;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #0052a3;
  }
`;

const PagesList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 10px;
`;

const PageItem = styled.div`
  padding: 12px;
  margin-bottom: 8px;
  background: ${props =>
    props.isDragging ? 'rgba(45, 45, 45, 0.5)' :
    props.isOver ? '#505050' :
    props.selected ? '#404040' : '#2d2d2d'};
  border: 1px solid ${props =>
    props.isOver ? '#0066cc' :
    props.selected ? '#606060' : '#404040'};
  border-radius: 6px;
  cursor: ${props => props.isDragging ? 'grabbing' : 'grab'};
  transition: all 0.2s;
  position: relative;
  opacity: ${props => props.isDragging ? 0.5 : 1};
  transform: ${props => props.isOver ? 'translateY(-2px)' : 'none'};

  &:hover {
    background: ${props => props.isDragging ? 'rgba(45, 45, 45, 0.5)' : '#404040'};
    border-color: #606060;
  }
`;

const PageTitle = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #ffffff;
  margin-bottom: 4px;
  word-break: break-word;
`;

const PageUrl = styled.div`
  font-size: 12px;
  color: #888888;
  font-family: 'Courier New', monospace;
  word-break: break-all;
`;

const DeleteButton = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  width: 20px;
  height: 20px;
  background: #dc3545;
  color: #ffffff;
  border: none;
  border-radius: 50%;
  font-size: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.2s;

  ${PageItem}:hover & {
    opacity: 1;
  }

  &:hover {
    background: #c82333;
  }
`;

const BlocksCount = styled.div`
  font-size: 11px;
  color: #666666;
  margin-top: 4px;
`;

const DragHandle = styled.div`
  position: absolute;
  left: 8px;
  top: 50%;
  transform: translateY(-50%);
  color: #666666;
  font-size: 12px;
  cursor: grab;

  &:hover {
    color: #888888;
  }
`;

const DraggablePageItem = ({
  page,
  index,
  selected,
  onSelectPage,
  onDeletePage,
  onMoveItem,
  totalPages
}) => {
  const [{ isDragging }, dragRef] = useDrag({
    type: 'PAGE_ITEM',
    item: { id: page.id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [{ isOver }, dropRef] = useDrop({
    accept: 'PAGE_ITEM',
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        onMoveItem(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <PageItem
      ref={(node) => dragRef(dropRef(node))}
      selected={selected}
      isDragging={isDragging}
      isOver={isOver}
      onClick={() => onSelectPage(page.id)}
    >
      <DragHandle>⋮⋮</DragHandle>
      <div style={{ marginLeft: '20px' }}>
        <PageTitle>{page.title}</PageTitle>
        <PageUrl>/blog/{page.url}</PageUrl>
        <BlocksCount>
          {page.blocks ? page.blocks.length : 0} блоков
        </BlocksCount>
      </div>
      {totalPages > 1 && (
        <DeleteButton
          onClick={(e) => {
            e.stopPropagation();
            onDeletePage(page.id);
          }}
          title="Удалить страницу"
        >
          ×
        </DeleteButton>
      )}
    </PageItem>
  );
};

const PagesListComponent = ({ pages, selectedPageId, onSelectPage, onAddPage, onDeletePage, onReorderPages }) => {
  const handleMoveItem = (fromIndex, toIndex) => {
    if (onReorderPages && fromIndex !== toIndex) {
      const reorderedPages = [...pages];
      const [draggedItem] = reorderedPages.splice(fromIndex, 1);
      reorderedPages.splice(toIndex, 0, draggedItem);

      // Обновляем order для всех страниц
      const updatedPages = reorderedPages.map((page, index) => ({
        ...page,
        order: index + 1
      }));

      onReorderPages(updatedPages);
    }
  };

  return (
    <Container>
      <Header>
        <Title>Страницы</Title>
        <AddButton onClick={onAddPage}>
          + Добавить страницу
        </AddButton>
      </Header>

      <PagesList>
        {pages.map((page, index) => (
          <DraggablePageItem
            key={page.id}
            page={page}
            index={index}
            selected={page.id === selectedPageId}
            onSelectPage={onSelectPage}
            onDeletePage={onDeletePage}
            onMoveItem={handleMoveItem}
            totalPages={pages.length}
          />
        ))}
      </PagesList>
    </Container>
  );
};

export default PagesListComponent;