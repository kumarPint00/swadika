# Hindi Translation Guide for Swadika Dishes

## Quick Reference for Translating Dishes

### Common Hindi Food Terms

#### Cooking Actions:
- **Cook/Boil** - पकाना (pakaana)
- **Fry** - तलना (talna) / भूनना (bhoonna)
- **Roast** - भूनना (bhoonna) / सेंकना (senkna)
- **Mix** - मिलाना (milaana)
- **Grind** - पीसना (peesna)
- **Knead** - गूंथना (goonthna)
- **Sauté** - भूनना (bhoonna)
- **Temper** - तड़का लगाना (tadka lagaana)
- **Simmer** - उबालना (ubaalna)
- **Garnish** - सजाना (sajaana)
- **Serve** - परोसना (parosna)

#### Measurements:
- **Cup** - कप (kap)
- **Tablespoon** - बड़ा चम्मच (bada chammach)
- **Teaspoon** - छोटा चम्मच (chhota chammach)
- **Pinch** - चुटकी (chutki)
- **As needed** - ज़रूरत अनुसार (zaroorat anusaar)
- **To taste** - स्वादानुसार (swaadanusaar)

#### Common Ingredients:
- **Rice** - चावल (chaawal)
- **Wheat flour** - गेहूं का आटा (gehun ka aata)
- **Lentils** - दाल (daal)
- **Oil** - तेल (tel)
- **Ghee** - घी (ghee)
- **Salt** - नमक (namak)
- **Sugar** - चीनी (cheeni)
- **Water** - पानी (paani)
- **Onion** - प्याज (pyaaz)
- **Garlic** - लहसुन (lahsun)
- **Ginger** - अदरक (adrak)
- **Tomato** - टमाटर (tamatar)
- **Potato** - आलू (aaloo)
- **Green chili** - हरी मिर्च (hari mirch)
- **Coriander leaves** - धनिया पत्ती (dhaniya patti)
- **Turmeric** - हल्दी (haldi)
- **Cumin** - जीरा (jeera)
- **Mustard oil** - सरसों का तेल (sarson ka tel)

#### Hindi Numerals (Optional - you can use English numerals too):
- 1 - १
- 2 - २
- 3 - ३
- 4 - ४
- 5 - ५
- 6 - ६
- 7 - ७
- 8 - ८
- 9 - ९
- 0 - ०

### Translation Workflow

#### Step 1: Choose a Dish
```bash
# Pick from extracted_dishes.json
cd scripts
cat extracted_dishes.json | grep '"id"' | head -20
```

#### Step 2: Translate Story
- Keep cultural context
- Use warm, storytelling language
- Mention regional connection
- Include emotional/sensory descriptions

Example:
```
English: "The ultimate comfort food..."
Hindi: "आराम का सबसे अच्छा खाना..."
```

#### Step 3: Translate Ingredients
- Use Hindi ingredient names
- Keep measurements consistent
- Use "स्वादानुसार" for "to taste"

Example:
```
English: "1 cup rice"
Hindi: "१ कप चावल" OR "1 कप चावल"

English: "Salt to taste"
Hindi: "स्वादानुसार नमक"
```

#### Step 4: Translate Instructions
- Use imperative verb forms
- Keep step numbers
- Use clear cooking terms

Example:
```
English: "Cook rice with water until fluffy"
Hindi: "चावल को पानी में फुला-फुला पकाएं"
```

### Sample Template

```json
{
  "dish-id": {
    "story": "[Hindi story about the dish - cultural, emotional, regional context]",
    "ingredients": [
      "१ कप [ingredient in Hindi]",
      "२ बड़े चम्मच [ingredient]",
      "स्वादानुसार नमक"
    ],
    "instructions": [
      "[Step 1 in Hindi - clear action]",
      "[Step 2 in Hindi]",
      "[Step 3 in Hindi]",
      "गर्मागर्म परोसें। (Serve hot)"
    ]
  }
}
```

### Quality Checklist
- [ ] Story captures emotion and culture
- [ ] All ingredients translated or transliterated appropriately  
- [ ] Instructions are clear and actionable
- [ ] Cooking terms are authentic Hindi
- [ ] Tone matches original warmth
- [ ] No machine translation artifacts
- [ ] Devanagari script used correctly

### Pro Tips
1. **Don't over-translate**: Some words like "pressure cooker" can be "प्रेशर कुकर"
2. **Keep brand names**: "Maggi" stays "Maggi" in Hindi
3. **Modern terms**: "microwave" can be "माइक्रोवेव"
4. **Regional touch**: Add local flavor to match dish origin (Bihar, UP, Punjab, etc.)
5. **Read aloud**: Hindi translation should sound natural when spoken

### Resources
- Original 3 translated dishes in locales/hi.json - use as reference
- extracted_dishes.json - source English content
- Online Hindi dictionary for specific terms
- Regional cuisine books for authentic terminology

### How to Add Translations

1. Open `locales/hi.json`
2. Find the dish in "dishes" object
3. Replace English content with Hindi translation
4. Save file
5. Test in browser by switching to Hindi mode
6. No code changes needed!

### Batch Translation Tips
- Translate by category (all breakfast items, all desserts, etc.)
- Start with bestsellers for maximum impact
- 10-15 dishes per session is sustainable
- Have a native speaker review for authenticity

---

**Remember**: Every dish you translate enhances the user experience for Hindi speakers. Take time to make it authentic and culturally resonant!
