import NewsLatterBox from "./NewsLatterBox";
import ContactForm from "./ContactForm";

const Contact = () => {
  return (
    <section id="contact" className="overflow-hidden py-16 md:py-20 lg:py-28">
      <div className="container">
        <div className="-mx-4 flex flex-wrap justify-center">
          <div className="w-full px-4 lg:w-8/12 xl:w-7/12">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
