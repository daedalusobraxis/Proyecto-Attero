import {
  ActionIcon,
  Container,
  Group,
  Image,
  Paper,
  Stack,
  Table,
  Text,
  Title,
  Tooltip,
} from '@mantine/core';
import {
  IconAlertCircle,
  IconArrowRight,
  IconCalculator,
  IconEye,
} from '@tabler/icons-react';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { DepotToggleButton } from '@/factories/components/depot/DepotToggleButton';
import { useGameFactories } from '@/games/store/gameFactoriesSelectors';
import { AllFactoryItemsMap } from '@/recipes/FactoryItem';
import { FactoryItemImage } from '@/recipes/ui/FactoryItemImage';
import { aggregateDepotUploads } from './aggregateDepotUploads';

const round = (n: number) => Math.round(n * 100) / 100;

function HowToHint() {
  return (
    <Group gap="xs" align="center" wrap="nowrap">
      <Text size="sm" c="dimmed">
        Activa
      </Text>
      <DepotToggleButton active={false} />
      <IconArrowRight size={16} stroke={1.5} />
      <DepotToggleButton active={true} />
      <Text size="sm" c="dimmed">
         Junto a una salida de fábrica para cargarla aquí.
      </Text>
    </Group>
  );
}

export function DepotOverviewTab() {
  const factories = useGameFactories();
  const rows = useMemo(() => aggregateDepotUploads(factories), [factories]);

  if (rows.length === 0) {
    return (
      <Container size="lg" mt={80} mb={100}>
        <Stack align="center" gap="md">
          <IconAlertCircle size={60} stroke={1.2} />
          <Text size="xl">Nothing uploaded to the Dimensional Depot</Text>
          <Text size="sm" c="dimmed">
            Mark a factory output as Dimensional Depot to track it here.
          </Text>
          <HowToHint />
        </Stack>
      </Container>
    );
  }

  return (
    <Container size="lg" mt="md" mb="xl">
      <Paper p="md" radius="md" withBorder>
        <Stack gap="md">
          <Group justify="space-between" align="center" wrap="wrap" gap="md">
            <Group gap="xs">
              <Image
                src="/images/game/wat-2_256.png"
                alt="Dimensional Depot"
                w={24}
                h={24}
              />
              <Title order={4}>Subidas al Depósito dimensional</Title>
            </Group>
            <HowToHint />
          </Group>
          <Table>
            <Table.Thead>
              <Table.Tr>
                <Table.Th />
                <Table.Th>Objetos</Table.Th>
                <Table.Th>Total subido</Table.Th>
                <Table.Th>Fábricas de origen</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {rows.map(row => {
                const item = AllFactoryItemsMap[row.resource];
                return (
                  <Table.Tr key={row.resource}>
                    <Table.Td>
                      <FactoryItemImage size={28} highRes id={row.resource} />
                    </Table.Td>
                    <Table.Td>
                      <Text size="sm">{item?.displayName ?? row.resource}</Text>
                    </Table.Td>
                    <Table.Td>
                      <Text size="sm" fw="bold">
                        {round(row.totalAmount)}/min
                      </Text>
                    </Table.Td>
                    <Table.Td>
                      <Stack gap={4}>
                        {row.sources.map(source => (
                          <Group key={source.id} gap="xs" wrap="nowrap">
                            <Text size="sm">{source.name}</Text>
                            <Text size="xs" c="dimmed">
                              {round(source.amount)}/min
                            </Text>
                            <Tooltip label="Revisar fábrica" withArrow>
                              <ActionIcon
                                component={Link}
                                to={`/factories/${source.id}`}
                                size="xs"
                                variant="default"
                                aria-label="Revisar fábrica"
                              >
                                <IconEye size={12} />
                              </ActionIcon>
                            </Tooltip>
                            <Tooltip label="Abrir calculadora" withArrow>
                              <ActionIcon
                                component={Link}
                                to={`/factories/${source.id}/calculator`}
                                size="xs"
                                variant="filled"
                                color="cyan"
                                aria-label="Open calculator"
                              >
                                <IconCalculator size={12} />
                              </ActionIcon>
                            </Tooltip>
                          </Group>
                        ))}
                      </Stack>
                    </Table.Td>
                  </Table.Tr>
                );
              })}
            </Table.Tbody>
          </Table>
        </Stack>
      </Paper>
    </Container>
  );
}
