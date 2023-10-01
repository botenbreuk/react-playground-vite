import { FieldMetaState, Form, useField } from 'react-final-form';
import { FieldProps } from '../../types/final-form-types';
import { Page } from '../../ui';
import Spinner from '../../ui/Spinner/Spinner';
import CardPanel from '../Cards/CardPanel';
import CardIcon from '../Cards/parts/CardIcon';
import { FormData, validate } from './zod';

export default function FinalFormPage() {
  function submit(form: FormData) {
    alert(JSON.stringify(form, null, 2));
  }

  return (
    <Page>
      <CardPanel
        title="Form elements"
        icon="bi-smartwatch"
        footer={[
          <CardIcon type="bi-check" color="green" />,
          <span className="text">2022-01-01</span>
        ]}
      >
        <Form onSubmit={submit} validate={validate}>
          {({ handleSubmit, submitting, values }) => (
            <form onSubmit={handleSubmit}>
              <FinalInput name="firstName" label="First name" />
              <FinalInput name="lastName" label="Last name" />
              <FinalRange
                name="petTotal"
                label="Total pets"
                initialValue={0}
                minValue={0}
                maxValue={5}
                parse={value => parseInt(value)}
              />
              <div className="mb-3">
                <button type="submit" className="btn btn-primary" disabled={submitting}>
                  Submit
                </button>
              </div>
              <pre className="bg-light">{JSON.stringify(values, null, 2)}</pre>
            </form>
          )}
        </Form>
      </CardPanel>
    </Page>
  );
}

type FinalInputProps = {
  label: string;
};

function FinalInput(props: FieldProps<FinalInputProps, string>) {
  const { input, meta } = useField(props.name, { ...props });

  return (
    <div className="mb-2">
      <label className="form-label">{props.label}</label>
      <input {...input} className="form-control" placeholder={props.label} type="text" />
      <RenderError meta={meta} />
    </div>
  );
}

type FinalRangeProps = {
  label: string;
  minValue: number;
  maxValue: number;
  step?: number;
};

function FinalRange(props: FieldProps<FinalRangeProps, number>) {
  const { label, name, minValue, maxValue, step = 1 } = props;
  const { input, meta } = useField(name, { ...props });

  return (
    <div className="mb-2">
      <label className="form-label">
        {label} {input.value}
      </label>
      <div className="d-flex justify-content-between">{renderNUmbers()}</div>
      <input
        {...input}
        className="form-range"
        placeholder={props.label}
        type="range"
        min={minValue}
        max={maxValue}
        step={step}
      />
      <RenderError meta={meta} />
      {meta.validating && <Spinner size={12} />}
    </div>
  );

  function renderNUmbers() {
    const steps = [];
    for (let i = minValue; i <= maxValue; i += step) {
      steps.push(
        <div style={{ width: '1rem', textAlign: 'center', color: '#aaa' }}>|</div>
      );
    }

    return steps;
  }
}

function RenderError<T>({ meta }: { meta: FieldMetaState<T> }) {
  if (meta.validating) {
    return <Spinner size={12} />;
  }

  return (
    meta.error &&
    meta.touched && (
      <>
        <span className="text-danger fw-bold">
          {(() => {
            if (typeof meta.error === 'string') {
              return meta.error;
            }
            const values = meta.error.filter((val: any) => !val);
            return values.length !== 0 ? values[0] : undefined;
          })()}
        </span>
      </>
    )
  );
}

export const FINAL_FORM_PAGE_URL = '/final-form';
