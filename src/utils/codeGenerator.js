// Генератор кода для blogContent.js

export const generateBlogContentCode = (pages) => {
  const formatBlocks = (blocks) => {
    return blocks.map(block => {
      let blockCode = '      {\n';
      blockCode += `        type: "${block.type}",\n`;

      if (block.title) {
        blockCode += `        title: "${block.title.replace(/"/g, '\\"')}",\n`;
      }

      if (block.text) {
        // Экранируем специальные символы
        const escapedText = block.text
          .replace(/\\/g, '\\\\')
          .replace(/"/g, '\\"')
          .replace(/\n/g, '\\n');
        blockCode += `        text: "${escapedText}",\n`;
      }

      if (block.image) {
        blockCode += `        image: "${block.image}",\n`;
      }

      if (block.position) {
        blockCode += `        position: "${block.position}",\n`;
      }

      // Убираем последнюю запятую
      blockCode = blockCode.replace(/,\n$/, '\n');
      blockCode += '      }';

      return blockCode;
    }).join(',\n');
  };

  const formatPages = () => {
    // Сортируем страницы по order перед генерацией
    const sortedPages = [...pages].sort((a, b) => (a.order || 0) - (b.order || 0));

    return sortedPages.map(page => {
      let pageCode = '  {\n';
      pageCode += `    url: "${page.url}",\n`;
      pageCode += `    title: "${page.title.replace(/"/g, '\\"')}",\n`;
      pageCode += `    order: ${page.order || 1},\n`;

      if (page.previewImage) {
        pageCode += `    previewImage: "${page.previewImage}",\n`;
      } else {
        pageCode += `    previewImage: null, // путь к превью изображению для карточки блога\n`;
      }

      pageCode += '    blocks: [\n';

      if (page.blocks && page.blocks.length > 0) {
        pageCode += formatBlocks(page.blocks) + '\n';
      }

      pageCode += '    ]\n';
      pageCode += '  }';

      return pageCode;
    }).join(',\n\n');
  };

  const code = `// Система управления блогом для магазина матрасов
export const blogPages = [
${formatPages()}
];

// Функция для поиска страницы по URL
export const getBlogPageByUrl = (url) => {
  return blogPages.find(page => page.url === url);
};

// Функция для получения всех страниц блога
export const getAllBlogPages = () => {
  return blogPages
    .sort((a, b) => (a.order || 0) - (b.order || 0)) // сортировка по order
    .map(page => ({
      url: page.url,
      title: page.title,
      previewImage: page.previewImage,
      order: page.order
    }));
};`;

  return code;
};