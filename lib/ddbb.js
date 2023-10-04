export const products = [
  // Producto 1
  {
    id: '1',
    title: 'Product 1',
    handle: 'product-1',
    featuredImage: {
      url: '/images/product1.jpg',
    },
    priceRange: {
      maxVariantPrice: {
        amount: 19.99,
        currencyCode: 'USD',
      },
    },
    options: [
      {
        id: 1,
        name: 'Color',
        isActive: true,
        values: [
          {name:'Red', isActive: true},
          {name:'Blue', isActive: false}, 
          {name:'Green', isActive: true}, 
        ],
      },
      {
        id: 2,
        name: 'Size',
        isActive: false,
        values: [
          {name:'Small', isActive: false},
          {name:'Medium', isActive: true}, 
          {name:'Large', isActive: false}, 
        ],
      },
    ],
    availableForSale: true,
    variants: [
      {
        id: 'variant-1-1',
        title: 'Red - Small',
        price: 19.99,
        selectedOptions: [
          { name: 'Color', value: 'Red' },
          { name: 'Size', value: 'Small' },
        ],
      },
      {
        id: 'variant-1-2',
        title: 'Blue - Medium',
        price: 19.99,
        selectedOptions: [
          { name: 'Color', value: 'Blue' },
          { name: 'Size', value: 'Medium' },
        ],
      },
    ],
  },
  // Producto 2
  {
    id: '2',
    title: 'Product 2',
    handle: 'product-2',
    featuredImage: {
      url: '/images/product2.jpg',
    },
    priceRange: {
      maxVariantPrice: {
        amount: 24.99,
        currencyCode: 'USD',
      },
    },
    options: [
      {
        id: 'option-color',
        name: 'Color',
        values: ['Green', 'Yellow'],
      },
      {
        id: 'option-size',
        name: 'Size',
        values: ['Small', 'Medium'],
      },
    ],
    variants: [
      {
        id: 'variant-2-1',
        title: 'Green - Small',
        price: 24.99,
        availableForSale: true,
        selectedOptions: [
          { name: 'Color', value: 'Green' },
          { name: 'Size', value: 'Small' },
        ],
      },
      {
        id: 'variant-2-2',
        title: 'Yellow - Medium',
        price: 24.99,
        availableForSale: true,
        selectedOptions: [
          { name: 'Color', value: 'Yellow' },
          { name: 'Size', value: 'Medium' },
        ],
      },
    ],
  },
  // Producto 3
  {
    id: '3',
    title: 'Product 3',
    handle: 'product-3',
    featuredImage: {
      url: '/images/product3.jpg',
    },
    priceRange: {
      maxVariantPrice: {
        amount: 14.99,
        currencyCode: 'USD',
      },
    },
    options: [
      {
        id: 'option-color',
        name: 'Color',
        values: ['Blue', 'Red'],
      },
      {
        id: 'option-size',
        name: 'Size',
        values: ['Small', 'Medium'],
      },
    ],
    variants: [
      {
        id: 'variant-3-1',
        title: 'Blue - Small',
        price: 14.99,
        availableForSale: true,
        selectedOptions: [
          { name: 'Color', value: 'Blue' },
          { name: 'Size', value: 'Small' },
        ],
      },
      {
        id: 'variant-3-2',
        title: 'Red - Medium',
        price: 14.99,
        availableForSale: true,
        selectedOptions: [
          { name: 'Color', value: 'Red' },
          { name: 'Size', value: 'Medium' },
        ],
      },
    ],
  },
  // Producto 4
  {
    id: '4',
    title: 'Product 4',
    handle: 'product-4',
    featuredImage: {
      url: '/images/product4.jpg',
    },
    priceRange: {
      maxVariantPrice: {
        amount: 29.99,
        currencyCode: 'USD',
      },
    },
    options: [
      {
        id: 'option-color',
        name: 'Color',
        values: ['Green', 'Blue'],
      },
      {
        id: 'option-size',
        name: 'Size',
        values: ['Small', 'Medium'],
      },
    ],
    variants: [
      {
        id: 'variant-4-1',
        title: 'Green - Small',
        price: 29.99,
        availableForSale: true,
        selectedOptions: [
          { name: 'Color', value: 'Green' },
          { name: 'Size', value: 'Small' },
        ],
      },
      {
        id: 'variant-4-2',
        title: 'Blue - Medium',
        price: 29.99,
        availableForSale: true,
        selectedOptions: [
          { name: 'Color', value: 'Blue' },
          { name: 'Size', value: 'Medium' },
        ],
      },
    ],
  },
  // Producto 5
  {
    id: '5',
    title: 'Product 5',
    handle: 'product-5',
    featuredImage: {
      url: '/images/product5.jpg',
    },
    priceRange: {
      maxVariantPrice: {
        amount: 12.99,
        currencyCode: 'USD',
      },
    },
    options: [
      {
        id: 'option-color',
        name: 'Color',
        values: ['Yellow', 'Red'],
      },
      {
        id: 'option-size',
        name: 'Size',
        values: ['Small', 'Medium'],
      },
    ],
    variants: [
      {
        id: 'variant-5-1',
        title: 'Yellow - Small',
        price: 12.99,
        availableForSale: true,
        selectedOptions: [
          { name: 'Color', value: 'Yellow' },
          { name: 'Size', value: 'Small' },
        ],
      },
      {
        id: 'variant-5-2',
        title: 'Red - Medium',
        price: 12.99,
        availableForSale: true,
        selectedOptions: [
          { name: 'Color', value: 'Red' },
          { name: 'Size', value: 'Medium' },
        ],
      },
    ],
  },
  // Producto 6
  {
    id: '6',
    title: 'Product 6',
    handle: 'product-6',
    featuredImage: {
      url: '/images/product6.jpg',
    },
    priceRange: {
      maxVariantPrice: {
        amount: 22.99,
        currencyCode: 'USD',
      },
    },
    options: [
      {
        id: 'option-color',
        name: 'Color',
        values: ['Blue', 'Green'],
      },
      {
        id: 'option-size',
        name: 'Size',
        values: ['Small', 'Medium'],
      },
    ],
    variants: [
      {
        id: 'variant-6-1',
        title: 'Blue - Small',
        price: 22.99,
        availableForSale: true,
        selectedOptions: [
          { name: 'Color', value: 'Blue' },
          { name: 'Size', value: 'Small' },
        ],
      },
      {
        id: 'variant-6-2',
        title: 'Green - Medium',
        price: 22.99,
        availableForSale: true,
        selectedOptions: [
          { name: 'Color', value: 'Green' },
          { name: 'Size', value: 'Medium' },
        ],
      },
    ],
  },
  // Producto 7
  {
    id: '7',
    title: 'Product 7',
    handle: 'product-7',
    featuredImage: {
      url: '/images/product7.jpg',
    },
    priceRange: {
      maxVariantPrice: {
        amount: 17.99,
        currencyCode: 'USD',
      },
    },
    options: [
      {
        id: 'option-color',
        name: 'Color',
        values: ['Red', 'Blue'],
      },
      {
        id: 'option-size',
        name: 'Size',
        values: ['Small', 'Medium'],
      },
    ],
    variants: [
      {
        id: 'variant-7-1',
        title: 'Red - Small',
        price: 17.99,
        availableForSale: true,
        selectedOptions: [
          { name: 'Color', value: 'Red' },
          { name: 'Size', value: 'Small' },
        ],
      },
      {
        id: 'variant-7-2',
        title: 'Blue - Medium',
        price: 17.99,
        availableForSale: true,
        selectedOptions: [
          { name: 'Color', value: 'Blue' },
          { name: 'Size', value: 'Medium' },
        ],
      },
    ],
  },
  // Producto 8
  {
    id: '8',
    title: 'Product 8',
    handle: 'product-8',
    featuredImage: {
      url: '/images/product8.jpg',
    },
    priceRange: {
      maxVariantPrice: {
        amount: 25.99,
        currencyCode: 'USD',
      },
    },
    options: [
      {
        id: 'option-color',
        name: 'Color',
        values: ['Green', 'Blue'],
      },
      {
        id: 'option-size',
        name: 'Size',
        values: ['Small', 'Medium'],
      },
    ],
    variants: [
      {
        id: 'variant-8-1',
        title: 'Green - Small',
        price: 25.99,
        availableForSale: true,
        selectedOptions: [
          { name: 'Color', value: 'Green' },
          { name: 'Size', value: 'Small' },
        ],
      },
      {
        id: 'variant-8-2',
        title: 'Blue - Medium',
        price: 25.99,
        availableForSale: true,
        selectedOptions: [
          { name: 'Color', value: 'Blue' },
          { name: 'Size', value: 'Medium' },
        ],
      },
    ],
  },
  // Producto 9
  {
    id: '9',
    title: 'Product 9',
    handle: 'product-9',
    featuredImage: {
      url: '/images/product9.jpg',
    },
    priceRange: {
      maxVariantPrice: {
        amount: 16.99,
        currencyCode: 'USD',
      },
    },
    options: [
      {
        id: 'option-color',
        name: 'Color',
        values: ['Blue', 'Red'],
      },
      {
        id: 'option-size',
        name: 'Size',
        values: ['Small', 'Medium'],
      },
    ],
    variants: [
      {
        id: 'variant-9-1',
        title: 'Blue - Small',
        price: 16.99,
        availableForSale: true,
        selectedOptions: [
          { name: 'Color', value: 'Blue' },
          { name: 'Size', value: 'Small' },
        ],
      },
      {
        id: 'variant-9-2',
        title: 'Red - Medium',
        price: 16.99,
        availableForSale: true,
        selectedOptions: [
          { name: 'Color', value: 'Red' },
          { name: 'Size', value: 'Medium' },
        ],
      },
    ],
  },
  // Producto 10
  {
    id: '10',
    title: 'Product 10',
    handle: 'product-10',
    featuredImage: {
      url: '/images/product10.jpg',
    },
    priceRange: {
      maxVariantPrice: {
        amount: 20.99,
        currencyCode: 'USD',
      },
    },
    options: [
      {
        id: 'option-color',
        name: 'Color',
        values: ['Green', 'Blue'],
      },
      {
        id: 'option-size',
        name: 'Size',
        values: ['Small', 'Medium'],
      },
    ],
    variants: [
      {
        id: 'variant-10-1',
        title: 'Green - Small',
        price: 20.99,
        availableForSale: true,
        selectedOptions: [
          { name: 'Color', value: 'Green' },
          { name: 'Size', value: 'Small' },
        ],
      },
      {
        id: 'variant-10-2',
        title: 'Blue - Medium',
        price: 20.99,
        availableForSale: true,
        selectedOptions: [
          { name: 'Color', value: 'Blue' },
          { name: 'Size', value: 'Medium' },
        ],
      },
    ],
  },
];
