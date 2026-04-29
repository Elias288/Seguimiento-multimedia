import { useEffect, useRef } from "react";

type Props = {
  isOpen?: boolean;
};
const MenuIcon = ({ isOpen = false }: Props) => {
  const openRef = useRef<SVGAnimateElement>(null);
  const closeRef = useRef<SVGAnimateElement>(null);

  useEffect(() => {
    if (isOpen) closeRef.current?.beginElement();
    else openRef.current?.beginElement();
  }, [isOpen]);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M5 5l14 0M5 19l14 0M5 12h14"
      >
        <animate
          ref={openRef}
          begin="indefinite"
          fill="freeze"
          attributeName="d"
          dur="0.4s"
          values="M5 5l14 14M5 19l14 -14M12 12h0;
          M5 5l14 0M5 19l14 0M5 12h14"
        />
        <animate
          ref={closeRef}
          begin="indefinite"
          fill="freeze"
          attributeName="d"
          dur="0.4s"
          values="M5 5l14 0M5 19l14 0M5 12h14;
          M5 5l14 14M5 19l14 -14M12 12h0"
        />
      </path>
    </svg>
  );
};

export default MenuIcon;
