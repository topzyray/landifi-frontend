import PatternLeft from "../../assets/icons/testimonialPatternLeft.svg";
import PatternRight from "../../assets/icons/testimonialPatternRight.svg";
import { testimonials } from "../../utils/data";
import Placeholder from "../../assets/images/placeholder-profile.jpeg";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/bundle";
// import required modules
import { Autoplay, Pagination } from "swiper/modules";

const Testimonial = () => {
  return (
    <>
      <Swiper
        modules={[Pagination, Autoplay]}
        slidesPerView={1}
        centeredSlides={true}
        loop={true}
        spaceBetween={5}
        autoplay={{
          delay: 5000,
        }}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          640: {
            slidesPerView: 1.5,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 1.5,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 2,
            spaceBetween: 40,
          },
        }}
        className="mySwiper h-[510px] lg:h-[19rem] lg:pb-6 overflow-hidden"
      >
        {testimonials.map((testimonial) => {
          return (
            <SwiperSlide key={testimonial.id} className=" h-[100%]">
              {({ isActive }) => (
                <div className=" max-w-[800px] lg:w-full h-full flex flex-col lg:flex-row rounded-xl ring-inset ring-1 ring-slate-300 shadow-lg ">
                  <div
                    className={`w-full min-h-[256px] lg:h-auto flex flex-col justify-center items-center gap-2 bg-orange-500 text-white text-2xl lg:text-3xl font-semibold rounded-t-xl lg:rounded-l-xl lg:rounded-tr-none  ${
                      isActive ? "lg:w-1/3" : "lg:w-[45%]"
                    }`}
                  >
                    <img
                      src={Placeholder}
                      className="w-16 rounded-full
                    "
                    />
                    <div className="flex gap-3">
                      <h2>{testimonial.firstName},</h2>
                      <h2>{testimonial.initials}</h2>
                    </div>
                  </div>
                  <div
                    className={`bg-white flex flex-col justify-center gap-4 w-full h-1/2 lg:h-auto text-center lg:text-justify input ${
                      isActive ? "lg:w-2/3" : " lg:w-[55%] overflow-hidden"
                    }`}
                  >
                    <h3 className="text-xl lg:text-2xl font-bold">
                      {testimonial.title}
                    </h3>
                    <p className="text-sm lg:text-base font-normal">
                      {testimonial.text}
                    </p>
                  </div>
                </div>
              )}
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
};

const Testimonials = () => {
  return (
    <div className="relative px-6 md:px-10 lg:px-28 py-6 lg:pt-14 pb-4 lg:pb-28">
      <div className="flex flex-col gap-6 lg:gap-10">
        <div className="flex flex-col gap-2.5 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold">
            What Our Clients Say About Us
          </h2>
        </div>
        <div className="">
          <Testimonial />
        </div>
      </div>
      <img
        src={PatternRight}
        alt="Background pattern"
        className="hidden lg:block absolute top-16 right-32"
      />
      <img
        src={PatternLeft}
        alt="Background pattern"
        className="hidden lg:block absolute bottom-4"
      />
    </div>
  );
};

export default Testimonials;
