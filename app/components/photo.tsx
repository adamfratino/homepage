"use client";

import { motion } from "framer-motion";
import Image from "next/image";

import { useDelayedLoad } from "@/src/hooks/useDelayedLoad";

const Photo = () => {
  const loaded = useDelayedLoad(350);

  return (
    loaded && (
      <motion.div
        className="sticky top-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Image
          src="/images/adam-fratino-sipping-a-beverage.jpg"
          alt="Adam Fratino enjoying a tasty beverage"
          width={460}
          height={640}
          className="h-auto rounded-md max-w-full md:w-auto"
        />
      </motion.div>
    )
  );
};

export default Photo;
