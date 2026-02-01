#!/usr/bin/env python3
"""
Script to generate comprehensive menu items with stories and recipes
for Swadika GhareluDelights restaurant.
"""

# Menu items data from menu.md that need to be added with full details
remaining_items = {
    'Main Course': [
        ('aloo-tamatar', 'Aloo Tamatar Sabzi + Roti', 90, 'Spiced potato & tomato curry with fresh whole wheat rotis', True),
        ('dal-pithi', 'Dal Pithi (Wheat Dumplings)', 110, 'Soft wheat dumplings cooked in a flavorful lentil gravy', True),
        ('sattu-paratha', 'Sattu Paratha w/ Curd & Pickle', 80, 'Stuffed flatbread with roasted gram flour, served with curd & pickle', True),
        ('baigan-bharta', 'Baigan Bharta', 90, 'Smoky mashed eggplant cooked with spices', True),
        ('rajma-masala', 'Rajma Masala', 100, 'Kidney beans slow-cooked in rich tomato gravy', True),
        ('chana-masala', 'Chana Masala', 95, 'Spicy & tangy chickpea curry', True),
        ('kaddu-sabzi', 'Kaddu ki Sabzi', 85, 'Sweet & mildly spiced pumpkin curry', True),
        ('matar-paneer', 'Matar Paneer', 110, 'Cottage cheese & peas in tomato gravy', True),
        ('kadhi-chawal', 'Kadhi Chawal', 100, 'Yogurt-based curry served with steamed rice', True),
        ('mix-veg', 'Mix Vegetable Sabzi', 90, 'Seasonal vegetables cooked with traditional spices', True),
        ('bhindi-masala', 'Bhindi Masala', 90, 'Spiced & sautéed okra', True),
        ('plain-rice', 'Chawal (Steamed Rice)', 50, 'Fluffy steamed basmati rice', True),
        ('poori-bhaji', 'Poori Bhaji', 85, 'Fluffy fried bread served with potato curry', True),
        ('aloo-baingan', 'Aloo Baingan', 90, 'Spiced potato & eggplant curry', True),
        ('masoor-dal', 'Masoor Dal', 85, 'Comforting red lentil curry', True),
        ('mughlai-korma', 'Mughlai Korma (Non-Veg)', 180, 'Rich meat curry slow-cooked with aromatic spices', False),
        ('chicken-curry-bihari', 'Chicken Curry (Bihari Style)', 160, 'Spicy chicken curry made with traditional Bihari flavors', False),
        ('mutton-curry-bihari', 'Mutton Curry (Bihari Style)', 190, 'Tender mutton cooked in a flavorful gravy', False),
    ],
    'Breads': [
        ('chapati', 'Chapati / Roti', 15, 'Freshly made whole wheat flatbread', True),
        ('makki-roti', 'Makki ki Roti', 30, 'Corn flour flatbread, best with sarson ka saag', True),
        ('bajra-roti', 'Bajra Roti', 25, 'Pearl millet flatbread with earthy flavor', True),
        ('missi-roti', 'Missi Roti', 30, 'Flatbread made with gram flour + wheat flour', True),
        ('naan', 'Naan (Butter/Plain)', 40, 'Soft oven-baked flatbread', True),
        ('roomali-roti', 'Roomali Roti', 35, 'Thin, soft flatbread perfect for wraps', True),
    ],
    'Regional Delights': [
        ('thekua-regional', 'Thekua (Sweet Biscuit)', 40, 'Deep-fried sweet biscuit made with jaggery & wheat flour', True),
        ('malpua', 'Malpua (Sweet Pancake)', 50, 'Sweet fried pancakes soaked in sugar syrup', True),
        ('pua', 'Pua (Sweet Fritters)', 45, 'Deep-fried sweet dumplings with cardamom flavor', True),
        ('tilkut', 'Tilkut (Sesame Jaggery Sweet)', 55, 'Crunchy sesame brittle with jaggery', True),
        ('anarsa', 'Anarsa (Rice Flour Biscuit)', 50, 'Crispy rice flour sweet with sesame topping', True),
        ('sattu-ladoo', 'Sattu Ladoo', 45, 'Energy balls made from roasted gram flour & nuts', True),
        ('khaja', 'Khaja (Layered Pastry)', 60, 'Flaky layered pastry soaked in sugar syrup', True),
        ('balushahi-regional', 'Balushahi (Indian Doughnut)', 50, 'Fried sweet dough balls glazed with sugar syrup', True),
        ('kachori-chaat', 'Kachori Chaat', 55, 'Crispy kachori topped with yogurt, chutneys, and spices', True),
        ('chura-matar', 'Chura Matar', 40, 'Flattened rice with peas, lightly spiced & refreshing', True),
        ('panjeeri', 'Panjeeri', 45, 'Digestive sweet mix with nuts, spices & jaggery', True),
    ],
    'Sides': [
        ('jeera-rice', 'Jeera Rice', 50, 'Steamed basmati rice tempered with cumin seeds', True),
        ('raita', 'Raita (Cucumber/Boondi/Mixed)', 30, 'Refreshing yogurt side with spices', True),
        ('pickles', 'Pickles (Mango/Lemon/Mixed)', 20, 'Tangy & spicy pickles to complement your meal', True),
        ('papad', 'Papad (Roasted/Fried)', 15, 'Crispy thin lentil wafers', True),
        ('green-chutney', 'Green Chutney', 20, 'Coriander & mint chutney, spicy & fresh', True),
        ('tamarind-chutney', 'Tamarind Chutney', 20, 'Sweet & tangy chutney made from tamarind', True),
        ('curd', 'Curd (Plain Yogurt)', 25, 'Cooling plain yogurt side', True),
    ],
    'Desserts': [
        ('thekua', 'Thekua', 40, 'Traditional sweet biscuit made with jaggery & wheat flour', True),
        ('rabri', 'Rabri', 60, 'Thickened sweetened milk flavored with cardamom & saffron', True),
        ('phirni', 'Phirni', 50, 'Creamy rice pudding flavored with nuts & saffron', True),
        ('kheer', 'Kheer', 50, 'Traditional rice pudding sweetened with jaggery or sugar', True),
        ('gulab-jamun', 'Gulab Jamun', 45, 'Soft fried milk dumplings soaked in sugar syrup', True),
        ('jalebi', 'Jalebi', 40, 'Spiral-shaped fried sweet soaked in saffron syrup', True),
        ('malpua-rabri', 'Malpua w/ Rabri', 65, 'Sweet pancakes served with thickened milk', True),
        ('imarti', 'Imarti', 50, 'Sweet fried circular dessert made with urad dal batter', True),
        ('balushahi', 'Balushahi', 50, 'Fried sweet dough balls glazed with sugar syrup', True),
        ('cham-cham', 'Cham Cham', 55, 'Soft spongy sweet soaked in sugar syrup (Rosogolla variant)', True),
        ('khaja-dessert', 'Khaja', 60, 'Flaky layered pastry soaked in sugar syrup', True),
    ],
    'Beverages': [
        ('masala-chai', 'Masala Chai', 25, 'Spiced tea brewed with fresh ginger & cardamom', True),
        ('sattu-drink', 'Sattu Drink', 30, 'Nutritious roasted gram flour drink', True),
        ('lassi', 'Lassi (Sweet/Salted)', 35, 'Creamy yogurt drink, available sweet or salted', True),
        ('nimbu-pani', 'Nimbu Pani', 25, 'Refreshing lemonade with salt & spices', True),
        ('aam-panna', 'Aam Panna', 30, 'Tart & sweet raw mango beverage', True),
        ('thandai', 'Thandai', 40, 'Milk-based cool drink with nuts & spices', True),
        ('khus-sharbat', 'Khus Sharbat', 35, 'Cooling vetiver root drink', True),
    ],
    'Add-ons': [
        ('extra-ghee', 'Extra Butter / Ghee', 30, 'Rich homemade butter or clarified butter', True),
    ]
}

print("Menu items data structure created.")
print(f"Total remaining items to add: {sum(len(items) for items in remaining_items.values())}")
print("This script provides the data structure. Generate TypeScript menuData entries from this.")
