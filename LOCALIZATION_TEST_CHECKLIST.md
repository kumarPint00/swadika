# 🧪 Localization Testing Checklist

## Server Status
- ✅ Development server running on http://localhost:3002
- ✅ No compilation errors
- ✅ JSON translation files loaded successfully

## Pre-Testing Setup
1. Open browser to http://localhost:3002
2. Open browser DevTools (F12)
3. Clear localStorage: `localStorage.clear()`
4. Refresh page

## 🔍 Visual Testing

### 1. Header Component (Desktop)
**Test:** Navigate to home page

**English Mode:**
- [ ] Logo displays "Swadika" with "Gharelu Delights" subtitle
- [ ] Navigation shows: "Menu", "Recipes", "Subscriptions", "About", "Contact"
- [ ] Language toggle shows "EN" button
- [ ] Sign In button shows "Sign In"
- [ ] Cart icon visible with badge
- [ ] Theme toggle icon visible

**Hindi Mode:**
Click language toggle (EN → हिं)
- [ ] Navigation changes to: "मेनू", "रेसिपी", "सब्सक्रिप्शन", "हमारे बारे में", "संपर्क"
- [ ] Language toggle shows "हिं" button
- [ ] Sign In button shows "साइन इन"
- [ ] NO English visible anywhere

### 2. Header Component (Mobile)
Resize browser to mobile width (<900px)

**English Mode:**
- [ ] Hamburger menu icon visible
- [ ] Tap hamburger → drawer opens
- [ ] Shows: "Home", "Menu", "Recipes", "Subscriptions", "About", "Contact"
- [ ] Shows "Sign In" button at bottom

**Hindi Mode:**
- [ ] Drawer navigation in Hindi: "होम", "मेनू", "रेसिपी", etc.
- [ ] "साइन इन" button visible
- [ ] NO English visible

### 3. Home Page Hero Section

**English Mode:**
- [ ] Title: "Cloud Kitchen"
- [ ] Subtitle: "Delivered Fresh" (in gold color)
- [ ] Description: "Authentic UP & Bihar flavors from our hygiene-certified kitchen..."
- [ ] Chip shows: "⚡ 30-Min Delivery Lightning fast to your door"
- [ ] Button 1: "Order Now"
- [ ] Button 2: "Track Order"

**Hindi Mode:**
- [ ] Title: "क्लाउड किचन"
- [ ] Subtitle: "ताज़ा डिलीवरी"
- [ ] Description in Hindi (starts with "हमारी स्वच्छता...")
- [ ] Chip: "⚡ 30 मिनट डिलीवरी..."
- [ ] Button 1: "अभी ऑर्डर करें"
- [ ] Button 2: "ऑर्डर ट्रैक करें"
- [ ] NO English visible

### 4. Benefits Section (4 Cards)

**English Mode:**
Cards should show:
1. **30-Min Delivery** - "Lightning fast to your door"
2. **Live Tracking** - "Watch your order in real-time"
3. **Cloud Kitchen** - "100% hygiene certified"
4. **Always Fresh** - "Cooked on order, delivered hot"

**Hindi Mode:**
Cards should show:
1. **30 मिनट डिलीवरी** - "बिजली की तेजी से..."
2. **लाइव ट्रैकिंग** - "अपने ऑर्डर को रियल-टाइम..."
3. **क्लाउड किचन** - "100% स्वच्छता प्रमाणित"
4. **हमेशा ताज़ा** - "ऑर्डर पर पकाया गया..."
- [ ] NO English visible

### 5. Featured Dishes Section

**English Mode:**
- [ ] Section title: "🔥 Hot & Ready"
- [ ] Heading: "Order in 30 Seconds"
- [ ] Description: "Delivered piping hot in 30 minutes or less"
- [ ] Chips on dishes: "Bestseller" or "Popular"
- [ ] Button: "View Full Menu"

**Hindi Mode:**
- [ ] Section title: "🔥 गर्म और तैयार"
- [ ] Heading: "30 सेकंड में ऑर्डर करें"
- [ ] Description: "30 मिनट या उससे कम में..."
- [ ] Chips: "बेस्टसेलर" or "लोकप्रिय"
- [ ] Button: "पूरा मेनू देखें"
- [ ] NO English visible

### 6. CTA Section (Bottom)

**English Mode:**
- [ ] Title: "Get 20% Off Your First Order! 🎉"
- [ ] Subtitle: "Join Swadika today • Free delivery on orders above ₹299"
- [ ] Button 1: "Sign Up Now"
- [ ] Button 2: "Browse Menu"

**Hindi Mode:**
- [ ] Title: "अपने पहले ऑर्डर पर 20% की छूट पाएं! 🎉"
- [ ] Subtitle: "आज ही स्वादिका में शामिल हों..."
- [ ] Button 1: "अभी साइन अप करें"
- [ ] Button 2: "मेनू ब्राउज़ करें"
- [ ] NO English visible

### 7. User Menu (When Logged In)
If user is authenticated:

**English Mode:**
- [ ] Profile dropdown shows: "Profile", "My Orders", "Rewards", "Favorites", "Logout"

**Hindi Mode:**
- [ ] Dropdown shows: "प्रोफाइल", "मेरे ऑर्डर", "रिवॉर्ड्स", "पसंदीदा", "लॉगआउट"

### 8. Bottom Navigation (Mobile Only)

**English Mode:**
- [ ] Shows: "Home", "Menu", "Orders", "Cart", "Profile"
- [ ] Active tab highlighted

**Hindi Mode:**
- [ ] Shows: "होम", "मेनू", "ऑर्डर", "कार्ट", "प्रोफाइल"
- [ ] Active tab highlighted
- [ ] NO English visible

## 🔧 Functional Testing

### Language Switching
1. **Test Persistence:**
   - [ ] Switch to Hindi
   - [ ] Refresh page
   - [ ] Language should remain Hindi

2. **Test LocalStorage:**
   - [ ] Open DevTools → Application → Local Storage
   - [ ] Should see `locale: "hi"` or `locale: "en"`

3. **Test Toggle:**
   - [ ] Click toggle multiple times
   - [ ] UI updates immediately each time
   - [ ] No lag or flicker

### Navigation Testing
1. **Test Menu Links (English):**
   - [ ] Click "Menu" → goes to /menu
   - [ ] Click "Recipes" → goes to /blog
   - [ ] Click "About" → goes to /about
   - [ ] Click "Contact" → goes to /contact

2. **Test Menu Links (Hindi):**
   - [ ] Click "मेनू" → goes to /menu
   - [ ] Click "रेसिपी" → goes to /blog
   - [ ] Click "हमारे बारे में" → goes to /about
   - [ ] Click "संपर्क" → goes to /contact

### Cross-Browser Testing
Test in multiple browsers:
- [ ] Chrome (Desktop)
- [ ] Firefox (Desktop)
- [ ] Safari (Desktop)
- [ ] Chrome (Mobile/DevTools)
- [ ] Safari (iOS)

## 🐛 Known Issues to Check

### Potential Issues
1. **Font Rendering:**
   - [ ] Hindi characters display correctly (no boxes/question marks)
   - [ ] Font sizes consistent between languages

2. **Layout Breaks:**
   - [ ] No text overflow in buttons
   - [ ] Cards maintain same height
   - [ ] Grid layout doesn't break with longer Hindi text

3. **Missing Translations:**
   - [ ] Look for dot-notation keys displayed (e.g., "header.menu")
   - [ ] Check console for any translation errors

4. **Theme Compatibility:**
   - [ ] Switch theme to dark mode
   - [ ] Test language switch in dark mode
   - [ ] Verify all text readable

## 📝 Bug Report Template

If you find issues, use this format:

```markdown
**Issue:** [Brief description]
**Language:** EN / HI
**Location:** [Page/Component]
**Expected:** [What should happen]
**Actual:** [What happens]
**Screenshot:** [If applicable]
**Steps to Reproduce:**
1. 
2. 
3. 
```

## ✅ Testing Sign-Off

**Tested By:** _______________
**Date:** _______________
**Browser:** _______________
**Device:** _______________

**Overall Status:** 
- [ ] Pass - All tests successful
- [ ] Pass with Minor Issues - See notes below
- [ ] Fail - Major issues found

**Notes:**
