interface KeyProps {
  backgroundColor?: string;
  value: string;
  onClick: (value: string) => void;
}

export default function Key({ value, onClick, backgroundColor }: KeyProps) {
  const handleClick = () => {
    onClick(value);
  };

  return (
    <button
      className={` cursor-pointer text-white text-2xl h-12 w-full hover:bg-zinc-300 transition-all duration-150 ${
        backgroundColor ? backgroundColor : "bg-zinc-500"
      }`}
      onClick={handleClick}
    >
      {value}
    </button>
  );
}
