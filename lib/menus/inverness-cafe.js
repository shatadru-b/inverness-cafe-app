// Full restaurant menu — every item has a curated matching image
// Pizza toppings & pasta shapes are OPTIONS (not sellable categories)

const img = (file) => `/images/menu/${file}`;

/** Extra pizza toppings — selected when customising a pizza (+ price each) */
export const PIZZA_TOPPINGS = [
  { id: 'topping-pineapple', name: 'Pineapple', price: 1.95, image: img('topping-pineapple.jpg') },
  { id: 'topping-mushrooms', name: 'Mushrooms', price: 1.95, image: img('topping-mushrooms.jpg') },
  { id: 'topping-olives', name: 'Olives', price: 1.95, image: img('topping-olives.jpg') },
  { id: 'topping-red-onion', name: 'Red Onion', price: 1.95, image: img('topping-onion.jpg') },
  { id: 'topping-piquenta', name: 'Piquenta Peppers', price: 1.95, image: img('topping-peppers.jpg') },
  { id: 'topping-pepperoni', name: 'Pepperoni', price: 1.95, image: img('topping-pepperoni.jpg') },
  { id: 'topping-ham', name: 'Ham', price: 1.95, image: img('topping-ham.jpg') },
];

/** Pasta shapes — required free choice when ordering pasta */
export const PASTA_TYPES = [
  { id: 'penne', name: 'Penne', description: 'Short tube pasta', image: img('pasta-penne.jpg') },
  { id: 'fusilli', name: 'Fusilli', description: 'Twisted spiral pasta', image: img('pasta-fusilli.jpg') },
  { id: 'spaghetti', name: 'Spaghetti', description: 'Classic long pasta', image: img('pasta-spaghetti.jpg') },
];

export const TOPPING_PRICE = 1.95;

export const defaultMenuData = {
  pizza: {
    title: 'Our Pizzas',
    icon: '🍕',
    description: 'Hand-stretched dough — add extra toppings when you order',
    items: [
      {
        id: 'pizza-margherita',
        name: 'Margherita',
        description: 'Tomato base, mozzarella',
        price: 13.95,
        image: img('pizza-margherita.jpg'),
        tags: ['vegetarian'],
        featured: true,
        available: true,
        productType: 'pizza',
      },
      {
        id: 'pizza-traditional-margherita',
        name: 'Traditional Margherita',
        description: 'Tomato base, mozzarella pearls, mozzarella, basil leaves & basil oil',
        price: 14.95,
        image: img('pizza-margherita-basil.jpg'),
        tags: ['popular', 'vegetarian'],
        available: true,
        productType: 'pizza',
      },
      {
        id: 'pizza-mix-veg',
        name: 'Mix Veg Fantasy',
        description: 'Mix peppers, onions, mozzarella, courgettes & mushrooms',
        price: 16.95,
        image: img('pizza-veggie.jpg'),
        tags: ['vegetarian'],
        available: true,
        productType: 'pizza',
      },
      {
        id: 'pizza-pepperoni',
        name: 'Pepperoni',
        description: 'Tomato base, mozzarella & pepperoni',
        price: 15.95,
        image: img('pizza-pepperoni.jpg'),
        tags: ['popular'],
        available: true,
        productType: 'pizza',
      },
      {
        id: 'pizza-ham-cheese',
        name: 'Ham & Cheese',
        description: 'Tomato base, Scottish ham, brie & mozzarella',
        price: 15.95,
        image: img('pizza-ham-cheese.jpg'),
        tags: [],
        available: true,
        productType: 'pizza',
      },
      {
        id: 'pizza-nduja',
        name: 'Nduja Meat Feast',
        description: 'Nduja base, red onion, pepperoni, Scottish ham, sunblushed tomato & mozzarella',
        price: 17.95,
        image: img('pizza-meat.jpg'),
        tags: ['spicy'],
        available: true,
        productType: 'pizza',
      },
    ],
  },

  pasta: {
    title: 'Fresh Pasta',
    icon: '🍝',
    description: 'Choose your sauce — then pick penne, fusilli or spaghetti',
    items: [
      {
        id: 'pasta-tomato-parmesan',
        name: 'Tomato and Parmesan',
        description: 'Tomato sauce, parmesan',
        price: 10.95,
        image: img('pasta-tomato.jpg'),
        tags: ['vegetarian'],
        available: true,
        productType: 'pasta',
      },
      {
        id: 'pasta-rose',
        name: 'Rose',
        description: 'Tomato sauce & cream',
        price: 10.95,
        image: img('pasta-rose.jpg'),
        tags: ['vegetarian'],
        available: true,
        productType: 'pasta',
      },
      {
        id: 'pasta-mixed-veg',
        name: 'Mixed Vegetables',
        description: 'Tomato sauce, mix peppers, onions, courgettes & mushrooms',
        price: 11.95,
        image: img('pasta-veg.jpg'),
        tags: ['vegetarian'],
        available: true,
        productType: 'pasta',
      },
      {
        id: 'pasta-chicken-pesto',
        name: 'Chicken Pesto',
        description: 'Chicken, pesto, soft cheese cream & parmesan',
        price: 11.95,
        image: img('pasta-chicken-pesto.jpg'),
        tags: ['popular'],
        available: true,
        productType: 'pasta',
      },
      {
        id: 'pasta-bolognese',
        name: 'Bolognese',
        description: 'Mince meat, tomato sauce',
        price: 11.95,
        image: img('pasta-bolognese.jpg'),
        tags: ['popular'],
        available: true,
        productType: 'pasta',
      },
      {
        id: 'pasta-carbonara',
        name: 'Carbonara',
        description: 'Bacon, soft cheese & cream',
        price: 11.95,
        image: img('pasta-carbonara.jpg'),
        tags: ['popular'],
        featured: true,
        available: true,
        productType: 'pasta',
      },
    ],
  },

  burgers: {
    title: 'Gourmet Burgers',
    icon: '🍔',
    description: 'Juicy burgers — combos include fries & drink',
    subcategories: [
      {
        name: 'Burger Combos',
        subtitle: 'Served with fries & drink',
        items: [
          {
            id: 'combo-classic',
            name: 'Classic Combo',
            description: 'Classic burger with fries & drink',
            price: 12.49,
            image: img('burger-combo.jpg'),
            tags: [],
            available: true,
          },
          {
            id: 'combo-cheese',
            name: 'Cheese Burger Combo',
            description: 'Cheese burger with fries & drink',
            price: 13.45,
            image: img('burger-cheese.jpg'),
            tags: ['popular'],
            featured: true,
            available: true,
          },
          {
            id: 'combo-bacon',
            name: 'Bacon Combo',
            description: 'Bacon burger with fries & drink',
            price: 14.49,
            image: img('burger-bacon.jpg'),
            tags: [],
            available: true,
          },
          {
            id: 'combo-spicy-chicken',
            name: 'Spicy Chicken Combo',
            description: 'Spicy chicken burger with fries & drink',
            price: 13.45,
            image: img('burger-chicken.jpg'),
            tags: ['spicy'],
            available: true,
          },
        ],
      },
      {
        name: 'Burgers',
        subtitle: 'Burger only',
        items: [
          {
            id: 'burger-classic',
            name: 'Classic Burger',
            description: 'Classic beef burger',
            price: 8.49,
            image: img('burger-classic.jpg'),
            tags: [],
            available: true,
          },
          {
            id: 'burger-cheese',
            name: 'Cheese Burger',
            description: 'Beef burger with melted cheese',
            price: 9.45,
            image: img('burger-cheese.jpg'),
            tags: [],
            available: true,
          },
          {
            id: 'burger-bacon',
            name: 'Bacon Burger',
            description: 'Beef burger with crispy bacon',
            price: 10.45,
            image: img('burger-bacon.jpg'),
            tags: [],
            available: true,
          },
          {
            id: 'burger-spicy-chicken',
            name: 'Spicy Chicken Burger',
            description: 'Spicy chicken fillet burger',
            price: 9.45,
            image: img('burger-chicken.jpg'),
            tags: ['spicy'],
            available: true,
          },
          {
            id: 'burger-inverness-pizza',
            name: 'Inverness Pizza Burger',
            description: 'House special pizza-style burger',
            price: 10.49,
            image: img('burger-pizza.jpg'),
            tags: ['popular'],
            available: true,
          },
          {
            id: 'burger-indian-cheese',
            name: 'Indian Cheese Burger',
            description: 'Spiced Indian-style cheese burger',
            price: 11.45,
            image: img('burger-indian.jpg'),
            tags: [],
            available: true,
          },
          {
            id: 'burger-spicy-nduja',
            name: 'Spicy Nduja Burger',
            description: 'Fiery nduja burger',
            price: 13.45,
            image: img('burger-nduja.jpg'),
            tags: ['spicy'],
            available: true,
          },
        ],
      },
    ],
  },

  sides: {
    title: 'Side Plates',
    icon: '🥗',
    description: 'Perfect additions to any meal',
    items: [
      {
        id: 'side-fries',
        name: 'Fries',
        description: 'Crispy golden fries',
        price: 4.95,
        image: img('fries.jpg'),
        tags: ['vegetarian'],
        available: true,
      },
      {
        id: 'side-onion-rings',
        name: 'Onion Rings',
        description: 'Crispy battered onion rings',
        price: 4.95,
        image: img('onion-rings.jpg'),
        tags: ['vegetarian'],
        available: true,
      },
      {
        id: 'side-mozzarella',
        name: 'Mozzarella Sticks',
        description: 'Golden fried mozzarella sticks',
        price: 5.95,
        image: img('mozzarella-sticks.jpg'),
        tags: ['vegetarian'],
        available: true,
      },
      {
        id: 'side-garlic-bread',
        name: 'Garlic Bread',
        description: 'Fresh garlic bread',
        price: 4.95,
        image: img('garlic-bread.jpg'),
        tags: ['vegetarian'],
        available: true,
      },
      {
        id: 'side-cheesy-garlic',
        name: 'Cheesy Garlic Bread',
        description: 'Garlic bread topped with melted mozzarella',
        price: 5.95,
        image: img('cheesy-garlic-bread.jpg'),
        tags: ['popular', 'vegetarian'],
        available: true,
      },
    ],
  },

  kitchen: {
    title: 'Kitchen Food',
    icon: '🍳',
    description: 'Scottish classics and comfort food',
    items: [
      {
        id: 'kitchen-nuggets',
        name: 'Chicken Nuggets',
        description: 'Chicken nuggets, fries & salad',
        price: 13.95,
        image: img('nuggets.jpg'),
        tags: [],
        available: true,
      },
      {
        id: 'kitchen-scampi',
        name: 'Scampi',
        description: 'Breaded Scottish scampi, fries & salad',
        price: 14.95,
        image: img('scampi.jpg'),
        tags: ['popular'],
        featured: true,
        available: true,
      },
      {
        id: 'kitchen-salad',
        name: 'Salad',
        description: 'Mixed salad leaves, basil & garlic dressing',
        price: 6.95,
        image: img('salad.jpg'),
        tags: ['vegetarian'],
        available: true,
      },
      {
        id: 'kitchen-salad-feta',
        name: 'Salad + Feta',
        description: 'Mixed salad leaves with feta cheese',
        price: 8.95,
        image: img('salad-feta.jpg'),
        tags: ['vegetarian'],
        available: true,
      },
      {
        id: 'kitchen-fish-large',
        name: 'Fish and Chips (Large)',
        description: 'Crispy battered fish with golden chips',
        price: 13.45,
        image: img('fish-chips.jpg'),
        tags: ['popular'],
        available: true,
      },
      {
        id: 'kitchen-fish-small',
        name: 'Fish and Chips (Small)',
        description: 'Crispy battered fish with golden chips',
        price: 8.45,
        image: img('fish-chips.jpg'),
        tags: [],
        available: true,
      },
    ],
  },

  juices: {
    title: 'Juices',
    icon: '🧃',
    description: 'Fresh and fruity',
    items: [
      { id: 'juice-orange', name: 'Orange Juice', description: 'Fresh orange juice', price: 4.5, image: img('juice-orange.jpg'), tags: ['vegetarian'], available: true },
      { id: 'juice-pineapple', name: 'Pineapple Juice', description: 'Fresh pineapple juice', price: 4.5, image: img('juice-pineapple.jpg'), tags: ['vegetarian'], available: true },
      { id: 'juice-watermelon', name: 'Watermelon Juice', description: 'Fresh watermelon juice', price: 4.5, image: img('juice-watermelon.jpg'), tags: ['vegetarian'], available: true },
      { id: 'juice-mixed', name: 'Mixed Fruit Juice', description: 'Blend of seasonal fruits', price: 4.5, image: img('juice-mixed.jpg'), tags: ['vegetarian'], available: true },
      { id: 'juice-grape', name: 'Grape Juice', description: 'Fresh grape juice', price: 4.5, image: img('juice-grape.jpg'), tags: ['vegetarian'], available: true },
      { id: 'juice-lemon', name: 'Fresh Lemon Juice', description: 'Fresh lemon juice', price: 4.5, image: img('juice-lemon.jpg'), tags: ['vegetarian'], available: true },
      { id: 'juice-mint', name: 'Mint Juice', description: 'Refreshing mint juice', price: 4.5, image: img('juice-mint.jpg'), tags: ['vegetarian'], available: true },
      { id: 'juice-kiwi', name: 'Kiwi Juice', description: 'Fresh kiwi juice', price: 4.5, image: img('juice-kiwi.jpg'), tags: ['vegetarian'], available: true },
    ],
  },

  shakes: {
    title: 'Shakes',
    icon: '🥤',
    description: 'Thick, creamy milkshakes',
    items: [
      { id: 'shake-chocolate', name: 'Chocolate Shake', description: 'Classic chocolate milkshake', price: 5.5, image: img('shake-chocolate.jpg'), tags: [], available: true },
      { id: 'shake-strawberry', name: 'Strawberry Shake', description: 'Classic strawberry milkshake', price: 5.5, image: img('shake-strawberry.jpg'), tags: [], available: true },
      { id: 'shake-vanilla', name: 'Vanilla Shake', description: 'Classic vanilla milkshake', price: 5.5, image: img('shake-vanilla.jpg'), tags: [], available: true },
      { id: 'shake-vegan', name: 'Vegan Shake (Oats / Soya Milk)', description: 'Oats or soya milk', price: 5.5, image: img('shake-vegan.jpg'), tags: ['vegetarian'], available: true },
      { id: 'shake-banana', name: 'Banana Shake', description: 'Fresh banana milkshake', price: 5.5, image: img('shake-banana.jpg'), tags: [], available: true },
      { id: 'shake-oreo', name: 'Oreo Shake', description: 'Cookies & cream milkshake', price: 5.5, image: img('shake-oreo.jpg'), tags: ['popular'], available: true },
      { id: 'shake-avocado', name: 'Avocado Shake', description: 'Creamy avocado shake', price: 5.5, image: img('shake-avocado.jpg'), tags: ['vegetarian'], available: true },
    ],
  },

  coffee: {
    title: 'Coffee',
    icon: '☕',
    description: 'Hot and iced coffee drinks',
    items: [
      { id: 'coffee-cappuccino', name: 'Cappuccino', description: 'Espresso with steamed milk foam', price: 4.5, image: img('coffee-cappuccino.jpg'), tags: [], available: true },
      { id: 'coffee-flat-white', name: 'Flat White', description: 'Smooth espresso with microfoam', price: 4.5, image: img('coffee-flat-white.jpg'), tags: [], available: true },
      { id: 'coffee-mochaccino', name: 'Mochaccino', description: 'Chocolate espresso with steamed milk', price: 4.5, image: img('coffee-mocha.jpg'), tags: [], available: true },
      { id: 'coffee-americano', name: 'Black Coffee / Americano', description: 'Espresso with hot water', price: 4.5, image: img('coffee-americano.jpg'), tags: [], available: true },
      { id: 'coffee-espresso', name: 'Espresso', description: 'Single shot espresso', price: 4.5, image: img('coffee-espresso.jpg'), tags: [], available: true },
      { id: 'coffee-double-espresso', name: 'Double Espresso', description: 'Double shot espresso', price: 4.5, image: img('coffee-espresso.jpg'), tags: [], available: true },
      { id: 'coffee-iced', name: 'Iced Coffee', description: 'Chilled coffee over ice', price: 4.5, image: img('coffee-iced.jpg'), tags: [], available: true },
    ],
  },
};

export function getAllMenuItems() {
  const items = [];
  Object.values(defaultMenuData).forEach((category) => {
    if (category.items) {
      items.push(...category.items.filter((i) => !i.isOption));
    }
    if (category.subcategories) {
      category.subcategories.forEach((sub) => {
        items.push(...sub.items.filter((i) => !i.isOption));
      });
    }
  });
  return items;
}
