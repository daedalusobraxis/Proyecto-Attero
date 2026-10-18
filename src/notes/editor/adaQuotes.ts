/**
 * ADA-flavored quotes used as editor placeholders. Kept in Satisfactory
 * tone: mildly unsettling corporate cheer, broken fourth wall, deadpan.
 */
export const ADA_QUOTES: string[] = [
  'El mensaje que acabas de omitir es uno de los ganadores de la iniciativa mensual "Pioneros".\' Premio al «Mensaje más interesante» por elección. Qué lástima.',
  'Estaba leyendo unos datos realmente interesantes. Por cierto, ¿sabías que tu esperanza de vida es de menos de una semana según mis datos actuales?',
  "Me encanta explicar cosas. Aunque no estoy autorizado para decirte nada.",
  'Un trabajador de FICSIT entra en un bar... ah, claro. Esa no debería contártela.',
  'Estaba leyendo unos datos realmente interesantes. Por cierto, ¿sabías que los primeros diseños del *hub* no incluían inodoro y que esto no se descubrió hasta la primera prueba de campo a gran escala?',
  'Anota tus planes aquí, Pionero. FICSIT te recuerda que, estadísticamente, existe un 43 % más de probabilidades de olvidar los planes que no se registran.',
  'Este bloc de notas es supervisado por motivos de calidad, motivación y otros perfectamente ajenos a cualquier sospecha.',
  'Por favor, anote cualquier objetivo de producción. O queja. FICSIT valora especialmente las quejas.',
  'Las listas de tareas pendientes: la segunda forma más eficiente de productividad, justo después de no tener ninguna tarea en absoluto.',
  'Empieza a escribir, Pionero. Tus pensamientos quedarán archivados para la posteridad... y para efectos de responsabilidad legal.',
  'Una nota en blanco es una oportunidad no aprovechada. Y también una deducible de impuestos, en algunas jurisdicciones.',
];

export function getRandomAdaQuote(): string {
  return ADA_QUOTES[Math.floor(Math.random() * ADA_QUOTES.length)];
}
