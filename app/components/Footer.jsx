import { NavLink } from '@remix-run/react';
import { useRootLoaderData } from '~/root';
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaPinterest } from "react-icons/fa";
import { TfiYoutube } from "react-icons/tfi";
/**
 * @param {FooterQuery & {shop: HeaderQuery['shop']}}
 */
export function Footer({ menu, shop , primaryFooter, secondaryFooter}) {
 
  return (
    <footer className="footer">
      {menu && shop?.primaryDomain?.url && (
      <>
          <FooterMenu menu= { menu } primaryDomainUrl={shop.primaryDomain.url} />
      </>
      )}
    </footer>
  );
}

/**
 * @param {{
 *   menu: FooterQuery['menu'];
 *   primaryDomainUrl: HeaderQuery['shop']['primaryDomain']['url'];
 * }}
 */



function FooterMenu({ menu, primaryDomainUrl }) {
  const { publicStoreDomain } = useRootLoaderData();
  return (
    <>
      <div className='container'>
        <div className="footerCenterInner">
          <div className="footer-social ">
            <div className="social">
              <a href="#" className="text-decoration-none">
                <div className="footer-icon">
                  <FaFacebookF />
                </div>
                <span className="">Facebook</span>
              </a>

              <a href="#" className="text-decoration-none">

                <div className="footer-icon">
                  <FaTwitter />
                </div>
                <span className="">Twitter</span>
              </a>

              <a href="#" className="text-decoration-none">
                <div className="footer-icon">
                  <FaInstagram />
                </div>
                <span className="">Instagram</span>
              </a>

              <a href="#" className="text-decoration-none">
                <div className="footer-icon">
                  <FaPinterest />
                </div>
                <span className="">Pinterest</span>
              </a>

              <a href="#" className="text-decoration-none">
                <div className="footer-icon">
                  <TfiYoutube />
                </div>
                <span className="">Youtube</span>
              </a>
            </div>
          </div>
        </div>


        <div className="footer-row  align-items-baseline">
          <div className="footer-item">
            <div className="f-content">
              <div className="f-logo">

                <img src="logo_light.png" width={75} height={30} alt />

              </div>
            </div>
            <div className="f-des">
              CEES is a premium Templates theme with advanced admin module. It’s extremely customizable, easy to use and fully responsive and retina ready.
            </div>
            <div className="f-add">
              1234 Heaven Stress, Beverly Hill, Melbourne, Australia,
            </div>
            <div className="f-add">
              (800) 123 456 789
            </div>
            <div className="f-add">
              velatheme@gmail.com
            </div>
          </div>
          <div className="footer-item">
            <h5 className="text-white text-uppercase f-title">Information</h5>
            <div className="second-menu" role="navigation">
              {(menu || FALLBACK_FOOTER_MENU).items.map((item) => {
                if (!item.url) return null;
                // if the url is internal, we strip the domain
                const url =
                  item.url.includes('myshopify.com') ||
                    item.url.includes(publicStoreDomain) ||
                    item.url.includes(primaryDomainUrl)
                    ? new URL(item.url).pathname
                    : item.url;
                const isExternal = !url.startsWith('/');
                return isExternal ? (
                  <a href={url} key={item.id} rel="noopener noreferrer" target="_blank">
                    {item.title}
                  </a>
                ) : (
                  <NavLink
                    end
                    key={item.id}
                    prefetch="intent"
                    style={activeLinkStyle}
                    to={url}
                  >
                    {item.title}
                  </NavLink>
                );
              })}
            </div>

          </div>


          <div className="footer-item">
            <h5 className="text-white text-uppercase f-title"> Our services</h5>
            <div className="second-menu" role="navigation">
              {(menu || FALLBACK_FOOTER_MENU).items.map((item) => {
                if (!item.url) return null;
                // if the url is internal, we strip the domain
                const url =
                  item.url.includes('myshopify.com') ||
                    item.url.includes(publicStoreDomain) ||
                    item.url.includes(primaryDomainUrl)
                    ? new URL(item.url).pathname
                    : item.url;
                const isExternal = !url.startsWith('/');
                return isExternal ? (
                  <a href={url} key={item.id} rel="noopener noreferrer" target="_blank">
                    {item.title}
                  </a>
                ) : (
                  <NavLink
                    end
                    key={item.id}
                    prefetch="intent"
                    style={activeLinkStyle}
                    to={url}
                  >
                    {item.title}
                  </NavLink>
                );
              })}
            </div>
          </div>

          <div className="footer-item">
            <h5 className="text-white text-uppercase f-title">newsletter</h5>
            <div className="f-des">
              oin over 1,000 people who get free and fresh content delivered automatically each time we publish.
            </div>
            <div className="email-box">
              <input type="email" placeholder="Your email address..." className="email " />
            </div>
            <button className="subscribe ">
              <span>Subscribe</span>
            </button>
          </div>
        </div>
      </div>
      <div className="footercopy-right">
        <div className="container">
          <div className=" row justify-content-between">
            <div className="copy-right text-uppercase xs-12 md-6 " >
              Copyright © 2020
              <a href="#" className="text-decoration-none price-color">Vela Themes</a>
              by Velatheme. All Rights Reserved
            </div>
            <div className="paypal-img xs-12 md-6 ">

              <img src="paypal_logo_1.png" alt />

            </div>
          </div>
        </div>


      </div>



      {/* <div className="footer-menu" role="navigation">
        {(menu || FALLBACK_FOOTER_MENU).items.map((item) => {
          if (!item.url) return null;
          // if the url is internal, we strip the domain
          const url =
            item.url.includes('myshopify.com') ||
              item.url.includes(publicStoreDomain) ||
              item.url.includes(primaryDomainUrl)
              ? new URL(item.url).pathname
              : item.url;
          const isExternal = !url.startsWith('/');
          return isExternal ? (
            <a href={url} key={item.id} rel="noopener noreferrer" target="_blank">
              {item.title}
            </a>
          ) : (
            <NavLink
              end
              key={item.id}
              prefetch="intent"
              style={activeLinkStyle}
              to={url}
            >
              {item.title}
            </NavLink>
          );
        })}
      </div> */}
    </>

  );
}


const FALLBACK_FOOTER_MENU = {
  id: 'gid://shopify/Menu/199655620664',
  items: [
    {
      id: 'gid://shopify/MenuItem/461633060920',
      resourceId: 'gid://shopify/ShopPolicy/23358046264',
      tags: [],
      title: 'Privacy Policy',
      type: 'SHOP_POLICY',
      url: '/policies/privacy-policy',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461633093688',
      resourceId: 'gid://shopify/ShopPolicy/23358013496',
      tags: [],
      title: 'Refund Policy',
      type: 'SHOP_POLICY',
      url: '/policies/refund-policy',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461633126456',
      resourceId: 'gid://shopify/ShopPolicy/23358111800',
      tags: [],
      title: 'Shipping Policy',
      type: 'SHOP_POLICY',
      url: '/policies/shipping-policy',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461633159224',
      resourceId: 'gid://shopify/ShopPolicy/23358079032',
      tags: [],
      title: 'Terms of Service',
      type: 'SHOP_POLICY',
      url: '/policies/terms-of-service',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461633159224',
      resourceId: 'gid://shopify/ShopPolicy/23358079032',
      tags: [],
      title: 'Help Center',
      type: 'SHOP_POLICY',
      url: '/policies/terms-of-service',
      items: [],
    },
  ],
};




/**
 * @param {{
 *   isActive: boolean;
 *   isPending: boolean;
 * }}
 */
function activeLinkStyle({ isActive, isPending }) {
  return {
    fontWeight: isActive ? 'bold' : undefined,
    color: isPending ? 'grey' : 'white',
  };
}

/** @typedef {import('storefrontapi.generated').FooterQuery} FooterQuery */
/** @typedef {import('storefrontapi.generated').HeaderQuery} HeaderQuery */
