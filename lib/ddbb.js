export const products = [
  {
    id: '1',
    title: 'producto 1',
    handle: 'producto-1',
    featuredImage: {
      url: '/images/test.png',
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
          { name: 'Red', isActive: true },
          { name: 'Blue', isActive: false },
          { name: 'Green', isActive: true },
        ],
      },
      {
        id: 2,
        name: 'Size',
        isActive: false,
        values: [
          { name: 'Small', isActive: false },
          { name: 'Medium', isActive: true },
          { name: 'Large', isActive: false },
        ],
      },
    ],
    availableForSale: true,
    variants: [
      {
        id: 'variant-1-1',
        title: 'Red - Small',
        price: 19.99,
        quantity: 2,
        availableForSale: true,
        selectedOptions: [
          { name: 'Color', value: 'Red' },
          { name: 'Size', value: 'Small' },
        ],
      },
      {
        id: 'variant-1-2',
        title: 'Blue - Medium',
        price: 19.99,
        quantity: 4,
        availableForSale: true,
          selectedOptions: [
          { name: 'Color', value: 'Blue' },
          { name: 'Size', value: 'Medium' },
        ],
      },
      {
        id: 'variant-1-3',
        title: 'Blue - Small',
        price: 19.99,
        quantity: 4,
        availableForSale: true,
        selectedOptions: [
          { name: 'Color', value: 'Blue' },
          { name: 'Size', value: 'Small' },
        ],
      },
    ],
  },
  {
    id: '2',
    title: 'producto 2',
    handle: 'producto-2',
    featuredImage: {
      url: '/images/test1.png',
    },
    priceRange: {
      maxVariantPrice: {
        amount: 24.99,
        currencyCode: 'USD',
      },
    },
    options: [
      {
        id: 1,
        name: 'Color',
        values: [
          { name: 'Green', isActive: true },
          { name: 'Yellow', isActive: false },
        ],
      },
      {
        id: 2,
        name: 'Size',
        values: [
          { name: 'Small', isActive: true },
          { name: 'Medium', isActive: true },
        ],
      },
    ],
    variants: [
      {
        id: 'variant-2-1',
        title: 'Green - Small',
        price: 24.99,
        availableForSale: true,
        quantity: 2,
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
        quantity: 4,
        selectedOptions: [
          { name: 'Color', value: 'Yellow' },
          { name: 'Size', value: 'Medium' },
        ],
      },
      {
        id: 'variant-2-3',
        title: 'Yellow - Small',
        price: 24.99,
        availableForSale: true,
        quantity: 4,
        selectedOptions: [
          { name: 'Color', value: 'Yellow' },
          { name: 'Size', value: 'Small' },
        ],
      },
    ],
  },
  {
    id: '3',
    title: 'producto 3',
    handle: 'producto-3',
    featuredImage: {
      url: '/images/test.png',
    },
    priceRange: {
      maxVariantPrice: {
        amount: 14.99,
        currencyCode: 'USD',
      },
    },
    options: [
      {
        id: 1,
        name: 'Color',
        values: [
          { name: 'Red', isActive: true },
          { name: 'Blue', isActive: false },
        ],
      },
      {
        id: 2,
        name: 'Size',
        values: [
          { name: 'Small', isActive: false },
          { name: 'Medium', isActive: true },
          { name: 'Large', isActive: false },
        ],
      },
    ],
    variants: [
      {
        id: 'variant-3-1',
        title: 'Blue - Small',
        price: 14.99,
        availableForSale: true,
        quantity: 4,
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
        quantity: 4,
        selectedOptions: [
          { name: 'Color', value: 'Red' },
          { name: 'Size', value: 'Medium' },
        ],
      },
      {
        id: 'variant-3-3',
        title: 'Blue - Medium',
        price: 14.99,
        availableForSale: true,
        quantity: 4,
        selectedOptions: [
          { name: 'Color', value: 'Red' },
          { name: 'Size', value: 'Medium' },
        ],
      },
    ],
  },
  {
    id: '4',
    title: 'producto 4',
    handle: 'producto-4',
    featuredImage: {
      url: '/images/test1.png',
    },
    priceRange: {
      maxVariantPrice: {
        amount: 29.99,
        currencyCode: 'USD',
      },
    },
    options: [
      {
        id: 1,
        name: 'Color',
        values: [
          { name: 'Blue', isActive: false },
          { name: 'Green', isActive: true },
        ],
      },
      {
        id: 2,
        name: 'Size',
        values: [
          { name: 'Small', isActive: false },
          { name: 'Medium', isActive: true },
        ],
      },
    ],
    variants: [
      {
        id: 'variant-4-1',
        title: 'Green - Small',
        price: 29.99,
        availableForSale: true,
        quantity: 4,
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
        quantity: 4,
        selectedOptions: [
          { name: 'Color', value: 'Blue' },
          { name: 'Size', value: 'Medium' },
        ],
      },
      {
        id: 'variant-4-3',
        title: 'Blue - Small',
        price: 29.99,
        availableForSale: true,
        quantity: 4,
        selectedOptions: [
          { name: 'Color', value: 'Blue' },
          { name: 'Size', value: 'Small' },
        ],
      },
    ],
  },
  {
    id: '5',
    title: 'producto 5',
    handle: 'producto-5',
    featuredImage: {
      url: '/images/test.png',
    },
    priceRange: {
      maxVariantPrice: {
        amount: 12.99,
        currencyCode: 'USD',
      },
    },
    options: [
      {
        id: 1,
        name: 'Color',
        values: [
          { name: 'Red', isActive: true },
          { name: 'Yellow', isActive: false },
        ],
      },
      {
        id: 2,
        name: 'Size',
        values: [
          { name: 'Small', isActive: false },
          { name: 'Medium', isActive: true },
        ],
      },
    ],
    variants: [
      {
        id: 'variant-5-1',
        title: 'Yellow - Small',
        price: 12.99,
        availableForSale: true,
        quantity: 4,
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
        quantity: 4,
        selectedOptions: [
          { name: 'Color', value: 'Red' },
          { name: 'Size', value: 'Medium' },
        ],
      },
    ],
  },
  {
    id: '6',
    title: 'producto 6',
    handle: 'producto-6',
    featuredImage: {
        url: '/images/test1.png',
    },
    priceRange: {
        maxVariantPrice: {
            amount: 22.99,
            currencyCode: 'USD',
        },
    },
    options: [
        {
            id: 1,
            name: 'Color',
            values: [
                { name: 'Blue', isActive: true },
                { name: 'Green', isActive: false },
            ],
        },
        {
            id: 2,
            name: 'Size',
            values: [
                { name: 'Small', isActive: false },
                { name: 'Medium', isActive: true },
            ],
        },
    ],
    variants: [
        {
            id: 'variant-6-1',
            title: 'Blue - Small',
            price: 22.99,
            availableForSale: true,
        quantity: 4,
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
        quantity: 4,
            selectedOptions: [
                { name: 'Color', value: 'Green' },
                { name: 'Size', value: 'Medium' },
            ],
        },
    ],
},
{
    id: '7',
    title: 'producto 7',
    handle: 'producto-7',
    featuredImage: {
        url: '/images/test.png',
    },
    priceRange: {
        maxVariantPrice: {
            amount: 17.99,
            currencyCode: 'USD',
        },
    },
    options: [
        {
            id: 1,
            name: 'Color',
            values: [
                { name: 'Red', isActive: true },
                { name: 'Blue', isActive: false },
            ],
        },
        {
            id: 2,
            name: 'Size',
            values: [
                { name: 'Small', isActive: true },
                { name: 'Medium', isActive: true },
            ],
        },
    ],
    variants: [
        {
            id: 'variant-7-1',
            title: 'Red - Small',
            price: 17.99,
            availableForSale: true,
        quantity: 4,
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
        quantity: 4,
            selectedOptions: [
                { name: 'Color', value: 'Blue' },
                { name: 'Size', value: 'Medium' },
            ],
        },
    ],
},
{
    id: '8',
    title: 'producto 8',
    handle: 'producto-8',
    featuredImage: {
        url: '/images/test1.png',
    },
    priceRange: {
        maxVariantPrice: {
            amount: 25.99,
            currencyCode: 'USD',
        },
    },
    options: [
        {
            id: 1,
            name: 'Color',
            values: [
                { name: 'Green', isActive: true },
                { name: 'Blue', isActive: false },
            ],
        },
        {
            id: 2,
            name: 'Size',
            values: [
                { name: 'Small', isActive: false },
                { name: 'Medium', isActive: true },
            ],
        },
    ],
    variants: [
        {
            id: 'variant-8-1',
            title: 'Green - Small',
            price: 25.99,
            availableForSale: true,
        quantity: 4,
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
        quantity: 4,
            selectedOptions: [
                { name: 'Color', value: 'Blue' },
                { name: 'Size', value: 'Medium' },
            ],
        },
    ],
},
{
    id: '9',
    title: 'producto 9',
    handle: 'producto-9',
    featuredImage: {
        url: '/images/test.png',
    },
    priceRange: {
        maxVariantPrice: {
            amount: 16.99,
            currencyCode: 'USD',
        },
    },
    options: [
        {
            id: 1,
            name: 'Color',
            values: [
                { name: 'Blue', isActive: true },
                { name: 'Red', isActive: false },
            ],
        },
        {
            id: 2,
            name: 'Size',
            values: [
                { name: 'Small', isActive: false },
                { name: 'Medium', isActive: true },
            ],
        },
    ],
    variants: [
        {
            id: 'variant-9-1',
            title: 'Blue - Small',
            price: 16.99,
            availableForSale: true,
        quantity: 4,
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
        quantity: 4,
            selectedOptions: [
                { name: 'Color', value: 'Red' },
                { name: 'Size', value: 'Medium' },
            ],
        },
    ],
},
{
    id: '10',
    title: 'producto 10',
    handle: 'producto-10',
    featuredImage: {
        url: '/images/test1.png',
    },
    priceRange: {
        maxVariantPrice: {
            amount: 20.99,
            currencyCode: 'USD',
        },
    },
    options: [
        {
            id: 1,
            name: 'Color',
            values: [
                { name: 'Green', isActive: true },
                { name: 'Blue', isActive: false },
            ],
        },
        {
            id: 2,
            name: 'Size',
            values: [
                { name: 'Small', isActive: false },
                { name: 'Medium', isActive: true },
            ],
        },
    ],
    variants: [
        {
            id: 'variant-10-1',
            title: 'Green - Small',
            price: 20.99,
            availableForSale: true,
        quantity: 4,
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
        quantity: 4,
            selectedOptions: [
                { name: 'Color', value: 'Blue' },
                { name: 'Size', value: 'Medium' },
            ],
        },
    ],
}

];

// Puedes acceder a cada elemento individualmente utilizando products[0], products[1], ... hasta products[9].
