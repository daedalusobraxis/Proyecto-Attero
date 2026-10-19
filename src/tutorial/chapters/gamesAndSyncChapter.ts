import {
  chainHooks,
  clickSelector,
  ensurePresent,
  rehighlightWhenAvailable,
} from './stepHelpers';
import type { TutorialChapter } from './types';

const GAMES_MENU_TRIGGER = '[data-tutorial-id="games-menu-trigger"]';
const GAMES_MENU_DROPDOWN = '[data-tutorial-id="games-menu-dropdown"]';
const GAMES_MENU_LIST_ENTRY = '[data-tutorial-id="games-menu-list"]';

const ensureGamesMenuOpen = ensurePresent(GAMES_MENU_DROPDOWN, () =>
  clickSelector(GAMES_MENU_TRIGGER),
);

export const gamesAndSyncChapter: TutorialChapter = {
  id: 'games-and-sync',
  title: 'Partidas y sincronización',
  description:
    'Manage Games, import savegames and sync your work across devices.',
  estimatedMinutes: 3,
  nextChapterId: 'factory-basics',
  segments: [
    {
      route: '/factories',
      autoNavigate: true,
      steps: [
        {
          element: '[data-tutorial-id="games-menu"]',
          popover: {
            title: 'Empieza con una partida',
            description:
              'Todo en el planificador se encuentra dentro de una «partida», al igual que un archivo guardado en *Satisfactory*. Puedes crear varias partidas (una por cada sesión de juego) y alternar entre ellas desde aquí.',
            side: 'bottom',
          },
        },
        {
          element: GAMES_MENU_DROPDOWN,
          popover: {
            title: 'El menú de la partida',
            description:
              'Haz clic en el nombre de la partida activa en el encabezado para abrir este menú. Desde aquí puedes crear una nueva partida, cambiar el nombre del juego activo, ir a la <strong>lista de juegos</strong> o <strong>compartir</strong> el juego con amigos mediante un enlace. Tu partida se guarda automáticamente una vez que inicias sesión; la opción «Guardar partida» es solo una alternativa manual.',
            side: 'right',
          },
          onHighlightStarted: chainHooks(
            ensureGamesMenuOpen,
            rehighlightWhenAvailable(GAMES_MENU_DROPDOWN),
          ),
        },
        {
          element: '[data-tutorial-id="realtime-sync-indicator"]',
          popover: {
            title: 'Indicador de sincronización en tiempo real',
            description:
              'Este icono, situado junto al logotipo, indica si tu juego está sincronizado en línea. Cuando inicias sesión, el icono se vuelve de color verde y muestra los otros dispositivos o amigos que están editando el mismo juego en ese momento. Si no has iniciado sesión, permanece de color gris; haz clic en él para iniciar sesión y activar el guardado en la nube, la sincronización entre varios dispositivos y las funciones para compartir.',
            side: 'bottom',
          },
        },
        {
          element: '[data-tutorial-id="user-menu"]',
          popover: {
            title: 'Inicia sesión para guardar en línea',
            description:
              'Inicia sesión con Google o Discord y tu partida activa se cargará automáticamente en la nube — no se necesitará guardar manualmente. A partir de ese momento, todos los cambios que realices se sincronizarán en tiempo real con los otros dispositivos y amigos con los que compartas la partida.',
            side: 'bottom',
          },
        },
        {
          element: GAMES_MENU_LIST_ENTRY,
          popover: {
            title: 'Abre la página de partidas',
            description:
              'Esta opción del menú abre la página completa de partidas, donde puedes gestionar todas tus partidas en un mismo lugar. Pulsa «Siguiente» y te llevaré allí.',
            side: 'left',
            onNextClick: () => {
              clickSelector(GAMES_MENU_LIST_ENTRY);
            },
          },
          onHighlightStarted: chainHooks(
            ensureGamesMenuOpen,
            rehighlightWhenAvailable(GAMES_MENU_LIST_ENTRY),
          ),
        },
      ],
    },
    {
      route: '/games',
      autoNavigate: true,
      steps: [
        {
          element: '[data-tutorial-id="games-list"]',
          popover: {
            title: 'La página de partidas',
            description:
              'Aquí puedes ver todas tus partidas de un vistazo. Cambia entre ellas, crea otras nuevas para distintas sesiones de juego o abre una para retomar el control de sus fábricas.',
            side: 'top',
          },
        },
        {
          element: '[data-tutorial-id="game-share"]',
          popover: {
            title: 'Compartir con amigos',
            description:
              'En cualquier partida guardada aparece un botón «Compartir»: este genera un enlace que tus amigos pueden abrir para ver y editar la misma partida (solo es visible una vez que inicias sesión y la partida se ha guardado al menos una vez; al iniciar sesión, esto ocurre automáticamente).',
            side: 'top',
          },
        },
        {
          element: '[data-tutorial-id="import-from-tools"]',
          popover: {
            title: 'Importar desde otras herramientas',
            description:
              '¿Ya tienes un plan en otro planificador (Satisfactory Tools, etc.)? Importa el archivo exportado aquí para no tener que comenzar desde cero. No se requiere inicio de sesión.',
            side: 'top',
          },
        },
      ],
    },
  ],
};
