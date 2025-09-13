import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import PagesList from './components/Sidebar/PagesList';
import PageEditor from './components/Editor/PageEditor';
import CodePreview from './components/Export/CodePreview';
import ExportButton from './components/Export/ExportButton';
import { generateBlogContentCode } from './utils/codeGenerator';
import { importBlogContent } from './utils/fileHandler';
import './App.css';

const Container = styled.div`
  display: flex;
  height: 100vh;
  background: #1a1a1a;
  color: #ffffff;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
`;

const Sidebar = styled.div`
  width: 300px;
  background: #2d2d2d;
  border-right: 1px solid #404040;
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const Header = styled.div`
  padding: 20px;
  border-bottom: 1px solid #404040;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #2d2d2d;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 24px;
  font-weight: 600;
  color: #ffffff;
`;

const HeaderButtons = styled.div`
  display: flex;
  gap: 10px;
`;

const ImportButton = styled.input`
  display: none;
`;

const ImportLabel = styled.label`
  padding: 8px 16px;
  background: #404040;
  color: #ffffff;
  border: 1px solid #606060;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: background 0.2s;

  &:hover {
    background: #505050;
  }
`;

const ClearButton = styled.button`
  padding: 8px 16px;
  background: #dc3545;
  color: #ffffff;
  border: 1px solid #c82333;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: background 0.2s;

  &:hover {
    background: #c82333;
  }
`;

const AutoSaveIndicator = styled.div`
  padding: 4px 8px;
  background: #28a745;
  color: #ffffff;
  border-radius: 4px;
  font-size: 12px;
  display: flex;
  align-items: center;
  gap: 4px;
  
  &::before {
    content: "●";
    font-size: 8px;
  }
`;

const EditorContent = styled.div`
  flex: 1;
  display: flex;
  overflow: hidden;
`;

const EditorPanel = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px;
`;

const CodePanel = styled.div`
  width: 400px;
  border-left: 1px solid #404040;
  background: #1e1e1e;
  overflow-y: auto;
`;

function App() {
  const [pages, setPages] = useState([]);
  const [selectedPageId, setSelectedPageId] = useState(null);
  const [showCode, setShowCode] = useState(false);

  // Загрузка данных из localStorage при инициализации
  useEffect(() => {
    try {
      const savedPages = localStorage.getItem('blog-editor-pages');
      const savedSelectedId = localStorage.getItem('blog-editor-selected-page');
      
      if (savedPages) {
        const parsedPages = JSON.parse(savedPages);
        if (parsedPages.length > 0) {
          setPages(parsedPages);
          setSelectedPageId(savedSelectedId || parsedPages[0].id);
          return;
        }
      }
    } catch (error) {
      console.warn('Ошибка загрузки из localStorage:', error);
    }
    
    // Инициализация с пустой страницей, если нет сохраненных данных
    const initialPage = {
      id: '1',
      url: 'new-blog-page',
      title: 'Новая страница блога',
      order: 1,
      blocks: []
    };
    setPages([initialPage]);
    setSelectedPageId('1');
  }, []);

  // Автосохранение в localStorage при изменении данных
  useEffect(() => {
    if (pages.length > 0) {
      localStorage.setItem('blog-editor-pages', JSON.stringify(pages));
    }
  }, [pages]);

  useEffect(() => {
    if (selectedPageId) {
      localStorage.setItem('blog-editor-selected-page', selectedPageId);
    }
  }, [selectedPageId]);

  const selectedPage = pages.find(page => page.id === selectedPageId);

  const handlePageChange = (pageId, updatedPage) => {
    setPages(prev => prev.map(page => 
      page.id === pageId ? { ...page, ...updatedPage } : page
    ));
  };

  const handleAddPage = () => {
    const maxOrder = Math.max(0, ...pages.map(p => p.order || 0));
    const newPage = {
      id: Date.now().toString(),
      url: 'new-page',
      title: 'Новая страница',
      order: maxOrder + 1,
      blocks: []
    };
    setPages(prev => [...prev, newPage]);
    setSelectedPageId(newPage.id);
  };

  const handleReorderPages = (reorderedPages) => {
    setPages(reorderedPages);
  };

  const handleDeletePage = (pageId) => {
    if (pages.length === 1) return; // Не удаляем последнюю страницу
    
    setPages(prev => prev.filter(page => page.id !== pageId));
    if (selectedPageId === pageId) {
      const remainingPages = pages.filter(page => page.id !== pageId);
      setSelectedPageId(remainingPages[0]?.id || null);
    }
  };

  const handleImport = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const importedPages = await importBlogContent(file);
        setPages(importedPages);
        setSelectedPageId(importedPages[0]?.id || null);
      } catch (error) {
        alert('Ошибка при импорте файла: ' + error.message);
      }
    }
  };

  const handleClearCache = () => {
    if (window.confirm('Очистить все сохраненные данные? Это действие нельзя отменить.')) {
      localStorage.removeItem('blog-editor-pages');
      localStorage.removeItem('blog-editor-selected-page');
      
      // Сброс к начальному состоянию
      const initialPage = {
        id: '1',
        url: 'new-blog-page',
        title: 'Новая страница блога',
        order: 1,
        blocks: []
      };
      setPages([initialPage]);
      setSelectedPageId('1');
    }
  };

  const generatedCode = generateBlogContentCode(pages);

  return (
    <DndProvider backend={HTML5Backend}>
      <Container>
        <Sidebar>
          <PagesList
            pages={pages}
            selectedPageId={selectedPageId}
            onSelectPage={setSelectedPageId}
            onAddPage={handleAddPage}
            onDeletePage={handleDeletePage}
            onReorderPages={handleReorderPages}
          />
        </Sidebar>
        
        <MainContent>
          <Header>
            <Title>Blog Editor</Title>
            <HeaderButtons>
              <AutoSaveIndicator>
                Автосохранение
              </AutoSaveIndicator>
              <ImportLabel htmlFor="import-file">
                Import
              </ImportLabel>
              <ImportButton
                id="import-file"
                type="file"
                accept=".js"
                onChange={handleImport}
              />
              <ClearButton onClick={handleClearCache}>
                Очистить кэш
              </ClearButton>
              <ExportButton 
                code={generatedCode}
                onToggleCode={() => setShowCode(!showCode)}
                showingCode={showCode}
              />
            </HeaderButtons>
          </Header>
          
          <EditorContent>
            <EditorPanel>
              {selectedPage && (
                <PageEditor
                  page={selectedPage}
                  onChange={(updatedPage) => handlePageChange(selectedPage.id, updatedPage)}
                />
              )}
            </EditorPanel>
            
            {showCode && (
              <CodePanel>
                <CodePreview code={generatedCode} />
              </CodePanel>
            )}
          </EditorContent>
        </MainContent>
      </Container>
    </DndProvider>
  );
}

export default App;
