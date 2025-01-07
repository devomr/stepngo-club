export type SneakerType = {
  value: string;
  speed: string;
  image: string;
  return: number;
};

export const WALKER_SNEAKER = {
  value: 'Walker',
  speed: '1.0 - 6.0 km/hr',
  image: 'assets/sneaker-walker-icon.png',
  return: 0.885 + 0 * 0.04,
};

export const JOGGER_SNEAKER = {
  value: 'Jogger',
  speed: '4.0 - 10.0 km/hr',
  image: 'assets/sneaker-jogger-icon.png',
  return: 0.885 + 1 * 0.04,
};

export const RUNNER_SNEAKER = {
  value: 'Runner',
  speed: '8.0 - 20.0 km/hr',
  image: 'assets/sneaker-runner-icon.png',
  return: 0.885 + 2 * 0.04,
};

export const TRAINER_SNEAKER = {
  value: 'Trainer',
  speed: '1.0 - 20.0 km/hr',
  image: 'assets/sneaker-trainer-icon.png',
  return: 0.885 + 3 * 0.04,
};

export const SNEAKER_TYPES = [
  WALKER_SNEAKER,
  JOGGER_SNEAKER,
  RUNNER_SNEAKER,
  TRAINER_SNEAKER,
];
