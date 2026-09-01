import { useState, useRef, useEffect } from 'react';
import { Brain, Send, HelpCircle, Code, BookOpen, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';

interface Message { role: 'user' | 'assistant'; content: string; }

const suggestions = [
  { icon: BookOpen, text: 'Explain what a variable is' },
  { icon: Code, text: 'How do loops work in C++?' },
  { icon: Lightbulb, text: 'Give me a hint for my exercise' },
  { icon: HelpCircle, text: 'Review my code' },
];

export default function AITutor() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { role: 'user', content: text };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);
    
    setTimeout(() => {
      const lower = text.toLowerCase();
      let response = '';

      // Variable explanations
      if (lower.includes('variable')) {
        response = `**Variables** are named containers that store data in memory.

**Key Concepts:**
• Variables have a name, type, and value
• Must be declared before use
• Type determines what data it can hold

**Examples:**

**C++:**
\`\`\`cpp
int age = 25;              // Integer
double price = 19.99;      // Decimal
string name = "Alice";     // Text
bool isActive = true;      // Boolean
\`\`\`

**Python:**
\`\`\`python
age = 25                   # Integer
price = 19.99              # Float
name = "Alice"             # String
is_active = True           # Boolean
\`\`\`

**Java:**
\`\`\`java
int age = 25;
double price = 19.99;
String name = "Alice";
boolean isActive = true;
\`\`\`

Variables can be modified after creation. Choose meaningful names!`;
      }
      // Loop explanations
      else if (lower.includes('loop') || lower.includes('for') || lower.includes('while')) {
        response = `**Loops** repeat code multiple times automatically.

**Types of Loops:**

**1. For Loop** - When you know how many times to repeat
\`\`\`cpp
// C++
for (int i = 0; i < 5; i++) {
    cout << "Count: " << i << endl;
}
\`\`\`

\`\`\`python
# Python
for i in range(5):
    print(f"Count: {i}")
\`\`\`

**2. While Loop** - Repeat while condition is true
\`\`\`cpp
// C++
int count = 0;
while (count < 5) {
    cout << count << endl;
    count++;
}
\`\`\`

**Common Use Cases:**
• Iterating through arrays/lists
• Processing each character in a string
• Repeating until user input is valid
• Game loops that run continuously

**Tips:**
✓ Always modify the loop variable to avoid infinite loops
✓ Use for loops when you know the count
✓ Use while loops for conditional repetition`;
      }
      // Function explanations
      else if (lower.includes('function') || lower.includes('method')) {
        response = `**Functions** are reusable blocks of code that perform specific tasks.

**Why Use Functions?**
• Organize code into logical pieces
• Reuse code without copying
• Make code easier to test and maintain
• Break complex problems into smaller parts

**Function Syntax:**

**C++:**
\`\`\`cpp
// Function definition
int add(int a, int b) {
    return a + b;
}

// Function call
int result = add(5, 3);  // result = 8
\`\`\`

**Python:**
\`\`\`python
# Function definition
def add(a, b):
    return a + b

# Function call
result = add(5, 3)  # result = 8
\`\`\`

**Function Parts:**
1. **Name** - What to call it (add)
2. **Parameters** - Input values (a, b)
3. **Return value** - Output (a + b)
4. **Body** - Code that runs

**Best Practices:**
✓ Use clear, descriptive names
✓ Keep functions small and focused
✓ Document what the function does
✓ Return meaningful values`;
      }
      // Array/List explanations
      else if (lower.includes('array') || lower.includes('list')) {
        response = `**Arrays/Lists** store multiple values in a single variable.

**Why Use Arrays?**
• Store collections of related data
• Access elements by index position
• Iterate through all values easily

**Examples:**

**C++:**
\`\`\`cpp
// Static array
int numbers[5] = {10, 20, 30, 40, 50};
cout << numbers[0];  // Output: 10

// Vector (dynamic array)
vector<int> scores = {95, 87, 92};
scores.push_back(88);  // Add element
\`\`\`

**Python:**
\`\`\`python
# List
numbers = [10, 20, 30, 40, 50]
print(numbers[0])  # Output: 10

# Add element
numbers.append(60)

# List operations
numbers.sort()
len(numbers)  # Get length
\`\`\`

**Java:**
\`\`\`java
// Array
int[] numbers = {10, 20, 30, 40, 50};
System.out.println(numbers[0]);  // 10

// ArrayList (dynamic)
ArrayList<Integer> scores = new ArrayList<>();
scores.add(95);
\`\`\`

**Key Concepts:**
• Index starts at 0 (first element is [0])
• Access with square brackets: arr[index]
• Length/size: arr.length or len(arr)
• Loop through arrays to process each element`;
      }
      // If/else conditional explanations
      else if (lower.includes('if') || lower.includes('else') || lower.includes('condition')) {
        response = `**Conditionals** make decisions in your code based on conditions.

**If Statement:**
\`\`\`cpp
if (age >= 18) {
    cout << "You are an adult";
}
\`\`\`

**If-Else:**
\`\`\`cpp
if (score >= 50) {
    cout << "Pass";
} else {
    cout << "Fail";
}
\`\`\`

**If-Else If-Else:**
\`\`\`cpp
if (score >= 90) {
    cout << "A";
} else if (score >= 80) {
    cout << "B";
} else if (score >= 70) {
    cout << "C";
} else {
    cout << "F";
}
\`\`\`

**Comparison Operators:**
• == (equal to)
• != (not equal)
• > (greater than)
• < (less than)
• >= (greater or equal)
• <= (less or equal)

**Logical Operators:**
• && (AND) - both must be true
• || (OR) - at least one true
• ! (NOT) - reverse the condition

**Example:**
\`\`\`cpp
if (age >= 18 && hasLicense) {
    cout << "Can drive";
}
\`\`\``;
      }
      // Code review
      else if (lower.includes('review') || lower.includes('check my code')) {
        response = `**Code Review Checklist:**

I'll help review your code! Please paste it and I'll check for:

**1. Syntax & Structure**
✓ Proper indentation
✓ Matching braces {}
✓ Semicolons where needed
✓ Correct function/variable declarations

**2. Logic & Errors**
✓ Infinite loops
✓ Array out of bounds
✓ Uninitialized variables
✓ Missing return statements

**3. Best Practices**
✓ Meaningful variable names
✓ Comments for complex logic
✓ Avoiding code duplication
✓ Proper error handling

**4. Performance**
✓ Efficient algorithms
✓ Unnecessary operations
✓ Memory usage

**Paste your code** and I'll provide specific feedback!`;
      }
      // Debug help
      else if (lower.includes('debug') || lower.includes('error') || lower.includes('bug')) {
        response = `**Debugging Guide:**

**Common Errors:**

**1. Compilation Errors**
• Missing semicolons
• Undeclared variables
• Type mismatches
• Missing includes/imports

**2. Runtime Errors**
• Division by zero
• Array index out of bounds
• Null pointer errors
• Infinite loops

**3. Logic Errors**
• Wrong calculations
• Incorrect conditions
• Off-by-one errors in loops

**Debugging Steps:**
1. **Read the error message** - It tells you what's wrong
2. **Check line numbers** - Error location
3. **Print values** - Use cout/print to see variables
4. **Test small parts** - Isolate the problem
5. **Trace execution** - Follow code step by step

**Debug Tools:**
\`\`\`cpp
// Print variable values
cout << "x = " << x << endl;

// Check conditions
if (condition) {
    cout << "Condition is true" << endl;
}
\`\`\`

**Share your error message** and I'll help solve it!`;
      }
      // Default helpful response
      else {
        response = `I'm your coding assistant! I can help with:

**📚 Concepts & Explanations**
• Variables, loops, functions, arrays
• If statements and conditionals
• Object-oriented programming
• Data structures and algorithms

**💻 Code Help**
• Write code examples
• Explain how code works
• Review and improve your code
• Debug errors and fix bugs

**🎯 Languages I Support**
• C++, Python, Java
• JavaScript, TypeScript, C#

**💡 Tips & Best Practices**
• Code optimization
• Design patterns
• Clean code principles

**Ask me anything!** Examples:
• "Explain variables in Python"
• "How do I use loops in C++?"
• "Review my code: [paste code]"
• "Help me debug this error"
• "What's the difference between for and while?"

What would you like to learn about?`;
      }

      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-4 h-[calc(100vh-8rem)] flex flex-col">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/20"><Brain className="h-6 w-6 text-purple-400" /></div>
        <div><h1 className="text-xl font-bold">AI Coding Assistant</h1><p className="text-sm text-slate-400">Ask questions, get explanations, hints, and code reviews</p></div>
      </div>
      {messages.length === 0 && (
        <div className="grid grid-cols-2 gap-3 py-4">
          {suggestions.map((s, i) => (
            <button key={i} onClick={() => sendMessage(s.text)} className="flex items-center gap-3 rounded-lg border border-slate-800 p-4 text-left hover:bg-slate-800/50 transition-colors">
              <s.icon className="h-5 w-5 text-blue-400" /><span className="text-sm">{s.text}</span>
            </button>
          ))}
        </div>
      )}
      <div className="flex-1 overflow-y-auto space-y-4">
        {messages.map((msg, i) => (
          <div key={i} className={msg.role === 'user' ? 'flex justify-end' : 'flex justify-start'}>
            <div className={msg.role === 'user' ? 'max-w-[80%] rounded-lg bg-blue-600 p-4 text-white' : 'max-w-[80%] rounded-lg bg-slate-800 p-4 text-white'}>
              <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">{msg.content}</pre>
            </div>
          </div>
        ))}
        {loading && <div className="flex justify-start"><div className="rounded-lg bg-slate-800 p-4 text-slate-400 text-sm">AI is thinking...</div></div>}
        <div ref={endRef} />
      </div>
      <div className="flex gap-2">
        <Textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask the AI assistant..." className="flex-1" rows={2} onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(input); } }} />
        <Button onClick={() => sendMessage(input)} disabled={!input.trim() || loading}><Send className="h-4 w-4" /></Button>
      </div>
    </div>
  );
}
