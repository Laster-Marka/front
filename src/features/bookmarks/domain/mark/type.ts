export type TypeObj = { name: Type }
export type Type = 'Text' | 'Image' | 'Video' | 'Markdown'

export const typeOptions: { value: Type; label: string }[] = [
  { value: 'Text', label: 'Text' },
  { value: 'Image', label: 'Image' },
  { value: 'Video', label: 'Video' },
  { value: 'Markdown', label: 'Markdown' },
]
