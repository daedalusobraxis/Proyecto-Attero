import { Text } from '@mantine/core';
import { modals } from '@mantine/modals';
import { IconTrash } from '@tabler/icons-react';
import { useStore } from '@/core/zustand';

export interface IConfirmDeleteFactoryOptions {
  /** Optional callback invoked after the factory has been removed. */
  onAfterDelete?: () => void;
}

/**
 * Single source of truth for the "delete factory" confirmation. Both the
 * detail page button and the per-factory actions menu route through here
 * so the wording, controls and side effects stay in lockstep.
 */
export function confirmDeleteFactory(
  factoryId: string,
  options: IConfirmDeleteFactoryOptions = {},
) {
  const { onAfterDelete } = options;
  const factoryName =
    useStore.getState().factories.factories[factoryId]?.name ?? null;

  modals.openConfirmModal({
    title: 'Eliminar fábrica',
    size: 'sm',
    children: (
      <Text size="sm">
        ¿Estás segura de que quieres eliminar la fábrica{' '}?
        <strong>{factoryName ?? 'Unnamed'}</strong>? Esto no se puede deshacer.
      </Text>
    ),
    labels: {
      cancel: 'Cancelar',
      confirm: 'Eliminar',
    },
    confirmProps: {
      color: 'red',
      leftSection: <IconTrash size={16} />,
    },
    onConfirm: () => {
      useStore.getState().removeGameFactory(factoryId);
      onAfterDelete?.();
    },
  });
}
