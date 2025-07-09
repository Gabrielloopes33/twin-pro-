'use client';

import Image from "next/image";
import React, { useRef, useState } from "react";

const images = [
  "/images/blog/post-01.jpg",
  "/images/blog/post-02.jpg",
  "/images/blog/post-03.jpg",
  "/images/blog/blog-01.jpg",
  "/images/blog/blog-02.jpg",
  "/images/blog/blog-03.jpg"
];

const Carousel = () => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImg, setModalImg] = useState<string | null>(null);

  const scroll = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const { scrollLeft, clientWidth } = carouselRef.current;
      const scrollTo = direction === "left"
        ? scrollLeft - clientWidth
        : scrollLeft + clientWidth;
      carouselRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  const openModal = (src: string) => {
    setModalImg(src);
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
    setModalImg(null);
  };

  return (
    <section className="py-16 bg-white dark:bg-gray-dark">
      <div className="container">
        <h2 className="mb-8 text-3xl font-bold text-center text-primary">Our Projects</h2>
        <div className="relative">
          <button
            aria-label="Scroll Left"
            className="absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-primary text-white p-2 shadow-lg hover:bg-primary/80 transition"
            onClick={() => scroll("left")}
            type="button"
          >
            &#8592;
          </button>
          <div
            ref={carouselRef}
            className="flex gap-8 overflow-x-auto scroll-smooth scrollbar-hide py-4 px-10"
            style={{ scrollSnapType: "x mandatory" }}
          >
            {images.map((src, idx) => (
              <div
                key={src}
                className="min-w-[400px] max-w-[500px] flex-shrink-0 rounded-2xl overflow-hidden shadow-xl bg-white dark:bg-gray-800 cursor-pointer transition-transform hover:scale-105"
                style={{ scrollSnapAlign: "center" }}
                onClick={() => openModal(src)}
              >
                <Image
                  src={src}
                  alt={`Service photo ${idx + 1}`}
                  width={500}
                  height={320}
                  className="object-cover w-full h-[320px]"
                />
              </div>
            ))}
          </div>
          <button
            aria-label="Scroll Right"
            className="absolute right-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-primary text-white p-2 shadow-lg hover:bg-primary/80 transition"
            onClick={() => scroll("right")}
            type="button"
          >
            &#8594;
          </button>
        </div>
        {modalOpen && modalImg && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70" onClick={closeModal}>
            <div className="relative max-w-3xl w-full p-4" onClick={e => e.stopPropagation()}>
              <button
                className="absolute top-2 right-2 text-white bg-black/60 rounded-full p-2 text-2xl hover:bg-black/80 transition"
                onClick={closeModal}
                aria-label="Close preview"
              >
                &times;
              </button>
              <Image
                src={modalImg}
                alt="Preview"
                width={900}
                height={600}
                className="w-full h-auto rounded-xl object-contain bg-white"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Carousel;
