import { useBlocker } from 'react-router-dom';
import ConfirmModal from '../Modal/ConfirmModal';

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
      <ConfirmModal
        primary="Proceed"
        primaryClicked={blocker.proceed}
        close="Cancel"
        closeClicked={blocker.reset}
        open
      >
        {message}
      </ConfirmModal>
    )
  );
}
