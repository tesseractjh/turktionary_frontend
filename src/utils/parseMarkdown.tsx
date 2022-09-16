const parseMarkdown = (str: string) => {
  return str
    .replace(/\`([^`]+)\`/g, '<span class="md-block">$1</span>')
    .replace(/\*{2}([^*]+)\*{2}/g, '<span class="md-bold">$1</span>');
};

export default parseMarkdown;
