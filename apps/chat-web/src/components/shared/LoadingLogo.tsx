import Image from "next/image";
type LoadingLogoProps = {
  size?: number;
};

export default function LoadingLogo({ size = 100 }: LoadingLogoProps) {
  return (
    <div className="h-full w-full flex justify-center items-center">
      <Image
        alt="logo"
        width={size}
        src="/vercel.svg"
        className="animate-pulse duration-800"
      />
    </div>
  );
}
