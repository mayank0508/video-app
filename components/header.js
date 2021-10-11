import Image from 'next/image';
import win from '../public/win.jpg';

const Header = () => {
  return (
    <div className="header">
      <h1> PL fun page </h1>
      <Image src={win} alt="src" width={50} height={50} />
    </div>
  );
};

export default Header;
