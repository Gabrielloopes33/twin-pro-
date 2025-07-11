import { Feature } from "@/types/feature";

const SingleFeature = ({ feature }: { feature: Feature }) => {
  const { icon, title, paragraph } = feature;
  return (
    <div className="w-full h-full">
      <div className="h-full p-6 rounded-xl bg-white/50 backdrop-blur-sm border border-primary/10 transition-all duration-300 hover:bg-white/80 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10 group">
        
        {/* Icon container with interactive effects */}
        <div className="relative mb-8 inline-block">
          <div className="bg-primary/10 text-primary mb-0 flex h-[70px] w-[70px] items-center justify-center rounded-xl transition-all duration-300 group-hover:bg-primary group-hover:text-white group-hover:scale-110 group-hover:rotate-3 relative overflow-hidden">
            {/* Animated background effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform -skew-x-12"></div>
            <div className="relative z-10 transition-transform duration-300 group-hover:scale-110">
              {icon}
            </div>
          </div>
          
          {/* Floating particles effect */}
          <div className="absolute -top-2 -right-2 w-3 h-3 bg-primary/30 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-all duration-300"></div>
          <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-primary/40 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-bounce transition-all duration-300" style={{ animationDelay: '0.5s' }}></div>
        </div>

        {/* Title with text effects */}
        <h3 className="mb-5 text-xl font-bold text-black sm:text-2xl lg:text-xl xl:text-2xl transition-all duration-300 group-hover:text-primary group-hover:transform group-hover:translate-x-1">
          {title}
        </h3>

        {/* Paragraph with hover effects */}
        <p className="text-body-color pr-[10px] text-base leading-relaxed font-medium transition-all duration-300 group-hover:text-gray-700 group-hover:transform group-hover:translate-x-1">
          {paragraph}
        </p>

        {/* Interactive bottom border */}
        <div className="mt-6 h-1 w-0 bg-gradient-to-r from-primary to-primary/50 transition-all duration-500 group-hover:w-full rounded-full"></div>
        
        {/* Subtle glow effect */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
      </div>
    </div>
  );
};

export default SingleFeature;
