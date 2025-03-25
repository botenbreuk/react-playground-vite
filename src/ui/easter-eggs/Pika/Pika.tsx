import Pikachu2 from '../../../styles/images/pikachu-running.gif';
import Pikachu from '../../../styles/images/pikachu.gif';
import { useEasterEgg } from '../hooks/useEasterEgg';
import './pika.scss';

export default function Pika() {
  const { active } = useEasterEgg({ code: 'pikachu', duration: 11000 });

  if (!active) {
    return null;
  }

  return (
    <>
      <img src={Pikachu} alt="Pikachu" id="pika" />
      <img src={Pikachu2} alt="Pikachu-pixel" id="pika-pixel" />
    </>
  );
}
