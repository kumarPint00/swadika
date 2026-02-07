#!/usr/bin/env python3
"""
Extract all dishes from menuData.ts and prepare JSON for localization files
"""

import re
import json

def extract_dishes_from_ts(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    dishes = {}
    
    # Pattern to match each dish object
    dish_pattern = r"\{\s*id:\s*'([^']+)',(.*?)(?=\n\s*\},\s*\n\s*\{|\n\s*\}\s*\];)"
    
    matches = re.finditer(dish_pattern, content, re.DOTALL)
    
    for match in matches:
        dish_id = match.group(1)
        dish_content = match.group(2)
        
        # Extract story
        story_match = re.search(r"story:\s*'([^']*(?:''[^']*)*)'", dish_content, re.DOTALL)
        story = story_match.group(1).replace("''", "'") if story_match else ""
        
        # Extract ingredients
        ingredients = []
        ingredients_match = re.search(r"ingredients:\s*\[(.*?)\]", dish_content, re.DOTALL)
        if ingredients_match:
            ing_content = ingredients_match.group(1)
            ing_items = re.findall(r"'([^']*(?:''[^']*)*)'", ing_content)
            ingredients = [item.replace("''", "'") for item in ing_items]
        
        # Extract instructions
        instructions = []
        instructions_match = re.search(r"instructions:\s*\[(.*?)\]", dish_content, re.DOTALL)
        if instructions_match:
            inst_content = instructions_match.group(1)
            inst_items = re.findall(r"'([^']*(?:''[^']*)*)'", inst_content)
            instructions = [item.replace("''", "'") for item in inst_items]
        
        if story or ingredients or instructions:
            dishes[dish_id] = {}
            if story:
                dishes[dish_id]['story'] = story
            if ingredients:
                dishes[dish_id]['ingredients'] = ingredients
            if instructions:
                dishes[dish_id]['instructions'] = instructions
    
    return dishes

if __name__ == "__main__":
    dishes = extract_dishes_from_ts('/Users/ravi/swadika/lib/menuData.ts')
    
    print(f"Extracted {len(dishes)} dishes with content")
    print("\nDishes found:")
    for dish_id in sorted(dishes.keys()):
        parts = []
        if 'story' in dishes[dish_id]:
            parts.append(f"story ({len(dishes[dish_id]['story'])} chars)")
        if 'ingredients' in dishes[dish_id]:
            parts.append(f"{len(dishes[dish_id]['ingredients'])} ingredients")
        if 'instructions' in dishes[dish_id]:
            parts.append(f"{len(dishes[dish_id]['instructions'])} steps")
        print(f"  {dish_id}: {', '.join(parts)}")
    
    # Save to JSON
    with open('/Users/ravi/swadika/scripts/extracted_dishes.json', 'w', encoding='utf-8') as f:
        json.dump(dishes, f, indent=2, ensure_ascii=False)
    
    print(f"\n✅ Saved to extracted_dishes.json")
