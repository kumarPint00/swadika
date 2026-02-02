// AI Chat Ordering Service - Natural language order processing

import { menuService, EnhancedMenuItem } from './menuService';
import { cartService } from './cartService';

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
}

export interface OrderIntent {
  items: Array<{
    dishName: string;
    quantity: number;
    variant?: string;
    confidence: number;
  }>;
  totalConfidence: number;
  clarificationNeeded?: string[];
}

class AIChatService {
  private conversationHistory: Map<string, ChatMessage[]> = new Map();
  private openAIKey: string;

  constructor() {
    this.openAIKey = process.env.OPENAI_API_KEY || '';
  }

  // Parse natural language order using pattern matching or OpenAI
  async parseOrderIntent(userMessage: string, sessionId: string): Promise<OrderIntent> {
    const menu = menuService.getEnhancedMenu();
    
    // Simple keyword-based parsing (can be replaced with OpenAI API)
    const intent: OrderIntent = {
      items: [],
      totalConfidence: 0
    };

    // Common patterns
    const quantityPattern = /(\d+)\s*x?\s*([a-z\s]+)/gi;
    const itemMentions = this.extractMenuItems(userMessage, menu);

    let matches = userMessage.matchAll(quantityPattern);
    for (const match of matches) {
      const quantity = parseInt(match[1]);
      const itemName = match[2].trim();
      
      const menuItem = this.findBestMatch(itemName, menu);
      if (menuItem) {
        intent.items.push({
          dishName: menuItem.name,
          quantity,
          confidence: 0.8
        });
      }
    }

    // If no explicit quantities, check for menu item mentions
    if (intent.items.length === 0) {
      for (const item of itemMentions) {
        intent.items.push({
          dishName: item.name,
          quantity: 1,
          confidence: 0.6
        });
      }
    }

    intent.totalConfidence = intent.items.reduce((sum, item) => sum + item.confidence, 0) / 
                            Math.max(intent.items.length, 1);

    return intent;
  }

  // Extract menu items mentioned in text
  private extractMenuItems(text: string, menu: EnhancedMenuItem[]): EnhancedMenuItem[] {
    const lowerText = text.toLowerCase();
    const found: EnhancedMenuItem[] = [];

    for (const item of menu) {
      const itemName = item.name.toLowerCase();
      const keywords = itemName.split(' ');
      
      // Check if item name or keywords are mentioned
      if (lowerText.includes(itemName)) {
        found.push(item);
      } else if (keywords.some(keyword => keyword.length > 3 && lowerText.includes(keyword))) {
        found.push(item);
      }
    }

    return found;
  }

  // Find best matching menu item
  private findBestMatch(query: string, menu: EnhancedMenuItem[]): EnhancedMenuItem | null {
    const lowerQuery = query.toLowerCase().trim();
    
    // Exact match
    let match = menu.find(item => item.name.toLowerCase() === lowerQuery);
    if (match) return match;

    // Partial match
    match = menu.find(item => 
      item.name.toLowerCase().includes(lowerQuery) || 
      lowerQuery.includes(item.name.toLowerCase())
    );
    if (match) return match;

    // Fuzzy match (keywords)
    const queryWords = lowerQuery.split(' ');
    for (const item of menu) {
      const itemWords = item.name.toLowerCase().split(' ');
      const commonWords = queryWords.filter(word => 
        itemWords.some(iw => iw.includes(word) || word.includes(iw))
      );
      
      if (commonWords.length >= Math.min(queryWords.length, itemWords.length) / 2) {
        return item;
      }
    }

    return null;
  }

  // Generate smart response using OpenAI (if API key available)
  async generateResponse(
    userMessage: string, 
    sessionId: string,
    context?: { cart?: any; user?: any }
  ): Promise<string> {
    // Get conversation history
    const history = this.conversationHistory.get(sessionId) || [];
    
    // Add user message
    history.push({
      role: 'user',
      content: userMessage,
      timestamp: new Date()
    });

    // If OpenAI key available, use GPT
    if (this.openAIKey) {
      return await this.callOpenAI(history, context);
    }

    // Fallback to rule-based responses
    const intent = await this.parseOrderIntent(userMessage, sessionId);
    
    if (intent.items.length > 0) {
      const itemList = intent.items
        .map(item => `${item.quantity}x ${item.dishName}`)
        .join(', ');
      
      const response = `Great choice! I found:\n${itemList}\n\nWould you like to add these to your cart?`;
      
      history.push({
        role: 'assistant',
        content: response,
        timestamp: new Date()
      });
      
      this.conversationHistory.set(sessionId, history);
      return response;
    }

    // Greeting detection
    if (/^(hi|hello|hey|namaste)/i.test(userMessage)) {
      const response = "Hello! 👋 Welcome to Swadika Delights! I can help you order delicious Bihar & UP cuisine. What would you like to have today?";
      history.push({ role: 'assistant', content: response, timestamp: new Date() });
      this.conversationHistory.set(sessionId, history);
      return response;
    }

    // Show menu
    const response = "I can help you order from our menu! Try saying:\n• 'I want 2 Litti Chokha'\n• 'Get me a Chicken Biryani'\n• 'Show me thali options'\n\nWhat would you like?";
    history.push({ role: 'assistant', content: response, timestamp: new Date() });
    this.conversationHistory.set(sessionId, history);
    return response;
  }

  // Call OpenAI API
  private async callOpenAI(history: ChatMessage[], context?: any): Promise<string> {
    try {
      const systemPrompt = `You are Swadika's AI ordering assistant. Help customers order Bihar and UP cuisine.
Menu categories: Litti Chokha, Thalis, Biryanis, Parathas, Snacks, Desserts.
Be friendly, concise, and suggest items. Extract order details accurately.
${context?.cart ? `Current cart: ${JSON.stringify(context.cart)}` : ''}`;

      const messages = [
        { role: 'system', content: systemPrompt },
        ...history.map(msg => ({ role: msg.role, content: msg.content }))
      ];

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.openAIKey}`
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages,
          max_tokens: 200,
          temperature: 0.7
        })
      });

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error('OpenAI API error:', error);
      return 'Sorry, I had trouble understanding. Could you rephrase your order?';
    }
  }

  // Add items to cart from intent
  async addToCartFromIntent(intent: OrderIntent, sessionId: string): Promise<boolean> {
    try {
      const menu = menuService.getEnhancedMenu();
      
      for (const item of intent.items) {
        const menuItem = menu.find(m => m.name === item.dishName);
        if (menuItem) {
          cartService.addToCart(
            sessionId,
            menuItem.id,
            item.quantity,
            item.variant,
            undefined, // customizations
            undefined  // special instructions
          );
        }
      }
      
      return true;
    } catch (error) {
      console.error('Error adding to cart:', error);
      return false;
    }
  }

  // Get conversation history
  getHistory(sessionId: string): ChatMessage[] {
    return this.conversationHistory.get(sessionId) || [];
  }

  // Clear conversation
  clearHistory(sessionId: string): void {
    this.conversationHistory.delete(sessionId);
  }

  // Suggest popular items
  getSuggestions(): string[] {
    const menu = menuService.getEnhancedMenu();
    return menu
      .filter(item => item.isBestseller || item.rating >= 4.5)
      .slice(0, 5)
      .map(item => `${item.name} - ₹${item.price}`);
  }
}

// Singleton instance
export const aiChatService = new AIChatService();

// Helper functions for API routes
export async function processChatMessage(
  message: string,
  sessionId: string,
  context?: any
) {
  return await aiChatService.generateResponse(message, sessionId, context);
}

export async function parseOrderFromChat(message: string, sessionId: string) {
  return await aiChatService.parseOrderIntent(message, sessionId);
}

export async function addChatOrderToCart(intent: OrderIntent, sessionId: string) {
  return await aiChatService.addToCartFromIntent(intent, sessionId);
}
