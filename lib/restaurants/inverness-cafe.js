/**
 * Inverness Cafe & Pizzeria — restaurant configuration.
 * Add another file like this for a second restaurant later.
 */

import {
  defaultMenuData,
  PIZZA_TOPPINGS,
  PASTA_TYPES,
  TOPPING_PRICE,
} from '@/lib/menus/inverness-cafe';

const NAME = 'Inverness Cafe & Pizzeria';

export const invernessCafe = {
  id: 'inverness-cafe',
  name: NAME,
  brandName: 'Inverness',
  brandSub: 'Cafe & Pizzeria',
  shortName: 'Inverness Cafe',
  description:
    'Handcrafted pizzas, fresh pasta, gourmet burgers & Scottish classics in the heart of Inverness. Order online or book a table.',
  tagline: 'Authentic Italian in the Highlands',
  locale: 'en_GB',

  address: {
    street: 'Academy Street',
    locality: 'Inverness',
    region: 'Scottish Highlands',
    postalCode: 'IV1 1LU',
    country: 'GB',
    lines: [NAME, 'Academy Street', 'Inverness, IV1 1LU', 'Scottish Highlands'],
  },

  phone: {
    display: '+44 7554 284033',
    e164: '+447554284033',
  },
  email: 'invernesscafe@dinego.co.uk',

  logo: {
    image: '/images/logo.jpg',
  },

  images: {
    hero: '/images/hero-banner.png',
    about: '/images/about-interior.png',
    pizzaHero: '/images/pizza-hero.png',
    pastaHero: '/images/pasta-hero.png',
    burgerHero: '/images/burger-hero.png',
    fishChipsHero: '/images/fish-chips-hero.png',
  },

  // Stored for future theming; current CSS already matches these values
  theme: {
    bgPrimary: '#0c0a09',
    bgSecondary: '#1c1917',
    bgCard: '#292524',
    amber400: '#fbbf24',
    amber500: '#f59e0b',
    textPrimary: '#fafaf9',
  },

  social: {
    facebook: '#',
    instagram: '#',
    tripadvisor: '#',
  },

  hours: [
    {
      label: 'Mon – Thu',
      shortLabel: 'Mon-Thu',
      opens: '11:00',
      closes: '22:00',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'],
    },
    {
      label: 'Fri – Sat',
      shortLabel: 'Fri-Sat',
      opens: '11:00',
      closes: '23:00',
      dayOfWeek: ['Friday', 'Saturday'],
    },
    {
      label: 'Sunday',
      shortLabel: 'Sunday',
      opens: '12:00',
      closes: '21:00',
      dayOfWeek: ['Sunday'],
    },
  ],

  geo: {
    latitude: 57.4804113,
    longitude: -4.2261793,
  },

  maps: {
    url: 'https://maps.app.goo.gl/kEYAozW9M2BLXfwQ8',
    embed:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1084.5!2d-4.2261793!3d57.4804113!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x488f7125aa03ab5f%3A0xb982d725ad27c4f4!2sInverness%20Cafe%20%26%20Pizzeria!5e0!3m2!1sen!2suk!4v1710000000000!5m2!1sen!2suk',
  },

  servesCuisine: ['Italian', 'Scottish', 'Pizza', 'Pasta', 'Burgers'],
  priceRange: '££',

  whatsapp: {
    // Env override kept for deploy flexibility
    number: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '447554284033',
  },

  // Online card payments (Square) — off until ready to launch
  payments: {
    enabled: false,
    message:
      'Currently we are accepting order via whatsapp or call only.',
  },

  square: {
    applicationId: process.env.NEXT_PUBLIC_SQUARE_APPLICATION_ID || '',
    locationId: process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID || '',
    environment: (process.env.NEXT_PUBLIC_SQUARE_ENVIRONMENT || 'sandbox').toLowerCase(),
    paymentApiUrl: process.env.NEXT_PUBLIC_PAYMENT_API_URL || '/api/createPayment',
  },

  // Keep existing key so current carts are not wiped
  cartStorageKey: 'inverness-cart',

  admin: {
    demoEmail: 'admin@invernesscafe.co.uk',
    demoPassword: 'password',
  },

  seo: {
    titleDefault: `${NAME} — Authentic Italian in the Highlands`,
    titleTemplate: `%s | ${NAME}`,
    description:
      'Handcrafted pizzas, fresh pasta, gourmet burgers & Scottish classics in the heart of Inverness. Order online or book a table.',
    keywords: [
      'Inverness',
      'cafe',
      'pizzeria',
      'pizza',
      'pasta',
      'burgers',
      'restaurant',
      'Scottish Highlands',
      'Italian food',
    ],
    openGraph: {
      title: NAME,
      description:
        'Authentic Italian meets Scottish Highland hospitality. Handcrafted pizzas, fresh pasta, and gourmet burgers.',
      type: 'website',
      locale: 'en_GB',
      siteName: NAME,
    },
  },

  content: {
    footerBlurb:
      'Bringing the best of Italian cuisine to the Scottish Highlands. Handcrafted pizzas, fresh pasta, and gourmet comfort food.',
    footerCredit: 'Made in the Scottish Highlands',
    hero: {
      badge: 'Now Open — Welcome to Inverness',
      titleBefore: 'Authentic ',
      titleEm: 'Italian',
      titleAfter: ' Flavours in the Scottish Highlands',
      description:
        'From our wood-fired pizzas to freshly made pasta and gourmet burgers, every dish is crafted with love using the finest local and imported ingredients.',
      stats: [
        { value: '4.8★', label: 'Google Rating' },
        { value: '30+', label: 'Menu Items' },
        { value: 'Fresh', label: 'Daily Ingredients' },
      ],
    },
    homeAbout: {
      titleBefore: 'Where ',
      titleEm: 'Scotland',
      titleAfter: ' Meets Italy',
      paragraphs: [
        'Nestled in the heart of Inverness, our cafe brings together the warmth of Italian cooking with the rich traditions of Scottish hospitality.',
        "Whether you're craving a classic Margherita, a hearty Carbonara, or our famous Scottish scampi and chips, we've got something to make every visit special.",
      ],
      features: [
        ['🍕', 'Hand-Stretched Dough'],
        ['🌿', 'Fresh Ingredients'],
        ['🏴󠁧󠁢󠁳󠁣󠁴󠁿', 'Scottish Produce'],
        ['👨‍🍳', 'Experienced Chefs'],
      ],
      badgeTitle: 'Wood-Fired',
      badgeSub: 'Authentic Oven',
    },
    featured: [
      {
        name: 'Margherita Pizza',
        desc: 'Tomato base, creamy mozzarella, fresh basil',
        price: '£13.95',
        imgKey: 'pizzaHero',
      },
      {
        name: 'Carbonara',
        desc: 'Bacon, soft cheese & cream — our signature',
        price: '£11.95',
        imgKey: 'pastaHero',
      },
      {
        name: 'Cheese Burger Combo',
        desc: 'Juicy cheese burger with fries & drink',
        price: '£13.45',
        imgKey: 'burgerHero',
      },
      {
        name: 'Fish & Chips',
        desc: 'Golden battered fish, chips & tartar sauce',
        price: 'From £8.45',
        imgKey: 'fishChipsHero',
      },
    ],
    testimonials: [
      {
        text: "Absolutely fantastic pizza! The Nduja Meat Feast was bursting with flavour. Best pizzeria in Inverness, hands down.",
        name: 'Sarah M.',
        role: 'Local Regular',
        avatar: 'S',
      },
      {
        text: "The carbonara was authentic and creamy — reminded me of restaurants in Rome. We'll definitely be back!",
        name: 'James K.',
        role: 'Visitor from Edinburgh',
        avatar: 'J',
      },
      {
        text: 'Great value! The burger combos are generous, and the scampi was perfectly cooked. Love the warm vibe.',
        name: 'Emma T.',
        role: 'Google Review',
        avatar: 'E',
      },
    ],
    infoCards: [
      {
        icon: '🚗',
        title: 'Takeaway & Delivery',
        desc: 'Order your favourites for takeaway or delivery. Call us, WhatsApp, or order online!',
      },
      {
        icon: '👨‍👩‍👧‍👦',
        title: 'Family Friendly',
        desc: 'Kid-friendly portions and a welcoming atmosphere — everyone is welcome at our table.',
      },
      {
        icon: '🎉',
        title: 'Private Events',
        desc: 'Celebrating something special? Ask about group bookings and private dining options.',
      },
    ],
    about: {
      subtitle: 'Bringing a slice of Italy to the Scottish Highlands',
      headingBefore: 'A Passion for ',
      headingEm: 'Great Food',
      headingAfter: ' and Hospitality',
      paragraphs: [
        `At ${NAME}, we believe that great food brings people together. Nestled in the heart of the Scottish Highlands, our restaurant is a labour of love, born from a desire to share authentic Italian recipes with our local community.`,
        'Our journey began with a simple idea: hand-stretched pizza dough, baked in a traditional wood-fired oven, using the finest San Marzano tomatoes and creamy mozzarella. Over time, we expanded our menu to include fresh homemade pasta, hearty Scottish classics, and gourmet burgers, ensuring there\'s something to delight every palate.',
        'We pride ourselves on sourcing the freshest local Scottish produce while importing authentic Italian ingredients, creating a unique fusion of flavours that you won\'t find anywhere else in Inverness.',
      ],
      stats: [
        { value: '10+', label: 'Years Experience' },
        { value: '100%', label: 'Fresh Ingredients' },
      ],
      values: [
        {
          icon: '🌱',
          title: 'Quality Ingredients',
          desc: 'We never compromise on the quality of our ingredients, sourcing locally whenever possible and importing the best from Italy.',
        },
        {
          icon: '🔥',
          title: 'Authentic Methods',
          desc: 'From our wood-fired oven to our hand-rolled pasta, we stick to traditional methods that guarantee superior taste.',
        },
        {
          icon: '🤝',
          title: 'Warm Hospitality',
          desc: 'Every guest is treated like family. We want you to feel at home from the moment you walk through our doors.',
        },
        {
          icon: '🌍',
          title: 'Community Focus',
          desc: 'We are proud to be part of the Inverness community, supporting local suppliers and contributing to the local economy.',
        },
      ],
      ctaTitleBefore: 'Come Experience It ',
      ctaTitleEm: 'Yourself',
      ctaBody:
        "The best way to understand our story is to taste our food. Whether you're a local or just visiting the Highlands, we'd love to welcome you.",
    },
  },

  // Menu data only (no functions — safe for client context)
  menu: {
    data: defaultMenuData,
    PIZZA_TOPPINGS,
    PASTA_TYPES,
    TOPPING_PRICE,
  },
};
