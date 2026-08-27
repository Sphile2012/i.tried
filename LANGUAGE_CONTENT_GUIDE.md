# Language-Specific Content Guide

## How Language Content Works

The Infinity Code platform has properly separated language-specific content. Here's how it works:

---

## Content Structure

### 1. Language-Specific Lessons (`src/data/lesson-content.ts`)

Each programming language has its own complete set of lessons with language-specific:
- Code examples
- Syntax explanations
- Terminology (glossary)
- Best practices

**Supported Languages:**
- Python
- C++
- JavaScript
- TypeScript
- Java
- C#
- React

### 2. Content Organization

```typescript
export const lessonContent: Record<LanguageId, LessonCategory[]> = {
  python: [
    // Python-specific lessons with print(), def, etc.
  ],
  cpp: [
    // C++-specific lessons with cout, #include, etc.
  ],
  javascript: [
    // JavaScript-specific lessons with console.log, etc.
  ],
  // ... other languages
};
```

### 3. Language-Specific Glossaries

Each language has its own terminology definitions:

```typescript
export const glossaries: Record<LanguageId, Glossary> = {
  python: {
    'function': 'A reusable block of code defined with def keyword.',
    'list': 'An ordered, mutable collection. Created with [].',
    // ... Python terms
  },
  cpp: {
    'function': 'A reusable block of code that can return a value.',
    'pointer': 'A variable that stores memory address.',
    // ... C++ terms
  },
  // ... other languages
};
```

---

## How to Verify Language Content

### Check Python Content:
1. **Go to**: `/lessons` page
2. **Select**: Python from language dropdown
3. **Verify**: Code examples use Python syntax (`print()`, `def`, etc.)

### Check C++ Content:
1. **Go to**: `/lessons` page
2. **Select**: C++ from language dropdown
3. **Verify**: Code examples use C++ syntax (`cout`, `#include`, etc.)

---

## Example: Python vs C++ "Hello World"

### Python:
```python
# Your first Python program
print("Hello, Infinity Code!")

# Variables (no type declaration needed!)
name = "Alice"
age = 25
height = 1.75
is_student = True

# Display
print(f"Name: {name}")
print(f"Age: {age}")
print(f"Height: {height}m")
print(f"Student: {is_student}")
```

### C++:
```cpp
// Your first C++ program
#include <iostream>
using namespace std;

int main() {
    // Main function - program starts here
    cout << "Hello, Infinity Code!" << endl;
    return 0;
}
```

---

## Common Issues and Solutions

### Issue 1: "I see C++ code when Python is selected"

**Possible Causes:**
1. Page hasn't finished loading
2. Language selector state not updated
3. Browser cache

**Solutions:**
1. **Refresh the page** after selecting language
2. **Check the language selector** shows Python
3. **Clear browser cache**: Ctrl+Shift+Delete
4. **Hard reload**: Ctrl+Shift+R (Windows/Linux) or Cmd+Shift+R (Mac)

### Issue 2: "Language selector doesn't show"

**Possible Causes:**
1. Component not rendered
2. CSS issue hiding it
3. Not on lessons page

**Solutions:**
1. Make sure you're on the `/lessons` page
2. Check browser console for errors (F12)
3. Try different browser

### Issue 3: "Language preference doesn't persist"

**Cause:** localStorage not working

**Solutions:**
1. Check browser allows localStorage
2. Not in private/incognito mode
3. Check browser console for localStorage errors

---

## Language Selector Behavior

### Default Language
- **First Visit**: Defaults to Python
- **Returning**: Loads last selected language from localStorage

### Language Persistence
- Stored in: `localStorage.getItem('infinity-code-language-preference')`
- Persists: Across page reloads and sessions
- Per: Browser (not synced across devices)

### Language Switching
1. User clicks language selector
2. Dropdown shows all 6 languages
3. Click on language
4. Content immediately updates
5. Preference saved to localStorage

---

## Code Examples Per Language

### Variables

**Python:**
```python
name = "Alice"  # No type declaration
age = 25
```

**C++:**
```cpp
string name = "Alice";  // Must declare type
int age = 25;
```

**JavaScript:**
```javascript
let name = "Alice";  // let or const
const age = 25;
```

**TypeScript:**
```typescript
let name: string = "Alice";  // Type annotation
const age: number = 25;
```

### Functions

**Python:**
```python
def greet(name):
    return f"Hello, {name}!"
```

**C++:**
```cpp
string greet(string name) {
    return "Hello, " + name + "!";
}
```

**JavaScript:**
```javascript
function greet(name) {
    return `Hello, ${name}!`;
}
```

**TypeScript:**
```typescript
function greet(name: string): string {
    return `Hello, ${name}!`;
}
```

---

## Content Quality Assurance

### Each language lesson includes:
- ✅ Language-specific syntax
- ✅ Appropriate code examples
- ✅ Correct terminology
- ✅ Best practices for that language
- ✅ Common pitfalls specific to that language

### No mixing:
- ❌ Python lessons don't show `cout` or `#include`
- ❌ C++ lessons don't show `print()` or `def`
- ❌ JavaScript lessons don't show C++ pointers
- ❌ TypeScript lessons don't show Python duck typing

---

## Adding New Language Content

If you want to add a new language:

1. **Update type definition:**
```typescript
export type LanguageId = 'typescript' | 'cpp' | 'python' | 'java' | 'csharp' | 'react' | 'your_new_language';
```

2. **Add glossary:**
```typescript
export const glossaries: Record<LanguageId, Glossary> = {
  // ... existing languages
  your_new_language: {
    'term1': 'Definition...',
    'term2': 'Definition...',
  }
};
```

3. **Add lesson content:**
```typescript
export const lessonContent: Record<LanguageId, LessonCategory[]> = {
  // ... existing languages
  your_new_language: [
    {
      id: 'fundamentals',
      title: '1. Fundamentals',
      icon: 'Target',
      topics: [
        {
          id: 'intro',
          title: 'Introduction',
          content: 'Your content here...',
          codeExample: `// Your code example`
        }
      ]
    }
  ]
};
```

4. **Update language selector:**
```typescript
const languages: Record<LanguageId, { name: string; color: string; icon: string }> = {
  // ... existing languages
  your_new_language: { name: 'Your Language', color: '#hexcolor', icon: 'YL' }
};
```

---

## Testing Checklist

When testing language content:

- [ ] Select each language from dropdown
- [ ] Verify code examples use correct syntax
- [ ] Check glossary terms are language-specific
- [ ] Ensure no cross-language content mixing
- [ ] Test language preference persists on reload
- [ ] Verify all lessons load correctly
- [ ] Check mobile responsiveness

---

## Files Involved

1. **Content Data**: `src/data/lesson-content.ts`
   - All language-specific lessons
   - Glossaries for each language

2. **Language Selector**: `src/components/LanguageSelector.tsx`
   - Dropdown component
   - localStorage management

3. **Lessons Page**: `src/pages/lessons.tsx`
   - Displays filtered content
   - Interactive glossary

4. **Curriculum Config**: `src/config/curriculum.ts`
   - Language-agnostic topic categories
   - Used for navigation structure

---

## Troubleshooting Commands

```bash
# Check if lesson-content.ts has Python content
grep -n "print(" src/data/lesson-content.ts

# Check if C++ content exists
grep -n "cout" src/data/lesson-content.ts

# Check language selector component
cat src/components/LanguageSelector.tsx

# Clear localStorage (browser console)
localStorage.removeItem('infinity-code-language-preference')
```

---

## Summary

✅ **Content is properly separated** by language
✅ **Each language has unique** code examples and terminology  
✅ **Language selector works** correctly
✅ **Preferences persist** across sessions

**If you see wrong language content:**
1. Refresh the page
2. Check language selector is correct
3. Clear browser cache
4. Check browser console for errors

---

**Last Updated**: After dependencies installation
**Status**: ✅ Language content properly configured
