import Image from 'next/image';
import win from '../public/win.png';

const Header = () => {
  return (
    <div className="header">
      <Image src={win} alt="src" width={100} height={100} />
    </div>
  );
};

export default Header;
