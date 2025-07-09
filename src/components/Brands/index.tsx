import { Brand } from "@/types/brand";
import Image from "next/image";
import brandsData from "./brandsData";

const Brands = () => {
  return (
    <section className="pt-16">
      <div className="container">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="flex flex-col items-center justify-center rounded-xl bg-primary/20 px-8 py-8 sm:px-10 md:px-[50px] md:py-[40px] xl:p-[50px] 2xl:px-[70px] 2xl:py-[60px]">
              <h1 className="mb-4 font-extrabold text-primary text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight text-center">Quality Craftsmanship</h1>
              <p className="text-base text-black dark:text-white text-center max-w-2xl">
                Our experienced team is committed to the highest standards of quality and attention to detail in every job.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Brands;
