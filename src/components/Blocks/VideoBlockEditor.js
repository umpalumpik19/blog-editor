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

const VideoContainer = styled.div`
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 56.25%; /* 16:9 aspect ratio */
  margin: 15px 0;
  background: #2a2a2a;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #888888;
  font-size: 14px;
`;

const VideoIframe = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
  border-radius: 8px;
`;

const PreviewText = styled.div`
  color: #cccccc;
  line-height: 1.6;
  font-size: 16px;
  text-align: left;
  margin-top: 15px;

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

const VideoBlockEditor = ({ block, onChange }) => {
  const handleChange = (field, value) => {
    onChange({
      ...block,
      [field]: value
    });
  };

  // Функция для преобразования YouTube URL в embed формат (для превью)
  const getYouTubeEmbedUrl = (url) => {
    if (!url) return null;

    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
      /youtube\.com\/watch\?.*v=([^&\n?#]+)/
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) {
        return `https://www.youtube.com/embed/${match[1]}`;
      }
    }

    if (url.includes('youtube.com/embed/')) {
      return url;
    }

    return null;
  };

  const embedUrl = getYouTubeEmbedUrl(block.videoUrl);

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
      </FormGroup>

      <FormGroup>
        <Label>YouTube ссылка:</Label>
        <Input
          type="text"
          value={block.videoUrl || ''}
          onChange={(e) => handleChange('videoUrl', e.target.value)}
          placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        />
        <HelpText>
          Поддерживаются форматы: youtube.com/watch?v=..., youtu.be/..., youtube.com/embed/...
        </HelpText>
      </FormGroup>

      <FormGroup>
        <Label>Текст после видео (опционально):</Label>
        <Textarea
          value={block.text || ''}
          onChange={(e) => handleChange('text', e.target.value)}
          placeholder="Дополнительный текст под видео"
        />
        <HelpText>
          Поддерживается HTML разметка: &lt;strong&gt;, &lt;em&gt;, &lt;br/&gt;, &lt;p&gt;
        </HelpText>
      </FormGroup>

      {(block.title || block.videoUrl || block.text) && (
        <Preview>
          <h4 style={{ margin: '0 0 10px 0', color: '#ffffff', fontSize: '14px' }}>
            Превью:
          </h4>

          {block.title && <PreviewTitle>{block.title}</PreviewTitle>}

          <VideoContainer>
            {embedUrl ? (
              <VideoIframe
                src={embedUrl}
                title={block.title || "YouTube видео"}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              block.videoUrl ? "Неверная ссылка YouTube" : "Добавьте YouTube ссылку для превью"
            )}
          </VideoContainer>

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

export default VideoBlockEditor;