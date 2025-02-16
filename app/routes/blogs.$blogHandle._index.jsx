import { json } from '@shopify/remix-oxygen';
import { Link, useLoaderData } from '@remix-run/react';
import { Image, Pagination, getPaginationVariables } from '@shopify/hydrogen';
import { TfiAngleRight } from "react-icons/tfi";
/**
 * @type {MetaFunction<({ request, params, context: { storefront }, }: LoaderFunctionArgs) => unknown>}
 */
export const meta = ({ data }) => {
  return [{ title: `Hydrogen | ${data?.blog.title ?? ''} blog` }];
};

/**
 * @param {LoaderFunctionArgs}
 */
export const loader = async ({ request, params, context: { storefront } }) => {
  const paginationVariables = getPaginationVariables(request, {
    pageBy: 6,
  });

  if (!params.blogHandle) {
    throw new Response(`blog not found`, { status: 404 });
  }

  const { blog } = await storefront.query(BLOGS_QUERY, {
    variables: {
      blogHandle: params.blogHandle,
      ...paginationVariables,
    },
  });

  if (!blog?.articles) {
    throw new Response('Not found', { status: 404 });
  }

  return json({ blog });
};

export default function Blog() {
  /** @type {LoaderReturnData} */
  const { blog } = useLoaderData();
  const { articles } = blog;

  return (

    <>
      <div className="velaBreadcrumbsInner">

        <div className="velaBreadcrumbcontent">
          <h1>{blog.title}</h1>
          <p className="collection-subtitle">  <a href="/">Home</a><TfiAngleRight />  <span> {blog.title}</span></p>
       
        </div>
      </div>
      <div className="container">
        <div className="blog">
          <div className="blog-grid">
            <Pagination connection={articles}>
              {({ nodes, isLoading, PreviousLink, NextLink }) => {
                return (
                  <>
                    {/* <PreviousLink>
                  {isLoading ? 'Loading...' : <span>↑ Load previous</span>}
                </PreviousLink> */}
                    {nodes.map((article, index) => {
                      return (
                        <ArticleItem
                          article={article}
                          key={article.id}
                        // loading={index < 2 ? 'eager' : 'lazy'}
                        />
                      );
                    })}
                    {/* <NextLink>
                  {isLoading ? 'Loading...' : <span>Load more ↓</span>}
                </NextLink> */}
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

/**
 * @param {{
 *   article: ArticleItemFragment;
 *   loading?: HTMLImageElement['loading'];
 * }}
 */
function ArticleItem({ article, loading }) {
  const publishedAt = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(article.publishedAt));
  const { author, contentHtml } = article;

  return (
    <div className="col-12  md-6 lg-4">
      <div className="blog-article" key={article.id}>
        <Link to={`/blogs/${article.blog.handle}/${article.handle}`}>
          {article.image && (
            <div className="blog-article-image">
              <Image
                alt={article.image.altText || article.title}
                aspectRatio="3/2"
                data={article.image}
                // loading={loading}
                sizes="(min-width: 768px) 50vw, 100vw"
              />
            </div>
          )}

          <h3 className="article-title">{article.title}</h3>
          <div>By {author?.name} / <small>{publishedAt}</small>    </div>

        </Link>
      </div>
    </div>
  );
}

// NOTE: https://shopify.dev/docs/api/storefront/latest/objects/blog
const BLOGS_QUERY = `#graphql
  query Blog(
    $language: LanguageCode
    $blogHandle: String!
    $first: Int
    $last: Int
    $startCursor: String
    $endCursor: String
  ) @inContext(language: $language) {
    blog(handle: $blogHandle) {
      title
      seo {
        title
        description
      }
      articles(
        first: $first,
        last: $last,
        before: $startCursor,
        after: $endCursor
      )
       {
        nodes {
          ...ArticleItem
        }
        
        pageInfo {
          hasPreviousPage
          hasNextPage
          hasNextPage
          endCursor
          startCursor
        }
      }
    }
  }

  fragment ArticleItem on Article {
    author: authorV2 {
      name
    }
    contentHtml
    handle
    id
    image {
      id
      altText
      url
      width
      height
    }
    publishedAt
    title
    blog {
      handle
    }
  }
`;

/** @typedef {import('@shopify/remix-oxygen').LoaderFunctionArgs} LoaderFunctionArgs */
/** @template T @typedef {import('@remix-run/react').MetaFunction<T>} MetaFunction */
/** @typedef {import('storefrontapi.generated').ArticleItemFragment} ArticleItemFragment */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof loader>} LoaderReturnData */
