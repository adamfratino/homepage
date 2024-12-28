import Image from "next/image";

const Photo = () => {
  return (
    <Image
      src="/images/adam-fratino-sipping-a-beverage.jpg"
      alt="Adam Fratino enjoying a tasty beverage"
      width={460}
      height={640}
      className="h-auto rounded-md max-w-full md:w-auto"
    />
  );
};

export default Photo;
