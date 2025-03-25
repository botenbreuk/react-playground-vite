import { simpleMemoize } from './utils';

async function findUsers() {
  return Promise.resolve(['john', 'paul', 'george', 'ringo']);
}

export const usernameAvailable = simpleMemoize(async (value: string) => {
  const values = await findUsers();

  if (values.includes(value.toLowerCase())) {
    return 'Username taken!';
  }

  return undefined;
});

export function isRequired<T>(value: T) {
  if (value) {
    return undefined;
  }

  return 'This field is required!';
}

export function mustBeBiggerThan2(value: number) {
  if (value && value > 2) {
    return undefined;
  }

  return 'Value must be bigger than 2';
}
