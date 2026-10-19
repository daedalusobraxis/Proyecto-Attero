import { ensureDemoFactory } from './demoFactories';
import {
  chainHooks,
  clickSelector,
  dblclickSelector,
  ensureAbsent,
  ensurePresent,
  openAndRehighlight,
  rehighlightWhenAvailable,
} from './stepHelpers';
import type { TutorialChapter } from './types';

// Use the in-drawer Close button as the presence sentinel — it is mounted
// whenever ANY tab of the drawer is active, so it stays a reliable
// "drawer is open" signal even after switching to Recipes / Limitations
// (whose Tabs.Panel siblings unmount the Inputs/Outputs content).
const DRAWER_PRESENCE = '[data-tutorial-id="calculator-drawer-close"]';
const ensureDrawerOpen = ensurePresent(DRAWER_PRESENCE, () =>
  clickSelector('[data-tutorial-id="calculator-inputs-outputs"]'),
);
const ensureDrawerClosed = ensureAbsent(DRAWER_PRESENCE, () =>
  clickSelector('[data-tutorial-id="calculator-drawer-close"]'),
);

// Deselects any ReactFlow node by clicking the pane. No-op when nothing is
// selected. Used before steps that should show a clean graph (e.g. the
// Limitations tab coming back from a node-action walkthrough).
const ensureNodesDeselected: Parameters<typeof chainHooks>[number] = () => {
  const selected = document.querySelector<HTMLElement>(
    '.react-flow__node.selected',
  );
  if (selected) clickSelector('.react-flow__pane');
};

/**
 * Ensures the drawer is open AND the requested tab is active. Idempotent
 * (clicking an already-active Mantine Tab is a no-op), so safe to fire
 * on every step entry — protects against the user navigating Back into
 * a step that expects a different tab than what is currently shown.
 */
function ensureDrawerTab(
  tabValue: 'inputs-outputs' | 'recipes' | 'limitations',
) {
  return chainHooks(ensureDrawerOpen, () => {
    clickSelector(`[data-tutorial-id="calculator-drawer-tab-${tabValue}"]`);
  });
}

export const calculatorChapter: TutorialChapter = {
  id: 'calculator',
  title: 'Calculadora',
  description:
    'Calcula la cadena de producción óptima para una fábrica utilizando el solucionador.',
  estimatedMinutes: 7,
  nextChapterId: 'factory-linking',
  setup: () => {
    ensureDemoFactory();
  },
  segments: [
    {
      route: ctx =>
        ctx.demoFactoryId ? `/factories/${ctx.demoFactoryId}` : '/factories',
      autoNavigate: true,
      steps: [
        {
          element: '[data-tutorial-id="factory-view-switcher"]',
          popover: {
            title: 'Abre la calculadora desde la configuración de fábrica',
            description:
              'Cada fábrica tiene dos vistas: Descripción general (la página en la que estás) y Calculadora. Cambia entre estas pestañas. Iré a la Calculadora a continuación.',
            side: 'bottom',
          },
        },
      ],
    },
    {
      route: ctx =>
        ctx.demoFactoryId
          ? `/factories/${ctx.demoFactoryId}/calculator`
          : '/factories/calculator',
      autoNavigate: true,
      steps: [
        {
          element: '[data-tutorial-id="solver-graph"]',
          popover: {
            title: 'La calculadora',
            description:
              'La calculadora determina la cadena de producción óptima en función de lo que deseas producir, los recursos disponibles y las recetas que permites utilizar. El gráfico que aparece aquí es el resultado para nuestra fábrica «The Smeltery».',
            side: 'top',
            align: 'start',
            popoverClass: 'sl-tutorial-popover sl-tutorial-popover-graph-top',
          },
          onHighlightStarted: ensureDrawerClosed,
        },
        {
          element: '[data-tutorial-id="calculator-inputs-block"]',
          popover: {
            title: 'Panel de entradas/salidas',
            description:
              'Acabo de abrir el panel de Entradas/Salidas (puedes activarlo mediante el botón situado en la parte superior derecha). Las entradas y salidas que configuraste en el proyecto original aparecen aquí, listas para ser ajustadas: puedes modificar sus valores, intercambiar restricciones o añadir otras nuevas.',
            side: 'bottom',
            align: 'end',
          },
          onHighlightStarted: chainHooks(
            ensureDrawerTab('inputs-outputs'),
            rehighlightWhenAvailable(
              '[data-tutorial-id="calculator-inputs-block"]',
            ),
          ),
        },
        {
          element: '[data-tutorial-id="calculator-auto-set"]',
          popover: {
            title: 'Configuración automática a partir del plan',
            description:
              '¿Recuerdas nuestro campo de entrada para el mineral de hierro, que no tenía ninguna cantidad especificada? Este botón rellena los campos con las cantidades exactas calculadas por el solucionador; así no tienes que hacer cálculos manualmente. Acabo de pulsarlo por ti: fíjate en que, a la izquierda, el mineral de hierro muestra ahora la cantidad óptima.',
            side: 'left',
          },
          onHighlightStarted: chainHooks(
            ensureDrawerTab('inputs-outputs'),
            rehighlightWhenAvailable(
              '[data-tutorial-id="calculator-auto-set"]',
            ),
            () => clickSelector('[data-tutorial-id="calculator-auto-set"]'),
          ),
        },
        {
          element: '[data-tutorial-id="factory-input-constraint"]',
          popover: {
            title: 'Modos de restricción de entrada',
            description:
              'Este icono determina cómo el motor de cálculo gestiona la cantidad: «Entrada» (opción predeterminada) permite utilizar al menos esa cantidad, recurriendo a recursos globales si es necesario; «Menos de» establece un límite máximo; «Exacto» obliga al motor a utilizar exactamente esa cantidad. Selecciona la opción que se ajuste a tu suministro dentro del juego.',
            side: 'bottom',
            align: 'end',
          },
          onHighlightStarted: chainHooks(
            ensureDrawerTab('inputs-outputs'),
            rehighlightWhenAvailable(
              '[data-tutorial-id="factory-input-constraint"]',
            ),
          ),
        },
        {
          element: '[data-tutorial-id="calculator-drawer-tab-recipes"]',
          popover: {
            title: 'Recetas',
            description:
              'Habilita o deshabilita recetas alternativas. El solucionador combina libremente cualquier receta habilitada para alcanzar tu salida objetivo.',
            side: 'bottom',
          },
          onHighlightStarted: chainHooks(
            ensureDrawerTab('recipes'),
            rehighlightWhenAvailable(
              '[data-tutorial-id="calculator-drawer-tab-recipes"]',
            ),
          ),
        },
        {
          element: '[data-tutorial-id="recipes-from-savegame"]',
          popover: {
            title: 'Importar recetas desde una partida guardada',
            description:
              'Dentro de la pestaña «Recetas» hay un botón llamado Desde archivo de guardado: suelta tu archivo `.sav` de Satisfactory y la herramienta habilitará automáticamente solo aquellas recetas alternativas que hayas desbloqueado en esa partida. Se acabó el tener que adivinar qué recetas alternativas tienes disponibles.',
            side: 'left',
          },
          onHighlightStarted: chainHooks(
            ensureDrawerTab('recipes'),
            rehighlightWhenAvailable(
              '[data-tutorial-id="recipes-from-savegame"]',
            ),
          ),
        },
        {
          element: '[data-tutorial-id="calculator-drawer-tab-limitations"]',
          popover: {
            title: 'Limitaciones',
            description:
              'Limita los recursos que el solucionador puede utilizar: habilita o deshabilita los recursos del mundo (o establece cantidades máximas personalizadas para cada uno), selecciona qué edificios puede emplear la fábrica (con la opción de anular la configuración global del juego) y elige el nivel de las cintas transportadoras o tuberías para que se marquen los flujos que superen la capacidad.',
            side: 'bottom',
          },
          onHighlightStarted: chainHooks(
            ensureNodesDeselected,
            ensureDrawerTab('limitations'),
            rehighlightWhenAvailable(
              '[data-tutorial-id="calculator-drawer-tab-limitations"]',
            ),
          ),
        },
        // === Resource node walkthrough ===
        {
          element: '.react-flow__node-Resource',
          popover: {
            title: 'Nodos de recurso',
            description:
              'A la izquierda del gráfico: cada recurso que el solucionador está extrayendo. Seleccionar uno abre un panel con detalles y acciones.',
            side: 'bottom',
          },
          onHighlightStarted: ensureDrawerClosed,
        },
        {
          element: '[data-tutorial-id="resource-extractors"]',
          popover: {
            title: 'Desglose de extractores',
            description:
              'En la sección de recursos del mundo, el panel indica cuántas minadoras (Mk.1/Mk.2/Mk.3) necesitas para yacimientos de pureza impura, normal o pura, tanto al 100 % como al 250 % de su capacidad. Resulta muy útil para dimensionar tu infraestructura de extracción sin tener que salir de la herramienta de planificación.',
            side: 'top',
          },
          onHighlightStarted: openAndRehighlight(
            '.react-flow__node-Resource',
            '[data-tutorial-id="resource-extractors"]',
          ),
        },

        // === Machine node walkthrough ===
        {
          element: '.react-flow__node-Machine',
          popover: {
            title: 'Nodos de máquina',
            description:
              'Al seleccionar una máquina de producción en la cadena, se despliegan sus acciones. Veamos qué puedes modificar.',
            side: 'bottom',
          },
        },
        {
          element: '[data-tutorial-id="machine-action-ignore"]',
          popover: {
            title: 'Ignorar receta',
            description:
              'Excluye esta receta específica del plan. El sistema de resolución volverá a generar el plan utilizando el resto de las recetas habilitadas. Es una excelente forma de probar alternativas sin modificar el catálogo general de recetas.',
            side: 'bottom',
          },
          onHighlightStarted: openAndRehighlight(
            '.react-flow__node-Machine',
            '[data-tutorial-id="machine-action-ignore"]',
          ),
        },
        {
          element: '[data-tutorial-id="machine-action-done"]',
          popover: {
            title: 'Marcar como construida',
            description:
              'Rastrea el progreso de construcción en el mundo real: Marca esta opción cuando la máquina esté realmente construida en tu partida. Se dice que puede haber una pequeña sorpresa la primera vez que la usas… tal vez inténtalo más tarde.',
            side: 'bottom',
          },
          onHighlightStarted: openAndRehighlight(
            '.react-flow__node-Machine',
            '[data-tutorial-id="machine-action-done"]',
          ),
        },
        {
          element: '[data-tutorial-id="machine-action-overclock-somersloops"]',
          popover: {
            title: 'Overclock y Somersloops',
            description:
              'Dos ajustes de producción lado a lado: Overclock hace que la máquina funcione más rápido (hasta 250%) a costa de más energía, mientras que Somersloops se insertan para amplificar la salida (cada ranura agrega un flujo adicional desde las mismas entradas). El solucionador usa ambos cuando decide cuántas máquinas necesita. Haz clic en Aplicar para confirmar.',
            side: 'top',
          },
          onHighlightStarted: openAndRehighlight(
            '.react-flow__node-Machine',
            '[data-tutorial-id="machine-action-overclock-somersloops"]',
          ),
        },
        {
          element: '[data-tutorial-id="machine-action-switch-recipe"]',
          popover: {
            title: 'Recetas alternativas',
            description:
              'Elige qué recetas puede usar el solucionador para esta salida. Desmarca la predeterminada y el plan intercambiará por cualquiera de las alternativas que habilites.',
            side: 'top',
          },
          onHighlightStarted: openAndRehighlight(
            '.react-flow__node-Machine',
            '[data-tutorial-id="machine-action-switch-recipe"]',
          ),
        },

        // === Highlight the surrounding chain ===
        {
          element: '[data-tutorial-id="solver-graph"]',
          popover: {
            title: 'Observa qué alimenta a una máquina',
            description:
              'Haz doble clic (o doble toque en pantallas táctiles) en cualquier nodo para resaltarlo y atenuar todo lo que no esté conectado directamente a él. Acabo de hacerlo en un equipo para que lo veas. Toca un espacio vacío para restablecer la vista, o vuelve a hacer doble toque para desactivar el efecto. Resulta muy útil en dispositivos móviles cuando el panel de acciones oculta la cadena.',
            side: 'top',
            align: 'start',
            popoverClass: 'sl-tutorial-popover sl-tutorial-popover-graph-top',
          },
          // Click the pane first (closes any popover and clears any prior
          // highlight from a previous step entry), then trigger the
          // double-click on the first machine to demo the dim effect.
          onHighlightStarted: chainHooks(
            () => clickSelector('.react-flow__pane'),
            () => dblclickSelector('.react-flow__node-Machine'),
          ),
          // Always clear on the way out so the next step (and the rest of
          // the chapter) sees a clean graph regardless of Back/Next path.
          onDeselected: () => clickSelector('.react-flow__pane'),
        },

        // === Byproduct / output node walkthrough ===
        {
          element: '[data-tutorial-id="byproduct-action-objective"]',
          popover: {
            title: 'Nodos de salida: Maximizar',
            description:
              'A la derecha: tus salidas objetivo y cualquier subproducto que genere el plan. Seleccionar una abre sus acciones. La más útil es el Objetivo: cambia a “Maximizar” y el solucionador producirá tanto de este artículo como sea posible dadas tus entradas, en lugar de quedarse con una cantidad fija.',
            side: 'left',
            align: 'start',
          },
          onHighlightStarted: openAndRehighlight(
            '.react-flow__node-Byproduct',
            '[data-tutorial-id="byproduct-action-objective"]',
          ),
        },
      ],
    },
  ],
};
