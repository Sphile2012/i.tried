/**
 * Remove markdown formatting from text
 * Removes: **, *, _, #, [text](url), etc.
 */
export function cleanMarkdown(text: string): string {
  if (!text) return '';
  
  return text
    // Remove bold markers (**text** and __text__)
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/__([^_]+)__/g, '$1')
    // Remove italic markers (*text* and _text_)
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/_([^_]+)_/g, '$1')
    // Remove headers (# text)
    .replace(/^#+\s+/gm, '')
    // Remove links [text](url) -> text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    // Remove inline code `text`
    .replace(/`([^`]+)`/g, '$1')
    // Remove horizontal rules
    .replace(/^[-*_]{3,}\s*$/gm, '')
    // Remove blockquotes
    .replace(/^>\s+/gm, '')
    // Remove list markers
    .replace(/^[\s]*[-*+]\s+/gm, '')
    .replace(/^[\s]*\d+\.\s+/gm, '')
    // Clean up extra whitespace
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

/**
 * Clean markdown but preserve basic structure
 * Keeps paragraphs and line breaks
 */
export function cleanMarkdownPreserveStructure(text: string): string {
  if (!text) return '';
  
  return text
    // Remove bold and italic markers
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/__([^_]+)__/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/_([^_]+)_/g, '$1')
    // Convert headers to plain text with line break
    .replace(/^(#+)\s+(.+)$/gm, '$2\n')
    // Remove links but keep text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    // Remove inline code markers
    .replace(/`([^`]+)`/g, '$1')
    // Clean up but preserve paragraph structure
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}
