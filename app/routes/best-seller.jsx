
import React, { useState, useEffect } from 'react';
import { defer } from '@shopify/remix-oxygen';
import { Await, useLoaderData, Link } from '@remix-run/react';
import { Suspense } from 'react';
import { Image, Money } from '@shopify/hydrogen';


export async function loader({ context }) {
    const { storefront } = context;
    const recommendedProducts = storefront.query(RECOMMENDED_PRODUCTS_QUERY);
    return defer({ recommendedProducts });
}


const fetchsellerPosts = async () => {

    const sellerpost = [
        {
            "id": 1,
            "img": "banner5_720x.webp",
        },
        {
            "id": 2,
            "img": "banner4_720x.webp",
        },
    ];
    return sellerpost;
};


const BestSeller = () => {
    const [sellerpost, setsellerpost] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedPosts = await fetchsellerPosts();
                setsellerpost(fetchedPosts);
            } catch (error) {
                console.error('Error fetching blog posts:', error);
            }
        };

        fetchData();
    }, []);
    const data = useLoaderData();
    return (
        <>
            <div className="container">

                <div className="heading">
                    <h2>BESTSELLER PRODUCTS</h2>
                    <p>Eodem modo typi, qui nunc nobis videntur parum clari</p>
                </div>


                <div className="banner-row">
                    <div className="banner-item">
                        <div className="">
                            <RecommendedProducts products={data.recommendedProducts} />
                        </div>
                        <div>
                            {sellerpost.length > 0 && (
                                <div className='banner2-img'>
                                    {sellerpost[0].img && (
                                        <img src={sellerpost[0].img} alt="{{ image.alt }}" className="w-100 " />
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="banner-item">

                        <div>
                            {sellerpost.length > 0 && (
                                <div className='banner1-img'>
                                    {sellerpost[1].img && (
                                        <img src={sellerpost[1].img} alt="{{ image.alt }}" className="w-100" />
                                    )}
                                </div>
                            )}
                        </div>
                        <div className="col-12">
                            <Secondrecommendedproducts products={data.recommendedProducts} />
                        </div>
                    </div>
                </div>


            </div>
        </>
    )
}
export default BestSeller;


function RecommendedProducts({ products }) {

    return (
        <div className="recommended-products">
            <Suspense fallback={<div>Loading...</div>}>
                <Await resolve={products}>
                    {({ products }) => (
                      
                            <div className='product-row'>
                                    {products.nodes.slice(0, 2).map((product) => (
                                    <Link
                                        key={product.id}
                                        className="recommended-product"
                                        to={`/products/${product.handle}`}
                                    >
                                        <Image data={product.images.nodes[0]} />
                                        <h4 className="product-title">{product.title}</h4>
                                        <small className="product-price">
                                            <Money data={product.priceRange.minVariantPrice} />
                                        </small>
                                    </Link>
                                ))}
                            </div>
            
                    )}
                </Await>
            </Suspense>
        </div>
    );
}


function Secondrecommendedproducts({ products }) {
    return (
        <div className="recommended-products">
            <Suspense fallback={<div>Loading...</div>}>
                <Await resolve={products}>
                    {({ products }) => (

                            <div className="product-row">
                                {products.nodes.slice(2, 4).map((product) => (
                                    <Link
                                        key={product.id}
                                        className="recommended-product"
                                        to={`/products/${product.handle}`}
                                    >
                                        <Image data={product.images.nodes[0]} />
                                        <h4 className="product-title">{product.title}</h4>
                                        <small className="product-price">
                                            <Money data={product.priceRange.minVariantPrice} />
                                        </small>
                                    </Link>
                                ))}
                            </div>
                     
                    )}
                </Await>
            </Suspense>
        </div>
    );
}
const RECOMMENDED_PRODUCTS_QUERY = `#graphql
  fragment RecommendedProduct on Product {
    id
    title
    handle
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    images(first: 1) {
      nodes {
        id
        url
        altText
        width
        height
      }
    }
  }
  query RecommendedProducts ($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    products(first: 9, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...RecommendedProduct
      }
    }
  }
`;


