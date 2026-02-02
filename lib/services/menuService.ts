// Menu Service - Dynamic menu management with variants, availability, and photos

import { menuData, Dish } from '../menuData';

// Extended menu item with cloud kitchen features
export interface MenuItemVariant {
  id: string;
  name: string;
  priceModifier: number; // Amount to add/subtract from base price
  description?: string;
  isDefault?: boolean;
}

export interface MenuItemPhoto {
  url: string;
  alt: string;
  isPrimary: boolean;
}

export interface EnhancedMenuItem extends Dish {
  variants?: MenuItemVariant[];
  photos?: MenuItemPhoto[];
  isAvailable: boolean;
  estimatedPrepTime: number; // in minutes
  customizationOptions?: CustomizationOption[];
  allergens?: string[];
  inventory?: {
    current: number;
    threshold: number;
  };
}

export interface CustomizationOption {
  id: string;
  name: string;
  type: 'checkbox' | 'radio' | 'select';
  options: {
    value: string;
    label: string;
    price: number;
  }[];
  required?: boolean;
}

// Menu availability management
class MenuService {
  private availabilityMap: Map<string, boolean> = new Map();
  private inventoryMap: Map<string, number> = new Map();

  // Get enhanced menu with variants and customization
  getEnhancedMenu(): EnhancedMenuItem[] {
    return menuData.map(item => this.enhanceMenuItem(item));
  }

  // Enhance individual menu item
  private enhanceMenuItem(item: Dish): EnhancedMenuItem {
    const variants = this.getVariantsForItem(item.id);
    const photos = this.getPhotosForItem(item.id);
    const customizationOptions = this.getCustomizationOptions(item.id);
    
    return {
      ...item,
      variants,
      photos,
      isAvailable: this.availabilityMap.get(item.id) ?? true,
      estimatedPrepTime: this.calculatePrepTime(item),
      customizationOptions,
      allergens: this.getAllergens(item),
      inventory: this.getInventory(item.id)
    };
  }

  // Get variants for specific items (Litti, Thalis, etc.)
  private getVariantsForItem(itemId: string): MenuItemVariant[] | undefined {
    const variantMap: Record<string, MenuItemVariant[]> = {
      'litti-chokha-main': [
        { id: 'standard', name: 'Standard (4 pieces)', priceModifier: 0, isDefault: true },
        { id: 'with-extra-chutney', name: 'With Extra Green Chutney', priceModifier: 15 },
        { id: 'with-extra-ghee', name: 'With Extra Ghee (50g)', priceModifier: 20 },
        { id: 'combo', name: 'Combo with Raita', priceModifier: 25 }
      ],
      'non-veg-thali': [
        { id: 'chicken', name: 'Chicken Curry Thali', priceModifier: 0, isDefault: true },
        { id: 'mutton', name: 'Mutton Curry Thali', priceModifier: 50 },
        { id: 'fish', name: 'Fish Curry Thali', priceModifier: 30 }
      ],
      'veg-thali': [
        { id: 'regular', name: 'Regular Veg Thali', priceModifier: 0, isDefault: true },
        { id: 'special', name: 'Special Veg Thali (more items)', priceModifier: 40 },
        { id: 'jain', name: 'Jain Thali (no onion/garlic)', priceModifier: 10 }
      ],
      'biryani-veg': [
        { id: 'small', name: 'Small (serves 1)', priceModifier: -30 },
        { id: 'regular', name: 'Regular (serves 1-2)', priceModifier: 0, isDefault: true },
        { id: 'large', name: 'Large (serves 2-3)', priceModifier: 80 }
      ],
      'biryani-chicken': [
        { id: 'small', name: 'Small (serves 1)', priceModifier: -40 },
        { id: 'regular', name: 'Regular (serves 1-2)', priceModifier: 0, isDefault: true },
        { id: 'large', name: 'Large (serves 2-3)', priceModifier: 100 },
        { id: 'boneless', name: 'Boneless Chicken', priceModifier: 30 }
      ]
    };

    return variantMap[itemId];
  }

  // Get photo gallery for items
  private getPhotosForItem(itemId: string): MenuItemPhoto[] {
    // In production, fetch from CDN/storage
    return [
      { url: `/images/dishes/${itemId}-main.jpg`, alt: 'Main dish photo', isPrimary: true },
      { url: `/images/dishes/${itemId}-angle1.jpg`, alt: 'Side view', isPrimary: false },
      { url: `/images/dishes/${itemId}-close.jpg`, alt: 'Close-up', isPrimary: false }
    ];
  }

  // Get customization options
  private getCustomizationOptions(itemId: string): CustomizationOption[] {
    const commonOptions: CustomizationOption[] = [];

    // Add spice level customization for curries
    if (itemId.includes('curry') || itemId.includes('masala')) {
      commonOptions.push({
        id: 'spice-level',
        name: 'Spice Level',
        type: 'radio',
        required: false,
        options: [
          { value: 'mild', label: 'Mild', price: 0 },
          { value: 'medium', label: 'Medium (Default)', price: 0 },
          { value: 'hot', label: 'Hot', price: 0 },
          { value: 'extra-hot', label: 'Extra Hot', price: 0 }
        ]
      });
    }

    // Add-ons for breads
    if (itemId.includes('roti') || itemId.includes('paratha') || itemId === 'chapati') {
      commonOptions.push({
        id: 'bread-addons',
        name: 'Add-ons',
        type: 'checkbox',
        options: [
          { value: 'extra-ghee', label: 'Extra Ghee', price: 10 },
          { value: 'extra-butter', label: 'Extra Butter', price: 10 }
        ]
      });
    }

    return commonOptions;
  }

  // Calculate prep time based on dish complexity
  private calculatePrepTime(item: Dish): number {
    const prepTimeMap: Record<string, number> = {
      'Snacks': 15,
      'Breads': 10,
      'Main Course': 25,
      'Desserts': 20,
      'Beverages': 5,
      'Sides': 10,
      'Add-ons': 2
    };

    return prepTimeMap[item.category] || 20;
  }

  // Get allergen information
  private getAllergens(item: Dish): string[] {
    const allergens: string[] = [];
    
    if (!item.isVeg) allergens.push('Non-Vegetarian');
    
    // Common allergens based on dish name/category
    const name = item.name.toLowerCase();
    if (name.includes('paneer') || name.includes('dairy') || name.includes('milk')) {
      allergens.push('Dairy');
    }
    if (name.includes('nut') || name.includes('cashew') || name.includes('almond')) {
      allergens.push('Tree Nuts');
    }
    if (name.includes('wheat') || name.includes('roti') || name.includes('paratha')) {
      allergens.push('Gluten');
    }

    return allergens;
  }

  // Get inventory status
  private getInventory(itemId: string): { current: number; threshold: number } | undefined {
    const current = this.inventoryMap.get(itemId) ?? 100;
    return {
      current,
      threshold: 10 // Alert when below this
    };
  }

  // Toggle availability
  toggleAvailability(itemId: string, isAvailable: boolean): void {
    this.availabilityMap.set(itemId, isAvailable);
  }

  // Update inventory
  updateInventory(itemId: string, quantity: number): void {
    this.inventoryMap.set(itemId, quantity);
  }

  // Check if item can be ordered
  canOrder(itemId: string, quantity: number): { canOrder: boolean; reason?: string } {
    const isAvailable = this.availabilityMap.get(itemId) ?? true;
    if (!isAvailable) {
      return { canOrder: false, reason: 'Item currently unavailable' };
    }

    const inventory = this.getInventory(itemId);
    if (inventory && inventory.current < quantity) {
      return { canOrder: false, reason: 'Insufficient inventory' };
    }

    return { canOrder: true };
  }

  // Get items by availability
  getAvailableItems(): EnhancedMenuItem[] {
    return this.getEnhancedMenu().filter(item => item.isAvailable);
  }

  // Get low inventory items (for admin dashboard)
  getLowInventoryItems(): EnhancedMenuItem[] {
    return this.getEnhancedMenu().filter(item => 
      item.inventory && item.inventory.current <= item.inventory.threshold
    );
  }

  // Calculate item price with variants and customizations
  calculateItemPrice(
    itemId: string, 
    variantId?: string, 
    customizations?: Record<string, string[]>
  ): number {
    const item = menuData.find(i => i.id === itemId);
    if (!item) return 0;

    let totalPrice = item.price;

    // Add variant price modifier
    if (variantId) {
      const variants = this.getVariantsForItem(itemId);
      const variant = variants?.find(v => v.id === variantId);
      if (variant) {
        totalPrice += variant.priceModifier;
      }
    }

    // Add customization prices
    if (customizations) {
      const options = this.getCustomizationOptions(itemId);
      Object.entries(customizations).forEach(([optionId, selectedValues]) => {
        const option = options.find(o => o.id === optionId);
        if (option) {
          selectedValues.forEach(value => {
            const choice = option.options.find(opt => opt.value === value);
            if (choice) {
              totalPrice += choice.price;
            }
          });
        }
      });
    }

    return totalPrice;
  }

  // Bulk update availability (for opening/closing hours)
  bulkToggleAvailability(itemIds: string[], isAvailable: boolean): void {
    itemIds.forEach(id => this.toggleAvailability(id, isAvailable));
  }

  // Get menu items by time of day (breakfast, lunch, dinner)
  getMenuByTimeSlot(timeSlot: 'breakfast' | 'lunch' | 'dinner' | 'all-day'): EnhancedMenuItem[] {
    const menu = this.getAvailableItems();

    const timeSlotMap: Record<string, string[]> = {
      breakfast: ['Snacks', 'Beverages', 'Add-ons'],
      lunch: ['Combo Meals', 'Main Course', 'Breads', 'Sides', 'Desserts'],
      dinner: ['Combo Meals', 'Main Course', 'Breads', 'Sides', 'Desserts'],
      'all-day': [] // Return all
    };

    const categories = timeSlotMap[timeSlot];
    if (!categories || categories.length === 0) return menu;

    return menu.filter(item => categories.includes(item.category));
  }
}

// Singleton instance
export const menuService = new MenuService();

// Helper functions for API routes
export function getMenuAPI() {
  return menuService.getEnhancedMenu();
}

export function getAvailableMenuAPI() {
  return menuService.getAvailableItems();
}

export function toggleItemAvailabilityAPI(itemId: string, isAvailable: boolean) {
  menuService.toggleAvailability(itemId, isAvailable);
  return { success: true, itemId, isAvailable };
}

export function updateInventoryAPI(itemId: string, quantity: number) {
  menuService.updateInventory(itemId, quantity);
  return { success: true, itemId, quantity };
}

export function calculatePriceAPI(
  itemId: string,
  variantId?: string,
  customizations?: Record<string, string[]>
) {
  const price = menuService.calculateItemPrice(itemId, variantId, customizations);
  return { itemId, price, variantId, customizations };
}

export function getItemByIdAPI(itemId: string) {
  const menuItems = menuService.getEnhancedMenu();
  return menuItems.find(item => item.id === itemId) || null;
}
