export function generateSlug(text: string): string {
  return text
    .toLowerCase() // Convertir a minúsculas
    .trim() // Eliminar espacios al inicio y al final
    .replace(/\s+/g, '-') // Reemplazar espacios por guiones
    .replace(/[^a-z0-9-]/g, ''); // Eliminar caracteres no válidos
}
