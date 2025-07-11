'use client'; 

import Link from "next/link";
import * as React from "react";
import BlurText from "./BlurText";

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
                <BlurText
                  text="Transform Your Florida Space: Premium Remodeling, Start to Finish."
                  delay={0}
                  animateBy="words"
                  direction="top"
                  className="mb-5 text-3xl font-bold leading-tight text-black sm:text-4xl sm:leading-tight md:text-5xl md:leading-tight"
                />
                <div className="mb-12">
                  <BlurText
                    text="Experts in Demolition, Kitchens, Bathrooms, and Flooring. Quality and Trust You Can See."
                    delay={300}
                    animateBy="words"
                    direction="top"
                    className="block text-base leading-relaxed! text-body-color sm:text-lg md:text-xl mx-auto max-w-[700px]"
                  />
                </div>
                <div className="flex flex-col items-center justify-center">
                  <div className="w-full flex justify-center">
                    <Link href="https://nextjstemplates.com/templates/saas-starter-startup">
                      <BlurText
                        text="🔥 Get a Free Estimate"
                        delay={600}
                        animateBy="words"
                        direction="top"
                        className="rounded-xl bg-primary px-8 py-4 text-base font-semibold text-white duration-300 ease-in-out hover:bg-primary/80 cursor-pointer inline-block"
                      />
                    </Link>
                  </div>
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
