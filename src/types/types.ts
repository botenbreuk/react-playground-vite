type CreateArrayWithLengthX<
  LENGTH extends number,
  ACC extends unknown[] = []
> = ACC['length'] extends LENGTH ? ACC : CreateArrayWithLengthX<LENGTH, [...ACC, 1]>;

type NumericRange<
  ARRAY extends number[],
  END extends number,
  ACC extends number = never
> = ARRAY['length'] extends END
  ? ACC | END
  : NumericRange<[...ARRAY, 1], END, ACC | ARRAY['length']>;

export type NumberRange<B extends number, E extends number> = NumericRange<
  CreateArrayWithLengthX<B>,
  E
>;
