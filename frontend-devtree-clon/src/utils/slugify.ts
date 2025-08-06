export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .normalize("NFD") // Normaliza el texto para separar caracteres diacríticos
    .replace(/\p{Diacritic}/gu, "") // Elimina los diacríticos (tildes)
    .replace(/[^a-z0-9]+/g, "-") // Reemplaza caracteres no válidos por '-'
    .replace(/^-+|-+$/g, ""); // Elimina '-' al inicio o al final
}
