# Embedded Checkout POC
This is a React app for use by BigCommerce Solution Architects to demonstrate embedded checkout. This is not intended for any production use

## Setup
### With Tools
You may use [this Postman collection](https://documenter.getpostman.com/view/45334/SWT5jLpM?version=latest) to automate the processes for registering a channel, a site, and routes, as well as the requests to generate a cart and cart redirect URL.

> :warning: *localhost URLs will no longer work*
> 
> The collection no longer works in its current form because it expects BigCommerce to allow a `localhost` Channel Site URL which is no longer allowed. Update the Create a Channel Site request with your testing domain.

### Manual Setup

#### 1) Channel, Site, and Routes

Embedded checkout will not load if the cart that generated the checkout redirect URL is not associated with a Channel that has a Channel Site that corresponds to the domain of the page that embeds the checkout. So, before starting this app, you must first register a Channel and Site on your store.

BigCommerce also presents three links on the checkout page that, by default, point to a Stencil storefront. To ensure the links point to the CMS front-end rather than Stencil, you can register Site Routes in BigCommerce. The three routes that affect the checkout page specifically are Cart, Forgot Password, and Create Account.

##### Example body for the Create a Channel requests:
```javascript
{
    "type": "storefront",
    "platform": "custom",
    "name": "My React Site"
}
```

Documentation: https://developer.bigcommerce.com/api-reference/cart-checkout/channels-listings-api/channels/createchannel

##### Example body for the Create a Channel Site requests:
```javascript
{
    "url": "https://local-dev.test"
}
```

> :warning: *localhost URLs will no longer work*
> 
> BC will no longer access `localhost` as the url for a Channel Site. Consider redirecting a .test domain to localhost in your machine's hosts file, or hosting your React app on a domain.

Documentation: https://developer.bigcommerce.com/api-reference/cart-checkout/channels-listings-api/channel-site/postchannelsite

##### Example bodies for the Create a Site Route requests:
```javascript
{ 
	"type": "cart",
	"matching": "",
	"route": "/demo/cart"
}
```

```javascript
{ 
	"type": "forgot_password",
	"matching": "",
	"route": "/routes/password_reset"
}
```

```javascript
{ 
	"type": "create_account",
	"matching": "",
	"route": "/routes/create-account"
}
```

_Note: If you will host the React app on a domain other than localhost, you must
Documentation: https://developer.bigcommerce.com/api-reference/cart-checkout/sites-routes-api/site-routes/post-site-route

#### 2) Cart and Cart Redirect URL
The React app will prompt the user for the embeded checkout redirect URL. In a real-world scenario, that would be provided by the app's backend (e.g. the CMS), but in the example you will manually generate the redirect URL. You can use the same Postma collection linked above for this step, you may may use the [Create a Cart API](https://developer.bigcommerce.com/api-reference/cart-checkout/server-server-cart-api/cart/createacart) and [Create Cart Redirect URL API](https://developer.bigcommerce.com/api-reference/cart-checkout/server-server-cart-api/cart-redirect-urls/createcartredirecturl) with another tool.

## Usage

### 1) Start the dev server
Once you have registered your channel, site, and routes, and you have created a cart redirect URL, you may use this React app to demonstrate the embedded checkout. To run the app, clone this repo then start the development server in your project folder with this command:

`sudo npm run start`

You must use `sudo` because the app must be served on port 443, and running the app on port 443 require local admin permissions. You must serve the app on port 443 because the embedded checkout will only load on pages that are accessed with HTTPS, and BigCommerce still strip the port number in any URL you supply as part of the Create a Channel Site request. If the URL of the page embedding the checkout has a port number and the Channel Site URL does not have a port number (it can't), the embedded checkout will not load.

### 2) Open the React app in your browser
In your browser, navigate to https://localhost and dismiss any security warnings.

### 3) Embedding checkout
Paste your cart redirect URL into the _Enter Redirect URL_ text field, then click the _Load Checkout_ button. You should expect to see alerts in the browser whenever the embedded checkout fires an event hook because of the event hook handlers passed to `embedCheckout()` in src/App.js.
