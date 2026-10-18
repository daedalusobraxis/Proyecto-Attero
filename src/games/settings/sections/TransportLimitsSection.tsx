import { Image } from '@mantine/core';
import { SelectIconInput } from '@/core/form/SelectIconInput';
import {
  FactoryConveyorBelts,
  FactoryPipelinesExclAlternates,
} from '@/recipes/FactoryBuilding';
import { SettingSectionCard } from '../SettingSectionCard';
import {
  SETTINGS_SECTIONS,
  type SectionComponentProps,
} from '../settingsSections';

const section = SETTINGS_SECTIONS.find(s => s.id === 'transport')!;

const BeltsOptions = FactoryConveyorBelts.map(
  belt =>
    ({
      label: belt.name,
      value: belt.id,
      icon: <Image src={belt.imagePath} alt={belt.name} w={16} h={16} />,
    }) as const,
);

const PipelinesOptions = FactoryPipelinesExclAlternates.map(
  pipeline =>
    ({
      label: pipeline.name,
      value: pipeline.id,
      icon: (
        <Image src={pipeline.imagePath} alt={pipeline.name} w={16} h={16} />
      ),
    }) as const,
);

export function TransportLimitsSection({
  ref,
  settings,
  onChange,
}: SectionComponentProps) {
  return (
    <SettingSectionCard section={section} ref={ref}>
      <SelectIconInput
        label="Nivel máximo cinta transportadora"
        data={BeltsOptions}
        description="Selecciona el nivel máximo de cinturón que hayas desbloqueado. Se utilizará para resaltar las cintas transportadoras en la calculadora."
        value={settings?.maxBelt}
        clearable
        onChange={onChange('maxBelt')}
        placeholder="No belt selected"
      />
      <SelectIconInput
        label="Nivel máximo de tubería"
        data={PipelinesOptions}
        description="Selecciona el nivel máximo de tubería que hayas desbloqueado. Se utilizará para resaltar las tuberías en la calculadora."
        value={settings?.maxPipeline}
        clearable
        onChange={onChange('maxPipeline')}
        placeholder="No pipeline selected"
      />
    </SettingSectionCard>
  );
}
