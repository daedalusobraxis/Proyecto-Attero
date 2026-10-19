import type { MantineColor } from '@mantine/core';
import {
  IconCircle,
  IconCircleCheck,
  IconPlayerPause,
  IconProgress,
  IconProgressHelp,
  type IconProps,
} from '@tabler/icons-react';
import type { ForwardRefExoticComponent, RefAttributes } from 'react';
import type { FactoryProgressStatus } from '@/factories/Factory';

export const progressProperties: Record<
  FactoryProgressStatus,
  {
    color: MantineColor;
    label: string;
    Icon: ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>>;
  }
> = {
  Draft: {
    color: 'gray',
    label: 'Borrador',
    Icon: IconProgressHelp,
  },
  todo: {
    color: 'yellow',
    label: 'Pendiente',
    Icon: IconCircle,
  },
  in_progress: {
    color: 'blue',
    label: 'En progreso',
    Icon: IconProgress,
  },
  done: {
    color: 'green',
    label: 'Hecho',
    Icon: IconCircleCheck,
  },
  disabled: {
    color: 'red',
    label: 'Deshabilitado',
    Icon: IconPlayerPause,
  },
};
