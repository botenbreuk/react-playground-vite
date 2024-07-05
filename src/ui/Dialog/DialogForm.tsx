import classNames from 'classnames';
import arrayMutators from 'final-form-arrays';
import { ReactNode } from 'react';
import { Form, FormRenderProps } from 'react-final-form';
import { Button, InputGroup, InputGroupText } from 'reactstrap';
import Icon from '../Icon/Icon';
import { DialogProps } from './Dialog';
import './dialog.scss';
import { useDialog } from './hooks/useDialog';

type FinalFormRenderProps<T> = FormRenderProps<T, Partial<T>>;

type Props<T> = Omit<DialogProps, 'children' | 'primary'> & {
  primary: {
    onClick: (values: T) => void | Promise<void>;
    label?: string;
  };
  initialValues?: T;
  hasArrayFields?: boolean;
  children: ((values: FinalFormRenderProps<T>) => ReactNode) | ReactNode;
};

export default function DialogForm<T>(props: Props<T>) {
  const {
    children,
    title,
    footer,
    width = 30,
    primary,
    cancel,
    show,
    searchable = false,
    onSearch,
    hideFooter = false,
    initialValues,
    hasArrayFields = false
  } = props;
  const { ref, onCancel } = useDialog({
    show,
    cancelFn: cancel?.onClick
  });

  if (!show) {
    return null;
  }

  return (
    <dialog
      autoFocus={false}
      ref={ref}
      className={classNames({ [`width-${width}`]: width })}
    >
      <Form<T>
        onSubmit={primary.onClick}
        initialValues={show ? initialValues : {}}
        mutators={hasArrayFields ? { ...arrayMutators } : undefined}
      >
        {values => (
          <form method="dialog">
            <div className="dialog-title">
              <div>{title}</div>
              <Icon type="icon-cross" className="clickable" onClick={onCancel} />
            </div>
            {searchable && onSearch && (
              <div className="dialog-search">
                <InputGroup>
                  <input
                    className="form-control"
                    onChange={v => onSearch(v.target.value)}
                    placeholder="Zooeken..."
                  />
                  <InputGroupText>
                    <Icon type="bi-search" />
                  </InputGroupText>
                </InputGroup>
              </div>
            )}
            <section className="dialog-body">
              {typeof children === 'function' ? children(values) : children}
            </section>
            {!hideFooter && (
              <div className="dialog-footer">
                <div className="footer">{footer}</div>
                <div className="buttons">
                  <Button color="link" className="text-uppercase" onClick={onCancel}>
                    Annuleren
                  </Button>

                  <Button
                    type="submit"
                    color="primary"
                    className="text-uppercase"
                    onClick={values.handleSubmit}
                  >
                    {primary.label ?? 'Selecteer'}
                  </Button>
                </div>
              </div>
            )}
          </form>
        )}
      </Form>
    </dialog>
  );
}
