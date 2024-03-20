import { defer } from '@shopify/remix-oxygen';
import { Await, useLoaderData, Link } from '@remix-run/react';
import { Suspense } from 'react';
import { Image, Money } from '@shopify/hydrogen';
import Slider from './slider';
import Lightbox from './lightbox';
import BlogSection from './blog-section';
import Testimonials from './testimonials';
import BestSeller from './best-seller';
import { Swiper, SwiperSlide } from 'swiper/react';



/**
 * @type {MetaFunction}
 */
export const meta = () => {
  return [{ title: 'Hydrogen | Home' }];
};

/**
 * @param {LoaderFunctionArgs}
 */
export async function loader({ context }) {
  const { storefront } = context;
  const { collections } = await storefront.query(FEATURED_COLLECTION_QUERY);
  const featuredCollections = collections.nodes;

  const recommendedProducts = storefront.query(RECOMMENDED_PRODUCTS_QUERY);

  return defer({ featuredCollections, recommendedProducts });
}

export default function Homepage() {
  /** @type {LoaderReturnData} */
  const data = useLoaderData();
  return (
    <div className="home">
      <Slider />
      <div className=" collection-row">
        {data.featuredCollections.map((collection) => (
          <FeaturedCollection key={collection.id} collection={collection} />
        ))}
      </div>

      <BestSeller />
      <Lightbox />
      <div className='container'>
        <RecommendedProducts products={data.recommendedProducts} />
        <BlogSection />
      </div>
      <Testimonials />
    </div>
  );
}


/**
 * @param {{
 *   collection: FeaturedCollectionFragment;
 * }}
 */
function FeaturedCollection({ collection }) {
  if (!collection) return null;
  const image = collection?.image;
  return (

    <>
      <div className="banner-img position-relative">
        {image && (
          <div className="b-img " >
            <Image data={image} />
          </div>
        )}
        <div className="banner-content">
          <div className="wrapper ">
            <h4 className="text-white">
              {collection.title}
            </h4>

            <p>
              {collection.description}
            </p>


            <Link to={`/collections/${collection.handle}`} className="btn  text-white rounded-0 mt-3 view"> view collection </Link>
          </div>
        </div>
      </div>
    </>


  );
}


/**
 * @param {{
 *   products: Promise<RecommendedProductsQuery>;
 * }}
 */
function RecommendedProducts({ products }) {

  return (
    <>
      <div className="heading">
        <h2>FEATURED PRODUCTS</h2>
        <p>Eodem modo typi, qui nunc nobis videntur parum clari</p>
      </div>
      <div className="recommended-products">

        <Suspense fallback={<div>Loading...</div>}>
          <Await resolve={products}>
            {({ products }) => (
              <Swiper slidesPerView={calculateSlidesPerView(window.innerWidth)}>
                <div className="recommended-products-grid ">
                  {products.nodes.map((product) => (
                    <SwiperSlide>
                      <Link
                        key={product.id}
                        className="recommended-product"
                        to={`/products/${product.handle}`}
                      >
                        <Image
                          data={product.images.nodes[0]}

                        />
                        <h4 className='product-title'>{product.title}</h4>
                        <small className='product-price'>
                          <Money data={product.priceRange.minVariantPrice} />
                        </small>
                      </Link>
                    </SwiperSlide>

                  ))}

                </div>

              </Swiper>

            )}


          </Await>
        </Suspense>


      </div>
    </>

  );
}
function calculateSlidesPerView(width) {
  if (width >= 1200) {
    return 4; // Desktop: 4 products per row
  } else if (width >= 992) {
    return 3; // Tablet (landscape): 3 products per row
  } else if (width >= 768) {
    return 2; // Tablet (portrait): 2 products per row
  } else {
    return 1; // Mobile: 1 product per row
  }
}
const FEATURED_COLLECTION_QUERY = `#graphql
  fragment FeaturedCollection on Collection {
    id
    title
    description
    image {
      id
      url
      altText
      width
      height
    }
    handle
  }
  query FeaturedCollection($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    collections(first: 3, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...FeaturedCollection
      }
    }
  }
`;

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

/** @typedef {import('@shopify/remix-oxygen').LoaderFunctionArgs} LoaderFunctionArgs */
/** @template T @typedef {import('@remix-run/react').MetaFunction<T>} MetaFunction */
/** @typedef {import('storefrontapi.generated').FeaturedCollectionFragment} FeaturedCollectionFragment */
/** @typedef {import('storefrontapi.generated').RecommendedProductsQuery} RecommendedProductsQuery */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof loader>} LoaderReturnData */
