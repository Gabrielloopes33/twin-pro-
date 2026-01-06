import { Testimonial } from "@/types/testimonial";
import Image from "next/image";
import Link from "next/link";

const starIcon = (
  <svg width="18" height="16" viewBox="0 0 18 16" className="fill-current">
    <path d="M9.09815 0.361679L11.1054 6.06601H17.601L12.3459 9.59149L14.3532 15.2958L9.09815 11.7703L3.84309 15.2958L5.85035 9.59149L0.595291 6.06601H7.0909L9.09815 0.361679Z" />
  </svg>
);

const SingleTestimonial = ({ testimonial }: { testimonial: Testimonial }) => {
  const { star, name, image, content, designation, googleLink } = testimonial;

  let ratingIcons = [];
  for (let index = 0; index < star; index++) {
    ratingIcons.push(
      <span key={index} className="text-yellow">
        {starIcon}
      </span>,
    );
  }

  return (
    <div className="w-full h-full">
      <Link 
        href={googleLink} 
        target="_blank" 
        rel="noopener noreferrer"
        className="block h-full"
      >
        <div className="shadow-two hover:shadow-one rounded-xs bg-white p-8 duration-300 lg:px-5 xl:px-8 h-full flex flex-col hover:scale-105 transition-transform cursor-pointer">
          <div className="mb-5 flex items-center space-x-1">{ratingIcons}</div>
          <p className="border-body-color/10 text-body-color mb-8 border-b pb-8 text-base leading-relaxed flex-grow">
            &quot;{content}&quot;
          </p>
          <div className="flex items-center">
            <div className="relative mr-4 h-[50px] w-full max-w-[50px] overflow-hidden rounded-full">
              <Image src={image} alt={name} fill />
            </div>
            <div className="w-full">
              <h3 className="text-dark mb-1 text-lg font-semibold lg:text-base xl:text-lg">
                {name}
              </h3>
              <p className="text-body-color text-sm flex items-center gap-1">
                {designation}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="inline">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default SingleTestimonial;
