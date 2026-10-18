import {
  IconBuildingFactory2,
  IconHighlight,
  IconPercentage,
  IconRoute,
  IconVectorBezier2,
} from '@tabler/icons-react';
import type { Ref } from 'react';
import type { FormOnChangeHandler } from '@/core/form/useFormOnChange';
import type { GameSettings } from '@/games/Game';

export type SectionId =
  | 'recipes'
  | 'highlighting'
  | 'transport'
  | 'graph'
  | 'buildings';

export interface SectionComponentProps {
  ref?: Ref<HTMLDivElement>;
  settings: GameSettings | undefined;
  onChange: FormOnChangeHandler<GameSettings>;
}

export interface Section {
  id: SectionId;
  label: string;
  description: string;
  icon: typeof IconHighlight;
  color: string;
}

export const SETTINGS_SECTIONS: Section[] = [
  {
    id: 'recipes',
    label: 'Multiplicadores de costos',
    description: 'Receta y escalado de potencia.',
    icon: IconPercentage,
    color: 'cyan',
  },
  {
    id: 'highlighting',
    label: 'Resaltado de uso',
    description: 'Colores de uso al 100 %',
    icon: IconHighlight,
    color: 'blue',
  },
  {
    id: 'transport',
    label: 'Límites de transporte',
    description: 'Nivel máximo de cinta transportadora y tubería. ',
    icon: IconRoute,
    color: 'orange',
  },
  {
    id: 'graph',
    label: 'Visualización de gráficos',
    description: 'Renderizado de bordes',
    icon: IconVectorBezier2,
    color: 'grape',
  },
  {
    id: 'buildings',
    label: 'Edificios disponibles',
    description: 'Solver restrictions',
    icon: IconBuildingFactory2,
    color: 'teal',
  },
];
