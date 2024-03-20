import { json } from '@shopify/remix-oxygen';
import { useLoaderData } from '@remix-run/react';
import { Image } from '@shopify/hydrogen';
import { MdFacebook } from "react-icons/md";
import { RiTwitterFill } from "react-icons/ri";
import { TfiAngleRight } from "react-icons/tfi";
/**
 * @type {MetaFunction<typeof loader>}
 */
export const meta = ({ data }) => {
  return [{ title: `Hydrogen | ${data?.article.title ?? ''} article` }];
};

/**
 * @param {LoaderFunctionArgs}
 */
export async function loader({ params, context }) {
  const { blogHandle, articleHandle } = params;

  if (!articleHandle || !blogHandle) {
    throw new Response('Not found', { status: 404 });
  }

  const { blog } = await context.storefront.query(ARTICLE_QUERY, {
    variables: { blogHandle, articleHandle },
  });

  if (!blog?.articleByHandle) {
    throw new Response(null, { status: 404 });
  }

  const article = blog.articleByHandle;

  return json({ article });
}

export default function Article() {
  /** @type {LoaderReturnData} */
  const { article } = useLoaderData();
  const { title, image, contentHtml, author } = article;

  const publishedDate = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(article.publishedAt));

  return (


    <>

      <div className="velaBreadcrumbsInner">

        <div className="velaBreadcrumbcontent">
          <h1>News</h1>
          <p className="collection-subtitle">  <a href="/">Home</a><TfiAngleRight /> <a href="/">News</a><TfiAngleRight /> <span> {title}</span></p>
        </div>
      </div>
      <div className="container">
        <div className="article-row">
          <div>
            <div className="article">


              {image && <Image data={image} sizes="90vw" loading="eager" />}

              <h1>{title}</h1>
              <div className="artical-Meta2 ">By {author?.name} / <small>{publishedDate}</small>    </div>
              <div
                dangerouslySetInnerHTML={{ __html: contentHtml }}
                className="article"
              />
            </div>

            <div>
              <div className="articlepost-Bottom">
                <div className="articleSocialSharing d-flex align-items-center">
                  <span className="sharetitle">Share:</span>
                  <div className="facebookbtn"><MdFacebook />share <span>0</span></div>
                  <div className="twitterbtn"><RiTwitterFill /> Tweet</div>
                </div>
              </div>
              <div className="article-comment">
                <h3 className="article-comment-title">Leave a comment</h3>
                <div className="comment-box">
                  <div className="row justify-content-between">
                    <div className="col-5 ">
                      <input type="text" className="form-control" placeholder="Name" />
                    </div>
                    <div className="col-5 ">
                      <input type="text" className="form-control" placeholder="Email" />
                    </div>
                  
                  </div>
                  <div className="col-12">
                      <textarea className="form-control" rows={3} placeholder="Message" defaultValue={"\n                    "} />
                    </div>
                </div>
                <p className="note">Please note, comments must be approved before they are published</p>
                <input defaultValue="Post comment" type="submit " className="postbtn" />
              </div>
            </div>

          </div>
 
            <div ></div>
        </div>
      </div>
    </>
  );
}

// NOTE: https://shopify.dev/docs/api/storefront/latest/objects/blog#field-blog-articlebyhandle
const ARTICLE_QUERY = `#graphql
  query Article(
    $articleHandle: String!
    $blogHandle: String!
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(language: $language, country: $country) {
    blog(handle: $blogHandle) {
      articleByHandle(handle: $articleHandle) {
        title
        contentHtml
        publishedAt
        author: authorV2 {
          name
        }
        image {
          id
          altText
          url
          width
          height
        }
        seo {
          description
          title
        }
      }
    }
  }
`;

/** @typedef {import('@shopify/remix-oxygen').LoaderFunctionArgs} LoaderFunctionArgs */
/** @template T @typedef {import('@remix-run/react').MetaFunction<T>} MetaFunction */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof loader>} LoaderReturnData */
