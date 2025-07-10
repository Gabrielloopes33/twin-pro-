import Link from "next/link";
import * as React from "react";

const Hero = () => {
  return (
    <>
      <section
        id="home"
        className="relative z-10 overflow-hidden w-full pb-16 pt-[120px] md:pb-[120px] md:pt-[150px] xl:pb-[160px] xl:pt-[180px] 2xl:pb-[200px] 2xl:pt-[210px]"
      >
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div className="mx-auto max-w-[800px] text-center">
                <h1 className="mb-5 text-3xl font-bold leading-tight text-black sm:text-4xl sm:leading-tight md:text-5xl md:leading-tight">
                  Transform Your Florida Space: Premium Remodeling, Start to Finish.
                </h1>
                <p className="mb-12 text-base leading-relaxed! text-body-color sm:text-lg md:text-xl">
                  Experts in Demolition, Kitchens, Bathrooms, and Flooring. Quality and Trust You Can See.
                </p>
                <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                  <Link
                    href="https://nextjstemplates.com/templates/saas-starter-startup"
                    className="rounded-xl bg-primary px-8 py-4 text-base font-semibold text-white duration-300 ease-in-out hover:bg-primary/80"
                  >
                    🔥 Get a Free Estimate
                  </Link>
                 
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* ...existing code... */}
      </section>
    </>
  );
};

export default Hero;
