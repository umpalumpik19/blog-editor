import React from 'react';
import styled from 'styled-components';

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
  background: ${props => props.selected ? '#404040' : '#2d2d2d'};
  border: 1px solid ${props => props.selected ? '#606060' : '#404040'};
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
  position: relative;

  &:hover {
    background: #404040;
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

const PagesListComponent = ({ pages, selectedPageId, onSelectPage, onAddPage, onDeletePage }) => {
  return (
    <Container>
      <Header>
        <Title>Страницы</Title>
        <AddButton onClick={onAddPage}>
          + Добавить страницу
        </AddButton>
      </Header>
      
      <PagesList>
        {pages.map(page => (
          <PageItem
            key={page.id}
            selected={page.id === selectedPageId}
            onClick={() => onSelectPage(page.id)}
          >
            <PageTitle>{page.title}</PageTitle>
            <PageUrl>/blog/{page.url}</PageUrl>
            <BlocksCount>
              {page.blocks ? page.blocks.length : 0} блоков
            </BlocksCount>
            {pages.length > 1 && (
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
        ))}
      </PagesList>
    </Container>
  );
};

export default PagesListComponent;