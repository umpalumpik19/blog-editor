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
  min-height: 120px;
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
  text-align: center;
`;

const PreviewImageContainer = styled.div`
  width: 100%;
  height: 200px;
  background: #404040;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #888888;
  font-size: 12px;
  margin-bottom: 15px;
`;

const PreviewTitle = styled.h3`
  margin: 0 0 15px 0;
  font-size: 22px;
  color: #ffffff;
`;

const PreviewText = styled.div`
  color: #cccccc;
  line-height: 1.6;
  font-size: 14px;
  text-align: left;
  max-width: 600px;
  margin: 0 auto;
`;

const CentralBlockEditor = ({ block, onChange }) => {
  const handleChange = (field, value) => {
    onChange({
      ...block,
      [field]: value
    });
  };

  return (
    <Container>
      <FormGroup>
        <Label>Изображение героя (опционально):</Label>
        <Input
          type="text"
          value={block.heroImage || ''}
          onChange={(e) => handleChange('heroImage', e.target.value)}
          placeholder="/blog-images/hero.jpg"
        />
        <HelpText>
          Большое изображение в верхней части блока. Оставьте пустым для блока только с текстом
        </HelpText>
      </FormGroup>

      <FormGroup>
        <Label>Заголовок:</Label>
        <Input
          type="text"
          value={block.title || ''}
          onChange={(e) => handleChange('title', e.target.value)}
          placeholder="Введите заголовок"
        />
      </FormGroup>

      <FormGroup>
        <Label>Текст блока:</Label>
        <Textarea
          value={block.text || ''}
          onChange={(e) => handleChange('text', e.target.value)}
          placeholder="Введите основной текст блока"
        />
        <HelpText>
          Поддерживается HTML разметка: &lt;strong&gt;, &lt;em&gt;, &lt;ul&gt;, &lt;li&gt;, &lt;br/&gt;
        </HelpText>
      </FormGroup>

      {(block.heroImage || block.title || block.text) && (
        <Preview>
          <h4 style={{ margin: '0 0 15px 0', color: '#ffffff', fontSize: '14px' }}>
            Превью:
          </h4>
          {block.heroImage && (
            <PreviewImageContainer>
              {`Изображение: ${block.heroImage.split('/').pop()}`}
            </PreviewImageContainer>
          )}
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

export default CentralBlockEditor;