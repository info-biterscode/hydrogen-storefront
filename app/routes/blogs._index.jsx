import { json } from '@shopify/remix-oxygen';
import { Link, useLoaderData } from '@remix-run/react';
import { Pagination, getPaginationVariables } from '@shopify/hydrogen';

/**
 * @type {MetaFunction}
 */
export const meta = () => {
  return [{ title: `Hydrogen | Blogs` }];
};

/**
 * @param {LoaderFunctionArgs}
 */
export const loader = async ({ request, context: { storefront } }) => {
  const paginationVariables = getPaginationVariables(request, {
    pageBy: 10,
  });

  const { blogs } = await storefront.query(BLOGS_QUERY, {
    variables: {
      ...paginationVariables,
    },
  });

  return json({ blogs });
};

export default function Blogs() {
  /** @type {LoaderReturnData} */
  const { blogs } = useLoaderData();

  return (

    <>
      <div className="velaBreadcrumbsInner">

        <div className="velaBreadcrumbcontent">
          <h1>Blogs</h1>
        </div>
      </div>

      <div className='container'>

        <div className="blogs">
          <div className="blogs-grid">
            <Pagination connection={blogs}>
              {({ nodes, isLoading, PreviousLink, NextLink }) => {
                return (
                  <>
                    <PreviousLink>
                      {isLoading ? 'Loading...' : <span>↑ Load previous</span>}
                    </PreviousLink>
                    {nodes.map((blog) => {
                      console.log(blog);
                      return (
                        <Link
                          className="blog"
                          key={blog.handle}
                          prefetch="intent"
                          to={`/blogs/${blog.handle}`}
                        >

                          <h1 className='text-center'>{blog.title}</h1>

                        </Link>
                      );
                    })}
                    <NextLink>
                      {isLoading ? 'Loading...' : <span>Load more ↓</span>}
                    </NextLink>
                  </>
                );
              }}
            </Pagination>
          </div>
        </div>
      </div>

    </>

  );
}

// NOTE: https://shopify.dev/docs/api/storefront/latest/objects/blog
const BLOGS_QUERY = `#graphql
  query Blogs(
    $country: CountryCode
    $endCursor: String
    $first: Int
    $language: LanguageCode
    $last: Int
    $startCursor: String
  ) @inContext(country: $country, language: $language) {
    blogs(
      first: $first,
      last: $last,
      before: $startCursor,
      after: $endCursor
    )
     {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      nodes {
        title
        handle
        seo {
          title
          description
        }
  
      }
    }
  }
`;

/** @typedef {import('@shopify/remix-oxygen').LoaderFunctionArgs} LoaderFunctionArgs */
/** @template T @typedef {import('@remix-run/react').MetaFunction<T>} MetaFunction */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof loader>} LoaderReturnData */
