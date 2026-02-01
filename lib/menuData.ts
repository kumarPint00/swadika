// Comprehensive menu data with recipes and stories

export interface Dish {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
  rating: number;
  isVeg: boolean;
  isBestseller?: boolean;
  isNew?: boolean;
  prepTime: string;
  servings: number;
  spiceLevel: 'Mild' | 'Medium' | 'Hot' | 'Very Hot';
  
  // Recipe details
  story: string;
  ingredients: string[];
  instructions: string[];
  nutrition: {
    calories: number;
    protein: string;
    carbs: string;
    fat: string;
  };
  
  // Regional info
  origin: string;
  traditionalServing: string;
  pairing?: string[];
}

export const menuData: Dish[] = [
  // Signature Dishes
  {
    id: 'litti-chokha',
    name: 'Litti Chokha',
    category: 'Signature',
    price: 299,
    image: '/logo.jpeg',
    description: 'Traditional roasted wheat balls stuffed with sattu, served with smoky mashed vegetables',
    rating: 4.9,
    isVeg: true,
    isBestseller: true,
    prepTime: '45 mins',
    servings: 2,
    spiceLevel: 'Medium',
    story: 'Born in the rustic villages of Bihar, Litti Chokha is more than food - it\'s a legacy. Farmers would prepare this portable, nutritious meal before heading to fields at dawn. The smoky aroma of roasted litti over cow-dung cakes, paired with chokha made from charred eggplant and tomatoes, represents the soul of Bihar. Our recipe honors this 300-year-old tradition, using pure desi ghee and slow-roasting techniques passed down through generations.',
    ingredients: [
      '2 cups whole wheat flour',
      '1 cup roasted gram flour (sattu)',
      '2 tsp carom seeds (ajwain)',
      '1 tsp kalonji (nigella seeds)',
      '4 large eggplants',
      '3 tomatoes',
      '5 green chilies',
      'Fresh coriander',
      'Mustard oil',
      'Pure desi ghee',
      'Rock salt',
      'Lemon juice'
    ],
    instructions: [
      'Prepare dough with wheat flour, water, and ghee. Rest for 30 minutes.',
      'Mix sattu with roasted cumin, ajwain, kalonji, salt, mustard oil, and lemon juice.',
      'Divide dough into small balls, stuff with sattu mixture, seal properly.',
      'Roast littis over charcoal or in tandoor until golden and crusty.',
      'Char eggplants, tomatoes, and chilies directly on flame until skin blackens.',
      'Peel and mash charred vegetables with mustard oil, salt, and coriander.',
      'Crush roasted littis slightly, dip in desi ghee.',
      'Serve hot with chokha, pickles, and raw onions.'
    ],
    nutrition: {
      calories: 450,
      protein: '15g',
      carbs: '65g',
      fat: '18g'
    },
    origin: 'Bihar (Magadh region)',
    traditionalServing: 'Served on sal leaf plates with desi ghee, eaten with hands',
    pairing: ['Dahi (yogurt)', 'Aam ka Achaar', 'Raw onions', 'Green chutney']
  },
  {
    id: 'sattu-paratha',
    name: 'Sattu Paratha',
    category: 'Signature',
    price: 249,
    image: '/logo.jpeg',
    description: 'Flaky whole wheat flatbread stuffed with spiced roasted gram flour',
    rating: 4.8,
    isVeg: true,
    isBestseller: true,
    prepTime: '30 mins',
    servings: 1,
    spiceLevel: 'Mild',
    story: 'Sattu Paratha is the breakfast of warriors. For centuries, this protein-rich dish fueled farmers, wrestlers, and travelers across Bihar and Eastern UP. The sattu (roasted gram flour) provides instant energy and keeps you full for hours. Our grandmothers believed that eating sattu paratha with pickle and yogurt could sustain a person through the hottest summer day. We make our sattu in-house, roasting chana dal in traditional iron kadhai to unlock its nutty, earthy flavor.',
    ingredients: [
      '2 cups whole wheat flour',
      '1 cup roasted sattu',
      '2 onions, finely chopped',
      '3 green chilies',
      '1 tsp ginger-garlic paste',
      'Fresh coriander leaves',
      '1 tsp mustard oil',
      'Kalonji seeds',
      'Ajwain',
      'Rock salt',
      'Lemon juice',
      'Desi ghee for cooking'
    ],
    instructions: [
      'Knead soft dough with wheat flour, salt, and water. Rest 20 minutes.',
      'Mix sattu with chopped onions, chilies, coriander, ginger-garlic paste.',
      'Add mustard oil, lemon juice, ajwain, kalonji, and salt to sattu mix.',
      'Roll dough ball, place sattu filling in center, seal edges.',
      'Flatten stuffed ball gently, roll into thick paratha.',
      'Cook on hot tawa with desi ghee until golden spots appear.',
      'Flip and cook other side, pressing edges.',
      'Serve hot with butter, yogurt, and mango pickle.'
    ],
    nutrition: {
      calories: 380,
      protein: '14g',
      carbs: '58g',
      fat: '12g'
    },
    origin: 'Bihar and Eastern UP',
    traditionalServing: 'Breakfast dish, eaten with fingers, dipped in yogurt',
    pairing: ['Dahi', 'Aam ka Achaar', 'Green chutney', 'Lassi']
  },
  {
    id: 'dal-baati',
    name: 'Dal Baati Churma',
    category: 'Signature',
    price: 349,
    image: '/logo.jpeg',
    description: 'Hard wheat rolls baked in tandoor, served with mixed dal and sweet churma',
    rating: 4.7,
    isVeg: true,
    prepTime: '60 mins',
    servings: 2,
    spiceLevel: 'Medium',
    story: 'Dal Baati is the royal feast of Rajasthan that found its way to UP through trade routes. Legend says warriors would bury baati dough in sand before battle, and by the time they returned, the desert sun would have baked it perfectly. Our version stays true to this ancient method - baatis are baked hard as rocks, then crushed and drowned in pure ghee, transforming them into melt-in-mouth delicacies. The accompanying panchmel dal and sweet churma create a symphony of flavors.',
    ingredients: [
      '3 cups wheat flour',
      '1 cup semolina (sooji)',
      '1/2 cup yogurt',
      '1 cup mixed dal (toor, chana, moong)',
      '2 onions',
      '3 tomatoes',
      'Whole spices (cumin, bay leaf, cinnamon)',
      'Red chili powder',
      'Turmeric',
      'Garam masala',
      'Jaggery for churma',
      '200g pure desi ghee',
      'Dry fruits for garnish'
    ],
    instructions: [
      'Mix flour, sooji, yogurt, salt, and ghee. Knead firm dough.',
      'Shape into round baatis, bake in tandoor or oven at 200°C for 40 mins.',
      'Cook mixed dal with onions, tomatoes, and spices until mushy.',
      'Temper dal with cumin, garlic, and whole red chilies in ghee.',
      'For churma: Crush leftover baati, mix with jaggery and ghee.',
      'Break hot baatis, drown in ghee.',
      'Serve with dal, churma, raw onions, and green chutney.'
    ],
    nutrition: {
      calories: 650,
      protein: '20g',
      carbs: '85g',
      fat: '28g'
    },
    origin: 'Rajasthan (popular in Western UP)',
    traditionalServing: 'Served in large kansa thali, eaten during festivals',
    pairing: ['Churma', 'Ker sangri', 'Boondi raita', 'Papad']
  },

  // Rice & Biryani
  {
    id: 'tehri',
    name: 'Tehri (Vegetable Biryani)',
    category: 'Rice',
    price: 279,
    image: '/logo.jpeg',
    description: 'Fragrant rice cooked with seasonal vegetables and aromatic spices',
    rating: 4.6,
    isVeg: true,
    prepTime: '40 mins',
    servings: 2,
    spiceLevel: 'Mild',
    story: 'Tehri is the vegetarian answer to biryani, born in the Awadhi courts of Lucknow. When the Nawabs declared meat-free days, royal cooks created this aromatic rice dish that was so delicious, it became a delicacy in its own right. Made with seasonal vegetables, basmati rice, and secret spice blends, Tehri represents the secular, inclusive nature of Awadhi cuisine. Our recipe uses the traditional dum pukht method - sealing the pot with dough to trap flavors.',
    ingredients: [
      '2 cups aged basmati rice',
      '1 potato, cubed',
      '1 cup cauliflower florets',
      '1/2 cup green peas',
      '1 carrot, diced',
      'Whole garam masala',
      'Saffron strands',
      'Rose water',
      'Fried onions',
      'Fresh mint leaves',
      'Ghee',
      'Yogurt'
    ],
    instructions: [
      'Soak basmati rice for 30 minutes, drain.',
      'Deep fry potato and cauliflower until golden.',
      'Layer rice and vegetables in heavy-bottom pot.',
      'Add yogurt, saffron milk, mint, and fried onions.',
      'Seal pot with dough, cook on dum (low heat) for 25 minutes.',
      'Open seal, fluff rice gently.',
      'Garnish with fried onions, serve with raita.'
    ],
    nutrition: {
      calories: 420,
      protein: '10g',
      carbs: '72g',
      fat: '10g'
    },
    origin: 'Lucknow, Uttar Pradesh',
    traditionalServing: 'Served in copper vessels during weddings',
    pairing: ['Dahi raita', 'Mirchi ka salan', 'Papad', 'Burhani raita']
  },

  // Curries
  {
    id: 'ghugni',
    name: 'Ghugni',
    category: 'Curries',
    price: 199,
    image: '/logo.jpeg',
    description: 'Spicy dried yellow peas curry with aromatic tempering',
    rating: 4.5,
    isVeg: true,
    prepTime: '50 mins',
    servings: 2,
    spiceLevel: 'Hot',
    story: 'Ghugni is the street food that became a staple. Every winter morning in Bihar, vendors serve steaming ghugni in leaf bowls, topped with chopped onions and lemon. It\'s believed to have originated during British rule when cheap, protein-rich meals were needed for laborers. The name comes from the sound "ghug-ghug" made while stirring the thick curry. Our version uses overnight-soaked matar dal and a secret spice mix that our founder\'s grandmother guarded fiercely.',
    ingredients: [
      '2 cups dried yellow peas (matar dal)',
      '3 onions, finely chopped',
      '2 tomatoes',
      '1 tbsp ginger-garlic paste',
      'Whole cumin, bay leaf',
      'Turmeric, red chili',
      'Garam masala',
      'Mustard oil',
      'Fresh coriander',
      'Green chilies',
      'Lemon wedges'
    ],
    instructions: [
      'Soak yellow peas overnight, pressure cook until soft.',
      'Heat mustard oil, temper with cumin and bay leaf.',
      'Fry onions until golden, add ginger-garlic paste.',
      'Add tomatoes, cook until oil separates.',
      'Add turmeric, red chili, salt. Mix cooked peas.',
      'Simmer for 15 minutes until thick and creamy.',
      'Garnish with coriander, serve with chopped onions and lemon.'
    ],
    nutrition: {
      calories: 320,
      protein: '18g',
      carbs: '48g',
      fat: '8g'
    },
    origin: 'Bihar and Bengal',
    traditionalServing: 'Street food, served in sal leaf bowls',
    pairing: ['Litti', 'Puri', 'Tacos (modern fusion)', 'Boiled eggs']
  },

  // Breads
  {
    id: 'khasta-kachori',
    name: 'Khasta Kachori',
    category: 'Breads',
    price: 149,
    image: '/logo.jpeg',
    description: 'Crispy fried bread stuffed with spiced moong dal filling',
    rating: 4.8,
    isVeg: true,
    isNew: true,
    prepTime: '40 mins',
    servings: 4,
    spiceLevel: 'Medium',
    story: 'Kachori is the crown jewel of UP street food. Born in the bylanes of Varanasi, this crispy delight was perfected by halwais who spent years mastering the art of creating the perfect flaky layers. The secret? The ratio of flour to ghee, the temperature of oil, and the exact filling consistency. Old-timers say a perfect kachori should shatter when bitten, releasing aromatic steam. Ours are made fresh every morning using a 100-year-old family recipe.',
    ingredients: [
      '2 cups all-purpose flour',
      '1/2 cup moong dal (split)',
      'Fennel seeds, cumin',
      'Dry mango powder (amchur)',
      'Red chili powder',
      'Asafoetida',
      'Garam masala',
      'Ghee',
      'Oil for frying',
      'Black salt'
    ],
    instructions: [
      'Mix flour with ghee, salt. Knead stiff dough, rest 30 mins.',
      'Soak moong dal 2 hours, grind coarsely.',
      'Roast dal with fennel, cumin, spices until aromatic.',
      'Roll dough, stuff with dal mixture, seal edges.',
      'Deep fry on medium heat until golden and puffed.',
      'Drain on paper, serve hot with green chutney and tamarind chutney.'
    ],
    nutrition: {
      calories: 280,
      protein: '8g',
      carbs: '35g',
      fat: '12g'
    },
    origin: 'Varanasi, Uttar Pradesh',
    traditionalServing: 'Breakfast item, served with alu sabzi',
    pairing: ['Aloo sabzi', 'Meethi chutney', 'Hari chutney', 'Kadhi']
  },

  // Snacks & Chaat
  {
    id: 'samosa-chaat',
    name: 'Samosa Chaat',
    category: 'Snacks',
    price: 179,
    image: '/logo.jpeg',
    description: 'Crispy samosas broken and topped with chickpeas, chutneys, yogurt, and sev',
    rating: 4.7,
    isVeg: true,
    isBestseller: true,
    prepTime: '25 mins',
    servings: 1,
    spiceLevel: 'Medium',
    story: 'Samosa Chaat represents the innovative spirit of Indian street food. When a vendor in Old Delhi accidentally broke samosas while frying, instead of discarding them, he topped them with chole, chutneys, and yogurt - and chaat history was made. This "happy accident" became a cultural phenomenon. Our version uses potato-filled samosas crushed fresh, layered with tangy tamarind chutney, spicy green chutney, sweet yogurt, and finished with crispy sev.',
    ingredients: [
      '4 potato samosas',
      '1 cup boiled chickpeas',
      'Tamarind chutney',
      'Green coriander chutney',
      'Whisked yogurt',
      'Sev (gram flour noodles)',
      'Chopped onions',
      'Pomegranate seeds',
      'Chaat masala',
      'Red chili powder',
      'Fresh coriander'
    ],
    instructions: [
      'Crush hot samosas on plate.',
      'Top with warm chickpea curry.',
      'Drizzle tamarind and green chutneys generously.',
      'Pour whisked yogurt over the mixture.',
      'Sprinkle chaat masala, red chili powder.',
      'Add chopped onions, pomegranate seeds.',
      'Top with sev and fresh coriander.',
      'Serve immediately while crispy.'
    ],
    nutrition: {
      calories: 450,
      protein: '12g',
      carbs: '62g',
      fat: '18g'
    },
    origin: 'Delhi (popularized across UP)',
    traditionalServing: 'Street food, eaten with wooden fork',
    pairing: ['Masala chai', 'Cold lassi', 'Lemon soda']
  },

  // Sweets
  {
    id: 'malpua',
    name: 'Malpua with Rabri',
    category: 'Sweets',
    price: 229,
    image: '/logo.jpeg',
    description: 'Sweet pancakes soaked in sugar syrup, served with thickened sweetened milk',
    rating: 4.9,
    isVeg: true,
    prepTime: '35 mins',
    servings: 2,
    spiceLevel: 'Mild',
    story: 'Malpua is ancient India\'s gift to dessert lovers. Mentioned in texts dating back 3000 years, it was originally offered to gods during Holi and marriages. The name comes from "apupa," a Sanskrit word for sweet cakes. In Bihar, making malpua is a ritual - the batter must ferment overnight, the sugar syrup must reach the perfect thread consistency, and the rabri must simmer for hours. Our recipe honors this patience, creating malpuas that are crispy outside, spongy inside, and divine when paired with cardamom-scented rabri.',
    ingredients: [
      '1 cup all-purpose flour',
      '1/2 cup semolina',
      '1 cup milk',
      '1/4 cup mashed banana',
      'Sugar',
      'Cardamom powder',
      'Saffron strands',
      'Fennel seeds',
      'Ghee for frying',
      'For rabri: 1 liter full-fat milk',
      'Chopped dry fruits'
    ],
    instructions: [
      'Mix flour, semolina, banana, milk. Ferment 2 hours.',
      'Make sugar syrup with cardamom and saffron.',
      'For rabri: Boil milk until reduced to half, add sugar.',
      'Heat ghee, pour batter to make small pancakes.',
      'Fry until golden and crispy.',
      'Dip hot malpuas in warm sugar syrup.',
      'Serve topped with thick rabri and nuts.'
    ],
    nutrition: {
      calories: 480,
      protein: '10g',
      carbs: '68g',
      fat: '20g'
    },
    origin: 'Ancient India (popular in Bihar and Bengal)',
    traditionalServing: 'Festival sweet, served during Holi and weddings',
    pairing: ['Rabri', 'Vanilla ice cream', 'Rose syrup']
  },

  // Beverages
  {
    id: 'sattu-drink',
    name: 'Sattu Sharbat',
    category: 'Beverages',
    price: 99,
    image: '/logo.jpeg',
    description: 'Refreshing drink made with roasted gram flour, perfect summer cooler',
    rating: 4.6,
    isVeg: true,
    prepTime: '5 mins',
    servings: 1,
    spiceLevel: 'Mild',
    story: 'Sattu Sharbat is Bihar\'s answer to energy drinks - 100% natural, incredibly nutritious, and instant. For centuries, farmers, laborers, and travelers have relied on this magical drink to beat the scorching summer heat. The roasted gram flour provides protein, fiber, and minerals, while keeping the body cool. Ayurveda considers sattu a "cooling" food perfect for pitta balance. Our sattu is stone-ground from carefully roasted Bengal gram, maintaining all its nutritional properties.',
    ingredients: [
      '3 tbsp roasted sattu',
      '2 cups cold water',
      'Rock salt',
      'Roasted cumin powder',
      'Black salt',
      'Lemon juice',
      'Fresh mint leaves',
      'Crushed ice',
      'Optional: jaggery for sweet version'
    ],
    instructions: [
      'Mix sattu with little water to make smooth paste.',
      'Add cold water, whisk until lump-free.',
      'Add rock salt, cumin powder, black salt.',
      'Squeeze fresh lemon juice.',
      'Add crushed ice and mint leaves.',
      'Stir well, serve immediately.',
      'Garnish with mint sprig.'
    ],
    nutrition: {
      calories: 120,
      protein: '6g',
      carbs: '22g',
      fat: '2g'
    },
    origin: 'Bihar and Jharkhand',
    traditionalServing: 'Summer drink, consumed mid-morning',
    pairing: ['Litti chokha', 'Sattu paratha', 'Light snacks']
  },
];

// Helper functions
export const getDishesByCategory = (category: string) => 
  menuData.filter(dish => dish.category === category);

export const getBestsellers = () => 
  menuData.filter(dish => dish.isBestseller);

export const getVegDishes = () => 
  menuData.filter(dish => dish.isVeg);

export const getDishById = (id: string) => 
  menuData.find(dish => dish.id === id);

export const categories = [
  'All',
  'Signature',
  'Rice',
  'Curries',
  'Breads',
  'Snacks',
  'Sweets',
  'Beverages'
];
