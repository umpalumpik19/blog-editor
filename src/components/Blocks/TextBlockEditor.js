import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 5px;
  font-size: 14px;
  font-weight: 500;
  color: #ffffff;
`;

const Input = styled.input`
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
`;

const Textarea = styled.textarea`
  padding: 10px;
  background: #1a1a1a;
  color: #ffffff;
  border: 1px solid #606060;
  border-radius: 6px;
  font-size: 14px;
  min-height: 150px;
  resize: vertical;
  font-family: inherit;
  line-height: 1.4;

  &:focus {
    outline: none;
    border-color: #0066cc;
  }
`;

const HelpText = styled.div`
  font-size: 12px;
  color: #888888;
  margin-top: 5px;
`;

const Preview = styled.div`
  background: #1a1a1a;
  border: 1px solid #404040;
  border-radius: 6px;
  padding: 15px;
  margin-top: 10px;
  text-align: left;
`;

const PreviewTitle = styled.h3`
  margin: 0 0 15px 0;
  font-size: 20px;
  color: #ffffff;
  text-align: left;
`;

const PreviewText = styled.div`
  color: #cccccc;
  line-height: 1.6;
  font-size: 16px;
  text-align: left;

  p {
    margin: 0 0 12px 0;
  }

  p:last-child {
    margin-bottom: 0;
  }

  strong {
    color: #ffffff;
  }

  em {
    font-style: italic;
  }
`;

const TextBlockEditor = ({ block, onChange }) => {
  const handleChange = (field, value) => {
    onChange({
      ...block,
      [field]: value
    });
  };

  return (
    <Container>
      <FormGroup>
        <Label>Заголовок блока (опционально):</Label>
        <Input
          type="text"
          value={block.title || ''}
          onChange={(e) => handleChange('title', e.target.value)}
          placeholder="Оставьте пустым, если заголовок не нужен"
        />
        <HelpText>
          Заголовок отображается слева, если оставить пустым - показывается только текст
        </HelpText>
      </FormGroup>

      <FormGroup>
        <Label>Текст:</Label>
        <Textarea
          value={block.text || ''}
          onChange={(e) => handleChange('text', e.target.value)}
          placeholder="Введите основной текст блока"
        />
        <HelpText>
          Поддерживается HTML разметка: &lt;strong&gt;, &lt;em&gt;, &lt;br/&gt;, &lt;p&gt;
          <br />
          Текст выравнивается по левому краю, не центрируется
        </HelpText>
      </FormGroup>

      {(block.title || block.text) && (
        <Preview>
          <h4 style={{ margin: '0 0 10px 0', color: '#ffffff', fontSize: '14px' }}>
            Превью:
          </h4>
          {block.title && <PreviewTitle>{block.title}</PreviewTitle>}
          {block.text && (
            <PreviewText
              dangerouslySetInnerHTML={{ __html: block.text }}
            />
          )}
        </Preview>
      )}
    </Container>
  );
};

export default TextBlockEditor;