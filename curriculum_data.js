// ============================================================================
// PyDuo Exam Quest - Complete Curriculum Database
// Syllabus: Class XII Computer Science (COMS) Semester - III (35 Marks)
// Unit 1: Python Programming (25 Marks) | Unit 2: E-Commerce (10 Marks)
// ============================================================================

const CURRICULUM = {
  units: [
    {
      id: "unit-1",
      title: "Unit 1: Python Programming",
      subtitle: "25 Marks • 80 Hours of Pure Coding Mastery",
      badge: "🐍 Python Core",
      color: "#58cc02",
      accent: "#46a302",
      stages: [
        {
          id: 1,
          code: "PY-01",
          title: "Python Genesis & Tokens",
          icon: "🚀",
          desc: "Interactive vs Script mode, Tokens (Keywords, Identifiers, Literals, Punctuators), L-values & R-values, Comments",
          summary: "Python is a high-level, interpreted, dynamically typed language. Code can be run interactively (REPL) or via script files (.py). Every program is made of tokens: the smallest individual units of code.",
          lessons: [
            {
              id: "1-1",
              title: "Interactive vs Script Mode & Tokens",
              xp: 20,
              mascotDialogue: "Welcome cadet! In Python, every single word and symbol is classified into strict categories called Tokens. Let's conquer them!",
              explanation: `
### 🧠 High-Level Explanation: Modes & Tokens
1. **Interactive Mode (REPL)**:
   - Prompt \`>>>\` executes statements **immediately** line-by-line.
   - Great for testing small snippets, but commands are not saved to disk permanently.
2. **Script Mode**:
   - Code is written in a \`.py\` file and executed as a whole unit by the interpreter.
   - Essential for real-world applications, reusability, and project pipelines.
3. **Tokens (Lexical Units)**:
   - **Keywords**: Reserved words with special meanings (e.g. \`def\`, \`if\`, \`while\`, \`True\`, \`False\`, \`None\`). Cannot be used as variable names! Note: \`True\`, \`False\`, \`None\` are capitalized.
   - **Identifiers**: User-defined names for variables, functions, and classes. Rules: Must begin with letter or underscore (\`_\`), followed by letters, digits, or \`_\`. No special characters (no \`$\`, \`@\`, \`-\`), and case-sensitive!
   - **Literals**: Fixed data values directly written in code (Numeric: \`42\`, \`3.14\`, \`2+3j\`; String: \`"Hello"\`; Boolean: \`True\`; Special: \`None\`).
   - **Punctuators**: Structural characters: \`(\`, \`)\`, \`[\`, \`]\`, \`{\`, \`}\`, \`:\`, \`,\`, \`.\`, \`;\`, \`=\`.
              `,
              questions: [
                {
                  id: "q1-1-1",
                  type: "mcq",
                  prompt: "Which of the following is an INVALID Python identifier?",
                  code: null,
                  options: [
                    "_total_marks",
                    "student_2",
                    "2nd_rank",
                    "RollNumber"
                  ],
                  correctIndex: 2,
                  explanation: "Identifiers cannot start with a digit! `2nd_rank` starts with '2', violating Python's identifier naming grammar.",
                  voicePrompt: "Cadet, select the invalid identifier."
                },
                {
                  id: "q1-1-2",
                  type: "voice",
                  prompt: "Speak aloud: Which mode in Python displays the `>>>` prompt and executes statements line-by-line?",
                  acceptableAnswers: ["interactive mode", "interactive", "the interactive mode"],
                  hint: "Say: 'Interactive mode'",
                  explanation: "Interactive mode (also called REPL - Read Evaluate Print Loop) shows the `>>>` prompt and gives immediate feedback on every expression.",
                  voicePrompt: "Speak your answer: Which mode displays the triple greater than prompt?"
                },
                {
                  id: "q1-1-3",
                  type: "spot_bug",
                  prompt: "Click or select the token that causes a SyntaxError in this variable assignment:",
                  code: "for = 50",
                  buggedWord: "for",
                  options: ["for", "=", "50"],
                  correctIndex: 0,
                  explanation: "`for` is a reserved keyword in Python used for iteration. Reserved keywords cannot be used as variable identifiers!",
                  voicePrompt: "Spot the token causing the syntax error."
                }
              ]
            },
            {
              id: "1-2",
              title: "L-Values, R-Values & Comments",
              xp: 25,
              mascotDialogue: "In every assignment statement `A = B`, what can sit on the left vs right? Let's uncover L-values and R-values!",
              explanation: `
### 🧠 High-Level Explanation: L-Values vs R-Values
- **L-Value (Left-hand value)**:
  - Refers to a **memory location** that can receive and hold data.
  - An L-value MUST be a valid variable or mutable data container (e.g. \`x\`, \`lst[0]\`).
  - An expression or literal CANNOT be an L-value (e.g. \`10 = x\` or \`a + b = 5\` throws \`SyntaxError: cannot assign to expression\`).
- **R-Value (Right-hand value)**:
  - Refers to the actual **data value or expression** evaluated to produce a result.
  - Can be any valid literal, variable, function return, or mathematical expression (e.g. \`x = a + 15\`).
- **Comments**:
  - Single-line: \`# This is a comment\`
  - Multi-line docstring: Triple-quoted string \`''' ... '''\` or \`""" ... """\` not assigned to any variable.
              `,
              questions: [
                {
                  id: "q1-2-1",
                  type: "mcq",
                  prompt: "What error will Python produce when executing: `10 = score`?",
                  code: "10 = score",
                  options: [
                    "SyntaxError: cannot assign to literal / expression",
                    "ValueError: invalid number",
                    "TypeError: mismatched types",
                    "Runs successfully assigning 10 to score"
                  ],
                  correctIndex: 0,
                  explanation: "L-values must be assignable memory locations (variables). A literal like 10 cannot sit as an L-value!",
                  voicePrompt: "What error occurs when trying to assign to a literal?"
                },
                {
                  id: "q1-2-2",
                  type: "fill_blank",
                  prompt: "Complete the code to create a single-line comment:",
                  codeTemplate: "___ This stores student marks\nmarks = 95",
                  blankToken: "#",
                  options: ["#", "//", "/*", "--"],
                  correctIndex: 0,
                  explanation: "Python uses the hash symbol `#` for single-line comments.",
                  voicePrompt: "Which symbol denotes a single-line comment in Python?"
                }
              ]
            }
          ]
        },
        {
          id: 2,
          code: "PY-02",
          title: "Knowledge of Data Types & Mutability",
          icon: "🧱",
          desc: "Numbers (int, float, complex), Booleans, None, Sequences (str, list, tuple), Mapping (dict), Mutable vs Immutable",
          summary: "Python categorizes all data into specific types. Understanding mutable (changeable in-place) vs immutable (fixed memory footprint) is the #1 most tested concept in board exams!",
          lessons: [
            {
              id: "2-1",
              title: "Numbers, Booleans & Complex Data",
              xp: 20,
              mascotDialogue: "Numbers in Python are super versatile! Did you know Python integers have unlimited precision? Let's inspect complex numbers and booleans.",
              explanation: `
### 🧠 High-Level Explanation: Number Types
1. **Integer (\`int\`)**: Whole numbers, positive or negative. In Python 3, integers have **arbitrary precision** (limited only by your machine's memory).
2. **Floating-point (\`float\`)**: Numbers with decimal points, represented using IEEE 754 64-bit double precision (e.g. \`3.14\`, \`2.5e-3\`).
3. **Complex (\`complex\`)**: Written in the form \`a + bj\` where \`a\` is real and \`b\` is imaginary, with \`j\` representing $\\sqrt{-1}$.
   - Example: \`z = 3 + 4j\`; \`z.real\` is \`3.0\`, \`z.imag\` is \`4.0\`.
4. **Boolean (\`bool\`)**: Subclass of \`int\` with only two values: \`True\` (evaluates to 1) and \`False\` (evaluates to 0).
5. **NoneType (\`None\`)**: Represents the absence of a value or a null object. Only one instance exists (singleton).
              `,
              questions: [
                {
                  id: "q2-1-1",
                  type: "mcq",
                  prompt: "What is the output of the following expression: `type(4 + 3j)`?",
                  code: "print(type(4 + 3j))",
                  options: [
                    "<class 'complex'>",
                    "<class 'imaginary'>",
                    "<class 'float'>",
                    "<class 'tuple'>"
                  ],
                  correctIndex: 0,
                  explanation: "Numbers with a real and imaginary part (with suffix 'j') belong to the built-in `<class 'complex'>`.",
                  voicePrompt: "What is the type of 4 plus 3j?"
                },
                {
                  id: "q2-1-2",
                  type: "mcq",
                  prompt: "What is the evaluated output of: `True + True + False` in Python?",
                  code: "print(True + True + False)",
                  options: ["2", "True", "3", "TypeError"],
                  correctIndex: 0,
                  explanation: "In Python, `bool` is a subclass of `int`. `True` evaluates to 1 and `False` evaluates to 0. So 1 + 1 + 0 = 2!",
                  voicePrompt: "What is True plus True plus False in Python?"
                }
              ]
            },
            {
              id: "2-2",
              title: "Mutable vs Immutable Data Types",
              xp: 30,
              mascotDialogue: "Beware! This is the most famous question in Class XII Computer Science! Can you modify an object in-place without changing its memory address `id()`?",
              explanation: `
### 🧠 High-Level Explanation: Mutability Manifesto
- **Immutable Types** (CANNOT be modified in-place):
  - \`int\`, \`float\`, \`complex\`, \`bool\`
  - \`str\` (Strings cannot be altered in-place: \`s[0] = 'a'\` will raise \`TypeError\`!)
  - \`tuple\` (Fixed sequence)
  - When you 'modify' an immutable variable, Python creates an entirely **new object** with a new \`id()\`.
- **Mutable Types** (CAN be altered in-place):
  - \`list\` (Can append, pop, sort, modify items: \`lst[0] = 99\`)
  - \`dict\` (Can add/update keys: \`d['a'] = 100\`)
  - \`set\` (Can add/remove elements)
- **Board Exam Trap**:
  - A tuple is immutable, but if it contains a mutable element (like a list: \`t = (1, [2, 3])\`), the inner list CAN be modified!
              `,
              questions: [
                {
                  id: "q2-2-1",
                  type: "match",
                  prompt: "Match each data type to its Mutability Category:",
                  pairs: [
                    { left: "List [1, 2, 3]", right: "Mutable" },
                    { left: "String 'Exam'", right: "Immutable" },
                    { left: "Tuple (10, 20)", right: "Immutable" },
                    { left: "Dictionary {'a': 1}", right: "Mutable" }
                  ],
                  explanation: "Lists and Dictionaries can be modified in-place (Mutable). Strings and Tuples cannot be changed once created (Immutable).",
                  voicePrompt: "Classify lists, strings, tuples, and dictionaries by mutability."
                },
                {
                  id: "q2-2-2",
                  type: "mcq",
                  prompt: "What happens when you run: `s = 'Python'; s[0] = 'J'`?",
                  code: "s = 'Python'\ns[0] = 'J'",
                  options: [
                    "TypeError: 'str' object does not support item assignment",
                    "s becomes 'Jython'",
                    "ValueError: immutable index",
                    "SyntaxError: invalid assignment"
                  ],
                  correctIndex: 0,
                  explanation: "Strings in Python are immutable! Attempting to assign to an indexed string character raises a `TypeError`.",
                  voicePrompt: "What happens when you try to change a character in a string?"
                }
              ]
            }
          ]
        },
        {
          id: 3,
          code: "PY-03",
          title: "Operators, Precedence & I/O",
          icon: "⚡",
          desc: "Arithmetic, Relational, Logical, Identity (is/is not), Membership (in/not in), Precedence, Implicit/Explicit Type Conversion, input() & print()",
          summary: "Master the rules of evaluation! Understand the crucial difference between equality `==` vs identity `is`, and why floor division `//` with negative numbers rounds down towards negative infinity.",
          lessons: [
            {
              id: "3-1",
              title: "Arithmetic & Floor Division Quirks",
              xp: 25,
              mascotDialogue: "Floor division `//` always rounds down to the nearest lower integer. Watch what happens with negative numbers!",
              explanation: `
### 🧠 High-Level Explanation: Operators Deep-Dive
1. **Division Operators**:
   - True division \`/\`: Always returns a \`float\`. \`7 / 2 -> 3.5\`, \`6 / 3 -> 2.0\`.
   - Floor division \`//\`: Rounds down towards negative infinity ($\\\\lfloor x \\\\rfloor$).
     * \`7 // 2 -> 3\`
     * \`-7 // 2 -> -4\` (NOT -3! -4 is lower than -3.5!)
   - Modulus \`%\`: Remainder of division: \`a % b = a - (a // b) * b\`.
     * \`-7 % 2 -> 1\` (because \`-7 - (-4 * 2) = -7 + 8 = 1\`).
   - Exponentiation \`**\`: Evaluated from **right to left** (Right-associative).
     * \`2 ** 3 ** 2 = 2 ** (3 ** 2) = 2 ** 9 = 512\` (NOT 64!).
2. **Precedence Hierarchy (Highest to Lowest)**:
   - \`()\` (Parentheses)
   - \`**\` (Exponentiation - right-associative)
   - \`+x, -x, ~x\` (Unary plus, minus, bitwise NOT)
   - \`*, /, //, %\` (Multiplication, division, floor div, remainder)
   - \`+, -\` (Addition, subtraction)
   - \`==, !=, <, <=, >, >=\` (Comparison)
   - \`is, is not\` (Identity)
   - \`in, not in\` (Membership)
   - \`not\` -> \`and\` -> \`or\` (Logical operators)
              `,
              questions: [
                {
                  id: "q3-1-1",
                  type: "mcq",
                  prompt: "What is the output of `-7 // 2` in Python?",
                  code: "print(-7 // 2)",
                  options: ["-4", "-3", "-3.5", "3"],
                  correctIndex: 0,
                  explanation: "Floor division always rounds DOWN to the smaller integer. Since -3.5 lies between -3 and -4, rounding down gives -4.",
                  voicePrompt: "What is negative seven floor divided by two?"
                },
                {
                  id: "q3-1-2",
                  type: "mcq",
                  prompt: "What is the value of `2 ** 3 ** 2`?",
                  code: "print(2 ** 3 ** 2)",
                  options: ["512", "64", "36", "18"],
                  correctIndex: 0,
                  explanation: "Exponentiation `**` is right-associative! First `3 ** 2 = 9`, then `2 ** 9 = 512`.",
                  voicePrompt: "What is two to the power of three to the power of two?"
                }
              ]
            },
            {
              id: "3-2",
              title: "Identity vs Equality & Type Conversion",
              xp: 25,
              mascotDialogue: "Does `a == b` mean `a is b`? Absolutely not! Let's master identity vs equality and `input()` mechanics.",
              explanation: `
### 🧠 High-Level Explanation: Identity, Membership & I/O
1. **Equality (\`==\`) vs Identity (\`is\`)**:
   - \`==\` checks if the **values** of two objects are equal.
   - \`is\` checks if two variables point to the **exact same memory location** (\`id(a) == id(b)\`).
   - Example: \`a = [1, 2]\`; \`b = [1, 2]\`. Here \`a == b\` is \`True\`, but \`a is b\` is \`False\` because they are separate list objects in memory!
2. **Type Conversion**:
   - **Implicit Conversion**: Python automatically promotes smaller types to larger types to avoid loss of data (e.g. \`5 + 2.0 -> 7.0\`).
   - **Explicit Conversion (Type Casting)**: Programmer manually converts type using functions like \`int("45")\`, \`float(10)\`, \`str(100)\`, \`list((1, 2))\`.
3. **Console Input & Output**:
   - \`input(prompt)\`: **ALWAYS** returns a string (\`str\`)! To perform math, you must cast it: \`n = int(input())\`.
   - \`print(*objects, sep=' ', end='\\n')\`: Default separator is space, default end is newline.
              `,
              questions: [
                {
                  id: "q3-2-1",
                  type: "mcq",
                  prompt: "Given `x = [1, 2, 3]` and `y = [1, 2, 3]`, what do `x == y` and `x is y` evaluate to?",
                  code: "x = [1, 2, 3]\ny = [1, 2, 3]\nprint(x == y, x is y)",
                  options: [
                    "True False",
                    "True True",
                    "False False",
                    "False True"
                  ],
                  correctIndex: 0,
                  explanation: "`x == y` is True because the values are identical. But `x is y` is False because two separate list instances are allocated in memory!",
                  voicePrompt: "What are the boolean results of x equals y and x is y for distinct identical lists?"
                },
                {
                  id: "q3-2-2",
                  type: "voice",
                  prompt: "What is the return data type of the built-in `input()` function in Python?",
                  acceptableAnswers: ["string", "str", "string type", "class str"],
                  hint: "Say: 'String' or 'str'",
                  explanation: "`input()` always captures user input as a string (`<class 'str'>`), requiring explicit type casting for numeric calculations.",
                  voicePrompt: "What data type does the input function always return?"
                }
              ]
            }
          ]
        },
        {
          id: 4,
          code: "PY-04",
          title: "Errors & Flow of Control",
          icon: "🔍",
          desc: "Syntax vs Logical vs Runtime Errors, Indentation, Sequential, Conditional, Iterative Flow & Flowcharts",
          summary: "Learn to diagnose errors like a pro board examiner and trace flowchart execution pathways.",
          lessons: [
            {
              id: "4-1",
              title: "The Three Error Kingdoms & Indentation",
              xp: 25,
              mascotDialogue: "Every programmer meets errors! Can you distinguish a compile-time Syntax Error from a tricky Runtime or Logical bug?",
              explanation: `
### 🧠 High-Level Explanation: Error Categorization
1. **Syntax Errors**:
   - Violates the grammatical syntax rules of Python.
   - Caught by the parser **before** program execution begins!
   - Examples: Missing colon \`:\` after an \`if\`, unmatched parentheses, misspelled keywords (\`whlie\` instead of \`while\`), or invalid indentation.
2. **Runtime Errors (Exceptions)**:
   - Program syntax is valid, but an illegal operation occurs **during execution**, causing abnormal program termination.
   - Examples: \`ZeroDivisionError\` (\`10 / 0\`), \`IndexError\` (index out of range), \`ValueError\` (\`int('abc')\`), \`NameError\` (using an undefined variable).
3. **Logical Errors**:
   - The program runs to completion without crashing, but produces **incorrect output** due to flawed logic.
   - Examples: Writing \`area = length + breadth\` instead of \`length * breadth\`, off-by-one errors in loops.
4. **Indentation**:
   - Python uses whitespace indentation instead of curly braces \`{}\` or \`begin/end\` blocks to define code block scope.
   - Inconsistent indentation triggers \`IndentationError\`.
              `,
              questions: [
                {
                  id: "q4-1-1",
                  type: "mcq",
                  prompt: "Dividing a number by zero (`x = 10 / 0`) produces which type of error?",
                  code: "x = 10 / 0",
                  options: [
                    "Runtime Error (ZeroDivisionError)",
                    "Syntax Error",
                    "Logical Error",
                    "Semantic Warning"
                  ],
                  correctIndex: 0,
                  explanation: "The syntax is valid, so the parser passes it, but the processor crashes at runtime when trying to divide by zero.",
                  voicePrompt: "What type of error is division by zero?"
                },
                {
                  id: "q4-1-2",
                  type: "mcq",
                  prompt: "In standard flowcharting, which geometric shape represents a Decision / Conditional test?",
                  options: [
                    "Diamond",
                    "Rectangle",
                    "Parallelogram",
                    "Oval"
                  ],
                  correctIndex: 0,
                  explanation: "Diamond represents Decision (if/else), Oval represents Start/Stop (terminal), Parallelogram represents Input/Output, and Rectangle represents Process/Calculation.",
                  voicePrompt: "Which shape in a flowchart represents a decision?"
                }
              ]
            }
          ]
        },
        {
          id: 5,
          code: "PY-05",
          title: "Conditionals & Iterative Statements",
          icon: "🔄",
          desc: "if-elif-else, flowcharts, programs: absolute value, sort 3 numbers, divisibility; for loop, range(), while loop, break & continue, patterns, series, factorial",
          summary: "Drive program flow with branches and loops! Master range() indexing, loop else clauses, and classic exam programs.",
          lessons: [
            {
              id: "5-1",
              title: "Conditionals: if, elif, else & Sorting 3 Numbers",
              xp: 25,
              mascotDialogue: "Conditionals make decisions! Let's explore multi-way branching and finding the maximum or sorting 3 numbers.",
              explanation: `
### 🧠 High-Level Explanation: Conditional Flow
- **Structure**:
  \`\`\`python
  if condition_1:
      # Block 1
  elif condition_2:
      # Block 2
  else:
      # Fallback block
  \`\`\`
- **Key Exam Programs**:
  1. **Absolute Value**:
     \`\`\`python
     def absolute_val(n):
         return n if n >= 0 else -n
     \`\`\`
  2. **Divisibility Check**:
     \`\`\`python
     if num % 3 == 0 and num % 5 == 0:
         print("Divisible by both 3 and 5")
     \`\`\`
  3. **Sorting 3 Numbers without \`.sort()\`**:
     Using nested comparisons to arrange \`a, b, c\` in ascending order.
              `,
              questions: [
                {
                  id: "q5-1-1",
                  type: "mcq",
                  prompt: "What will be printed by this code if `x = 15`?",
                  code: `x = 15
if x % 3 == 0:
    print("A", end="")
if x % 5 == 0:
    print("B", end="")
else:
    print("C", end="")`,
                  options: ["AB", "A", "B", "ABC"],
                  correctIndex: 0,
                  explanation: "Notice these are two independent `if` statements! The first `if x % 3 == 0` evaluates True (prints 'A'). The second `if x % 5 == 0` also evaluates True (prints 'B'). Total output: 'AB'.",
                  voicePrompt: "What is printed when x is 15?"
                }
              ]
            },
            {
              id: "5-2",
              title: "Loops: for, while, range() & Loop Else",
              xp: 30,
              mascotDialogue: "Loops automate repetition! The `range()` function has 3 parameters: start, stop, and step. Stop is NEVER included!",
              explanation: `
### 🧠 High-Level Explanation: Iterative Statements
1. **The \`range(start, stop[, step])\` Function**:
   - Generates an immutable sequence of integers.
   - \`start\`: default is \`0\`.
   - \`stop\`: **EXCLUDED** (runs up to \`stop - 1\`).
   - \`step\`: default is \`1\`. Can be negative to step backwards!
   - Example: \`list(range(5, 0, -2)) -> [5, 3, 1]\`.
2. **Break vs Continue**:
   - \`break\`: Exits the loop immediately, jumping to the first statement after the loop.
   - \`continue\`: Skips the rest of the **current iteration** and jumps to the next loop evaluation.
3. **Loop \`else\` Suite**:
   - Python loops have an optional \`else\` clause!
   - It executes ONLY if the loop finishes **normally** (without hitting a \`break\` statement).
4. **Classic Factorial Program**:
   \`\`\`python
   fact = 1
   for i in range(1, n + 1):
       fact *= i
   \`\`\`
              `,
              questions: [
                {
                  id: "q5-2-1",
                  type: "mcq",
                  prompt: "What is the output of `list(range(10, 2, -3))`?",
                  code: "print(list(range(10, 2, -3)))",
                  options: [
                    "[10, 7, 4]",
                    "[10, 7, 4, 1]",
                    "[10, 8, 6, 4, 2]",
                    "[7, 4, 1]"
                  ],
                  correctIndex: 0,
                  explanation: "Starting at 10, decrementing by 3: 10, 7, 4. The next value would be 1, but the stop condition is 2 (stop is exclusive!), so it halts at 4.",
                  voicePrompt: "What does list range from 10 to 2 with step minus 3 produce?"
                },
                {
                  id: "q5-2-2",
                  type: "mcq",
                  prompt: "When does the `else` block of a `for` loop execute?",
                  code: `for i in range(3):
    pass
else:
    print("Done")`,
                  options: [
                    "Only when the loop terminates normally without encountering break",
                    "Every time after each iteration",
                    "Only if an error occurs in the loop",
                    "Never; for loops cannot have an else block"
                  ],
                  correctIndex: 0,
                  explanation: "In Python, a loop's `else` block executes only when the iteration completes naturally without being halted by `break`.",
                  voicePrompt: "When does a loop else clause execute?"
                }
              ]
            }
          ]
        },
        {
          id: 6,
          code: "PY-06",
          title: "Strings Deep Dive",
          icon: "🧵",
          desc: "String operations (concatenation, repetition, membership, slicing), traversing, and all 23 built-in methods!",
          summary: "Strings are immutable sequences of Unicode characters. Master slicing syntax `s[start:stop:step]` and all 23 official syllabus methods.",
          lessons: [
            {
              id: "6-1",
              title: "String Slicing, Indexing & Operations",
              xp: 25,
              mascotDialogue: "Slicing is a superpower! Negative indices count backwards from -1. `s[::-1]` reverses any string in a flash!",
              explanation: `
### 🧠 High-Level Explanation: Slicing Mastery
- **Indexing**:
  - Positive: \`0\` to \`len(s) - 1\` (Left to Right).
  - Negative: \`-1\` (last character) down to \`-len(s)\` (first character).
- **Slicing Syntax**: \`s[start:stop:step]\`
  - \`start\`: inclusive. Default is 0 (or end if step < 0).
  - \`stop\`: **exclusive**.
  - \`step\`: increment.
  - Examples with \`s = "COMPUTER"\`:
    * \`s[1:4] -> "OMP"\`
    * \`s[::2] -> "CMUE"\`
    * \`s[::-1] -> "RETUPMOC"\` (Reverse!)
- **Operators**:
  - Concatenation: \`"Py" + "thon" -> "Python"\`
  - Repetition: \`"Go!" * 3 -> "Go!Go!Go!"\`
  - Membership: \`"put" in "computer" -> True\`
              `,
              questions: [
                {
                  id: "q6-1-1",
                  type: "mcq",
                  prompt: "Given `s = 'EXAMINATION'`, what does `s[2:7]` evaluate to?",
                  code: "s = 'EXAMINATION'\nprint(s[2:7])",
                  options: ["AMINA", "AMINA T", "MINAT", "XAMIN"],
                  correctIndex: 0,
                  explanation: "Indices: E(0), X(1), A(2), M(3), I(4), N(5), A(6), T(7)... Index 2 is 'A', up to but not including index 7 ('T'). Result is 'AMINA'.",
                  voicePrompt: "What is s sliced from 2 to 7 for EXAMINATION?"
                },
                {
                  id: "q6-1-2",
                  type: "voice",
                  prompt: "Speak aloud: What is the Python slicing syntax to reverse a string `s`?",
                  acceptableAnswers: ["s colon colon minus one", "s[::-1]", "s brackets colon colon minus one", "s open bracket colon colon minus 1 close bracket"],
                  hint: "Say: 's bracket colon colon minus one bracket' or 's[::-1]'",
                  explanation: "`s[::-1]` uses a default start, default stop, and a step of -1 to reverse the entire string.",
                  voicePrompt: "How do you reverse a string using slicing?"
                }
              ]
            },
            {
              id: "6-2",
              title: "The 23 Syllabus String Methods",
              xp: 35,
              mascotDialogue: "The WBCHSE syllabus specifies 23 string methods! Let's conquer each one: capitalize vs title, find vs index, split vs partition!",
              explanation: `
### 🧠 High-Level Explanation: Official 23 Methods
1. **Case Conversion**:
   - \`capitalize()\`: Capitalizes ONLY the first character of the string, lowers all others.
   - \`title()\`: Capitalizes the first letter of **every word**.
   - \`lower()\`, \`upper()\`: Converts entire string to lowercase/uppercase.
2. **Search & Count**:
   - \`count(sub)\`: Returns number of non-overlapping occurrences.
   - \`find(sub)\`: Returns lowest index if found, or **\`-1\`** if NOT found (No error!).
   - \`index(sub)\`: Same as \`find()\`, BUT raises **\`ValueError\`** if NOT found!
   - \`startswith(prefix)\`, \`endswith(suffix)\`: Returns boolean.
3. **Validation Methods (Return True/False)**:
   - \`isalnum()\`: True if all characters are alphanumeric (letters or numbers) and len > 0.
   - \`isalpha()\`: True if all characters are alphabetic.
   - \`isdigit()\`: True if all characters are digits.
   - \`islower()\`, \`isupper()\`: True if cased characters are all lowercase/uppercase.
   - \`isspace()\`: True if string contains only whitespace characters (\`' '\`, \`'\\t'\`, \`'\\n'\`).
4. **Trimming & Splitting**:
   - \`strip()\`, \`lstrip()\`, \`rstrip()\`: Trims whitespace from both/left/right sides.
   - \`replace(old, new)\`: Replaces occurrences of substring.
   - \`join(iterable)\`: Joins iterable of strings using caller string as delimiter (e.g. \`'-'.join(['A', 'B']) -> 'A-B'\`).
   - \`partition(sep)\`: Splits at FIRST occurrence of sep and returns a **3-tuple**: \`(head, sep, tail)\`.
   - \`split(sep)\`: Splits string by delimiter and returns a **list** of substrings!
              `,
              questions: [
                {
                  id: "q6-2-1",
                  type: "mcq",
                  prompt: "What does `'Python'.find('z')` return vs `'Python'.index('z')`?",
                  options: [
                    "find returns -1, index raises ValueError",
                    "Both return -1",
                    "Both raise ValueError",
                    "find returns None, index returns 0"
                  ],
                  correctIndex: 0,
                  explanation: "This is a classic board exam trap! `find()` returns -1 when a substring is missing, whereas `index()` raises a `ValueError`.",
                  voicePrompt: "What is the difference between find and index when an item is not found?"
                },
                {
                  id: "q6-2-2",
                  type: "mcq",
                  prompt: "What is the return value of `'user@school.edu'.partition('@')`?",
                  code: "print('user@school.edu'.partition('@'))",
                  options: [
                    "('user', '@', 'school.edu')",
                    "['user', 'school.edu']",
                    "('user', 'school.edu')",
                    "'user'"
                  ],
                  correctIndex: 0,
                  explanation: "`partition(sep)` always returns a 3-element tuple: (string before separator, the separator itself, string after separator).",
                  voicePrompt: "What does partition at the at symbol return?"
                }
              ]
            }
          ]
        },
        {
          id: 7,
          code: "PY-07",
          title: "Lists & Tuples Arena",
          icon: "📦",
          desc: "Lists: indexing, operations, all methods (append, extend, insert, pop, remove, sort/sorted, etc.), nested lists, linear search, frequency. Tuples: immutability, assignment, nested tuples.",
          summary: "Lists are mutable sequences; Tuples are immutable sequences. Master methods, nested access, and fundamental algorithms.",
          lessons: [
            {
              id: "7-1",
              title: "List Methods & Algorithms (Search & Frequency)",
              xp: 30,
              mascotDialogue: "Lists are dynamic arrays! Understand the vital difference between `append()` and `extend()`, plus `sort()` vs `sorted()`.",
              explanation: `
### 🧠 High-Level Explanation: List Methods & Algorithms
1. **Adding Elements**:
   - \`append(x)\`: Appends object \`x\` as a **single element** at the end. \`[1, 2].append([3, 4]) -> [1, 2, [3, 4]]\`.
   - \`extend(iterable)\`: Iterates over the argument and adds each element individually. \`[1, 2].extend([3, 4]) -> [1, 2, 3, 4]\`.
   - \`insert(index, x)\`: Inserts \`x\` at the given index, shifting subsequent elements right.
2. **Removing Elements**:
   - \`remove(x)\`: Searches for the first occurrence of value \`x\` and removes it. Raises \`ValueError\` if not found.
   - \`pop([index])\`: Removes and **returns** element at index (default is the last element \`-1\`).
3. **Sorting**:
   - \`lst.sort()\`: Modifies the original list **in-place** and returns \`None\`!
   - \`sorted(lst)\`: Leaves the original list untouched and returns a **brand-new sorted list**.
4. **Key Syllabus Programs**:
   - **Linear Search**: Iterates through list comparing each item with the target key.
   - **Frequency Count**: Using \`lst.count(x)\` or dictionary tally.
   - **Statistics**: \`min(lst)\`, \`max(lst)\`, \`sum(lst) / len(lst)\` for mean.
              `,
              questions: [
                {
                  id: "q7-1-1",
                  type: "mcq",
                  prompt: "Given `lst = [10, 20]`, what is the result of `lst.append([30, 40])` vs `lst.extend([30, 40])`?",
                  options: [
                    "append adds a nested list [10, 20, [30, 40]], extend flattens to [10, 20, 30, 40]",
                    "Both produce [10, 20, 30, 40]",
                    "append throws TypeError",
                    "extend adds a nested list"
                  ],
                  correctIndex: 0,
                  explanation: "`append` adds its argument as a single object (resulting in a nested list of length 3), while `extend` unpacks iterable elements (resulting in length 4).",
                  voicePrompt: "Explain the difference between append and extend."
                },
                {
                  id: "q7-1-2",
                  type: "mcq",
                  prompt: "What is printed by: `lst = [3, 1, 2]; res = lst.sort(); print(res)`?",
                  code: "lst = [3, 1, 2]\nres = lst.sort()\nprint(res)",
                  options: ["None", "[1, 2, 3]", "[3, 2, 1]", "TypeError"],
                  correctIndex: 0,
                  explanation: "The in-place method `list.sort()` sorts the list directly and returns `None`. To get the sorted list as a return value, use `sorted(lst)`!",
                  voicePrompt: "What is the return value of list dot sort?"
                }
              ]
            },
            {
              id: "7-2",
              title: "Tuples: Immutability, Unpacking & Operations",
              xp: 25,
              mascotDialogue: "Tuples are write-protected lists! Remember: a single-element tuple MUST have a trailing comma, like `(5,)`!",
              explanation: `
### 🧠 High-Level Explanation: Tuples
1. **Creation**:
   - Empty tuple: \`t = ()\` or \`tuple()\`.
   - Single-element tuple: \`t = (5,)\` (With comma! \`t = (5)\` is just an integer!).
2. **Operations**:
   - Concatenation (\`+\`), Repetition (\`*\`), Indexing, Slicing, Membership (\`in\`).
   - Built-in methods: \`count(x)\`, \`index(x)\`. (Tuples have no \`append\`, \`remove\`, or \`sort\` because they are immutable!).
3. **Tuple Assignment / Unpacking**:
   - Assigning multiple variables simultaneously:
     \`\`\`python
     a, b, c = (10, 20, 30)
     # Swapping variables effortlessly in Python:
     a, b = b, a
     \`\`\`
4. **Nested Tuples**: Tuples can contain other tuples or lists: \`t = (1, 2, (3, 4))\`.
              `,
              questions: [
                {
                  id: "q7-2-1",
                  type: "mcq",
                  prompt: "What is the type of `t = (42)` in Python?",
                  code: "t = (42)\nprint(type(t))",
                  options: [
                    "<class 'int'>",
                    "<class 'tuple'>",
                    "<class 'list'>",
                    "SyntaxError"
                  ],
                  correctIndex: 0,
                  explanation: "Without a trailing comma, parentheses are treated as grouping parentheses for the integer 42! To create a single-element tuple, write `(42,)`.",
                  voicePrompt: "What is the type of variable t equals open paren 42 close paren?"
                }
              ]
            }
          ]
        },
        {
          id: 8,
          code: "PY-08",
          title: "Dictionaries & Python Modules",
          icon: "📖",
          desc: "Dict methods: get, update, keys, values, items, pop, popitem, setdefault, fromkeys. Modules: math (pi, e, sqrt, ceil, floor, pow, fabs, sin, cos, tan), random (random, randint, randrange), statistics (mean, median, mode).",
          summary: "Dictionaries provide key-value lookups with unique, immutable keys. Modules extend Python with math, randomness, and statistical analysis.",
          lessons: [
            {
              id: "8-1",
              title: "Dictionary Operations & Built-in Methods",
              xp: 30,
              mascotDialogue: "Dictionaries are hash tables! Keys must be immutable (strings, numbers, tuples). Values can be anything!",
              explanation: `
### 🧠 High-Level Explanation: Dictionary Mastery
1. **Structure & Mutability**:
   - Key-value pairs: \`d = {'roll': 101, 'name': 'Aditi'}\`.
   - Keys must be **immutable and unique**.
2. **Accessing & Modifying**:
   - \`d['name']\`: Returns value. If key doesn't exist, raises \`KeyError\`!
   - \`d.get(key, default)\`: Safe lookup. Returns default value (or \`None\`) if key is absent without throwing an error.
   - \`d['marks'] = 98\`: Adds a new key or updates an existing one.
3. **Core Methods**:
   - \`keys()\`, \`values()\`, \`items()\`: Returns view objects of keys, values, or \`(key, value)\` pairs.
   - \`update(other_dict)\`: Merges key-value pairs from another dictionary.
   - \`pop(key[, default])\`: Removes key and returns its value.
   - \`popitem()\`: Removes and returns the **last inserted** \`(key, value)\` pair as a tuple.
   - \`setdefault(key, default)\`: Returns value if key exists; if not, inserts key with default.
   - \`fromkeys(seq, value)\`: Creates new dictionary with keys from sequence and specified value.
              `,
              questions: [
                {
                  id: "q8-1-1",
                  type: "mcq",
                  prompt: "What will `d.get('age', 18)` return if `'age'` is NOT present in dictionary `d`?",
                  options: [
                    "18",
                    "KeyError",
                    "None",
                    "0"
                  ],
                  correctIndex: 0,
                  explanation: "`dict.get(key, default)` returns the fallback default value (18) when the key does not exist, avoiding a KeyError.",
                  voicePrompt: "What does get with a fallback default return when the key is missing?"
                },
                {
                  id: "q8-1-2",
                  type: "mcq",
                  prompt: "Which of the following CANNOT be used as a dictionary key?",
                  options: [
                    "[1, 2, 3]",
                    "(1, 2, 3)",
                    "'score'",
                    "100"
                  ],
                  correctIndex: 0,
                  explanation: "Dictionary keys must be hashable and immutable! A list `[1, 2, 3]` is mutable, so it cannot serve as a dictionary key (raises `TypeError: unhashable type: 'list'`).",
                  voicePrompt: "Which data structure cannot be a dictionary key?"
                }
              ]
            },
            {
              id: "8-2",
              title: "Standard Modules: math, random & statistics",
              xp: 30,
              mascotDialogue: "Batteries included! Let's explore Python's math functions, random number generation, and statistics.",
              explanation: `
### 🧠 High-Level Explanation: Official Syllabus Modules
1. **\`math\` Module**:
   - Constants: \`math.pi\` ($3.14159...$), \`math.e\` ($2.71828...$).
   - Functions:
     * \`math.ceil(4.1) -> 5\` (Smallest integer $\\ge x$).
     * \`math.floor(4.9) -> 4\` (Largest integer $\\le x$).
     * \`math.sqrt(16) -> 4.0\` (Square root, returns float).
     * \`math.pow(x, y) -> x ** y\` (Always returns float!).
     * \`math.fabs(-5.5) -> 5.5\` (Absolute float value).
     * \`math.sin(x)\`, \`math.cos(x)\`, \`math.tan(x)\`: Trigonometric values where \`x\` is in **radians**.
2. **\`random\` Module**:
   - \`random.random()\`: Float in range \`[0.0, 1.0)\` (1.0 is exclusive).
   - \`random.randint(a, b)\`: Integer in range \`[a, b]\` (**BOTH endpoints inclusive**!).
   - \`random.randrange(start, stop[, step])\`: Integer in range \`[start, stop)\` (**stop is exclusive**!).
3. **\`statistics\` Module**:
   - \`statistics.mean(data)\`: Arithmetic average.
   - \`statistics.median(data)\`: Middle value.
   - \`statistics.mode(data)\`: Most frequently occurring value.
              `,
              questions: [
                {
                  id: "q8-2-1",
                  type: "mcq",
                  prompt: "What is the difference between `random.randint(1, 6)` and `random.randrange(1, 6)`?",
                  options: [
                    "randint can return 6, randrange stops at 5 (exclusive)",
                    "randrange can return 6, randint stops at 5",
                    "randint returns floats, randrange returns ints",
                    "There is no difference"
                  ],
                  correctIndex: 0,
                  explanation: "This is a favourite board exam question! `randint(a, b)` includes both endpoints (1 to 6 inclusive), whereas `randrange(a, b)` excludes the stop value (1 to 5).",
                  voicePrompt: "What is the key difference between randint and randrange endpoints?"
                },
                {
                  id: "q8-2-2",
                  type: "mcq",
                  prompt: "What is the value of `math.ceil(-3.4)` in Python?",
                  code: "import math\nprint(math.ceil(-3.4))",
                  options: ["-3", "-4", "-3.0", "-3.5"],
                  correctIndex: 0,
                  explanation: "`ceil` returns the smallest integer greater than or equal to x. Since -3 is greater than -3.4, `math.ceil(-3.4)` is -3.",
                  voicePrompt: "What is math dot ceil of negative 3.4?"
                }
              ]
            }
          ]
        },
        {
          id: 9,
          code: "PY-09",
          title: "Functions & Variable Scope",
          icon: "⚙️",
          desc: "Built-in, module, user-defined functions; arguments vs parameters (default, positional), return values, execution flow, global vs local scope.",
          summary: "Functions package reusable logic. Understand positional vs default argument ordering rules and how the `global` keyword alters scope.",
          lessons: [
            {
              id: "9-1",
              title: "Function Definitions, Parameters & Return",
              xp: 25,
              mascotDialogue: "Functions encapsulate logic! Remember: default arguments must ALWAYS follow non-default positional arguments!",
              explanation: `
### 🧠 High-Level Explanation: Function Mechanics
1. **Definition Syntax**:
   \`\`\`python
   def function_name(param1, param2=default_val):
       # Function body
       return result
   \`\`\`
2. **Parameters vs Arguments**:
   - **Parameters**: Variables defined in the function header (formal parameters).
   - **Arguments**: Actual values passed into the function call (actual parameters).
3. **Parameter Rules**:
   - **Positional Arguments**: Matched by position from left to right.
   - **Default Arguments**: Have default values. **RULE**: Non-default arguments cannot follow default arguments! E.g. \`def f(a=1, b):\` is a \`SyntaxError: non-default argument follows default argument\`.
4. **Returning Values**:
   - If a function reaches the end without a \`return\` statement, it implicitly returns \`None\`.
   - Returning multiple values: \`return x, y\` bundles them as a **tuple**!
              `,
              questions: [
                {
                  id: "q9-1-1",
                  type: "mcq",
                  prompt: "Which function header definition causes a SyntaxError?",
                  options: [
                    "def calc(a=10, b):",
                    "def calc(a, b=10):",
                    "def calc(a, b, c=5):",
                    "def calc(a=1, b=2):"
                  ],
                  correctIndex: 0,
                  explanation: "In Python, default arguments must always follow positional arguments. You cannot have a non-default parameter `b` after a default parameter `a=10`.",
                  voicePrompt: "Which function header causes a syntax error?"
                }
              ]
            },
            {
              id: "9-2",
              title: "Scope Rules: Local vs Global & `global` Keyword",
              xp: 25,
              mascotDialogue: "Where does a variable live? Local variables die when the function finishes; global variables live throughout the module!",
              explanation: `
### 🧠 High-Level Explanation: Scope Hierarchy (LEGB)
1. **Local Scope**:
   - Variables created inside a function body.
   - Accessible only within that function and destroyed when the function returns.
2. **Global Scope**:
   - Variables defined at the top level of a module or file.
   - Accessible anywhere in the file.
3. **Modifying a Global Variable**:
   - Reading a global variable inside a function is allowed by default.
   - To **reassign or modify** a global variable inside a function, you must declare it with the \`global\` keyword:
   \`\`\`python
   x = 10
   def modify():
       global x
       x = 20
   \`\`\`
   - Without \`global x\`, assigning \`x = 20\` creates a new **local** variable named \`x\`, leaving the global \`x\` unchanged!
              `,
              questions: [
                {
                  id: "q9-2-1",
                  type: "mcq",
                  prompt: "What is printed by the following code?",
                  code: `x = 5
def foo():
    x = 10
foo()
print(x)`,
                  options: ["5", "10", "UnboundLocalError", "None"],
                  correctIndex: 0,
                  explanation: "Inside `foo()`, `x = 10` creates a local variable `x`. The global variable `x` remains 5!",
                  voicePrompt: "What is the printed value of x after calling foo without the global keyword?"
                }
              ]
            }
          ]
        },
        {
          id: 10,
          code: "PY-10",
          title: "Exception Handling Fortress",
          icon: "🛡️",
          desc: "Handling runtime exceptions using try-except-finally blocks, preventing crashes, execution flow.",
          summary: "Exceptions are runtime errors that disrupt normal execution. With try-except-finally, your code becomes resilient and crash-proof.",
          lessons: [
            {
              id: "10-1",
              title: "The try-except-finally Block",
              xp: 25,
              mascotDialogue: "Don't let your code crash! The `finally` block ALWAYS runs, even if an exception occurs or a return statement is hit!",
              explanation: `
### 🧠 High-Level Explanation: Exception Architecture
1. **Syntax**:
   \`\`\`python
   try:
       # Code that might cause an error
       res = 10 / 0
   except ZeroDivisionError:
       # Executed only if ZeroDivisionError occurs
       print("Cannot divide by zero!")
   except (ValueError, TypeError) as e:
       # Multiple exceptions handled together
       print("Data error:", e)
   else:
       # Executed ONLY if NO exception was raised in try
       print("Success!")
   finally:
       # ALWAYS executed, no matter what! (e.g. closing files/DBs)
       print("Cleanup complete.")
   \`\`\`
2. **Why use Exception Handling?**:
   - Ensures **graceful degradation** instead of ugly crash dumps for end-users.
   - Guarantees cleanup operations (like closing network sockets or file streams in \`finally\`).
              `,
              questions: [
                {
                  id: "q10-1-1",
                  type: "mcq",
                  prompt: "Which block in a try-except-finally structure is guaranteed to ALWAYS execute?",
                  options: [
                    "finally",
                    "except",
                    "else",
                    "try"
                  ],
                  correctIndex: 0,
                  explanation: "The `finally` block always executes, regardless of whether an exception occurred, was handled, or even if `return` was called!",
                  voicePrompt: "Which block in exception handling is guaranteed to always run?"
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "unit-2",
      title: "Unit 2: E-Commerce",
      subtitle: "10 Marks • 20 Hours of Digital Business Architecture",
      badge: "🛒 E-Commerce & Systems",
      color: "#1cb0f6",
      accent: "#1899d6",
      stages: [
        {
          id: 11,
          code: "EC-01",
          title: "Introduction to E-Commerce & 11 Business Models",
          icon: "🌐",
          desc: "Definition, main activities, goals, technical components, functions, pros/cons, scope, E-Commerce vs E-Business, 11 Models: B2B, B2C, C2C, C2G, G2G, B2G, B2P, B2A, P2P, C2A.",
          summary: "E-Commerce is the buying and selling of goods/services online. E-Business is the broader superset encompassing all digital business processes.",
          lessons: [
            {
              id: "11-1",
              title: "E-Commerce Fundamentals vs E-Business",
              xp: 25,
              mascotDialogue: "Welcome to Unit 2! Did you know E-Commerce is just one part of E-Business? Let's clarify this foundational board exam distinction.",
              explanation: `
### 🧠 High-Level Explanation: E-Commerce Foundations
1. **Definition of E-Commerce**:
   - The buying, selling, and exchanging of goods, services, and information over electronic networks, primarily the Internet.
2. **E-Commerce vs E-Business**:
   - **E-Commerce** is a **subset** of E-Business focused on commercial transactions between a company and its external customers, suppliers, or partners.
   - **E-Business** is the broader concept that includes E-Commerce PLUS internal business processes (ERP, CRM, digital supply chain management, human resources, collaborative product design).
3. **Technical Components**:
   - Client devices (browsers, apps), Web Application Servers, Database Management Systems (DBMS), Secure Payment Gateways, Network/Internet infrastructure, and Security protocols (SSL/TLS encryption, Firewalls).
4. **Advantages & Disadvantages**:
   - *Advantages*: 24/7 global availability, reduced overhead/operational costs, direct price comparisons, elimination of middlemen.
   - *Disadvantages*: Inability to physically inspect items, shipping delays, security/privacy risks, reliance on network availability.
              `,
              questions: [
                {
                  id: "q11-1-1",
                  type: "mcq",
                  prompt: "What is the relationship between E-Commerce and E-Business?",
                  options: [
                    "E-Commerce is a subset of E-Business",
                    "E-Business is a subset of E-Commerce",
                    "Both terms are 100% synonymous and interchangeable",
                    "They are completely unrelated fields"
                  ],
                  correctIndex: 0,
                  explanation: "E-Business is the overarching framework encompassing all digitized business functions (HR, ERP, manufacturing, CRM); E-Commerce is the specific subset involving electronic transactions and sales.",
                  voicePrompt: "What is the relationship between E-Commerce and E-Business?"
                }
              ]
            },
            {
              id: "11-2",
              title: "The 11 Electronic Business Models",
              xp: 30,
              mascotDialogue: "From B2B to C2G, who is trading with whom? Let's master all 11 business models from your syllabus!",
              explanation: `
### 🧠 High-Level Explanation: The 11 E-Commerce Models
- **B2B (Business-to-Business)**: Businesses trading with businesses (e.g. Alibaba, auto-parts supplier to car manufacturer). Largest in transaction volume!
- **B2C (Business-to-Consumer)**: Businesses selling directly to retail consumers (e.g. Amazon, Flipkart, Netflix).
- **C2C (Consumer-to-Consumer)**: Consumers selling to other consumers via an intermediary platform (e.g. eBay, OLX, Quikr).
- **C2B (Consumer-to-Business)**: Consumers offering products/services to businesses (e.g. freelance platforms like Upwork, influencer marketing, stock photography).
- **B2G (Business-to-Government)**: Businesses supplying goods/services to government agencies (e.g. military procurement, municipal software contracts).
- **C2G / C2A (Consumer-to-Government / Administration)**: Citizens interacting with government (e.g. paying income tax online, renewing vehicle licenses, utility bills).
- **G2G (Government-to-Government)**: Electronic data and communication exchange between different government departments or nations.
- **B2A (Business-to-Administration)**: Transactions between business companies and public administration.
- **P2P / B2P (Peer-to-Peer / Business-to-Person)**: Direct decentralized exchange without central servers (e.g. blockchain, torrents, direct peer payments like Venmo).
              `,
              questions: [
                {
                  id: "q11-2-1",
                  type: "mcq",
                  prompt: "A citizen paying their municipal property tax on an online government portal is an example of which model?",
                  options: [
                    "C2G (Consumer-to-Government) / C2A",
                    "B2B",
                    "B2C",
                    "C2C"
                  ],
                  correctIndex: 0,
                  explanation: "When individual citizens/consumers transact with government administration (like paying taxes or renewing licenses), it represents C2G / C2A.",
                  voicePrompt: "Which model represents a citizen paying taxes online to the government?"
                },
                {
                  id: "q11-2-2",
                  type: "match",
                  prompt: "Match the online platform to its primary E-Commerce model:",
                  pairs: [
                    { left: "Amazon / Flipkart", right: "B2C" },
                    { left: "OLX / eBay Auction", right: "C2C" },
                    { left: "Intel supplying Dell", right: "B2B" },
                    { left: "Paying Income Tax Online", right: "C2G" }
                  ],
                  explanation: "Amazon is B2C, OLX is C2C, Intel supplying Dell is B2B, and paying taxes online is C2G/C2A.",
                  voicePrompt: "Match platforms to their e-commerce business models."
                }
              ]
            }
          ]
        },
        {
          id: 12,
          code: "EC-02",
          title: "Network Architecture & Web Promotion",
          icon: "📡",
          desc: "Internet, Intranet & Extranet, Role of Internet in B2B Application, Web promotion, Banners, Banner Exchange, Shopping Bots.",
          summary: "Compare open global Internet, secure corporate Intranets, and partner Extranets. Understand web promotion tools like Shopping Bots and Banner Exchanges.",
          lessons: [
            {
              id: "12-1",
              title: "Internet vs Intranet vs Extranet",
              xp: 25,
              mascotDialogue: "Who has access? Public, internal employees only, or trusted business partners? Let's differentiate these three networks!",
              explanation: `
### 🧠 High-Level Explanation: Network Triad
1. **Internet**:
   - A globally connected public network of computers communicating via TCP/IP.
   - Open access to anyone with an ISP connection worldwide.
2. **Intranet**:
   - A private, secure internal network accessible **ONLY to internal members/employees** of an organization.
   - Protected by corporate firewalls; used for internal company notices, HR portals, and employee data.
3. **Extranet**:
   - A secured private network extension that allows **authorized external partners, suppliers, or customers** access to specific parts of an intranet.
   - Example: A car manufacturer providing access to parts suppliers to monitor assembly line inventory in real-time.
              `,
              questions: [
                {
                  id: "q12-1-1",
                  type: "mcq",
                  prompt: "A network that allows authorized external suppliers to access an organization's inventory data is called an:",
                  options: [
                    "Extranet",
                    "Intranet",
                    "Internet",
                    "Ethernet"
                  ],
                  correctIndex: 0,
                  explanation: "An Extranet provides controlled access from the outside to trusted business partners and vendors.",
                  voicePrompt: "What network allows external authorized suppliers to connect to internal systems?"
                }
              ]
            },
            {
              id: "12-2",
              title: "Web Promotion: Banners, Exchanges & Shopping Bots",
              xp: 25,
              mascotDialogue: "How do websites get discovered and help users compare prices? Meet Banner Exchanges and intelligent Shopping Bots!",
              explanation: `
### 🧠 High-Level Explanation: Promotion Tools & Shopping Bots
1. **Banner Advertising**:
   - Graphical image/video advertisements placed on web pages. Clicking the banner redirects the user to the advertiser's landing page.
2. **Banner Exchange**:
   - A cooperative advertising network where participating websites display each other's banner ads based on an agreed credit ratio (e.g. for every 2 ads shown on your site, your ad is shown once on another network site).
3. **Shopping Bots (Shopbots)**:
   - Intelligent software agent programs (crawlers) that automatically search across dozens of online shopping websites to compare product prices, features, availability, and delivery times for consumers (e.g. Google Shopping, PriceGrabber).
              `,
              questions: [
                {
                  id: "q12-2-1",
                  type: "mcq",
                  prompt: "What is an automated software agent that compares prices and features across multiple e-commerce websites called?",
                  options: [
                    "Shopping Bot",
                    "Search Engine Crawler",
                    "Firewall Agent",
                    "EDI Translator"
                  ],
                  correctIndex: 0,
                  explanation: "Shopping Bots (shopbots) are automated tools that query multiple retail databases to aggregate and compare product pricing.",
                  voicePrompt: "What is an automated software agent that compares product prices online called?"
                }
              ]
            }
          ]
        },
        {
          id: 13,
          code: "EC-03",
          title: "Electronic Data Interchange (EDI)",
          icon: "📑",
          desc: "Concepts of EDI, limitations, applications, disadvantages, EDI model & translation.",
          summary: "EDI allows automated computer-to-computer exchange of standard business documents like purchase orders and invoices without human intervention.",
          lessons: [
            {
              id: "13-1",
              title: "EDI Concepts, Architecture & Model",
              xp: 25,
              mascotDialogue: "Say goodbye to paper invoices! EDI replaces physical mail and manual typing with standardized machine-to-machine transactions.",
              explanation: `
### 🧠 High-Level Explanation: EDI Architecture
1. **Definition of EDI**:
   - The structured computer-to-computer transmission of standard business documents (Purchase Orders, Invoices, Shipping Notices) between business trading partners using standardized electronic formats without human intervention.
2. **EDI 4-Step Model**:
   - Step 1: Internal application produces document (e.g. Purchase Order).
   - Step 2: **EDI Translation Software** converts internal data into standard EDI format (e.g. ANSI X12 or UN/EDIFACT).
   - Step 3: EDI document is securely transmitted over a communication network (VAN - Value Added Network or Internet/AS2).
   - Step 4: Recipient system translates EDI standard back into their internal ERP/database format.
3. **Applications**:
   - Retail supply chains (automated inventory replenishment like Walmart), automotive manufacturing (Just-In-Time delivery), healthcare insurance claims.
              `,
              questions: [
                {
                  id: "q13-1-1",
                  type: "mcq",
                  prompt: "What is the primary role of EDI Translation Software?",
                  options: [
                    "Converts internal business documents into standardized EDI formats and vice versa",
                    "Translates English text into French for international shipping",
                    "Acts as a firewall against viruses",
                    "Scans paper documents using OCR"
                  ],
                  correctIndex: 0,
                  explanation: "EDI translation software maps and converts native application files into standardized EDI syntax (like ANSI X12 / EDIFACT) so different computer systems understand each other.",
                  voicePrompt: "What is the function of EDI translation software?"
                }
              ]
            },
            {
              id: "13-2",
              title: "Advantages & Limitations of EDI",
              xp: 25,
              mascotDialogue: "EDI is fast and accurate, but why doesn't every tiny corner shop use it? High setup cost and rigid standards!",
              explanation: `
### 🧠 High-Level Explanation: EDI Pros & Cons
- **Advantages**:
  - High speed and elimination of postal transit time.
  - Elimination of manual data entry errors.
  - Paperless operations and reduced administrative costs.
  - Enables **JIT (Just-In-Time)** inventory management.
- **Limitations & Disadvantages**:
  - **High Initial Setup Cost**: Expensive EDI translation software, hardware, and maintenance.
  - **Standard Rigidity**: Format standards (ANSI X12, UN/EDIFACT) are complex and rigid.
  - **Trading Partner Compliance**: Both trading partners must agree on identical standards, communication protocols, and validation rules.
  - Requires dedicated technical expertise.
              `,
              questions: [
                {
                  id: "q13-2-1",
                  type: "mcq",
                  prompt: "Which of the following is a major limitation/disadvantage of traditional EDI?",
                  options: [
                    "High initial implementation and maintenance costs",
                    "Slow transmission speeds",
                    "High manual data entry error rate",
                    "Excessive paper consumption"
                  ],
                  correctIndex: 0,
                  explanation: "EDI requires substantial capital investment in software, VAN networks, and partner integration, which makes it challenging for small businesses.",
                  voicePrompt: "Name a major disadvantage of traditional EDI systems."
                }
              ]
            }
          ]
        },
        {
          id: 14,
          code: "EC-04",
          title: "Electronic Payment Systems (EPS)",
          icon: "💳",
          desc: "Types of EPS, Payment types, Value Exchange System, Credit Card System, Electronic Fund Transfer (EFT), Paperless bill, Modern Payment Cash, Electronic Cash.",
          summary: "Explore digital money mechanics: Value exchange systems, the 4-party credit card ecosystem, EFT, paperless billing, and anonymous e-cash.",
          lessons: [
            {
              id: "14-1",
              title: "Value Exchange & Credit Card System",
              xp: 25,
              mascotDialogue: "What happens when you swipe or enter a credit card? An intricate dance between cardholder, merchant, acquiring bank, and issuing bank!",
              explanation: `
### 🧠 High-Level Explanation: Credit Card & Value Exchange
1. **Value Exchange System**:
   - A financial framework that enables the electronic transfer of monetary value between buyer and seller accounts through regulated financial institutions.
2. **The 4 Key Parties in Credit Card Processing**:
   - **Cardholder**: The consumer holding the credit card.
   - **Merchant**: The online store or business accepting the payment.
   - **Acquiring Bank (Merchant's Bank)**: The bank that processes card payments on behalf of the merchant.
   - **Issuing Bank (Cardholder's Bank)**: The bank that issued the credit card and extends credit to the buyer.
3. **Transaction Steps**:
   - *Authorization*: Checking if card is valid and has sufficient credit limit.
   - *Clearing*: Transaction details transferred between acquiring and issuing banks.
   - *Settlement*: Actual transfer of funds into merchant's account.
              `,
              questions: [
                {
                  id: "q14-1-1",
                  type: "mcq",
                  prompt: "In a credit card transaction, which financial institution issues the credit card to the consumer?",
                  options: [
                    "Issuing Bank",
                    "Acquiring Bank",
                    "Payment Gateway Provider",
                    "Merchant Institution"
                  ],
                  correctIndex: 0,
                  explanation: "The Issuing Bank is the consumer's bank that provides the card, while the Acquiring Bank manages the merchant's account.",
                  voicePrompt: "Which bank issues the credit card to the customer?"
                }
              ]
            },
            {
              id: "14-2",
              title: "EFT, Paperless Billing & Electronic Cash",
              xp: 25,
              mascotDialogue: "Digital cash mimics physical cash: anonymous, instant, and divisible. Let's explore EFT and paperless bills!",
              explanation: `
### 🧠 High-Level Explanation: EFT & Electronic Cash
1. **Electronic Fund Transfer (EFT)**:
   - Direct computer-to-computer electronic transfer of money from one bank account to another without any physical paper checks or currency involved (e.g. NEFT, RTGS, IMPS, ACH).
2. **Paperless Billing (EBPP - Electronic Bill Presentment and Payment)**:
   - Companies send digital invoices (via email or online customer portals) and customers pay directly online. Eliminates printing, postage, and check clearing delays.
3. **Electronic Cash (E-Cash / Digital Cash)**:
   - A digital representation of legal tender stored in electronic form (smart cards, digital wallets).
   - *Key Properties*: Anonymity (protects buyer identity), Divisibility (can make micro-payments), Transferability, and Cryptographic Security (prevents **double-spending**!).
              `,
              questions: [
                {
                  id: "q14-2-1",
                  type: "mcq",
                  prompt: "Which critical security issue must an Electronic Cash system prevent?",
                  options: [
                    "Double-spending (spending the same digital token twice)",
                    "Paper waste",
                    "Over-speeding of Internet packets",
                    "High resolution graphics"
                  ],
                  correctIndex: 0,
                  explanation: "Because digital files can be copied infinitely, e-cash systems must employ cryptographic checks or central ledgers to prevent 'double-spending'.",
                  voicePrompt: "What fundamental security risk must electronic cash prevent?"
                }
              ]
            }
          ]
        },
        {
          id: 15,
          code: "EC-05",
          title: "Internet Marketing & The E-Cycle",
          icon: "📈",
          desc: "Pros & Cons of online shopping, Justifying e-business, Marketing techniques (SEO, SEM, SMM, etc.), The 5-Phase E-cycle of Internet marketing, Personalization in E-Commerce.",
          summary: "Learn how modern businesses attract, convert, deliver, and retain customers through the 5-phase E-cycle and AI-driven personalization.",
          lessons: [
            {
              id: "15-1",
              title: "Pros & Cons of Online Shopping & Business Justification",
              xp: 25,
              mascotDialogue: "Why shop online? And why do businesses migrate to the web? Lower overhead, unlimited shelf space, and 24/7 global reach!",
              explanation: `
### 🧠 High-Level Explanation: Online Shopping Dynamics
- **Pros of Online Shopping**:
  - Convenience: Shop anytime (24/7/365) from home or mobile.
  - Price Comparison: Easy to compare prices across stores.
  - Vast Selection: No physical retail shelf constraints.
  - Customer Reviews: Social proof and rating insights.
- **Cons of Online Shopping**:
  - Inability to touch, smell, or try on products before buying.
  - Shipping latency and delivery uncertainties.
  - Security threats (identity theft, credit card skimming).
  - Return hassles.
- **Justifying an Internet Business**:
  - Substantially lower overhead costs (no prime retail rent, fewer sales staff).
  - Scalability: Ability to serve millions of customers simultaneously.
  - Rich customer analytics and precise targeting.
              `,
              questions: [
                {
                  id: "q15-1-1",
                  type: "mcq",
                  prompt: "Which of the following is considered a primary disadvantage of online shopping for consumers?",
                  options: [
                    "Inability to physically inspect the product before purchase",
                    "24/7 store availability",
                    "Availability of customer ratings and reviews",
                    "Direct home delivery"
                  ],
                  correctIndex: 0,
                  explanation: "The primary tactile drawback of online shopping is that buyers cannot physically feel, test, or try on goods prior to payment.",
                  voicePrompt: "What is a major consumer disadvantage of online shopping?"
                }
              ]
            },
            {
              id: "15-2",
              title: "Marketing Techniques, The 5-Phase E-Cycle & Personalization",
              xp: 30,
              mascotDialogue: "The E-cycle has 5 critical phases! And Personalization delivers that magic 'Recommended for You' experience.",
              explanation: `
### 🧠 High-Level Explanation: The 5-Phase E-Cycle & Personalization
1. **The 5 Phases of the E-Cycle**:
   - **Phase 1: Preparation**: Market research, identifying target audience, defining product value proposition.
   - **Phase 2: Customer Acquisition**: Driving traffic to the site using SEO, pay-per-click ads, social media, and content marketing.
   - **Phase 3: Transacting**: Converting visitors to buyers through intuitive UI, fast search, shopping cart, and secure checkout.
   - **Phase 4: Delivery & Fulfillment**: Order processing, inventory dispatch, courier tracking, and doorstep fulfillment.
   - **Phase 5: Retention & After-Sales Service**: Customer support, return handling, loyalty programs, email re-engagement.
2. **Internet Marketing Techniques**:
   - **SEO (Search Engine Optimization)**: Optimizing organic visibility in search results.
   - **SEM (Search Engine Marketing)**: Paid search advertising (PPC).
   - **Content & Affiliate Marketing**: Promoting products through influencers and affiliate links.
3. **Personalization in E-Commerce**:
   - Customizing product recommendations, dynamic pricing, and marketing messages based on individual user browsing behavior, past purchases, and preferences (e.g. Amazon's 'Frequently bought together').
              `,
              questions: [
                {
                  id: "q15-2-1",
                  type: "mcq",
                  prompt: "In the 5-phase E-cycle of Internet marketing, which phase focuses on converting site visitors into paying buyers?",
                  options: [
                    "Transacting",
                    "Preparation",
                    "Delivery",
                    "Acquisition"
                  ],
                  correctIndex: 0,
                  explanation: "The Transacting phase focuses on the checkout experience, shopping cart management, and payment processing to convert visitors into customers.",
                  voicePrompt: "Which phase of the e-cycle handles payment and cart conversion?"
                },
                {
                  id: "q15-2-2",
                  type: "voice",
                  prompt: "Speak aloud: What technique customizes product recommendations and offers based on a user's past browsing history?",
                  acceptableAnswers: ["personalization", "e-commerce personalization", "personalization in e-commerce", "personalized marketing"],
                  hint: "Say: 'Personalization'",
                  explanation: "Personalization dynamically tailors website content, discounts, and suggestions to individual shopper profiles.",
                  voicePrompt: "What e-commerce technique customizes suggestions based on user history?"
                }
              ]
            }
          ]
        }
      ]
    }
  ],

  // Comprehensive 35 Marks Board Mock Exam
  boardExam: {
    title: "Class XII WBCHSE Computer Science (COMS) Semester - III Mock Exam",
    totalMarks: 35,
    durationMinutes: 45,
    sections: [
      {
        sectionName: "Part A: Python Programming (25 Marks)",
        marks: 25,
        questions: [
          {
            id: "exam-p1",
            marks: 1,
            type: "mcq",
            q: "Which of the following is an immutable data type in Python?",
            options: ["List", "Dictionary", "Tuple", "Set"],
            answer: 2,
            solution: "Tuples cannot be altered once created; hence they are immutable."
          },
          {
            id: "exam-p2",
            marks: 1,
            type: "mcq",
            q: "What is the output of: `print(3 * 'Go' + '!')`?",
            options: ["GoGoGo!", "Go!Go!Go!", "3Go!", "SyntaxError"],
            answer: 0,
            solution: "Repetition `3 * 'Go'` gives 'GoGoGo', then concatenation with '!' yields 'GoGoGo!'."
          },
          {
            id: "exam-p3",
            marks: 1,
            type: "mcq",
            q: "What will `s.split()` return for `s = 'Python is fun'`?",
            options: ["['Python', 'is', 'fun']", "('Python', 'is', 'fun')", "'Pythonisfun'", "['Python is fun']"],
            answer: 0,
            solution: "`split()` with default whitespace delimiter returns a list of words."
          },
          {
            id: "exam-p4",
            marks: 1,
            type: "mcq",
            q: "What is the return type of `math.sqrt(25)`?",
            options: ["float", "int", "complex", "number"],
            answer: 0,
            solution: "`math.sqrt()` always returns a floating point number (5.0)."
          },
          {
            id: "exam-p5",
            marks: 2,
            type: "mcq",
            q: "What is the output of the following slice? `t = (10, 20, 30, 40, 50); print(t[1:4:2])`",
            options: ["(20, 40)", "(20, 30, 40)", "(10, 30)", "[20, 40]"],
            answer: 0,
            solution: "Slice starts at index 1 (20), stops before index 4 (50), with step 2: selects index 1 (20) and index 3 (40)."
          },
          {
            id: "exam-p6",
            marks: 2,
            type: "mcq",
            q: "Consider: `d = {'a': 1, 'b': 2}; d['b'] = 3; d['c'] = 4; print(len(d))`",
            options: ["3", "4", "2", "KeyError"],
            answer: 0,
            solution: "Updating existing key 'b' modifies its value without increasing length. Adding 'c' adds a new key. Final keys: 'a', 'b', 'c' (len = 3)."
          },
          {
            id: "exam-p7",
            marks: 3,
            type: "mcq",
            q: "What is the output of this code?\n```python\ndef change(x):\n    x = x + [40]\n    return x\n\nval = [10, 20, 30]\nprint(change(val))\nprint(val)\n```",
            options: [
              "[10, 20, 30, 40] and [10, 20, 30]",
              "[10, 20, 30, 40] and [10, 20, 30, 40]",
              "[40] and [10, 20, 30]",
              "TypeError"
            ],
            answer: 0,
            solution: "Notice `x = x + [40]` creates a NEW list assigned to local variable `x`, leaving caller list `val` unchanged! (If it used `x.append(40)` or `x += [40]`, it would mutate in place)."
          },
          {
            id: "exam-p8",
            marks: 4,
            type: "mcq",
            q: "Which exception is raised when executing: `d = {'math': 95}; print(d['science'])`?",
            options: ["KeyError", "IndexError", "ValueError", "TypeError"],
            answer: 0,
            solution: "Accessing a non-existent key using bracket notation `d[k]` triggers a `KeyError`."
          },
          {
            id: "exam-p9",
            marks: 10,
            type: "mcq",
            q: "Which function converts a binary string or numeric string explicitly to an integer in Python?",
            options: ["int()", "str()", "float()", "eval()"],
            answer: 0,
            solution: "`int('101', 2)` or `int('45')` performs explicit integer type conversion."
          }
        ]
      },
      {
        sectionName: "Part B: E-Commerce (10 Marks)",
        marks: 10,
        questions: [
          {
            id: "exam-ec1",
            marks: 2,
            type: "mcq",
            q: "Which of the following describes C2C E-Commerce?",
            options: [
              "Individuals selling items directly to other individuals via an online platform",
              "A business selling software to government defense",
              "A retail brand selling clothes to shoppers",
              "A manufacturer supplying wholesale components to a retailer"
            ],
            answer: 0,
            solution: "C2C (Consumer-to-Consumer) connects private individuals (e.g. OLX, eBay auction) through an intermediary portal."
          },
          {
            id: "exam-ec2",
            marks: 2,
            type: "mcq",
            q: "What is an Extranet?",
            options: [
              "A private network allowing authorized external business partners access to specific resources",
              "A public worldwide network of computers",
              "A network strictly restricted to internal employees only",
              "A hardware cable connecting two computers"
            ],
            answer: 0,
            solution: "An Extranet extends an organization's intranet to authorized external entities like vendors and partners."
          },
          {
            id: "exam-ec3",
            marks: 2,
            type: "mcq",
            q: "What is the primary function of a Shopping Bot?",
            options: [
              "To search across multiple retail websites and compare product prices and specifications",
              "To pack orders in physical warehouses",
              "To issue credit card chargebacks",
              "To install cookies on user browsers"
            ],
            answer: 0,
            solution: "Shopping bots crawl online merchants to aggregate and present comparative pricing to buyers."
          },
          {
            id: "exam-ec4",
            marks: 2,
            type: "mcq",
            q: "In Electronic Data Interchange (EDI), what role does standard formatting (like ANSI X12 or EDIFACT) play?",
            options: [
              "Ensures diverse computer systems can exchange documents without manual reformatting",
              "Adds watermarks to prevent copying",
              "Compacts images for faster display",
              "Calculates company sales taxes automatically"
            ],
            answer: 0,
            solution: "Standardized EDI formats establish a universal machine-readable syntax so different software programs understand business documents seamlessly."
          },
          {
            id: "exam-ec5",
            marks: 2,
            type: "mcq",
            q: "In an Electronic Payment System, which bank holds the merchant's payment account?",
            options: ["Acquiring Bank", "Issuing Bank", "Central Reserve Bank", "Clearing House"],
            answer: 0,
            solution: "The Acquiring Bank contracts with the merchant to accept credit/debit card payments, whereas the Issuing Bank provides cards to consumers."
          }
        ]
      }
    ]
  },

  // High-Level Revision Vault (Flashcards & Fast Notes)
  vaultNotes: [
    {
      topic: "Python Tokens",
      category: "Python Basics",
      keyRule: "Keywords are reserved words. Identifiers cannot start with numbers and cannot contain special symbols except underscore (_).",
      examWarning: "Remember that True, False, and None are capitalized in Python! Writing true or false will raise a NameError.",
      codeSnippet: "valid_name = 10\n_private = 'secret'\n# 2nd_var = 5  # SyntaxError!"
    },
    {
      topic: "Mutable vs Immutable",
      category: "Data Types",
      keyRule: "Immutable: int, float, complex, bool, str, tuple. Mutable: list, dict, set.",
      examWarning: "Tuples cannot be altered, but if a tuple holds a list: t = (1, [2, 3]), t[1].append(4) IS valid!",
      codeSnippet: "t = (1, [2, 3])\nt[1].append(4)\nprint(t)  # (1, [2, 3, 4])"
    },
    {
      topic: "Floor Division & Modulus",
      category: "Operators",
      keyRule: "// rounds DOWN towards negative infinity. % remainder follows: a % b = a - (a // b) * b.",
      examWarning: "-7 // 2 = -4 (NOT -3!). And -7 % 2 = 1.",
      codeSnippet: "print(-7 // 2)  # -4\nprint(-7 % 2)   # 1"
    },
    {
      topic: "String Slicing & 23 Methods",
      category: "Strings",
      keyRule: "s[start:stop:step]. stop is EXCLUDED. find() returns -1 on failure; index() raises ValueError.",
      examWarning: "partition(sep) returns a 3-tuple: (head, sep, tail). split(sep) returns a list!",
      codeSnippet: "s = 'apple-pie'\nprint(s.partition('-')) # ('apple', '-', 'pie')\nprint(s.split('-'))     # ['apple', 'pie']"
    },
    {
      topic: "List Methods vs Functions",
      category: "Lists",
      keyRule: "lst.sort() modifies list in place and returns None. sorted(lst) leaves original list intact and returns a new list.",
      examWarning: "append(x) adds single item. extend(x) unpacks iterable items. pop() removes & returns, remove() deletes by value.",
      codeSnippet: "a = [3, 1]\nprint(a.sort())    # None\nprint(sorted([3, 1])) # [1, 3]"
    },
    {
      topic: "Modules: math, random, statistics",
      category: "Modules",
      keyRule: "math.ceil(-3.2) is -3. random.randint(a, b) includes both a and b. random.randrange(a, b) excludes b.",
      examWarning: "randint(1, 6) can produce 6! randrange(1, 6) only produces 1 through 5.",
      codeSnippet: "import random\n# Both 1 and 6 are possible:\ndie = random.randint(1, 6)"
    },
    {
      topic: "Function Parameters & Scope",
      category: "Functions",
      keyRule: "Default parameters must come AFTER positional parameters. Use 'global' keyword to modify module-level variables inside a function.",
      examWarning: "def f(a=1, b) is an illegal SyntaxError!",
      codeSnippet: "x = 10\ndef foo():\n    global x\n    x += 5"
    },
    {
      topic: "E-Commerce vs E-Business",
      category: "E-Commerce",
      keyRule: "E-Commerce is buying & selling over electronic networks. E-Business is the broader superset encompassing all digital business processes.",
      examWarning: "Remember all 11 business models: B2B, B2C, C2C, C2B, B2G, C2G, G2G, B2P, B2A, P2P, C2A.",
      codeSnippet: "E-Business = E-Commerce + ERP + CRM + SCM + Internal HR"
    },
    {
      topic: "EDI Architecture & Model",
      category: "EDI",
      keyRule: "Computer-to-computer exchange of standard business documents without human intervention using ANSI X12 or UN/EDIFACT.",
      examWarning: "Major limitation: High initial cost and standard rigidity.",
      codeSnippet: "Native Doc -> EDI Translator -> EDI Standard -> Network (VAN/Internet) -> Receiver"
    },
    {
      topic: "Electronic Payment & E-Cash",
      category: "EPS",
      keyRule: "4 parties in credit card flow: Cardholder, Merchant, Acquiring Bank, Issuing Bank. E-cash must prevent double-spending.",
      examWarning: "Cardholder's bank = Issuing Bank. Merchant's bank = Acquiring Bank.",
      codeSnippet: "Buyer -> Payment Gateway -> Acquiring Bank -> Card Network -> Issuing Bank"
    }
  ]
};

// Export to window
if (typeof window !== "undefined") {
  window.CURRICULUM = CURRICULUM;
}
