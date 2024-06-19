import Image from "next/image";
import LogoImage from "./../../assets/spiced-link.png";

const Logo = () => {
  return (
    <Image
      className="mt-6 mb-10"
      src={LogoImage}
      width={300}
      height={300}
      alt="Homepage picture"
    />
  );
};

export default Logo;
