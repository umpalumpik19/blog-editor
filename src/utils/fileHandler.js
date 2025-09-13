// Утилиты для импорта и экспорта файлов

export const importBlogContent = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const content = e.target.result;
        const filename = file.name.toLowerCase();

        let pagesData;

        if (filename.endsWith('.json')) {
          // Импорт JSON файла
          const jsonData = JSON.parse(content);
          pagesData = jsonData.blogPages || jsonData;
        } else {
          // Импорт JS файла (обратная совместимость)
          const match = content.match(/export const blogPages = (\[[\s\S]*?\]);/);
          if (!match) {
            throw new Error('Не найден массив blogPages в файле');
          }
          // eslint-disable-next-line no-eval
          pagesData = eval(match[1]);
        }

        // Добавляем уникальные ID для каждой страницы
        const pagesWithIds = pagesData.map((page, index) => ({
          ...page,
          id: (Date.now() + index).toString(),
          blocks: page.blocks ? page.blocks.map((block, blockIndex) => ({
            ...block,
            id: (Date.now() + index * 1000 + blockIndex).toString()
          })) : []
        }));

        resolve(pagesWithIds);
      } catch (error) {
        reject(new Error('Ошибка при парсинге файла: ' + error.message));
      }
    };

    reader.onerror = () => {
      reject(new Error('Ошибка при чтении файла'));
    };

    reader.readAsText(file);
  });
};

export const downloadFile = (content, filename) => {
  const isJSON = filename.endsWith('.json');
  const blob = new Blob([content], {
    type: isJSON ? 'application/json' : 'text/javascript'
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const copyToClipboard = (text) => {
  return navigator.clipboard.writeText(text).then(() => {
    return true;
  }).catch(() => {
    // Fallback для старых браузеров
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);
      return successful;
    } catch (err) {
      document.body.removeChild(textArea);
      return false;
    }
  });
};