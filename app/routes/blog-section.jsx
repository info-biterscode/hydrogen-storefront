
import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FaLink } from "react-icons/fa";

const fetchBlogPosts = async () => {

    const blogPosts = [
        {
            "id": 1,
            "title": "How To Wear Prints In Winter",
            "img": "blog1.webp",
            "author": "sandip hadiya",
            "published_at": "march 06,2023",
            "category": "News"
        },
        {
            "id": 2,
            "title": "How To Wear Prints In Winter",
            "img": "blog2.webp",
            "author": "sandip hadiya",
            "published_at": "march 06,2023",
            "category": "News"
        },
        {
            "id": 3,
            "title": "How To Wear Prints In Winter",
            "img": "blog3.webp",
            "author": "sandip hadiya",
            "published_at": "march 06,2023",
            "category": "News"
        },
        {
            "id": 4,
            "title": "How To Wear Prints In Winter",
            "img": "blog4.webp",
            "author": "sandip hadiya",
            "published_at": "march 06,2023",
            "category": "News"
        },
        {
            "id": 5,
            "title": "How To Wear Prints In Winter",
            "img": "blog5.webp",
            "author": "sandip hadiya",
            "published_at": "march 06,2023",
            "category": "News"
        },
        {
            "id": 6,
            "title": "How To Wear Prints In Winter",
            "img": "blog6.webp",
            "author": "sandip hadiya",
            "published_at": "march 06,2023",
            "category": "News"
        },
    ];
    return blogPosts;
};

const BlogSection = () => {
    const [blogPosts, setBlogPosts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedPosts = await fetchBlogPosts(); // Replace with actual data fetching logic
                setBlogPosts(fetchedPosts);
            } catch (error) {
                console.error('Error fetching blog posts:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="blog-section">
            <div className="container">
                <div className="heading">
                    <h2>FROM OUR BLOG</h2>
                    <p>Update The Latest Fashion Trends in The World</p>

                </div>
                <div className="row">
                    <Swiper slidesPerView={2}>

                       {blogPosts.map((post) => (
                            <SwiperSlide>
                                <div className="blog-1"  key={post.id}>
                                    <div className="position-relative  ">
                                        <div className="product_card_img  position-relative">

                                            <img src={post.img} alt="{{ image.alt }}" className="position-relative" />

                                      
                                        </div>
                                        <div className="blogPost-Content">
                                            <h3 className="articletitle">
                                                <a href="{{ article.url }}" className="text-decoration-none">{post.title} </a>
                                            </h3>
                                            <div className="artical-Meta d-flex justify-content-center">
                                                <span className="price-color"> {post.author}</span>
                                                <span className="px-2">/</span>
                                                <span> {post.published_at} </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </SwiperSlide>
                        ))}
                

                    </Swiper>

                </div>
            </div>
        </div>
    );
};



export default BlogSection;
