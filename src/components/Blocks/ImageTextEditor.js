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
  min-height: 100px;
  resize: vertical;
  font-family: inherit;
  line-height: 1.4;

  &:focus {
    outline: none;
    border-color: #0066cc;
  }
`;

const RadioGroup = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 5px;
`;

const RadioOption = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 14px;
  color: #ffffff;
`;

const Radio = styled.input`
  margin: 0;
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
`;

const PreviewGrid = styled.div`
  display: grid;
  grid-template-columns: ${props => props.position === 'right' ? '1fr 200px' : '200px 1fr'};
  gap: 15px;
  align-items: start;
`;

const PreviewImage = styled.div`
  width: 100%;
  height: 120px;
  background: #404040;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #888888;
  font-size: 12px;
  order: ${props => props.position === 'right' ? 2 : 1};
`;

const PreviewText = styled.div`
  color: #cccccc;
  line-height: 1.6;
  font-size: 14px;
  order: ${props => props.position === 'right' ? 1 : 2};
`;

const ImageTextEditor = ({ block, onChange }) => {
  const handleChange = (field, value) => {
    onChange({
      ...block,
      [field]: value
    });
  };

  return (
    <Container>
      <FormGroup>
        <Label>Заголовок блока:</Label>
        <Input
          type="text"
          value={block.title || ''}
          onChange={(e) => handleChange('title', e.target.value)}
          placeholder="Заголовок блока (необязательно)"
        />
        <HelpText>
          Заголовок будет отображен над текстом блока
        </HelpText>
      </FormGroup>

      <FormGroup>
        <Label>Путь к изображению:</Label>
        <Input
          type="text"
          value={block.image || ''}
          onChange={(e) => handleChange('image', e.target.value)}
          placeholder="/blog-images/example.jpg"
        />
        <HelpText>
          Изображения должны находиться в папке public/blog-images/
        </HelpText>
      </FormGroup>

      <FormGroup>
        <Label>Текст блока:</Label>
        <Textarea
          value={block.text || ''}
          onChange={(e) => handleChange('text', e.target.value)}
          placeholder="Введите текст блока"
        />
        <HelpText>
          Поддерживается HTML разметка. На мобильных текст в &lt;strong&gt; станет заголовком
        </HelpText>
      </FormGroup>

      <FormGroup>
        <Label>Позиция изображения:</Label>
        <RadioGroup>
          <RadioOption>
            <Radio
              type="radio"
              name={`position-${block.id}`}
              checked={block.position === 'left'}
              onChange={() => handleChange('position', 'left')}
            />
            Слева от текста
          </RadioOption>
          <RadioOption>
            <Radio
              type="radio"
              name={`position-${block.id}`}
              checked={block.position === 'right'}
              onChange={() => handleChange('position', 'right')}
            />
            Справа от текста
          </RadioOption>
        </RadioGroup>
        <HelpText>
          На мобильных устройствах всегда отображается вертикально
        </HelpText>
      </FormGroup>

      {(block.image || block.text || block.title) && (
        <Preview>
          <h4 style={{ margin: '0 0 15px 0', color: '#ffffff', fontSize: '14px' }}>
            Превью (десктоп):
          </h4>
          <PreviewGrid position={block.position}>
            <PreviewImage position={block.position}>
              {block.image ? `Изображение: ${block.image.split('/').pop()}` : 'Нет изображения'}
            </PreviewImage>
            <PreviewText position={block.position}>
              {block.title && (
                <h3 style={{
                  margin: '0 0 12px 0',
                  color: '#ffffff',
                  fontSize: '18px',
                  fontWeight: '600'
                }}>
                  {block.title}
                </h3>
              )}
              {block.text ? (
                <div dangerouslySetInnerHTML={{ __html: block.text }} />
              ) : (
                !block.title && 'Нет текста'
              )}
            </PreviewText>
          </PreviewGrid>
        </Preview>
      )}
    </Container>
  );
};

export default ImageTextEditor;