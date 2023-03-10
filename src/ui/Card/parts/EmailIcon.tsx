import CardIcon from './CardIcon';

type Props = {
  email?: string;
};

export default function EmailIcon({ email }: Props) {
  const sendEmail = () => {
    email = email ? email : '';
    window.open(`mailto:${email}`);
  };

  if (!email) {
    return null;
  }

  return <CardIcon onClick={sendEmail} type="icon-envelope" color="#888" />;
}
