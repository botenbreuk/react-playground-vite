import Icon from '../../Icon/Icon';
import { useEasetEgg } from '../hooks/useEasterEgg';
import './_firework.scss';

export default function Firework() {
  const { active, cancel } = useEasetEgg({
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
