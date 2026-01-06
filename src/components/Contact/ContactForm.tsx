const ContactForm = () => {
  return (
    <div
      className="rounded-xs bg-white px-4 py-8 shadow-three sm:px-8 sm:py-11 md:p-[55px]"
      data-wow-delay=".15s"
    >
      <h2 className="mb-3 text-xl font-bold text-black sm:text-2xl md:text-3xl">
        Need Help?
      </h2>
      <p className="mb-8 text-sm sm:text-base font-medium text-body-color">
        Our support team will get back to you ASAP via email.
      </p>
      <form>
        <div className="-mx-2 sm:-mx-4 flex flex-wrap">
          <div className="w-full px-2 sm:px-4 md:w-1/2">
            <div className="mb-6 sm:mb-8">
              <label
                htmlFor="name"
                className="mb-2 sm:mb-3 block text-xs sm:text-sm font-medium text-dark text-black"
              >
                Your Name
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                className="border-stroke w-full rounded-xs border bg-[#f8f8f8] px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base text-body-color outline-hidden focus:border-primary"
              />
            </div>
          </div>
          <div className="w-full px-2 sm:px-4 md:w-1/2">
            <div className="mb-6 sm:mb-8">
              <label
                htmlFor="email"
                className="mb-2 sm:mb-3 block text-xs sm:text-sm font-medium text-dark text-black"
              >
                Your Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="border-stroke w-full rounded-xs border bg-[#f8f8f8] px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base text-body-color outline-hidden focus:border-primary"
              />
            </div>
          </div>
          <div className="w-full px-2 sm:px-4 md:w-1/2">
            <div className="mb-6 sm:mb-8">
              <label
                htmlFor="phone"
                className="mb-2 sm:mb-3 block text-xs sm:text-sm font-medium text-dark text-black"
              >
                Your Phone
              </label>
              <input
                type="tel"
                placeholder="(555) 123-4567"
                className="border-stroke w-full rounded-xs border bg-[#f8f8f8] px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base text-body-color outline-hidden focus:border-primary"
              />
            </div>
          </div>
          <div className="w-full px-2 sm:px-4">
            <div className="mb-6 sm:mb-8">
              <label
                htmlFor="message"
                className="mb-2 sm:mb-3 block text-xs sm:text-sm font-medium text-dark text-black"
              >
                Your Message
              </label>
              <textarea
                name="message"
                rows={5}
                placeholder="Enter your Message"
                className="border-stroke w-full resize-none rounded-xs border bg-[#f8f8f8] px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base text-body-color outline-hidden focus:border-primary"
              ></textarea>
            </div>
          </div>
          <div className="w-full px-2 sm:px-4">
            <button className="w-full sm:w-auto rounded-xs bg-primary px-6 py-3 sm:px-9 sm:py-4 text-sm sm:text-base font-medium text-white shadow-submit duration-300 hover:bg-primary/90">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
