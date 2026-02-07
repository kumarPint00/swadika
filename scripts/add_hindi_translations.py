#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Add comprehensive Hindi translations for all remaining dishes
"""

import json

# Read current files
with open('locales/en.json', 'r', encoding='utf-8') as f:
    en_data = json.load(f)

with open('locales/hi.json', 'r', encoding='utf-8') as f:
    hi_data = json.load(f)

# Get all dish IDs from English
all_dish_ids = list(en_data['dishes'].keys())
print(f"📋 Found {len(all_dish_ids)} dishes total")

# Check which are already translated (have different content than English)
already_translated = []
need_translation = []

for dish_id in all_dish_ids:
    if dish_id in hi_data['dishes']:
        if hi_data['dishes'][dish_id]['story'] != en_data['dishes'][dish_id]['story']:
            already_translated.append(dish_id)
        else:
            need_translation.append(dish_id)
    else:
        need_translation.append(dish_id)

print(f"✅ Already translated: {len(already_translated)} dishes")
print(f"⏳ Need translation: {len(need_translation)} dishes")
print(f"\n📝 Dishes needing translation:")
for dish_id in need_translation[:10]:  # Show first 10
    print(f"  - {dish_id}")
if len(need_translation) > 10:
    print(f"  ... and {len(need_translation) - 10} more")
