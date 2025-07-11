import { Brand } from "@/types/brand";
import Image from "next/image";
import brandsData from "./brandsData";
import AnimatedContent from "../Common/AnimatedContent";
import Marquee from "../magicui/marquee";

const Brands = () => {
  const qualityFeatures = [
    "🏆 Premium Materials",
    "⚡ Fast Delivery", 
    "🔧 Expert Installation",
    "✅ Quality Guarantee",
    "📞 24/7 Support"
  ];

  return (
    <section className="pt-16">
      <div className="container">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <AnimatedContent animation="slide" delay={200}>
              <div className="group flex flex-col items-center justify-center rounded-xl bg-primary/20 px-8 py-8 sm:px-10 md:px-[50px] md:py-[40px] xl:p-[50px] 2xl:px-[70px] 2xl:py-[60px] transition-all duration-300 hover:bg-primary/30 hover:scale-105 hover:shadow-2xl hover:shadow-primary/25 cursor-pointer transform overflow-hidden relative">
                
                {/* Animated background pattern */}
                <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                  <Marquee className="h-full" pauseOnHover={false} reverse={false}>
                    <div className="flex items-center justify-center h-full w-40 text-primary/30 text-6xl">✨</div>
                  </Marquee>
                </div>
                
                <h1 className="relative z-10 mb-4 font-extrabold text-primary text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight text-center transition-all duration-300 group-hover:scale-110 group-hover:text-primary/90">
                  Quality Craftsmanship
                </h1>
                
                <p className="relative z-10 text-base text-black text-center max-w-2xl transition-all duration-300 group-hover:text-gray-700 group-hover:scale-105 mb-6">
                  Our experienced team is committed to the highest standards of quality and attention to detail in every job.
                </p>

                {/* Features marquee */}
                <div className="relative z-10 w-full max-w-3xl">
                  <Marquee className="text-sm text-primary/80" pauseOnHover={true}>
                    {qualityFeatures.map((feature, index) => (
                      <span key={index} className="mx-4 whitespace-nowrap font-medium">
                        {feature}
                      </span>
                    ))}
                  </Marquee>
                </div>
                
              </div>
            </AnimatedContent>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Brands;
