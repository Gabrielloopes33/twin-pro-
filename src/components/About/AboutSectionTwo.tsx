import Image from "next/image";

const AboutSectionTwo = () => {
  return (
    <section className="py-16 md:py-20 lg:py-28">
      <div className="container">
        <div className="-mx-4 flex flex-wrap items-center">
          <div className="w-full px-4 lg:w-1/2">
            <div
              className="relative mx-auto mb-12 aspect-25/24 max-w-[700px] text-center lg:m-0"
              style={{ minHeight: '500px' }}
              data-wow-delay=".15s"
            >
              <Image
                src="/images/about/worker-3d 2.svg"
                alt="worker 3D"
                fill
                className="drop-shadow-three object-contain"
                sizes="(max-width: 1024px) 100vw, 700px"
                priority
              />
            </div>
          </div>
          <div className="w-full px-4 lg:w-1/2">
            <div className="max-w-[470px]">
              <div className="mb-9">
                <h3 className="mb-4 text-xl font-bold text-black sm:text-2xl lg:text-xl xl:text-2xl">
                  Renovation Expertise
                </h3>
                <p className="text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed">
                  From demolition to the final touches, our team masters every stage of the renovation process, ensuring flawless results and beautifully renewed spaces.
                </p>
              </div>
              <div className="mb-9">
                <h3 className="mb-4 text-xl font-bold text-black  sm:text-2xl lg:text-xl xl:text-2xl">
                  Personalized Service
                </h3>
                <p className="text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed">
                  We value clear communication and close follow-up on every project, listening to our clients&apos; needs and exceeding expectations in every detail.
                </p>
              </div>
              <div className="mb-1">
                <h3 className="mb-4 text-xl font-bold text-black  sm:text-2xl lg:text-xl xl:text-2xl">
                  Quality Materials and Professionals
                </h3>
                <p className="text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed">
                  We work only with high-quality materials and an experienced team, ensuring durability, beauty, and safety in every project we deliver.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSectionTwo;
