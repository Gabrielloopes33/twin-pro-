import SectionTitle from "../Common/SectionTitle";
import SingleFeature from "./SingleFeature";
import featuresData from "./featuresData";
import AnimatedContent from "../Common/AnimatedContent";
import { memo } from "react";

const Features = memo(function Features() {
  return (
    <>
      <section id="features" className="py-16 md:py-20 lg:py-28 relative overflow-hidden">
        <div className="container">
          {/* Título animado */}
          <AnimatedContent animation="fade" delay={0}>
            <SectionTitle
              title="Our Services"
              paragraph="Building Your Vision, Renovating Your Reality."
              center
            />
          </AnimatedContent>

          {/* Grid de features com animações escalonadas */}
          <div className="grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
            {featuresData.map((feature, index) => (
              <AnimatedContent 
                key={feature.id} 
                animation="slide" 
                delay={200 + (index * 100)} // Reduced delay
                className="h-full"
              >
                <div className="group h-full transition-all duration-300 hover:scale-105 cursor-pointer will-change-transform">
                  <SingleFeature feature={feature} />
                </div>
              </AnimatedContent>
            ))}
          </div>
        </div>

        {/* Reduced decorative elements - only 2 instead of 3 */}
        <div className="absolute top-10 left-10 w-16 h-16 bg-primary/5 rounded-full animate-pulse opacity-50"></div>
        <div className="absolute bottom-10 right-10 w-12 h-12 bg-primary/5 rounded-full animate-pulse opacity-50" style={{ animationDelay: '2s' }}></div>
      </section>
    </>
  );
});

export default Features;
