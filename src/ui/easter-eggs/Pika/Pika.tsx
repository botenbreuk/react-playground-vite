import Pikachu from '../../../styles/images/pikachu.gif';
import { useEasetEgg } from '../hooks/useEasterEgg';
import './pika.scss';

export default function Pika() {
  const { active } = useEasetEgg({ code: 'pikachu' });

  if (!active) {
    return null;
  }

  return <img src={Pikachu} alt="Pikachu" id="pika" />;
}
