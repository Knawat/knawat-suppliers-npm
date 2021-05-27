<p align="center"><a href="https://knawat.com/" target="_blank"><img src="https://knawat.com/wp-content/uploads/2017/10/253_77.png" alt="Knawat" width="300"></a></p>

<p align="center">
  <a href="https://gitter.im/Knawat/Lobby" rel="nofollow">
    <img src="https://badges.gitter.im/Join%20Chat.svg" alt="Join the chat at Knawat">
  </a>
  <a href="https://isitmaintained.com/project/Knawat/knawat-suppliers-npm">
    <img src="https://isitmaintained.com/badge/resolution/Knawat/knawat-suppliers-npm.svg" alt="Average time to resolve an issue"/>
  </a>
  <a href="https://isitmaintained.com/project/Knawat/knawat-suppliers-npm">
    <img src="https://isitmaintained.com/badge/open/Knawat/knawat-suppliers-npm.svg" alt="Percentage of issues still open"/>
  </a>
  <a href="https://npm-stat.com/charts.html?package=@knawat/knawat-suppliers-npm">
    <img src="https://img.shields.io/npm/dm/@knawat/knawat-suppliers-npm.svg" alt="npm"/>
  </a>
  <a href="https://www.npmjs.com/package/@knawat/knawat-suppliers-npm">
    <img src="https://img.shields.io/npm/v/@knawat/knawat-suppliers-npm.svg" alt="npm"/>
  </a>
</p>

# Knawat Node.js NPM Package (Suppliers)

A Node.js package for Knawat Suppliers REST API. Easily interact with the Knawat Suppliers REST API using this library.

## Installation

```
npm install --save @knawat/suppliers
```

## Getting started

Check out the Knawat Suppliers REST API endpoints and data that can be manipulated in <https://knawat-suppliers.restlet.io/>.

## Setup

Setup for the new Knawat Suppliers REST API integration:

```javascript
// define environment to deploy on production. default is devlopment 
process.env.KNAWAT_ENV = 'production'

const { Suppliers, Products } = require('@knawat/suppliers');

const sa = new Products({
  key: 'XXXXXXXXXXXXXXXXXXXXXXXXXXX',
  secret: 'XXXXXXXXXXXXXXXXXXXXXXXX',
});

```

### Options

| Option   | Type     | Required    | Description                                                                   |
| -------- | -------- | ----------- | ----------------------------------------------------------------------------- |
| `key`    | `string` | conditional | Your Store's API consumer key. this field is required    |
| `secret` | `string` | conditional | Your Store's API consumer secret. this field is required |

<small>https://knawat-suppliers.restlet.io/#operation_get_token</small>


```javascript
/*
* Set Environment variables for Suppliers methods
* BASIC_USER : XXXXXXXXXX
* BASIC_PASS : XXXXXXXXXX
*/

const { Suppliers, Products, WeightRules } = require('@knawat/suppliers');

const suppliers = new Suppliers();
const weightRules = new WeightRules();

```

### Options


# Methods

## Product Methods

### getProducts

_Retrieve the list of all products or products for this channel, sorted by create date DESC_

```javascript
const filter = {
    limit : 20,
    page : 2,
    qualified : null,
    category_id : null,
    keyword : null,
    stock : null,
    price : null,
    sort_by : null,
    sort_asc : null,
    language : "en"
  }
sa.getProducts(filter);
```

| Params           | Type     | Required | Description                                                                           |
| ---------------- | -------- | -------- | --------------------------------------------------------------------------------      |
| `limit`          | `Number` | No       | Number of products to retrieve. `Default: 10`                                         |
| `page`           | `Number` | No       | Number of the page to retrieve. `Default: 1`                                          |
| `qualified`      | `Number` | No       | Number = 1: Qualified, 2: Needs to review, 4: Disqualified, 5 : Draft `Default: null` |
| `category_id`    | `String` | No       | String of category_id, `Default: null`                                                |
|                  |          |          | if category_id = -1, get all un-categories products                                   |
| `keyword`        | `String` | No       | Text to search in product SKU or name  `Default: null`                                |
| `stock`          | `Object` | No       | stock : { stock_from: Number,stock_to: Number }  `Default: null`                      |
| `price`          | `Object` | No       | price : { price_from: Number, price_to: Number }  `Default: null`                     |
| `sort_by`        | `String` | No       | allowed fields :name, stock, qualified, price, stock  `Default: null`                 |
| `sort_asc`       | `String` | No       | sort_asc: 1 = acs, -1 = desc  `Default: -1`                                           |
| `language`       | `String` | No       | tr, en, ar `Default: tr`                                        |

<small>https://knawat-suppliers.restlet.io/#operation_get_list_of_products</small>

### addProducts

_Add products to my list_

```javascript
sa.addProducts(products);
```

| Option     | Type    | Required | Description                       |
| ---------- | ------- | -------- | --------------------------------- |
| `products` | `array` | yes      | Array of Products Object `[{ sku: '1234' }]` |

<small>https://knawat-suppliers.restlet.io/#operation_add_to_my_products</small>

### getProductBySku

_Retrieve single product information by Product SKU. product should be under this store_

```javascript
sa.getProductBySku(sku);
```

| Params | Type     | Description                    |
| ------ | -------- | ------------------------------ |
| `sku`  | `string` | SKU of Product you want to get |

<small>https://knawat-suppliers.restlet.io/#operation_get_product_by_sku</small>

### updateBulkProduct

_Retrieve products information using bulk update. product should be under this store_

```javascript
sa.updateBulkProduct(data);
```

| Params | Type     | Description |
| ------ | -------- | ----------- |
| `data` | `object` | ```JSON     |

{"products":[{"sku":"4646030019238","barcode":"1234567890","url":"https://example.com/product.php?id=123","name":{"tr":"DAR KALIP PEMBE GÖMLEK","en":"Slimline Pink Shirt"},"description":{"tr":"Some Turkish text here, html allowed","en":"Some English text here, html allowed"},"brand":{"tr":"Defacto","en":"Defacto"},"images":["https://cdnp4.knawat.com/buyuk/788f8a17-d5d8-4ccb-b218-9e428b199228.jpg"],"attributes":[{"name":{"tr":"Beden","en":"Size"},"options":[{"tr":"S","en":"S"},{"tr":"M","en":"M"}]}],"variations":[{"sku":"4646030019238-S","barcode":"1234567890123","sale_price":9.74,"market_price":11.99,"weight":0.5,"quantity":123,"attributes":[{"name":{"tr":"Beden","en":"Size"},"option":{"tr":"S","en":"S"}}]}]}]}

<small>https://knawat-suppliers.restlet.io/#operation_update_product</small>

### updateProductBySku

_Update imported product External IDs by SKU_

```javascript
sa.updateProductBySku(products);
```

| Option | Type     | Required | Description            |
| ------ | -------- | -------- | ---------------------- |
| `data` | `object` | yes      | Check mp documentation |

<small>https://knawat-suppliers.restlet.io/#operation_update_product</small>

### getCategories

_Get all categories._

```javascript
sa.getCategories();
```

<small>https://knawat-suppliers.restlet.io/#operation_get_list_of_categories</small>

## Order Methods

### getOrders (GET Orders)

```javascript
sa.getOrders(limit, page);
```

| Params  | Type     | Description                                  |
| ------- | -------- | -------------------------------------------- |
| `limit` | `Number` | Number of orders to retrieve. `Default: 1`   |
| `page`  | `Number` | Number of the page to retrieve. `Default: 1` |

<small>https://knawat-suppliers.restlet.io/#operation_get_order_s_</small>

### getOrderById (GET Order By Knawat Order Id)

```javascript
sa.getOrderById(order_id);
```

| Params     | Type     | Description     |
| ---------- | -------- | --------------- |
| `order_id` | `string` | Knawat Order ID |

<small>https://knawat-suppliers.restlet.io/#operation_order_by_id</small>

### updateOrder (Update Order)

```javascript
const order_data = {
    shipmentTrackingNumber: "EJGGH000091",
    shipVia: "DFL"
}
sa.updateOrder(order_id, order_data);
```

| Params       | Type     | Description                                  |
| ------------ | -------- | -------------------------------------------- |
| `order_id`   | `string` | Knawat Order ID                              |
| `order_data` | `object` | Array of Updated Order Data |

<small>https://knawat-suppliers.restlet.io/#operation_update_order</small>

### Add order comment

```javascript
const order_data = {
          description: 'shipment on the way',
          expectedDeliveryDate: "2021-05-20",
        }
sa.addOrderComment(order_id, order_data);
```

| Params       | Type     | Description                                  |
| ------------ | -------- | -------------------------------------------- |
| `order_id`   | `string` | Knawat Order ID                              |
| `order_data` | `object` | Array of Updated Order Data |

## Suppliers Methods

### getSupplier (Get Suppliers)

```javascript
suppliers.getSuppliers();
```

<small>https://knawat-suppliers.restlet.io/#operation_get_all_suppliers</small>

### createSupplier (Create Supplier)

```javascript
suppliers.createSupplier(supplier);
```

| Params       | Type     | Description                                  |
| ------------ | -------- | -------------------------------------------- |
| `supplier`   | `object` | Object of supplier                           |

<small>https://knawat-suppliers.restlet.io/#operation_create_a_supplier</small>

### getSupplierKeys (Get Supplier Keys)

```javascript
suppliers.getSupplierKeys(supplier_id);
```

| Params       | Type     | Description                                  |
| ------------ | -------- | -------------------------------------------- |
| `supplier_id`| `string` | Id of supplier                          |

<small>https://knawat-suppliers.restlet.io/#operation_get_suppliers_keys</small>

### updateSupplier (Update Supplier)

```javascript
sa.updateSupplier(supplier);
```

| Params       | Type     | Description                                  |
| ------------ | -------- | -------------------------------------------- |
| `supplier`   | `object` | Object of supplier                           |

{"supplier": { "name" : "john", "url": "https://example.com.tr","logo": "https://example.com.tr/logo.png","currency": "TRY", "address": [array of addresses], "contacts": [array of contacts] } }

<small>https://knawat-suppliers.restlet.io/#operation_update_a_supplier_2</small>

## Weight Rules Methods

### getWeightRules (Get Weight Rules)

```javascript
weightRules.getWeightRules();
```

| Params       | Type     | Description                                  |
| ------------ | -------- | -------------------------------------------- |
| `limit`      | `number` | limit of data in response                    |
| `page`       | `number` | page number                                  |
| `sort`       | `number` | sort data in response                        |

<small>https://knawat-suppliers.restlet.io/#operation_get_all_weight_rules</small>

### createWeightRule (Create Weight Rules)

```javascript
weightRules.createWeightRule(weightRules);
```

| Params          | Type     | Description                                  |
| --------------- | -------- | -------------------------------------------- |
| `weightRules`   | `object` | Object of weightRules                        |

"weightRules": { "keyword" : "Shirt", "weight": 5 } 

<small>https://knawat-suppliers.restlet.io/#operation_create_a_supplier</small>

### updateWeightRule (Update Weight Rules)

```javascript
weightRules.updateWeightRule(id, weightRules);
```

| Params         | Type     | Description                                  |
| -------------- | -------- | -------------------------------------------- |
| `id`           | `string` | Id of weight rule                            |
| `weightRules`  | `object` | Object of parameters to update               |

"weightRules": { "keyword" : "Shirt", "weight": 5 } 

<small>https://knawat-suppliers.restlet.io/#operation_update_weight_rule</small>

### deleteWeightRule (Delete Weight Rules)

```javascript
weightRules.deleteWeightRule(id);
```

| Params         | Type     | Description                                  |
| -------------- | -------- | -------------------------------------------- |
| `id`           | `string` | Id of weight rule                            |

<small>https://knawat-suppliers.restlet.io/#operation_delete_weight_rule</small>

## Reporting Security Issues

To disclose a security issue to our team, [please submit a report here](https://knawat.com/contact/).

## Support & Chat

Developers are welcome here, please create issue or [chat with us https://gitter.im/Knawat/Lobby](https://gitter.im/Knawat/Lobby). This repository is not suitable for Knawat customers support. Please don't use our issue tracker for support requests, but for Knawat Suppliers NPM Package issues only. Support can take place through [Knawat support portal](https://help.knawat.com/hc/en-us/requests/new/) which is available for free.

Support requests in issues on this repository will be closed on sight.

## Contributing to Knawat

If you have a patch or have stumbled upon an issue with Knawat NPM Package, you can contribute this back to the code. Please create a pull request.

## Check also

- [Knawat RESTful API](https://mp.knawat.io)
- [Knawat PHP SDK](https://github.com/Knawat/Knawat-PHP-SDK)
- [WooCommerce Dropshipping Plugin](https://github.com/Knawat/dropshipping-woocommerce)
- [Magento 2 Module](https://github.com/Knawat/knawat-dropshipping-magento2)
- [OpenCart Module](https://github.com/Knawat/knawat-dropshipping-opencart)
- [Knawat Node.js NPM Package (MP)](https://github.com/Knawat/Knawat-NPM-JavaScript-SDK)
