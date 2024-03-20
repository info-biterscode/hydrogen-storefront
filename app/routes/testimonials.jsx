import { Swiper, SwiperSlide } from 'swiper/react';

const Testimonials = () => {
    return (
        <>
            <div className="test-section">
                <div className="container">
                    <div className="test-wrapper">
                        <Swiper>
                            <SwiperSlide>
                                <div className='content'>
                                    <div className="test-img">
                                        <img src="testimonials_image1_180x.jpg" alt="" />
                                    </div>

                                    <div className="test-des">
                                        <p>
                                            Typi non habent claritatem insitam, est usus legentis in iis qui facit eorum claritatem. Investigationes demonstraverunt lectores legere me lius quod ii legunt saepius. Claritas est etiam processus dynamicus, qui sequitur mutationem consuetudium lectorum. Mirum est notare quam littera gothica.
                                        </p>
                                    </div>
                                    <div className="test-name">
                                        <h4>michel smith</h4>
                                    </div>

                                    <div className="test-position">
                                        <span>Web Developer</span>
                                    </div>
                                </div>
                            </SwiperSlide>


                            <SwiperSlide>
                                <div className='content'>
                                    <div className="test-img">
                                        <img src="testimonials_image2_180x.jpg" alt="" />
                                    </div>

                                    <div className="test-des">
                                        <p>
                                            Typi non habent claritatem insitam, est usus legentis in iis qui facit eorum claritatem. Investigationes demonstraverunt lectores legere me lius quod ii legunt saepius. Claritas est etiam processus dynamicus, qui sequitur mutationem consuetudium lectorum. Mirum est notare quam littera gothica.
                                        </p>
                                    </div>
                                    <div className="test-name">
                                        <h4>John doe</h4>
                                    </div>

                                    <div className="test-position">
                                        <span>Web Developer</span>
                                    </div>
                                </div>
                            </SwiperSlide>


                            <SwiperSlide>
                                <div className='content'>
                                    <div className="test-img">
                                        <img src="testimonials_image3_180x.jpg" alt="" />
                                    </div>

                                    <div className="test-des">
                                        <p>
                                            Typi non habent claritatem insitam, est usus legentis in iis qui facit eorum claritatem. Investigationes demonstraverunt lectores legere me lius quod ii legunt saepius. Claritas est etiam processus dynamicus, qui sequitur mutationem consuetudium lectorum. Mirum est notare quam littera gothica.
                                        </p>
                                    </div>
                                    <div className="test-name">
                                        <h4>michel smith</h4>
                                    </div>

                                    <div className="test-position">
                                        <span>Web Developer</span>
                                    </div>
                                </div>
                            </SwiperSlide>
                        </Swiper>
                    </div>

                    <div className="test-logo ">
                          <Swiper slidesPerView={6}>
                            <SwiperSlide>
                               <img src="logo_image1.png" alt="" />
                            </SwiperSlide>
                            <SwiperSlide>
                               <img src="logo_image2.png" alt="" />
                            </SwiperSlide>
                            <SwiperSlide>
                               <img src="logo_image3.png" alt="" />
                            </SwiperSlide>
                            <SwiperSlide>
                               <img src="logo_image4.png" alt="" />
                            </SwiperSlide>
                            <SwiperSlide>
                               <img src="logo_image5.png" alt="" />
                            </SwiperSlide>
                            <SwiperSlide>
                               <img src="logo_image6.png" alt="" />
                            </SwiperSlide>
                          </Swiper>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Testimonials;