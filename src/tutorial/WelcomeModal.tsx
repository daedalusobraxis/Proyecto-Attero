import { Button, Group, List, Modal, Stack, Text, Title } from '@mantine/core';
import {
  IconBuildingFactory,
  IconCalculator,
  IconChartBar,
  IconClock,
  IconDeviceGamepad,
  IconHelp,
  IconPlayerPlay,
  IconX,
} from '@tabler/icons-react';
import { formatEstimatedMinutes, tutorialChapters } from './chapters';

export interface IWelcomeModalProps {
  opened: boolean;
  onStart: () => void;
  onSkip: () => void;
}

export function WelcomeModal({ opened, onStart, onSkip }: IWelcomeModalProps) {
  const firstChapter = tutorialChapters[0];
  return (
    <Modal
      opened={opened}
      onClose={onSkip}
      centered
      size="lg"
      title={<Title order={3}>¡Hola pionero! 👷</Title>}
    >
      <Stack gap="lg" pb="xs">
        <Text size="sm" c="dark.1" lh={1.55}>
          FICSIT™ te da la bienvenida a Satisfactory Logistics: tu centro de operaciones y planificación fuera del planeta. Diseña tus fábricas, exprime al máximo tus líneas de producción y mantén las cintas transportadoras en constante movimiento.
        </Text>
        <List spacing="sm" size="sm" center>
          <List.Item icon={<IconBuildingFactory size={20} />}>
            Construye fábricas con entradas, salidas y progreso de construcción
          </List.Item>
          <List.Item icon={<IconCalculator size={20} />}>
            Solicita a la calculadora la cadena de producción más eficiente.
          </List.Item>
          <List.Item icon={<IconChartBar size={20} />}>
            Analiza flujos agregados mediante gráficos y diagramas de Sankey
          </List.Item>
          <List.Item icon={<IconDeviceGamepad size={20} />}>
            Gestiona varios archivos de guardado y sincronízalos entre dispositivos.
          </List.Item>
        </List>
        <Text size="sm" c="dark.1" lh={1.55}>
          ¿Damos un breve recorrido por las instalaciones? El primer capítulo dura unos {' '}
          <Text span fw={600} c="gray.0">
            {formatEstimatedMinutes(firstChapter.estimatedMinutes)}
          </Text>
          , y puedes pausar o reanudar en cualquier momento desde el{' '}
          <IconHelp size={16} style={{ verticalAlign: 'text-bottom' }} /> button
          en el encabezado. Mantente alerta, mantente productivo.
        </Text>
        <Group justify="flex-end" mt="xs" gap="sm">
          <Button
            variant="subtle"
            color="gray"
            leftSection={<IconX size={16} />}
            onClick={onSkip}
          >
            Ya veré cómo lo resuelvo.
          </Button>
          <Button
            leftSection={<IconPlayerPlay size={16} />}
            rightSection={
              <Group gap={4} wrap="nowrap">
                <IconClock size={14} />
                <Text size="xs" fw={500}>
                  {formatEstimatedMinutes(firstChapter.estimatedMinutes)}
                </Text>
              </Group>
            }
            onClick={onStart}
          >
            Enséñame el lugar
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
}
