import { Divider, Group, Stack, Text } from '@mantine/core';
import { modals } from '@mantine/modals';
import { IconConfetti } from '@tabler/icons-react';
import confetti from 'canvas-confetti';
import { difference } from 'lodash';
import { useStore } from '@/core/zustand';
import type { ISolverSolution } from '@/solver/page/ISolverSolution';

export function showConfettiWhenFactoryBuilt(
  solution: ISolverSolution,
  factoryId: string,
) {
  const buildableNodeIds = solution.nodes
    .filter(n => n.type === 'Machine')
    .map(n => n.id);

  const builtNodeIds = Object.entries(
    useStore.getState().solvers.instances[factoryId ?? '']?.nodes ?? {},
  )
    .filter(([id, node]) => node.done)
    .map(([id]) => id);

  // Still some nodes to build
  if (
    builtNodeIds.length === 0 ||
    buildableNodeIds.length === 0 ||
    difference(buildableNodeIds, builtNodeIds).length > 0
  )
    return;

  // All nodes are built!
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
    zIndex: 2000,
  })?.catch(() => {});

  modals.openConfirmModal({
    title: (
      <Group>
        <IconConfetti />
        ¡Lo lograste!
      </Group>
    ),
    children: (
      <Stack gap="xs">
        <Text size="sm">
          Enhorabuena, has <b>construido todas las máquinas</b> de esta fábrica: tu trabajo aquí ha terminado.{' '}
          <em>Al menos, por ahora. Disfruta de un merecido descanso de dos minutos.</em>
        </Text>
        <Divider />
        <Text size="sm">
          ¿Deseas restablecer los marcadores de compilación? Esto solo eliminará el fondo verde y el icono de marca de verificación, dejando el <b>diagrama más limpio</b>.
        </Text>
      </Stack>
    ),
    labels: {
      confirm: 'Sí, restablecer los marcadores',
      cancel: 'Déjalo como está',
    },
    confirmProps: {
      color: 'green',
    },
    onConfirm: () => {
      useStore.getState().resetSolverBuiltMarkers(factoryId);
    },
  });
}
