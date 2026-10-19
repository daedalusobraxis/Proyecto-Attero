import { Button, Divider, Stack, Text } from '@mantine/core';
import {
  IconBuildingFactory,
  IconDeviceGamepad,
  IconPlus,
} from '@tabler/icons-react';
import { Link, useNavigate } from 'react-router-dom';
import { v4 } from 'uuid';
import { useStore } from '@/core/zustand';
import classes from '@/factories/FactoriesTab.module.css';

export const FactoriesEmptyState = () => {
  const gameId = useStore(state => state.games.selected);
  const navigate = useNavigate();

  return (
    <Stack gap="xs" align="center" mih={200} mt={60} mb={90}>
      <IconBuildingFactory size={64} stroke={1.2} />
      <Text fz="h2">¡Construyamos algunas fábricas!</Text>
      <Text size="sm" c="dark.2">
        Añade fábricas para empezar a planificar tu logística.
      </Text>
      <Button
        data-tutorial-id="add-factory-btn"
        leftSection={<IconPlus size={16} />}
        mt="lg"
        size="lg"
        onClick={() => {
          if (!gameId) {
            throw new Error('This technically should not be possible');
          }
          const factoryId = v4();

          useStore.getState().addGameFactory(factoryId, gameId);

          navigate(factoryId);
        }}
      >
        Añadir la primera fábrica
      </Button>

      <Divider
        w="60%"
        mt="lg"
        mb="lg"
        classNames={{ label: classes.emptyDividerLabel }}
        label="¿Quieres importar tus fábricas desde esta u otra herramienta?"
      />
      <Button
        component={Link}
        variant="light"
        size="lg"
        leftSection={<IconDeviceGamepad size={16} stroke={2} />}
        to="/games"
      >
        Importar y gestionar juegos
      </Button>
    </Stack>
  );
};
