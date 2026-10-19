import { useStore } from '@/core/zustand';
import { WORLD_SOURCE_ID } from '@/factories/Factory';
import type { TutorialChapter } from './types';

const DEMO_NAME = 'The Smeltery';
const DEMO_OUTPUT_RESOURCE = 'Desc_IronIngot_C';
const DEMO_OUTPUT_AMOUNT = 30;
const DEMO_INPUT_RESOURCE = 'Desc_OreIron_C';

function demoId(): string | null {
  return useStore.getState().tutorial.demoFactoryId ?? null;
}

export const factoryBasicsChapter: TutorialChapter = {
  id: 'factory-basics',
  title: 'Conceptos básicos de fábrica',
  description: 'Recorrido guiado por la creación de tu primera fábrica.',
  estimatedMinutes: 4,
  nextChapterId: 'calculator',
  outroBody:
    'Buen trabajo. Ahora tienes una fábrica con un nombre, un estado, una producción y un insumo abastecido. Esa es la anatomía completa de un centro de producción en el planificador.',
  segments: [
    {
      route: '/factories',
      autoNavigate: true,
      steps: [
        {
          element: '[data-tutorial-id="header-tab-factories"]',
          popover: {
            title: 'Sección de fábricas',
            description:
              'Dentro de una partida, organizas tu trabajo en fábricas. Esta es la sección que utilizaremos durante el resto del recorrido.',
            side: 'bottom',
          },
        },
        {
          element: '[data-tutorial-id="add-factory-btn"]',
          popover: {
            title: 'Crea tu primera fábrica',
            description:
              'Haz clic en "Agregar fábrica" (o "Agregar primera fábrica" en el estado vacío), o simplemente presiona Siguiente y yo lo haré por ti. Vamos a construir juntos un pequeño horno de hierro.',
            side: 'bottom',
            // Pressing Next (or Enter / right arrow) clicks the Add Factory
            // button for the user; navigation triggers the next segment.
            onNextClick: () => {
              document
                .querySelector<HTMLElement>(
                  '[data-tutorial-id="add-factory-btn"]',
                )
                ?.click();
            },
          },
        },
      ],
    },
    {
      // /factories/:id — factory detail page
      route: /^\/factories\/[^/]+$/,
      autoNavigate: false,
      steps: [
        {
          element: '[data-tutorial-id="factory-detail"]',
          popover: {
            title: 'Fábrica creada',
            description:
              'Genial, esta es tu nueva fábrica. A medida que avancemos, iré añadiendo una pequeña instalación de fundición de hierro. Usa «Siguiente»/«Anterior» (o las teclas de flecha) para ir avanzando paso a paso.',
            side: 'top',
          },
        },
        {
          element: '[data-tutorial-id="factory-properties"]',
          popover: {
            title: 'Name & build status',
            description: `Cada fábrica tiene un nombre y un estado de construcción. He asignado a esta el nombre "${DEMO_NAME}" y he establecido su estado en Pendiente. El estado indica si una fábrica está simplemente planificada, en proceso de construcción o ya en funcionamiento; además, es lo que determina las columnas en la vista Kanban de la lista de fábricas. Si estableces el estado de una fábrica como Deshabilitado, esta quedará desactivada temporalmente: permanecerá en el sistema, pero se excluirá de los totales y gráficos de uso global, y no aparecerá en el tablero Kanban.`,
            side: 'left',
          },
          onHighlightStarted: () => {
            const id = demoId();
            if (!id) return;
            useStore.getState().updateFactory(id, f => {
              f.name = DEMO_NAME;
              f.progress = 'todo';
            });
          },
        },
        {
          element: '[data-tutorial-id="factory-outputs"]',
          popover: {
            title: 'Productos de salida',
            description: `Los productos de salida son lo que genera esta fábrica. He añadido lingotes de hierro a razón de ${DEMO_OUTPUT_AMOUNT}/min, que es tu objetivo de producción.`,
            side: 'top',
          },
          onHighlightStarted: () => {
            const id = demoId();
            if (!id) return;
            useStore.getState().updateFactory(id, f => {
              if (!f.outputs?.length)
                f.outputs = [{ resource: null, amount: null }];
              f.outputs[0].resource = DEMO_OUTPUT_RESOURCE;
              f.outputs[0].amount = DEMO_OUTPUT_AMOUNT;
            });
          },
        },
        {
          element: '[data-tutorial-id="factory-output-destination"]',
          popover: {
            title: 'Depósito dimensional',
            description:
              'Activa esta opción para marcar un producto como subido al Depósito dimensional. Las subidas al Depot no se contabilizan como suministro para otras fábricas; puedes consultar los totales en la pestaña Gráficos → Depósito dimensional.',
            side: 'top',
          },
        },
        {
          element: '[data-tutorial-id="factory-inputs"]',
          popover: {
            title: 'Entradas',
            description:
              'Los insumos son lo que esta fábrica consume. He añadido mineral de hierro (aún sin especificar la cantidad; el recorrido por la calculadora se encargará de completarla). Cada insumo cuenta, además, con una «fuente» a la izquierda: «Mundo», para los recursos básicos extraídos del mapa, u otra fábrica, en caso de encadenar procesos.',
            side: 'bottom',
          },
          onHighlightStarted: () => {
            const id = demoId();
            if (!id) return;
            const factory = useStore.getState().factories.factories[id];
            const alreadyHas = factory?.inputs?.some(
              i => i.resource === DEMO_INPUT_RESOURCE,
            );
            if (alreadyHas) return;
            useStore.getState().addFactoryInput(id, {
              resource: DEMO_INPUT_RESOURCE,
              amount: null,
            });
            // Default constraint is "max" (<= amount). With amount 0 that
            // would force the solver to skip iron entirely, so we flip it
            // to "input" (minimum, extra from world allowed). Also mark
            // the source as World so the solver knows it is pulled from
            // map extractors rather than another factory.
            useStore.getState().updateFactory(id, f => {
              const last = f.inputs?.[f.inputs.length - 1];
              if (last && last.resource === DEMO_INPUT_RESOURCE) {
                last.constraint = 'input';
                last.factoryId = WORLD_SOURCE_ID;
              }
            });
          },
        },
      ],
    },
    {
      route: '/factories',
      autoNavigate: true,
      steps: [
        {
          element: '[data-tutorial-id="view-switcher"]',
          popover: {
            title: 'Tres formas de ver las fábricas',
            description:
              'Cuadrícula, Kanban y hoja de cálculo: elige la opción que mejor se adapte a lo que estás haciendo. La fábrica que acabas de construir aparece en las tres.',
            side: 'bottom',
          },
        },
      ],
    },
  ],
};
