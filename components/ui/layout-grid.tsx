"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Image, {StaticImageData} from "next/image";

export type Card = {
  id: number;
  className: string;
  thumbnail: StaticImageData;
};

export const LayoutGrid = ({ cards }: { cards: Card[]}) => {

  return (
    <div className="relative mx-auto grid size-full max-w-7xl  grid-cols-1 gap-4 md:grid-cols-3">
      {cards.map((card: Card) => (
        <div className={cn(card.className, "relative size-full overflow-hidden rounded-xl bg-white")}>
            <BlurImage card={card} />
        </div>
      ))}
    </div>
  );
};

const BlurImage = ({ card }: { card: Card }) => {
  const [loaded, setLoaded] = useState(false);
  return (
    <Image
      src={card.thumbnail}
      height="5000"
      width="5000"
      className={cn(
        "absolute inset-0 size-full object-cover object-top transition duration-200"
      )}
      alt="thumbnail"
    />
  );
};
