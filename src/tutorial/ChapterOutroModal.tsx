import { Button, Group, Modal, Stack, Text, Title } from '@mantine/core';
import {
  IconCircleCheckFilled,
  IconClock,
  IconPlayerPlay,
  IconTrash,
  IconX,
} from '@tabler/icons-react';
import { useStore } from '@/core/zustand';
import { formatEstimatedMinutes } from './chapters';
import {
  hasDemoFactoriesSelector,
  removeDemoFactories,
} from './chapters/demoFactories';
import type { OutroRequest } from './outroBus';

export interface IChapterOutroModalProps {
  opened: boolean;
  request: OutroRequest | null;
  onContinue: () => void;
  onDone: () => void;
}

export function ChapterOutroModal({
  opened,
  request,
  onContinue,
  onDone,
}: IChapterOutroModalProps) {
  const hasDemoFactories = useStore(hasDemoFactoriesSelector);

  if (!request) return null;

  const hasNext = !!request.nextChapterId;
  const showCleanup = !hasNext && hasDemoFactories;

  return (
    <Modal
      opened={opened}
      onClose={onDone}
      centered
      size="md"
      title={
        <Group gap="xs">
          <IconCircleCheckFilled
            size={20}
            color="var(--mantine-color-green-5)"
          />
          <Title order={4}>{request.chapterTitle}: done</Title>
        </Group>
      }
    >
      <Stack gap="md" pb="xs">
        {request.outroBody && (
          <Text size="sm" c="dark.1" lh={1.55}>
            {request.outroBody}
          </Text>
        )}
        {hasNext ? (
          <Text size="sm" c="dark.1" lh={1.55}>
            A continuación:{' '}
            <Text span fw={600} c="gray.0">
              {request.nextChapterTitle}
            </Text>
            {request.nextChapterDescription
              ? `. ${request.nextChapterDescription}`
              : ''}
          </Text>
        ) : (
          <Text size="sm" c="dark.1" lh={1.55}>
            Ese fue el último capítulo; has completado todo el recorrido. Puedes
            volver a realizar cualquier capítulo desde el menú de ayuda en el encabezado.
          </Text>
        )}
        <Group justify="space-between" mt="xs" gap="sm">
          {showCleanup ? (
            <Button
              variant="subtle"
              color="red"
              leftSection={<IconTrash size={16} />}
              onClick={() => removeDemoFactories()}
            >
              Eliminar las fábricas del tutorial
            </Button>
          ) : (
            <span />
          )}
          <Group gap="sm">
            <Button
              variant="subtle"
              color="gray"
              leftSection={<IconX size={16} />}
              onClick={onDone}
            >
              Por ahora he terminado.
            </Button>
            {hasNext && (
              <Button
                leftSection={<IconPlayerPlay size={16} />}
                rightSection={
                  request.nextChapterEstimatedMinutes !== undefined ? (
                    <Group gap={4} wrap="nowrap">
                      <IconClock size={14} />
                      <Text size="xs" fw={500}>
                        {formatEstimatedMinutes(
                          request.nextChapterEstimatedMinutes,
                        )}
                      </Text>
                    </Group>
                  ) : undefined
                }
                onClick={onContinue}
              >
                Continuar a {request.nextChapterTitle}
              </Button>
            )}
          </Group>
        </Group>
      </Stack>
    </Modal>
  );
}
