import {
  Card,
  Container,
  Group,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { IconArrowsSplit } from '@tabler/icons-react';
import { Link } from 'react-router-dom';

export function ToolsPage() {
  return (
    <Container size="lg" py="xl">
      <Stack gap="lg">
        <Title order={2}>Herramientas</Title>
        <Text c="dimmed" size="sm">
          Calculadoras y utilidades independientes para la planificación logística en Satisfactory.
        </Text>

        <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="md">
          <Card
            component={Link}
            to="/tools/splitter-calculator"
            withBorder
            padding="lg"
            style={{ cursor: 'pointer' }}
          >
            <Group gap="md">
              <IconArrowsSplit size={32} color="var(--mantine-color-teal-5)" />
              <Stack gap={4}>
                <Title order={4}>Calculadora de divisores</Title>
                <Text size="sm" c="dimmed">
                  Calculate optimal splitter/merger networks for distributing
                  items across belts. Supports belt speed optimization and smart
                  splitters.
                </Text>
              </Stack>
            </Group>
          </Card>
        </SimpleGrid>
      </Stack>
    </Container>
  );
}
