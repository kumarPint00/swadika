"use client";
import {
  Box,
  Container,
  Card,
  CardContent,
  Typography,
  Chip,
  Divider,
  useTheme,
} from "@mui/material";
import Image from "next/image";

interface MenuItem {
  name: string;
  description: string;
  price: string;
}

interface MenuSectionProps {
  title: string;
  items: MenuItem[];
}

const menuData = {
  comboMeals: [
    {
      name: "Daal Bhat Chokha",
      description:
        "Steamed rice with lentil curry and mashed roasted vegetables (chokha).",
      price: "₹130",
    },
    {
      name: "Roti Sabji Combo",
      description:
        "Whole wheat rotis with your choice of seasonal vegetable curry.",
      price: "₹100",
    },
    {
      name: "Litti Chokha Meal",
      description:
        "Three littis served with chokha and a side of tangy chutneys.",
      price: "₹140",
    },
    {
      name: "Poori Bhaji Plate",
      description:
        "Fluffy pooris served with spicy potato curry and pickle.",
      price: "₹110",
    },
    {
      name: "Khichdi with Kadhi",
      description:
        "Rice and lentil porridge served with yogurt-based curry.",
      price: "₹120",
    },
    {
      name: "Thali - Vegetarian",
      description:
        "Rotis, rice, dal, sabji, raita, and pickle – a complete Punjabi/UP meal.",
      price: "₹180",
    },
    {
      name: "Thali - Non-Vegetarian",
      description:
        "Rotis, rice, dal, sabji, chicken/mutton curry, raita, and pickle.",
      price: "₹250",
    },
  ],
  starters: [
    {
      name: "Samosa",
      description: "Crispy pastry filled with spiced potatoes and peas.",
      price: "₹30",
    },
    {
      name: "Kachori",
      description:
        "Flaky dough stuffed with spicy lentils, served with chutney.",
      price: "₹35",
    },
    {
      name: "Aloo Tikki",
      description: "Spiced potato patties shallow-fried to golden perfection.",
      price: "₹40",
    },
    {
      name: "Paneer Pakora",
      description:
        "Soft paneer cubes dipped in gram flour batter and deep-fried.",
      price: "₹60",
    },
    {
      name: "Vegetable Cutlet",
      description: "Mixed vegetable patties lightly spiced and fried.",
      price: "₹45",
    },
    {
      name: "Momo (Bihari Style)",
      description: "Steamed/fried dumplings served with spicy chutney.",
      price: "₹70",
    },
    {
      name: "Chana Jor Garam",
      description: "Spicy, tangy flattened chickpeas snack.",
      price: "₹30",
    },
    {
      name: "Sattu Chaat",
      description: "Refreshing chaat made with roasted gram flour and spices.",
      price: "₹40",
    },
    {
      name: "Puchka (Bihari Golgappa)",
      description:
        "Crispy hollow puris filled with spicy tamarind water and potato.",
      price: "₹35",
    },
    {
      name: "Litti (Without Chokha)",
      description: "Baked wheat balls stuffed with sattu, served alone.",
      price: "₹100",
    },
    {
      name: "Singhara Fry",
      description: "Crispy fried water chestnut pieces (seasonal).",
      price: "₹55",
    },
    {
      name: "Bajre ki Roti + Garlic Chutney",
      description: "Millet flatbread served with spicy garlic chutney.",
      price: "₹80",
    },
  ],
  mainCourse: [
    {
      name: "Litti Chokha",
      description:
        "Traditional baked wheat balls stuffed with sattu, served with mashed roasted eggplant and tomato chutney.",
      price: "₹120",
    },
    {
      name: "Aloo Tamatar Sabzi + Roti",
      description: "Spiced potato & tomato curry with fresh whole wheat rotis.",
      price: "₹90",
    },
    {
      name: "Dal Pithi (Wheat Dumplings)",
      description: "Soft wheat dumplings cooked in a flavorful lentil gravy.",
      price: "₹110",
    },
    {
      name: "Sattu Paratha w/ Curd & Pickle",
      description:
        "Stuffed flatbread with roasted gram flour, served with curd & pickle.",
      price: "₹80",
    },
    {
      name: "Baigan Bharta",
      description: "Smoky mashed eggplant cooked with spices.",
      price: "₹90",
    },
    {
      name: "Rajma Masala",
      description: "Kidney beans slow-cooked in rich tomato gravy.",
      price: "₹100",
    },
    {
      name: "Chana Masala",
      description: "Spicy & tangy chickpea curry.",
      price: "₹95",
    },
    {
      name: "Kaddu ki Sabzi",
      description: "Sweet & mildly spiced pumpkin curry.",
      price: "₹85",
    },
    {
      name: "Matar Paneer",
      description: "Cottage cheese & peas in tomato gravy.",
      price: "₹110",
    },
    {
      name: "Kadhi Chawal",
      description: "Yogurt-based curry served with steamed rice.",
      price: "₹100",
    },
    {
      name: "Mix Vegetable Sabzi",
      description: "Seasonal vegetables cooked with traditional spices.",
      price: "₹90",
    },
    {
      name: "Bhindi Masala",
      description: "Spiced & sautéed okra.",
      price: "₹90",
    },
    {
      name: "Chawal (Steamed Rice)",
      description: "Fluffy steamed basmati rice.",
      price: "₹50",
    },
    {
      name: "Poori Bhaji",
      description: "Fluffy fried bread served with potato curry.",
      price: "₹85",
    },
    {
      name: "Aloo Baingan",
      description: "Spiced potato & eggplant curry.",
      price: "₹90",
    },
    {
      name: "Masoor Dal",
      description: "Comforting red lentil curry.",
      price: "₹85",
    },
    {
      name: "Mughlai Korma (Non-Veg)",
      description: "Rich meat curry slow-cooked with aromatic spices.",
      price: "₹180",
    },
    {
      name: "Chicken Curry (Bihari Style)",
      description:
        "Spicy chicken curry made with traditional Bihari flavors.",
      price: "₹160",
    },
    {
      name: "Mutton Curry (Bihari Style)",
      description: "Tender mutton cooked in a flavorful gravy.",
      price: "₹190",
    },
  ],
  breads: [
    {
      name: "Chapati / Roti",
      description: "Freshly made whole wheat flatbread.",
      price: "₹15",
    },
    {
      name: "Makki ki Roti",
      description: "Corn flour flatbread, best with sarson ka saag.",
      price: "₹30",
    },
    {
      name: "Bajra Roti",
      description: "Pearl millet flatbread with earthy flavor.",
      price: "₹25",
    },
    {
      name: "Missi Roti",
      description: "Flatbread made with gram flour + wheat flour.",
      price: "₹30",
    },
    {
      name: "Naan (Butter/Plain)",
      description: "Soft oven-baked flatbread.",
      price: "₹40",
    },
    {
      name: "Roomali Roti",
      description: "Thin, soft sketched flatbread perfect for wraps.",
      price: "₹35",
    },
  ],
  streetFood: [
    {
      name: "Khichdi with Kadhi",
      description: "Rice & lentil porridge served with yogurt-based curry.",
      price: "₹100",
    },
    {
      name: "Thekua (Sweet Biscuit)",
      description:
        "Deep-fried sweet biscuit made with jaggery & wheat flour.",
      price: "₹40",
    },
    {
      name: "Malpua (Sweet Pancake)",
      description: "Sweet fried pancakes soaked in sugar syrup.",
      price: "₹50",
    },
    {
      name: "Pua (Sweet Fritters)",
      description: "Deep-fried sweet dumplings with cardamom flavor.",
      price: "₹45",
    },
    {
      name: "Tilkut (Sesame Jaggery Sweet)",
      description: "Crunchy sesame brittle with jaggery.",
      price: "₹55",
    },
    {
      name: "Anarsa (Rice Flour Biscuit)",
      description:
        "Crispy rice flour sweet with sesame topping.",
      price: "₹50",
    },
    {
      name: "Sattu Ladoo",
      description: "Energy balls made from roasted gram flour & nuts.",
      price: "₹45",
    },
    {
      name: "Khaja (Layered Pastry)",
      description: "Flaky layered pastry soaked in sugar syrup.",
      price: "₹60",
    },
    {
      name: "Balushahi (Indian Doughnut)",
      description:
        "Fried sweet dough balls glazed with sugar syrup.",
      price: "₹50",
    },
    {
      name: "Kachori Chaat",
      description:
        "Crispy kachori topped with yogurt, chutneys, and spices.",
      price: "₹55",
    },
    {
      name: "Chura Matar",
      description:
        "Flattened rice with peas, lightly spiced & refreshing.",
      price: "₹40",
    },
    {
      name: "Panjeeri",
      description: "Digestive sweet mix with nuts, spices & jaggery.",
      price: "₹45",
    },
  ],
  sides: [
    {
      name: "Jeera Rice",
      description: "Steamed basmati rice tempered with cumin seeds.",
      price: "₹50",
    },
    {
      name: "Plain Rice",
      description: "Simple steamed rice.",
      price: "₹45",
    },
    {
      name: "Raita (Cucumber/Boondi/Mixed)",
      description: "Refreshing yogurt side with spices.",
      price: "₹30",
    },
    {
      name: "Pickles (Mango/Lemon/Mixed)",
      description: "Tangy & spicy pickles to complement your meal.",
      price: "₹20",
    },
    {
      name: "Papad (Roasted/Fried)",
      description: "Crispy thin lentil wafers.",
      price: "₹15",
    },
    {
      name: "Green Chutney",
      description: "Coriander & mint chutney, spicy & fresh.",
      price: "₹20",
    },
    {
      name: "Tamarind Chutney",
      description: "Sweet & tangy chutney made from tamarind.",
      price: "₹20",
    },
    {
      name: "Curd (Plain Yogurt)",
      description: "Cooling plain yogurt side.",
      price: "₹25",
    },  
  ],
  desserts: [
    {
      name: "Thekua",
      description:
        "Traditional sweet biscuit made with jaggery & wheat flour.",
      price: "₹40",
    },
    {
      name: "Rabri",
      description:
        "Thickened sweetened milk flavored with cardamom & saffron.",
      price: "₹60",
    },
    {
      name: "Phirni",
      description:
        "Creamy rice pudding flavored with nuts & saffron.",
      price: "₹50",
    },
    {
      name: "Kheer",
      description:
        "Traditional rice pudding sweetened with jaggery or sugar.",
      price: "₹50",
    },
    {
      name: "Gulab Jamun",
      description: "Soft fried milk dumplings soaked in sugar syrup.",
      price: "₹45",
    },
    {
      name: "Jalebi",
      description:
        "Spiral-shaped fried sweet soaked in saffron syrup.",
      price: "₹40",
    },
    {
      name: "Malpua w/ Rabri",
      description: "Sweet pancakes served with thickened milk.",
      price: "₹65",
    },
    {
      name: "Imarti",
      description:
        "Sweet fried circular dessert made with urad dal batter.",
      price: "₹50",
    },
    {
      name: "Balushahi",
      description:
        "Fried sweet dough balls glazed with sugar syrup.",
      price: "₹50",
    },
    {
      name: "Cham Cham",
      description:
        "Soft spongy sweet soaked in sugar syrup (Rosogolla variant).",
      price: "₹55",
    },
    {
      name: "Khaja",
      description: "Flaky layered pastry soaked in sugar syrup.",
      price: "₹60",
    },
  ],
  beverages: [
    {
      name: "Masala Chai",
      description: "Spiced tea brewed with fresh ginger & cardamom.",
      price: "₹25",
    },
    {
      name: "Sattu Drink",
      description: "Nutritious roasted gram flour drink.",
      price: "₹30",
    },
    {
      name: "Lassi (Sweet/Salted)",
      description: "Creamy yogurt drink, available sweet or salted.",
      price: "₹35",
    },
    {
      name: "Nimbu Pani",
      description: "Refreshing lemonade with salt & spices.",
      price: "₹25",
    },
    {
      name: "Aam Panna",
      description: "Tart & sweet raw mango beverage.",
      price: "₹30",
    },
    {
      name: "Thandai",
      description: "Milk-based cool drink with nuts & spices.",
      price: "₹40",
    },
    {
      name: "Khus Sharbat",
      description: "Cooling vetiver root drink.",
      price: "₹35",
    },
  ],
  addOns: [
    {
      name: "Fresh Green Chutney",
      description: "Coriander & mint chutney, spicy & fresh.",
      price: "₹20",
    },
    {
      name: "Tamarind Chutney",
      description: "Sweet & tangy tamarind chutney.",
      price: "₹20",
    },
    {
      name: "Pickle Jar (Mango/Lemon)",
      description: "Tangy & spicy pickles to complement your meal.",
      price: "₹30",
    },
    {
      name: "Curd (Plain Yogurt)",
      description: "Cooling plain yogurt to soothe your palate.",
      price: "₹25",
    },
    {
      name: "Extra Butter / Ghee",
      description: "Rich homemade butter or clarified butter.",
      price: "₹30",
    },
  ],
};

export default function Home() {
  const theme = useTheme();

  return (
    <Container maxWidth="md" sx={{ py: { xs: 3, md: 6 } }}>
      {/* Header */}
      <Box display="flex" justifyContent="center" mb={2}>
        <Image
          src="/logo.jpeg"
          alt="Swadika GhareluDelights Logo"
          width={80}
          height={80}
          style={{
            borderRadius: "50%",
            boxShadow: "0 2px 8px rgba(191,85,0,0.12)",
            objectFit: "cover",
            background: "#FFF8E1",
          }}
        />
      </Box>
      <Box
        textAlign="center"
        mb={6}
        sx={{
          background: `linear-gradient(90deg, #FFF8E1 0%, #FFF3E0 100%)`,
          borderRadius: 3,
          py: 4,
          boxShadow: 2,
        }}
      >
        <Typography
          variant="h2"
          gutterBottom
          sx={{
            fontWeight: 900,
            color: "#BF5500",
            letterSpacing: 2,
            fontFamily: "serif",
          }}
        >
          Swadika GhareluDelights
        </Typography>
        <Typography
          variant="h6"
          sx={{
            color: "#6D4C1B",
            fontStyle: "italic",
            fontWeight: 500,
            mb: 1,
          }}
        >
          Authentic Home-Cooked Flavors from UP & Bihar
        </Typography>
        <Divider sx={{ my: 2, bgcolor: "#FFD54F" }} />
      </Box>

      {/* Menu Sections */}
      <MenuSection title="Combo Meals" items={menuData.comboMeals} />
      <MenuSection title="Starters & Snacks" items={menuData.starters} />
      <MenuSection title="Main Course" items={menuData.mainCourse} />
      <MenuSection title="Traditional Breads" items={menuData.breads} />
      <MenuSection
        title="Special Regional Delights & Street Food"
        items={menuData.streetFood}
      />
      <MenuSection title="Sides" items={menuData.sides} />
      <MenuSection title="Desserts" items={menuData.desserts} />
      <MenuSection title="Beverages" items={menuData.beverages} />
      <MenuSection title="Optional Packaging & Add-ons" items={menuData.addOns} />

      {/* Footer */}
      <Box
        textAlign="center"
        mt={8}
        sx={{
          py: 3,
          borderRadius: 2,
          background: "#FFF8E1",
          boxShadow: 1,
        }}
      >
        <Typography
          variant="body1"
          sx={{
            fontStyle: "italic",
            color: "#A87600",
            fontWeight: 500,
            fontSize: { xs: "1rem", md: "1.1rem" },
          }}
        >
          Thank you for choosing <strong>Swadika GhareluDelights</strong>!<br />
          Home is where the heart (and food) is.
        </Typography>
      </Box>
    </Container>
  );
}

function MenuSection({ title, items }: MenuSectionProps) {
  return (
    <Box mb={7}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          color: "#BF5500",
          fontWeight: 800,
          letterSpacing: 1,
          mb: 2,
          fontFamily: "serif",
        }}
      >
        {title}
      </Typography>

      {/* Instead of Grid, use flex-wrap */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 3,
          justifyContent: { xs: "center", md: "flex-start" },
        }}
      >
        {items.map((item, idx) => (
          <Box
            key={item.name + idx}
            sx={{
              width: { xs: "100%", sm: "48%", md: "30%" },
            }}
          >
            <Card
              elevation={3}
              sx={{
                borderRadius: 3,
                background: "#FFFDF7",
                transition: "transform 0.15s",
                "&:hover": {
                  transform: "scale(1.025)",
                  boxShadow: 6,
                },
              }}
            >
              <CardContent>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  mb={1}
                >
                  <Typography
                    variant="subtitle1"
                    sx={{
                      color: "#A0522D",
                      fontWeight: 700,
                      fontSize: "1.1rem",
                      fontFamily: "serif",
                    }}
                  >
                    {item.name}
                  </Typography>
                  <Chip
                    label={item.price}
                    color="warning"
                    size="small"
                    sx={{
                      fontWeight: 700,
                      bgcolor: "#FFD54F",
                      color: "#6D4C1B",
                      fontSize: "1rem",
                    }}
                  />
                </Box>
                <Typography
                  variant="body2"
                  sx={{
                    color: "#5D4037",
                    minHeight: 48,
                  }}
                >
                  {item.description}
                </Typography>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
