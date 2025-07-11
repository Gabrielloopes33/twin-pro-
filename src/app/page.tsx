import AboutSectionOne from "@/components/About/AboutSectionOne";
import AboutSectionTwo from "@/components/About/AboutSectionTwo";
import Blog from "@/components/Blog";
import Brands from "@/components/Brands";
import ScrollUp from "@/components/Common/ScrollUp";
import Contact from "@/components/Contact";
import Features from "@/components/Features";
import Hero from "@/components/Hero";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import Video from "@/components/Video";
import { Metadata } from "next";
import Carousel from "@/components/Carousel";
import BrickPattern from "@/components/magicui/brick-pattern";
import SimpleBrickBackground from "@/components/magicui/simple-brick-background";

export const metadata: Metadata = {
  title: "Twin Pro Solutions ",
  description: "Twins Pro Solutions - Demolition, Kitchen, Bathroom, and Flooring Experts in Florida. Transforming Spaces with Quality and Trust..",
  // other metadata
};

export default function Home() {
  return (
    <>
      {/* Construction-themed background - optimized version */}
      <BrickPattern opacity={0.06} animate={false} />
      
      <ScrollUp />
      <Hero />
      <Features />
     
      <Brands />
      <AboutSectionOne />
      <AboutSectionTwo />
      <Carousel />
      <Testimonials />
      
      
      <Contact />
    </>
  );
}
