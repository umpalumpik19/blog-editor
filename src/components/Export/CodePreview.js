import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  padding: 15px 20px;
  background: #2d2d2d;
  border-bottom: 1px solid #404040;
  font-size: 14px;
  font-weight: 600;
  color: #ffffff;
`;

const CodeContainer = styled.pre`
  flex: 1;
  margin: 0;
  padding: 20px;
  background: #1e1e1e;
  color: #d4d4d4;
  font-family: 'Courier New', 'Monaco', 'Menlo', monospace;
  font-size: 12px;
  line-height: 1.5;
  overflow: auto;
  white-space: pre-wrap;
  word-wrap: break-word;
`;

const CodePreview = ({ code }) => {
  // Простая подсветка синтаксиса
  const highlightCode = (code) => {
    return code
      .replace(/export/g, '<span style="color: #c586c0">export</span>')
      .replace(/const/g, '<span style="color: #569cd6">const</span>')
      .replace(/function/g, '<span style="color: #569cd6">function</span>')
      .replace(/return/g, '<span style="color: #c586c0">return</span>')
      .replace(/"([^"]*)"/g, '<span style="color: #ce9178">"$1"</span>')
      .replace(/'([^']*)'/g, '<span style="color: #ce9178">\'$1\'</span>')
      .replace(/\/\/.*$/gm, '<span style="color: #6a9955">$&</span>')
      .replace(/\b(type|title|text|image|position|url|blocks)\s*:/g, '<span style="color: #9cdcfe">$1</span>:');
  };

  return (
    <Container>
      <Header>
        Сгенерированный код (blogContent.js)
      </Header>
      <CodeContainer
        dangerouslySetInnerHTML={{
          __html: highlightCode(code)
        }}
      />
    </Container>
  );
};

export default CodePreview;