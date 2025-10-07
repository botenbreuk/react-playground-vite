import { Icon } from '../../';
import { useEasterEgg } from '../hooks/useEasterEgg';
import './_firework.scss';

export function Firework() {
  const { active, cancel } = useEasterEgg({
    code: 'happynewyear',
    duration: 10000
  });

  if (!active) {
    return null;
  }

  return (
    <div className="firework-container">
      <Icon type="bi-x" onClick={cancel} />
      <div className="firework" />
      <div className="firework" />
      <div className="firework" />
    </div>
  );
}
