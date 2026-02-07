# Hindi Translation Status Report

## Overview
- **Total Dishes**: 83
- **Fully Translated to Hindi**: 23 dishes (~27.7%)
- **Needing Translation**: 60 dishes (~72.3%)

## ✅ Completed Hindi Translations (11 dishes)

### Meal Combos (3/4 translated)
1. `daal-bhat-chokha` - Full Hindi story, ingredients, instructions ✅
2. `roti-sabji-combo` - Full Hindi story, ingredients, instructions ✅
3. `litti-chokha-meal` - Full Hindi story, ingredients, instructions ✅

### Street Food & Snacks (8/8 translated)
4. `samosa` - Full Hindi story, ingredients, instructions ✅
5. `kachori` - Full Hindi story, ingredients, instructions ✅
6. `puchka` (golgappa/panipuri) - Full Hindi story, ingredients, instructions ✅
7. `aloo-tikki` - Full Hindi story, ingredients, instructions ✅
8. `pakora` - Full Hindi story, ingredients, instructions ✅
9. `bread-pakora` - Full Hindi story, ingredients, instructions ✅
10. `chana-chaat` - Full Hindi story, ingredients, instructions ✅
11. `dahi-vada` - Full Hindi story, ingredients, instructions ✅
12. `paneer-pakora` - Full Hindi story, ingredients, instructions ✅

## ⏳ Dishes Needing Hindi Translation (80 dishes)

### Meal Combos (Still in English)
- `poori-bhaji-plate`
- `khichdi-kadhi`
- `thali-veg`
- `thali-nonveg`

### Street Food (Still in English)
- `samosa`
- `kachori`
- `puchka` (golgappa/panipuri)
- `aloo-tikki`
- `pakora`
- `bread-pakora`
- `chana-chaat`
- `dahi-vada`
- `paneer-pakora`

### Beverages (Still in English)
- All 15 beverage items (chai, lassi, etc.)

### Sweets (Still in English)
- All 12 dessert items (gulab-jamun, rasgulla, etc.)

### Main Courses (Still in English)
- All 20+ main course dishes (biryani variants, curries, etc.)

### Snacks & Appetizers (Still in English)
- All remaining snack items

### Regional Specials (Still in English)
- All Bihar and UP special dishes

## Translation Requirements

Each dish needs translation for:
1. **Story** (कहानी): Cultural narrative about the dish's origin, significance, and emotional connection
2. **Ingredients** (सामग्री): List of all ingredients with Hindi names and measurements
3. **Instructions** (बनाने की विधि): Step-by-step cooking directions in Hindi

## Translation Quality Standards

### Stories (कहानी)
- Preserve emotional and cultural context
- Use warm, conversational Hindi
- Include regional significance
- Maintain storytelling flow

### Ingredients (सामग्री)
- Use authentic Hindi names: चावल (rice), आटा (flour), घी (ghee)
- Hindi measurements: कप (cup), बड़ा चम्मच (tbsp), छोटा चम्मच (tsp), ग्राम (grams)
- Keep clarity - both Hindi name and English equivalent when needed

### Instructions (बनाने की विधि)
- Clear imperative verbs: पकाएं (cook), मिलाएं (mix), परोसें (serve)
- Cooking terms in Hindi: तड़का (tempering), भूनना (roasting), उबालना (boiling)
- Sequential steps that are easy to follow

## Sample Translation Pattern

**English Story:**
"The quintessential meal of Bihar - a trinity that has nourished generations..."

**Hindi Translation:**
"बिहार का सबसे खास खाना - तीन चीजों का अनूठा संगम जिसने पीढ़ियों को पोषण दिया..."

## Options for Completing Translation

### Option 1: AI-Assisted Batch Translation
Use an AI service (like GPT-4 with Hindi expertise) to translate all remaining dishes while maintaining:
- Cultural authenticity
- Natural Hindi flow
- Cooking terminology accuracy
- Regional dialect appropriateness

### Option 2: Professional Translation Service
Hire a professional Hindi translator familiar with:
- Indian culinary vocabulary
- Regional food culture (UP & Bihar)
- Recipe writing conventions

### Option 3: Incremental Translation
Translate dishes gradually by priority:
1. **High Priority**: Bestsellers and most ordered items (10-15 dishes)
2. **Medium Priority**: Regional specials and popular items (20-25 dishes)
3. **Low Priority**: Less frequently ordered items (remaining dishes)

### Option 4: Community Translation
Engage native Hindi speakers from the team or community to:
- Divide dishes among translators
- Maintain consistent terminology
- Review and QA translations
- Ensure cultural authenticity

## Fallback Mechanism Status
✅ **Currently Working**: The app shows English content when Hindi translation is missing, ensuring no broken user experience.

## Recommended Next Steps

1. **Immediate (High Priority - 15 dishes)**
   - Translate all bestsellers and most popular dishes
   - Focus on items ordered frequently
   - Complete within 1-2 weeks

2. **Short-term (Medium Priority - 25 dishes)**
   - Translate regional specials and signature items
   - Complete within 1 month

3. **Long-term (Lower Priority - 40 dishes)**
   - Complete remaining dishes
   - Complete within 2-3 months

## Translation Workflow

```
1. Select batch of dishes (5-10 at a time)
   ↓
2. Translate story → ingredients → instructions
   ↓
3. Review for:
   - Natural Hindi flow
   - Correct Devanagari spelling
   - Authentic cooking terms
   - Cultural appropriateness
   ↓
4. Update hi.json file
   ↓
5. Test in app (switch language and verify)
   ↓
6. Move to next batch
```

## File Location
- **English Translations**: `/locales/en.json` (lines 215-2237)
- **Hindi Translations**: `/locales/hi.json` (lines 215-2237)
- **Helper Function**: `getDishTranslation()` in `/context/LocaleContext.tsx`

## Technical Notes
- All infrastructure is complete and working
- No code changes needed - only JSON content updates
- Fallback to English works seamlessly
- Can translate incrementally without breaking the app
- Both menu and recipe pages use the same translation system

## Quality Checklist for Each Dish

- [ ] Story maintains emotional connection
- [ ] Hindi reads naturally when spoken aloud
- [ ] All ingredient names are authentic Hindi
- [ ] Measurements use Hindi terms correctly
- [ ] Instructions use proper cooking verbs
- [ ] No English words unless necessary (technical terms)
- [ ] Spelling checked for Devanagari accuracy
- [ ] Cultural references preserved
- [ ] Tested in app UI for proper display

---

**Last Updated**: January 2026
**Status**: Ready for mass translation
**Progress**: 3/83 dishes complete (3.6%)
