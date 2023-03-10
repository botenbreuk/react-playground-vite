import CardIcon from './CardIcon';

type Props = {
  phone?: string;
};

export default function PhoneIcon({ phone }: Props) {
  const callPhone = () => {
    phone = phone ? phone : '';
    window.open(`tel:${phone}`);
  };

  if (!phone) {
    return null;
  }

  return <CardIcon onClick={callPhone} type="icon-phone" color="#888" />;
}
