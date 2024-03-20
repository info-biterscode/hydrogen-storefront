
import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
const Slider = ()=>{
    return(
 
            
        <Swiper>
            <SwiperSlide>

                <div className='slide-img'>
                    <img src="slide1_1512x.webp" alt="image-1" />
                </div>

                <div className="banner-deatil">

                    <div className=" d-flex align-items-center justify-content-center">
                        <div className="text-center">
                            <h2 className="slider-title">
                                Life style that you
                                <br></br>
                                need, Yo.
                            </h2>
                            <p className="banner-sub-title text-white fst-italic ">
                                Claritas est etiam processus dynamicus, qui sequitur mutationem
                                consuetudium lectorum.
                            </p>
                            <div className="btn  text-white rounded-0 mt-3 view">
                                view collection
                            </div>
                        </div>

                    </div>


                </div>
            </SwiperSlide>
             <SwiperSlide>

                <div className='slide-img'>
                    <img src="slide2_1512x.webp" alt="image-2" />
                </div>

                <div className="banner-deatil">

                    <div className=" d-flex align-items-center ">
                        <div className="col-12  text-start">
                            <h2 className="slider-title">
                               Creative theme <br></br>Awesome
                            </h2>
                            <p className="banner-sub-title text-white fst-italic ">
                                Claritas est etiam processus dynamicus, qui sequitur mutationem
                                consuetudium lectorum.
                            </p>
                            <div className="btn  text-white rounded-0 mt-3 view">
                                view collection
                            </div>
                        </div>

                    </div>


                </div>

            </SwiperSlide>
        </Swiper>



    )
}

export default Slider;