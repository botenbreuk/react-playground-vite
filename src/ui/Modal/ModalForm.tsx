import classNames from 'classnames';
import arrayMutators from 'final-form-arrays';
import { ReactNode } from 'react';
import { Form, FormRenderProps } from 'react-final-form';
import {
  Modal as BModal,
  InputGroup,
  InputGroupText,
  ModalBody,
  ModalFooter,
  ModalHeader
} from 'reactstrap';
import { Button, Icon } from '../';
import { ModalProps } from './Modal';
import './modal.scss';

type FinalFormRenderProps<T> = FormRenderProps<T, Partial<T>>;

type Props<T> = Omit<ModalProps, 'children' | 'primary'> & {
  primary: {
    onClick: (values: T) => void | Promise<void>;
    label?: string;
  };
  initialValues?: T;
  hasArrayFields?: boolean;
  children: ((values: FinalFormRenderProps<T>) => ReactNode) | ReactNode;
};

export function ModalForm<T>(props: Props<T>) {
  const {
    children,
    title,
    footer,
    width = 30,
    primary,
    cancel,
    show = false,
    onSearch,
    hideFooter = false,
    initialValues,
    hasArrayFields = false
  } = props;

  return (
    <BModal
      isOpen={show}
      backdrop={!!cancel?.onClick}
      toggle={cancel?.onClick}
      className={classNames({ [`width-${width}`]: width })}
    >
      <Form<T>
        onSubmit={primary.onClick}
        initialValues={show ? initialValues : {}}
        mutators={hasArrayFields ? { ...arrayMutators } : undefined}
      >
        {values => (
          <form onSubmit={values.handleSubmit}>
            <ModalHeader>
              <div>{title}</div>
              <Icon type="icon-cross" className="clickable" onClick={cancel?.onClick} />
            </ModalHeader>
            {onSearch && (
              <ModalBody>
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
              </ModalBody>
            )}
            <ModalBody>
              {typeof children === 'function' ? children(values) : children}
            </ModalBody>
            {!hideFooter && (
              <ModalFooter>
                <div className="footer">{footer}</div>
                <div className="buttons">
                  <Button color="link" casing="uppercase" onClick={cancel?.onClick}>
                    Annuleren
                  </Button>

                  <Button casing="uppercase">{primary.label ?? 'Selecteer'}</Button>
                </div>
              </ModalFooter>
            )}
          </form>
        )}
      </Form>
    </BModal>
  );
}
