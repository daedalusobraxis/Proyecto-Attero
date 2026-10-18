export const LogisticTypes = [
  {
    id: 'Belt',
    name: 'Cinta',
    imagePath: '/images/game/conveyor-mk-1_64.png',
  },
  {
    id: 'Train',
    name: 'Tren',
    imagePath: '/images/game/locomotive_64.png',
  },
  {
    id: 'Drone',
    name: 'Dron',
    imagePath: '/images/game/drone_64.png',
  },
  {
    id: 'Vehicle',
    name: 'Vehículo',
    imagePath: '/images/game/tractor_64.png',
  },
  // {
  //   name: 'Pipe',
  //   imagePath: "/images/game/pipeline_64.png"
  // },
] as const;

export type LogisticType = (typeof LogisticTypes)[number]['id'];

export const AllLogisticTypesMap = LogisticTypes.reduce(
  (acc, logisticType) => {
    acc[logisticType.id] = logisticType;
    return acc;
  },
  {} as Record<LogisticType, (typeof LogisticTypes)[number]>,
);
