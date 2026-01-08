'use client'; 

import Link from "next/link";
import * as React from "react";
import Image from "next/image";
import BlurText from "./BlurText";
import ContactForm from "../Contact/ContactForm";

const Hero = () => {
  return (
    <>
      <section
        id="home"
        className="relative z-10 overflow-hidden w-full pb-16 pt-[120px] md:pb-[120px] md:pt-[150px] xl:pb-[160px] xl:pt-[180px] 2xl:pb-[200px] 2xl:pt-[210px]"
      >
        <div className="container">
          {/* Logo Section - Above Everything */}
          <div className="w-full mb-8 md:mb-10 flex justify-center lg:justify-start px-4">
            <div className="relative w-[200px] h-[200px] sm:w-[220px] sm:h-[220px] md:w-[240px] md:h-[240px] rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
              <Image
                src="/images/logo/Twins-Pro-Logo.jpg"
                alt="Twins Pro Solutions Logo"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
          
          <div className="-mx-4 flex flex-wrap items-center">
            {/* Text Content - Left Side on Desktop */}
            <div className="w-full px-4 lg:w-1/2 mb-12 lg:mb-0">
              <div className="max-w-[600px] mx-auto lg:mx-0">
                <BlurText
                  text="Transform Your Florida Space: Premium Remodeling, Start to Finish."
                  delay={0}
                  animateBy="words"
                  direction="top"
                  className="mb-5 text-3xl font-bold leading-tight text-black sm:text-4xl sm:leading-tight md:text-5xl md:leading-tight text-center lg:text-left"
                />
                <div className="mb-6">
                  <BlurText
                    text="Experts in Demolition, Kitchens, Bathrooms, and Flooring. Quality and Trust You Can See."
                    delay={300}
                    animateBy="words"
                    direction="top"
                    className="block text-base leading-relaxed text-body-color sm:text-lg md:text-xl text-center lg:text-left"
                  />
                </div>
                
                {/* Google Rating Badge */}
                <div className="mb-8 flex justify-center lg:justify-start items-center gap-2">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-body-color font-semibold text-sm sm:text-base">
                    5.0 Stars on Google
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Link href="https://wa.me/12393189978">
                    <BlurText
                      text="📱 Get a Free Estimate"
                      delay={600}
                      animateBy="words"
                      direction="top"
                      className="rounded-xl bg-primary px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base font-semibold text-white duration-300 ease-in-out hover:bg-primary/80 cursor-pointer inline-flex items-center gap-2"
                    />
                  </Link>
                  
                  <Link 
                    href="https://www.google.com/maps/place/Twins+Pro+Solutions/@26.5326846,-81.9469877,17z/data=!4m8!3m7!1s0x88db439f27d7a087:0x5ef85bceb3d2f56d!8m2!3d26.5326846!4d-81.9444128!9m1!1b1!16s%2Fg%2F11y5rrnj30"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-xl bg-white border-2 border-primary px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base font-semibold text-primary duration-300 ease-in-out hover:bg-primary hover:text-white inline-flex items-center gap-2 justify-center"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                    View Reviews
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Contact Form - Right Side on Desktop */}
            <div className="w-full px-4 lg:w-1/2">
              <ContactForm />
            </div>
          </div>
        </div>
        {/* ...existing code... */}
      </section>
    </>
  );
};

export default Hero;
