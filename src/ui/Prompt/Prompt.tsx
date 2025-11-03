import { useBlocker } from 'react-router';
import { Modal } from '../Modal';

type Props = {
  when: boolean;
  message?: string;
};

export function Prompt(props: Props) {
  const {
    when,
    message = 'Form has changes. Are you sure you want to leave this page?'
  } = props;

  const blocker = useBlocker(
    ({ currentLocation, nextLocation }) =>
      when && currentLocation.pathname !== nextLocation.pathname
  );

  return (
    blocker.state === 'blocked' && (
      <Modal
        title=""
        primary={{
          label: 'Proceed',
          onClick: blocker.proceed
        }}
        cancel={{
          onClick: blocker.reset
        }}
        show
      >
        {message}
      </Modal>
    )
  );
}
