import { Select, Stack } from '@mantine/core';
import {
  DEFAULT_POWER_CONSUMPTION_MULTIPLIER,
  DEFAULT_RECIPE_MULTIPLIER,
  POWER_CONSUMPTION_MULTIPLIER_OPTIONS,
  RECIPE_MULTIPLIER_OPTIONS,
} from '@/recipes/recipeMultiplier';
import { SettingSectionCard } from '../SettingSectionCard';
import {
  SETTINGS_SECTIONS,
  type SectionComponentProps,
} from '../settingsSections';

const section = SETTINGS_SECTIONS.find(s => s.id === 'recipes')!;

export function RecipeMultiplierSection({
  ref,
  settings,
  onChange,
}: SectionComponentProps) {
  return (
    <SettingSectionCard section={section} ref={ref}>
      <Stack gap="md">
        <Select
          label="Multiplicador de costos de los componentes de la receta"
          description="Modifica las cantidades de ingredientes en todas las recetas. Se ajusta a la configuración del mundo de Satisfactory 1.2."
          data={RECIPE_MULTIPLIER_OPTIONS}
          value={String(
            settings?.recipeMultiplier ?? DEFAULT_RECIPE_MULTIPLIER,
          )}
          allowDeselect={false}
          onChange={value => {
            if (value == null) return;
            onChange('recipeMultiplier')(Number(value));
          }}
        />
        <Select
          label="Multiplicador de consumo de energía"
          description="Ajusta el consumo de energía de todos los edificios. Se corresponde con la configuración del mundo de Satisfactory 1.2."
          data={POWER_CONSUMPTION_MULTIPLIER_OPTIONS}
          value={String(
            settings?.powerConsumptionMultiplier ??
              DEFAULT_POWER_CONSUMPTION_MULTIPLIER,
          )}
          allowDeselect={false}
          onChange={value => {
            if (value == null) return;
            onChange('powerConsumptionMultiplier')(Number(value));
          }}
        />
      </Stack>
    </SettingSectionCard>
  );
}
