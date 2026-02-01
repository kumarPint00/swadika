"use client";

import { useState } from "react";
import {
  Box,
  Container,
  Card,
  CardContent,
  Typography,
  Chip,
  Divider,
  Button,
  useTheme,
} from "@mui/material";
import Image from "next/image";
import ImageOptim from "@/components/ImageOptim";

interface MenuItem {
  name: string;
  description: string;
  price: string;
}

interface MenuSectionProps {
  title: string;
  items: MenuItem[];
}

// All translatable strings (English + Hindi)
const translations = {
  en: {
    header: {
      brand: "Swadika GhareluDelights",
      tagline: "Authentic Home-Cooked Flavors from UP & Bihar",
    },
    sections: {
      comboMeals: "Combo Meals",
      starters: "Starters & Snacks",
      mainCourse: "Main Course",
      breads: "Traditional Breads",
      streetFood: "Special Regional Delights & Street Food",
      sides: "Sides",
      desserts: "Desserts",
      beverages: "Beverages",
      addOns: "Optional Packaging & Add-ons",
      contact: "Contact Us",
    },
    contact: {
      addressLabel: "Address:",
      addressValue:
        "House No. 64, Himalaya Enclave, Khora Colony, Ghaziabad, Uttar Pradesh – 201001",
      phoneLabel: "Phone:",
      phoneValue: "+91 8826 8826 76",
      emailLabel: "Email:",
      emailValue: "support@ghareluswad.com",
    },
    footer: {
      text: "Thank you for choosing ",
      brandBold: "Swadika GhareluDelights",
      tagline: "Home is where the heart (and food) is.",
    },
    menuData: {
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
          description:
            "Spiced potato patties shallow-fried to golden perfection.",
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
          description:
            "Refreshing chaat made with roasted gram flour and spices.",
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
    },
  },
  hi: {
    header: {
      brand: "स्वादिका घरेलुडिलाइट्स",
      tagline: "उत्तर प्रदेश और बिहार के पारम्परिक घरेलू स्वाद",
    },
    sections: {
      comboMeals: "कॉम्बो भोजन",
      starters: "नाश्ता एवं स्‍नैक्स",
      mainCourse: "मुख्य खाना",
      breads: "पारम्परिक रोटियां",
      streetFood: "क्षेत्रीय विशेष व्यंजन एवं स्ट्रीट फूड",
      sides: "साइड डिशेज़",
      desserts: "मिठाइयाँ",
      beverages: "पेय पदार्थ",
      addOns: "वैकल्पिक पैकेजिंग एवं अतिरिक्त",
      contact: "संपर्क करें",
    },
    contact: {
      addressLabel: "पता:",
      addressValue:
        "गृह संख्या 64, हिमालय एन्क्लेव, खोरा कॉलोनी, गाजियाबाद, उत्तर प्रदेश – 201001",
      phoneLabel: "फ़ोन:",
      phoneValue: "+91 8826 8826 76",
      emailLabel: "ई-मेल:",
      emailValue: "support@ghareluswad.com",
    },
    footer: {
      text: "चयन करने के लिए धन्यवाद ",
      brandBold: "स्वादिका घरेलुडिलाइट्स",
      tagline: "घर वहीं है जहाँ दिल (और खाना) है।",
    },
    menuData: {
      comboMeals: [
        {
          name: "दाल भात चोखा",
          description:
            "चावल के साथ दाल की करी और मसला हुआ भुना हुआ सब्ज़ी (चोखा)।",
          price: "₹130",
        },
        {
          name: "रोटी सब्ज़ी कॉम्बो",
          description:
            "ताजगी भरी गेहूं की रोटियां, आपकी पसंद की मौसमी सब्ज़ी के साथ।",
          price: "₹100",
        },
        {
          name: "लिट्टी चोखा मील",
          description:
            "तीन लिट्टियाँ चोखा के साथ, मसालेदार चटनी के साथ परोसी गईं।",
          price: "₹140",
        },
        {
          name: "पूरी भजी प्लेट",
          description:
            "नरम पूरियाँ मसालेदार आलू की सब्ज़ी और अचार के साथ।",
          price: "₹110",
        },
        {
          name: "खिचड़ी विद कढ़ी",
          description:
            "चावल और दाल की खिचड़ी दही आधारित कढ़ी के साथ परोसी गई।",
          price: "₹120",
        },
        {
          name: "थाली – शाकाहारी",
          description:
            "रोटियाँ, चावल, दाल, सब्ज़ी, रायता और अचार – एक संपूर्ण यूपी भोजन।",
          price: "₹180",
        },
        {
          name: "थाली – अनाजाहारी",
          description:
            "रोटियाँ, चावल, दाल, सब्ज़ी, चिकन/मटन करी, रायता और अचार।",
          price: "₹250",
        },
      ],
      starters: [
        {
          name: "समोसा",
          description: "तले हुए कागज़ जैसे लपेटे में मसला आलू और मटर।",
          price: "₹30",
        },
        {
          name: "कचौरी",
          description: "दाल से भरी खस्ता परीक्षणी, चटनी के साथ परोसी गई।",
          price: "₹35",
        },
        {
          name: "आलू टिक्की",
          description: "मसालेदार आलू की टिक्की सुनहरी भुनी हुई।",
          price: "₹40",
        },
        {
          name: "पनीर पकोड़ा",
          description:
            "पनीर के क्यूब बेसन के घोल में डुबोए हुए और तले हुए।",
          price: "₹60",
        },
        {
          name: "वेजिटेबल कटलेट",
          description: "मिश्रित सब्ज़ियों की कटलेट हल्के मसालों में तली हुई।",
          price: "₹45",
        },
        {
          name: "मोमो (बिहार स्टाइल)",
          description: "स्पाइसी चटनी के साथ उबाला/तला हुआ पकौड़ा।",
          price: "₹70",
        },
        {
          name: "चना जोर गरम",
          description: "मसालेदार, खट्टे फ्लैटन चने का नाश्ता।",
          price: "₹30",
        },
        {
          name: "सत्तू चाट",
          description:
            "भुने हुए बेसन के साथ दमदार चाट मसालों के साथ।",
          price: "₹40",
        },
        {
          name: "पुचका (बिहार गोलगप्पा)",
          description:
            "फूले हुए पूरियों में तीखा इमली पानी और आलू भरा गया।",
          price: "₹35",
        },
        {
          name: "लिट्टी (बिना चोखा)",
          description: "सत्तू भरी बेक्ड गेहूं की गोलियां, अकेले परोसी गईं।",
          price: "₹100",
        },
        {
          name: "सिंघाड़ा फ्राय",
          description: "कुरकुरे तले हुए सिंघाड़े (मौसमी व्यंजन)।",
          price: "₹55",
        },
        {
          name: "बाजरे की रोटी + लहसुन की चटनी",
          description: "बाजरे की रोटी मसालेदार लहसुन की चटनी के साथ।",
          price: "₹80",
        },
      ],
      mainCourse: [
        {
          name: "लिट्टी चोखा",
          description:
            "दाल से भरी बेक्ड गेहूं की गोलियाँ, मसला हुआ भुना हुआ बैगन और टमाटर की चटनी के साथ परोसी गईं।",
          price: "₹120",
        },
        {
          name: "आलू टमाटर सब्ज़ी + रोटी",
          description: "मसालेदार आलू-टमाटर की करी, ताजी गेहूं की रोटियों के साथ।",
          price: "₹90",
        },
        {
          name: "दाल पिठी (गेहूं के पकौड़े)",
          description: "मसालेदार दाल में पकाए गए नरम गेहूं के पकौड़े।",
          price: "₹110",
        },
        {
          name: "सत्तू पराठा दही एवं अचार के साथ",
          description:
            "भुना हुआ बेसन भरा हुआ पराठा, दही और अचार के साथ परोसा गया।",
          price: "₹80",
        },
        {
          name: "बैगन भर्ता",
          description: "मसालों के साथ भुना हुआ बैंगन, मसले।",
          price: "₹90",
        },
        {
          name: "राजमा मसाला",
          description: "टमाटर की मसालेदार ग्रेवी में धीमी आंच पर पकी राजमा।",
          price: "₹100",
        },
        {
          name: "चना मसाला",
          description: "मसालेदार एवं खट्टा छोले की करी।",
          price: "₹95",
        },
        {
          name: "कद्दू की सब्ज़ी",
          description: "मीठी एवं हल्की मसालेदार कद्दू की सब्ज़ी।",
          price: "₹85",
        },
        {
          name: "मटर पनीर",
          description: "टमाटर की ग्रेवी में मटर और पनीर।",
          price: "₹110",
        },
        {
          name: "कढ़ी चावल",
          description: "दही आधारित कढ़ी, भात के साथ परोसी गई।",
          price: "₹100",
        },
        {
          name: "मिक्स वेजिटेबल सब्ज़ी",
          description: "मौसमी सब्ज़ियों की मसालेदार सब्ज़ी।",
          price: "₹90",
        },
        {
          name: "भिंडी मसाला",
          description: "मसालेदार एवं तली हुई भिंडी।",
          price: "₹90",
        },
        {
          name: "चावल (भाप में पके हुए)",
          description: "फूला हुआ बासमती चावल।",
          price: "₹50",
        },
        {
          name: "पूरी भजी",
          description: "मसालेदार आलू की सब्ज़ी के साथ फूली हुई पूरी।",
          price: "₹85",
        },
        {
          name: "आलू बैंगन",
          description: "आलू एवं बैंगन की मसालेदार सब्ज़ी।",
          price: "₹90",
        },
        {
          name: "मसूर दाल",
          description: "सुकून देने वाली लाल मसूर दाल।",
          price: "₹85",
        },
        {
          name: "मुग़लई कोरमा (नॉन-वेज)",
          description: "मसालों में धीमी आंच पर पका समृद्ध मांस करी।",
          price: "₹180",
        },
        {
          name: "चिकन करी (बिहारी स्टाइल)",
          description:
            "पारंपरिक बिहारी स्वाद में पकी मसालेदार चिकन करी।",
          price: "₹160",
        },
        {
          name: "मटन करी (बिहारी स्टाइल)",
          description: "रसीली मसालों वाली टेंडर मटन करी।",
          price: "₹190",
        },
      ],
      breads: [
        {
          name: "चपाती / रोटी",
          description: "ताजगी भरी गेहूं की रोटियाँ।",
          price: "₹15",
        },
        {
          name: "मक्की की रोटी",
          description: "सरसों के साग के साथ सर्व करने योग्य मक्के की रोटी।",
          price: "₹30",
        },
        {
          name: "बाजरे की रोटी",
          description: "मिटटी स्वाद वाली बाजरे की रोटी।",
          price: "₹25",
        },
        {
          name: "मिस्सी रोटी",
          description: "बेसन और गेहूं के आटे की बनी रोटी।",
          price: "₹30",
        },
        {
          name: "नान (बटर/सादा)",
          description: "नरम तंदूरी ओवन-बेक्ड रोटी।",
          price: "₹40",
        },
        {
          name: "रूमाली रोटी",
          description: "पतली, मुलायम रोटी, रैप के लिए आदर्श।",
          price: "₹35",
        },
      ],
      streetFood: [
        {
          name: "खिचड़ी विद कढ़ी",
          description:
            "दही आधारित कढ़ी के साथ परोसी गई दाल और चावल की खिचड़ी।",
          price: "₹100",
        },
        {
          name: "ठेकुआ (मिठाई)",
          description:
            "गुड़ और गेहूं के आटे से बनी पारंपरिक तली हुई मिठाई।",
          price: "₹40",
        },
        {
          name: "मालपूआ (मिठाई पैनकेक)",
          description: "चाशनी में डूबे हुए तले हुए पैनकेक्स।",
          price: "₹50",
        },
        {
          name: "पुआ (मीठे फ्रिटर्स)",
          description: "इलायची स्वाद वाले तले हुए मीठे पकौड़े।",
          price: "₹45",
        },
        {
          name: "तीलकुट (तिल-गुड़ की मिठाई)",
          description: "तिल और गुड़ से बनी कुरकुरी बर्फी।",
          price: "₹55",
        },
        {
          name: "अनरस (चावल के आटे की बिस्किट)",
          description:
            "तिल से सजाई गई कुरकुरी चावल के आटे की बिस्किट।",
          price: "₹50",
        },
        {
          name: "सत्तू लड्डू",
          description: "भुने हुए बेसन और मेवों से बने एनर्जी बॉल।",
          price: "₹45",
        },
        {
          name: "खाजा (परतदार पेस्ट्री)",
          description: "चाशनी में डूबी हुई परतदार पेस्ट्री।",
          price: "₹60",
        },
        {
          name: "बालूशाही (इंडियन डोनट)",
          description: "चाशनी में डूबे तले हुए मीठे डोनट।",
          price: "₹50",
        },
        {
          name: "कचौरी चाट",  
          description:
            "दही, चटनियाँ और मसालेदार टॉपिंग वाली कुरकुरी कचौरी।",
          price: "₹55",
        },
        {
          name: "चूरा मटर",
          description:
            "हल्के मसालेदार चूरा (पोहा) और मटर का हल्का मसाला।",
          price: "₹40",
        },
        {
          name: "पंजेरी",
          description: "मेवे, मसाले और गुड़ से बनी पाचन सहाय मिठाई।",
          price: "₹45",
        },
      ],
      sides: [
        {
          name: "जीरा राइस",
          description: "जीरे से भरी हुई सीधी सीधी बासमती राइस।",
          price: "₹50",
        },
        {
          name: "सादा चावल",
          description: "सादा भाप में पका हुआ चावल।",
          price: "₹45",
        },
        {
          name: "रायता (खीरा/बूंदी/मिक्सड)",
          description: "मसालों से युक्‍त ताज़गी भरा दही।",
          price: "₹30",
        },
        {
          name: "अचार (आम/नींबू/मिक्सड)",
          description: "ताज़गी भरे मसालेदार अचार योर भोजन के साथ।",
          price: "₹20",
        },
        {
          name: "पापड़ (भुना/तला हुआ)",
          description: "कुरकुरा पतला दाल का पापड़।",
          price: "₹15",
        },
        {
          name: "हरी चटनी",
          description: "धनिया और पुदीना की ताज़ा मसालेदार चटनी।",
          price: "₹20",
        },
        {
          name: "इमली की चटनी",
          description: "मीठी और खट्टी इमली वाली चटनी।",
          price: "₹20",
        },
        {
          name: "दही (सादा)",
          description: "ताज़गी भरा सादा दही योर स्वाद को शांत करे।",
          price: "₹25",
        },
      ],
      desserts: [
        {
          name: "ठेकुआ",
          description:
            "गुड़ और गेहूं के आटे से बनी पारंपरिक तली हुई मिठाई।",
          price: "₹40",
        },
        {
          name: "रबड़ी",
          description:
            "इलायची और केसर से सुगंधित गाढ़ा मीठा दूध।",
          price: "₹60",
        },
        {
          name: "फिरनी",
          description:
            "मेवे और केसर से सुगंधित मलाईदार चावल की खीर।",
          price: "₹50",
        },
        {
          name: "खीर",
          description:
            "गुड़ या चीनी से मीठा किया हुआ पारंपरिक चावल की खीर।",
          price: "₹50",
        },
        {
          name: "गुलाब जामुन",
          description: "चाशनी में डूबे नरम तले हुए खोये के गोले।",
          price: "₹45",
        },
        {
          name: "जलेबी",
          description:
            "केसर से रंगे चाशनी में डूबी हुई तल कर बनाई गई गोलाकार टैटियाँ।",
          price: "₹40",
        },
        {
          name: "मालपुआ विद रबड़ी",
          description: "चाशनी में भिगोए गए मीठे पैनकेक्स रबड़ी के साथ।",
          price: "₹65",
        },
        {
          name: "इमरती",
          description:
            "उड़द दाल के घोल से तैयार गोलाकार तली मीठी मिठाई।",
          price: "₹50",
        },
        {
          name: "बालूशाही",
          description:
            "तले हुए मीठे आटे के गोले, चीनी की चाशनी में डूबे।",
          price: "₹50",
        },
        {
          name: "चम चम",
          description:
            "स्पंजी मीठी गोलियां, चीनी की चाशनी में डूबी (रसभरी का वैरिएंट)।",
          price: "₹55",
        },
        {
          name: "खाजा",
          description: "चाशनी में भिगोई परतदार पेस्ट्री।",
          price: "₹60",
        },
      ],
      beverages: [
        {
          name: "मसाला चाय",
          description: "ताज़ी अदरक और इलायची के साथ बनी मसालेदार चाय।",
          price: "₹25",
        },
        {
          name: "सत्तू ड्रिंक",
          description: "भुने बेसन से बनी पौष्टिक पेय।",
          price: "₹30",
        },
        {
          name: "लस्सी (मीठी/नमकीन)",
          description: "क्रीमी दही का पेय, मीठी या नमकीन उपलब्ध।",
          price: "₹35",
        },
        {
          name: "नींबू पानी",
          description: "नमक और मसालों के साथ ताज़ा नींबू पानी।",
          price: "₹25",
        },
        {
          name: "आम पन्ना",
          description: "खट्टा-मीठा कच्चे आम का पेय।",
          price: "₹30",
        },
        {
          name: "ठंडाई",
          description: "मेवे और मसालों के साथ दूध आधारित ठंडा पेय।",
          price: "₹40",
        },
        {
          name: "खस शरबत",
          description: "ठंडक देने वाला खस (वेटीवर) का शरबत।",
          price: "₹35",
        },
      ],
      addOns: [
        {
          name: "ताज़ी हरी चटनी",
          description: "धनिया और पुदीना की मसालेदार हरी चटनी।",
          price: "₹20",
        },
        {
          name: "इमली की चटनी",
          description: "मीठी और खट्टी इमली वाली चटनी।",
          price: "₹20",
        },
        {
          name: "अचार भर",
          description:
            "मांगो/नींबू आदि के मसालेदार अचार, योर भोजन के साथ।",
          price: "₹30",
        },
        {
          name: "दही (सादा)",
          description: "ताज़ा सादा दही, योर स्वाद को ठंडा करे।",
          price: "₹25",
        },
        {
          name: "अतिरिक्त मक्खन/घी",
          description: "समृद्ध घर का बना मक्खन या घी।",
          price: "₹30",
        },
      ],
    },
  },
};

export default function Home() {
  const theme = useTheme();
  // locale state: "en" or "hi"
  const [locale, setLocale] = useState<"en" | "hi">("en");

  // helper to switch locale
  const toggleLocale = () => {
    setLocale((prev) => (prev === "en" ? "hi" : "en"));
  };

  // shorthand references
  const t = translations[locale];

  return (
    <Container maxWidth="md" sx={{ py: { xs: 3, md: 6 } }}>
      {/* Language Toggle Button */}
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <Button
          variant="outlined"
          size="small"
          onClick={toggleLocale}
          sx={{
            color: theme.palette.primary.main,
            borderColor: theme.palette.primary.main,
            "&:hover": {
              backgroundColor: theme.palette.primary.light,
              borderColor: theme.palette.primary.main,
            },
          }}
        >
          {locale === "en" ? "हिंदी" : "English"}
        </Button>
      </Box>

      {/* Header */}
      <Box display="flex" justifyContent="center" mb={2}>
        <ImageOptim
          src="/logo.jpeg"
          alt={`${t.header.brand} Logo`}
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
          {t.header.brand}
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
          {t.header.tagline}
        </Typography>
        <Divider sx={{ my: 2, bgcolor: "#FFD54F" }} />
        <Typography
          variant="overline"
          sx={{
            color: "#A0522D",
            fontWeight: 700,
            letterSpacing: 2,
            fontSize: "1.2rem",
            display: "block",
          }}
        >
          MENU
        </Typography>
      </Box>

      {/* Menu Sections */}
      <MenuSection title={t.sections.comboMeals} items={t.menuData.comboMeals} />
      <MenuSection title={t.sections.starters} items={t.menuData.starters} />
      <MenuSection title={t.sections.mainCourse} items={t.menuData.mainCourse} />
      <MenuSection title={t.sections.breads} items={t.menuData.breads} />
      <MenuSection
        title={t.sections.streetFood}
        items={t.menuData.streetFood}
      />
      <MenuSection title={t.sections.sides} items={t.menuData.sides} />
      <MenuSection title={t.sections.desserts} items={t.menuData.desserts} />
      <MenuSection title={t.sections.beverages} items={t.menuData.beverages} />
      <MenuSection title={t.sections.addOns} items={t.menuData.addOns} />

      {/* Contact Details */}
      <Box
        mb={7}
        sx={{
          textAlign: "center",
          background: "#FFFDF7",
          borderRadius: 3,
          py: 4,
          boxShadow: 1,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            color: "#A0522D",
            fontWeight: 700,
            letterSpacing: 1,
            mb: 2,
            fontFamily: "serif",
          }}
        >
          {t.sections.contact}
        </Typography>
        <Typography variant="body1" sx={{ color: "#4B2E05", mb: 1 }}>
          <strong>{t.contact.addressLabel}</strong> {t.contact.addressValue}
        </Typography>
        <Typography variant="body1" sx={{ color: "#4B2E05", mb: 1 }}>
          <strong>{t.contact.phoneLabel}</strong> {t.contact.phoneValue}
        </Typography>
        <Typography variant="body1" sx={{ color: "#4B2E05" }}>
          <strong>{t.contact.emailLabel}</strong> {t.contact.emailValue}
        </Typography>
      </Box>

      {/* Footer */}
      <Box
        textAlign="center"
        mt={3}
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
          {t.footer.text}
          <strong>{t.footer.brandBold}</strong>
          <br />
          {t.footer.tagline}
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

      {/* Flex-wrap container */}
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
