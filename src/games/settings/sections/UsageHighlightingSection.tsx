import { Checkbox, ColorInput } from '@mantine/core';
import { SettingSectionCard } from '../SettingSectionCard';
import {
  SETTINGS_SECTIONS,
  type SectionComponentProps,
} from '../settingsSections';

const section = SETTINGS_SECTIONS.find(s => s.id === 'highlighting')!;

export function UsageHighlightingSection({
  ref,
  settings,
  onChange,
}: SectionComponentProps) {
  return (
    <SettingSectionCard section={section} ref={ref}>
      <Checkbox
        label="No resaltes el uso al 100 %"
        description="De forma predeterminada, las fábricas que se encuentran al 100 % de su capacidad aparecerán resaltadas con un color diferente. Marca esta opción para mantenerlas en color rojo."
        checked={settings?.noHighlight100PercentUsage}
        onChange={onChange('noHighlight100PercentUsage')}
      />
      <ColorInput
        label="Resaltar el color de uso al 100 %"
        description="Color utilizado para resaltar las fábricas que se encuentran al 100 % de su capacidad. Por defecto, es un color azul (#339af0)."
        value={settings?.highlight100PercentColor ?? '#339af0'}
        onChange={onChange('highlight100PercentColor')}
        format="hex"
        swatches={[
          '#339af0',
          '#868e96',
          '#fa5252',
          '#e64980',
          '#be4bdb',
          '#7950f2',
          '#4c6ef5',
          '#228be6',
          '#15aabf',
          '#12b886',
          '#40c057',
          '#82c91e',
          '#fab005',
          '#fd7e14',
        ]}
      />
    </SettingSectionCard>
  );
}
