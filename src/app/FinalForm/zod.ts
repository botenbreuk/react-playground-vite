import { get } from 'lodash';
import { z } from 'zod';

async function findUsers() {
  return Promise.resolve(['john', 'paul', 'george', 'ringo']);
}

export const FormSchema = z.object({
  firstName: z
    .string({ required_error: 'Is verplicht' })
    // .includes('Test', { message: 'bevat geen Test' })
    .refine(
      async (value: string) => {
        const values = await findUsers();

        if (values.includes(value.toLowerCase())) {
          return false;
        }

        return value;
      },
      { message: 'Naam bestaat al' }
    ),
  lastName: z.string({ required_error: 'Is verplicht' }),
  petTotal: z.number().min(2, 'Minimaal 2')
});

export type FormData = z.infer<typeof FormSchema>;

export async function validate(values: FormData) {
  const result = await FormSchema.safeParseAsync(values);
  const errors = result.success ? {} : result.error.flatten().fieldErrors;

  const errorObj: Record<string, string> = {};
  Object.keys(errors).map(k => {
    if (k in errors) {
      errorObj[k] = get(errors, k)[0];
    }
  });

  return errorObj;
}
