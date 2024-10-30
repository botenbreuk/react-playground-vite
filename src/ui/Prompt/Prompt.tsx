import { useBlocker } from 'react-router-dom';
import { Modal } from '../Modal';

type Props = {
  when: boolean;
  message?: string;
};

export default function Prompt(props: Props) {
  const {
    when,
    message = 'Er zijn niet opgeslagen gegevens! Weet u zeker dat u de pagina wilt verlaten?'
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
