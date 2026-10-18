import { Checkbox, Select, Stack } from '@mantine/core';
import { DEFAULT_SHOW_OUTPUT_FACTORIES_NODES } from '@/games/Game';
import { SettingSectionCard } from '../SettingSectionCard';
import {
  SETTINGS_SECTIONS,
  type SectionComponentProps,
} from '../settingsSections';
import { SHOW_OUTPUT_FACTORIES_NODES_OPTIONS } from '../showOutputFactoriesNodesOptions';

const section = SETTINGS_SECTIONS.find(s => s.id === 'graph')!;

const SELECT_DATA = SHOW_OUTPUT_FACTORIES_NODES_OPTIONS.map(o => ({
  value: o.value,
  label: o.label,
}));

export function GraphDisplaySection({
  ref,
  settings,
  onChange,
}: SectionComponentProps) {
  const currentMode =
    settings?.showOutputFactoriesNodes ?? DEFAULT_SHOW_OUTPUT_FACTORIES_NODES;
  const description =
    SHOW_OUTPUT_FACTORIES_NODES_OPTIONS.find(o => o.value === currentMode)
      ?.description ??
    'Show nodes representing downstream factories that consume this output.';

  return (
    <SettingSectionCard section={section} ref={ref}>
      <Stack gap="sm">
        <Checkbox
          label="Aristas ortogonales"
          description="Representa las aristas del grafo como líneas rectas con giros de 90° en lugar de curvas. Esto facilita el seguimiento de las ramificaciones y las rutas entre máquinas."
          checked={settings?.orthogonalEdges}
          onChange={onChange('orthogonalEdges')}
        />
        <Checkbox
          label="Desactivar la animación de borde"
          description="Detiene el punto en movimiento a lo largo de las aristas del gráfico. Resulta útil en fábricas de gran tamaño y en hardware de gama baja. Se desactiva automáticamente cuando el sistema operativo indica una preferencia por reducir el movimiento."
          checked={settings?.disableEdgeAnimation}
          onChange={onChange('disableEdgeAnimation')}
        />
        <Select
          label="Mostrar nodos de fábricas de salida"
          description={description}
          data={SELECT_DATA}
          value={currentMode}
          allowDeselect={false}
          onChange={value => {
            if (value == null) return;
            onChange('showOutputFactoriesNodes')(value);
          }}
        />
      </Stack>
    </SettingSectionCard>
  );
}
