# CLAUDE.md: The Official Guide to Using Claude for Personal Website Project

## 1. Introduction & Purpose

This guide serves as the definitive reference for leveraging Claude AI to enhance productivity and maintain consistency across the personal portfolio website project. By following these structured approaches, you'll be able to generate high-quality blog content, documentation, and code improvements that align with the project's technical stack (React 19, TypeScript, Vite) and design philosophy. This document ensures that all AI-assisted work maintains professional standards while significantly reducing the time investment required for content creation and technical tasks.

## 2. Core Principles for Prompting

- **Provide Context First**: Always share relevant project details (tech stack, file structure, existing patterns) before requesting specific outputs
- **Define Clear Personas**: Specify the role Claude should adopt (e.g., "Technical Writer specializing in Azure cloud infrastructure")
- **Request Specific Formats**: Explicitly state desired output format (Markdown, TypeScript interfaces, JSX components)
- **Iterate Progressively**: Break complex tasks into multiple prompts for better results
- **Include Examples**: When possible, provide examples of existing work to maintain consistency

## 3. Task-Specific Guides

### 3.1. How to Generate a Blog Post

#### Methodology Introduction

Creating professional blog posts for your technical portfolio requires a systematic three-phase approach. This methodology ensures consistency with your existing content while maintaining the high standards expected from cloud technology and IT operations expertise. Each phase builds upon the previous one, transforming raw ideas into polished, publication-ready articles.

#### **Phase 1: Ideation & Outline**

##### The Ideation Prompt Template

Copy and customize this prompt to begin your blog post creation:

```
You are a Technical Content Strategist specializing in [SPECIALIZATION: e.g., Azure cloud infrastructure, PowerShell automation, Microsoft Intune].

I need to create a blog post for my personal technical portfolio website. The site already features posts about Azure certifications, PowerShell automation, and device management.

Context:
- Topic: [YOUR TOPIC HERE]
- Target Audience: [e.g., IT professionals transitioning to cloud, enterprise IT administrators, DevOps engineers]
- Key Points to Cover: [List 3-5 main points]
- Desired Tone: Professional yet approachable, practical with real-world examples
- Length: [e.g., 800-1200 words, 5-7 minute read]

Please provide:
1. Three compelling title options that would appeal to my target audience
2. A brief description of the value this post will provide to readers
3. A detailed hierarchical outline with:
   - Main sections (##)
   - Subsections (###) where appropriate
   - Key points to cover in bullet form
   - Suggested examples or code snippets to include
4. Three relevant tags from my existing set or suggestions for new ones
5. An engaging excerpt (2-3 sentences) for the blog card preview
```

#### **Phase 2: Draft Generation**

##### The Draft Generation Prompt Template

After approving the outline, use this prompt:

```
You are now acting as a Technical Writer with deep expertise in [TOPIC AREA]. 

Using the following approved outline, write a complete first draft of the blog post in Markdown format.

[PASTE YOUR APPROVED OUTLINE HERE]

Requirements:
1. Write in clean, properly formatted Markdown from the start
2. Follow the outline structure precisely
3. Include:
   - An engaging introduction that hooks the reader
   - Practical examples and real-world scenarios
   - Code snippets where relevant (properly formatted with syntax highlighting)
   - Clear transitions between sections
   - A conclusion with actionable takeaways
4. Maintain a professional yet conversational tone
5. Use technical terms accurately but explain complex concepts clearly
6. Format for the metadata structure used in my blog system:
   - Include suggested slug (URL-friendly)
   - Include suggested featuredImage path
   - Include suggested category

Focus on substance and valuable content. Don't worry about perfect polish yet - we'll refine in the next step.
```

#### **Phase 3: Refinement & Formatting**

##### The Polish Prompt Template

For the final refinement phase:

```
Act as a Senior Technical Editor specializing in cloud technology and IT operations content.

Review and polish this blog post draft with the following objectives:

[PASTE YOUR DRAFT HERE]

Editing Tasks:
1. **Clarity & Conciseness**: 
   - Eliminate redundancy
   - Simplify complex sentences without losing technical accuracy
   - Ensure smooth flow between paragraphs

2. **Engagement & Value**:
   - Strengthen the introduction hook
   - Add transitional phrases where needed
   - Ensure each section provides clear value
   - Enhance the conclusion with specific next steps

3. **Technical Accuracy**:
   - Verify all technical terms are used correctly
   - Ensure code snippets follow best practices
   - Check that examples are realistic and applicable

4. **Markdown Formatting Excellence**:
   - Apply all formatting rules from the style guide below
   - Ensure consistent heading hierarchy
   - Optimize for readability on both desktop and mobile
   - Add appropriate emphasis to key concepts

5. **SEO & Metadata Optimization**:
   - Suggest an SEO-friendly title if needed
   - Ensure excerpt is compelling for click-through
   - Verify tags are relevant and searchable

Please provide the fully polished version ready for publication.
```

#### **Markdown Styling Guide: Best Practices for Professional Blog Posts**

##### Headers - Creating Clear Information Hierarchy

```markdown
# Never use H1 in blog content (reserved for post title)

## Main Sections - Key Topics
Use for primary divisions of your content (3-5 per post)

### Subsections - Supporting Details
Break down complex topics into digestible parts

#### Rarely Used - Specific Points
Only when absolutely necessary for clarity
```

##### Emphasis Patterns for Technical Writing

```markdown
**Bold** - Use for:
- Key terms on first introduction
- Important warnings or notes
- Action items or commands
- Technology/product names when first mentioned

*Italics* - Use for:
- Subtle emphasis
- Book/course titles
- Introducing new concepts
- File names and paths
```

##### Lists for Improved Scannability

**Unordered Lists** - Use when order doesn't matter:
```markdown
* Cloud service comparisons
* Feature listings
* Prerequisites or requirements
* Key takeaways
```

**Ordered Lists** - Use for sequential processes:
```markdown
1. Step-by-step instructions
2. Ranked items (best to worst)
3. Chronological events
4. Priority-based recommendations
```

##### Blockquotes for Authority & Emphasis

```markdown
> Use blockquotes to highlight important insights, expert opinions, 
> or critical warnings that readers shouldn't miss.

> **Pro Tip:** Combine blockquotes with bold for extra emphasis on 
> particularly valuable advice.
```

##### Code Formatting for Technical Clarity

**Inline Code** for short references:
```markdown
Use the `Get-AzureADUser` cmdlet to retrieve user information, or configure 
the `appSettings.json` file with your connection string.
```

**Code Blocks** with syntax highlighting:
````markdown
```powershell
# PowerShell example with syntax highlighting
$users = Get-AzureADUser -All $true | 
    Where-Object {$_.AccountEnabled -eq $true} |
    Select-Object DisplayName, UserPrincipalName
```

```typescript
// TypeScript example for React component
interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  tags: string[];
}
```
````

##### Links & Citations

```markdown
[Descriptive link text](https://url.com) - Never use "click here"

For documentation: [Azure Virtual Networks Documentation](https://docs.microsoft.com/azure/virtual-network/)

For tools: [Download PowerShell 7](https://github.com/PowerShell/PowerShell/releases)
```

##### Special Formatting Elements

**Tables** for comparing options:
```markdown
| Service | Use Case | Pricing Model |
|---------|----------|---------------|
| Azure VMs | Full control needed | Pay-per-minute |
| App Service | Web apps | Per App Service Plan |
| Functions | Event-driven | Pay-per-execution |
```

**Horizontal Rules** for major transitions:
```markdown
---
```

**Task Lists** for actionable content:
```markdown
- [x] Completed prerequisite
- [ ] Next action item
- [ ] Future consideration
```

#### **Blog Post Quality Checklist**

Before publishing, verify your post meets these standards:

- [ ] **Structure**: Clear hierarchy with 2-3 heading levels maximum
- [ ] **Length**: Matches target reading time (150-200 words per minute)
- [ ] **Value**: Each section provides actionable insights or knowledge
- [ ] **Formatting**: Consistent use of emphasis, lists, and code blocks
- [ ] **Accessibility**: Alt text for images, descriptive link text
- [ ] **Metadata**: Complete with slug, excerpt, tags, and featured image
- [ ] **Technical Accuracy**: All code snippets tested, commands verified
- [ ] **Engagement**: Strong hook, smooth flow, clear conclusion
- [ ] **Mobile-Friendly**: Short paragraphs, scannable structure

### 3.2. How to Document Code

#### Methodology Introduction

Great documentation accelerates development by making code self-explanatory and reducing the cognitive load of understanding complex systems. This systematic approach ensures your documentation adds value without creating maintenance burden.

#### **Phase 1: Code Analysis for Documentation**

##### The Documentation Analysis Prompt Template

```
You are a Senior Software Engineer specializing in TypeScript and React documentation best practices.

Analyze this code and identify what documentation would add the most value:

[PASTE YOUR CODE HERE]

Please provide:
1. Which parts are non-obvious and need explanation
2. Any complex business logic that needs context
3. Public APIs that other components will use
4. Performance considerations or trade-offs made
5. Dependencies or side effects that aren't immediately clear

Focus on documenting the "why" not the "what" - assume readers can understand syntax but need context for decisions.
```

#### **Phase 2: Documentation Generation**

##### The Documentation Generation Prompt Template

```
Acting as a Technical Documentation Expert, create comprehensive documentation for this code following these principles:

[PASTE YOUR CODE HERE]

Documentation Requirements:

1. **JSDoc Comments** for all exported functions/components:
   - Purpose and use cases
   - Parameter descriptions with types
   - Return value explanation
   - Example usage
   - Any side effects or warnings

2. **Inline Comments** only where necessary:
   - Complex algorithms or business logic
   - Workarounds or temporary solutions (with TODO/FIXME)
   - Performance optimizations
   - Non-obvious design decisions

3. **README Section** if this is a new module:
   - What problem it solves
   - How to use it
   - API reference
   - Common patterns

Keep documentation DRY - don't repeat what the code clearly shows. Make it maintainable - documentation that goes stale is worse than no documentation.
```

#### **Documentation Best Practices Checklist**

- [ ] **Clarity**: Would a new developer understand the purpose?
- [ ] **Completeness**: Are all public APIs documented?
- [ ] **Conciseness**: No redundant or obvious comments?
- [ ] **Currency**: Documentation matches actual implementation?
- [ ] **Examples**: Complex functions include usage examples?
- [ ] **Warnings**: Edge cases and gotchas highlighted?

### 3.3. How to Generate Unit Tests

#### Methodology Introduction

Well-structured tests serve as living documentation and safety nets for refactoring. This approach generates tests that are maintainable, comprehensive, and follow the principle of testing behavior, not implementation.

#### **Phase 1: Test Strategy Planning**

##### The Test Planning Prompt Template

```
You are a Test Engineer specializing in React Testing Library and modern testing practices.

Analyze this component/function and create a comprehensive test strategy:

[PASTE YOUR CODE HERE]

Provide a test plan that includes:
1. **Critical Paths**: What must never break
2. **Edge Cases**: Boundary conditions, null/undefined inputs
3. **User Interactions**: Click events, form submissions
4. **State Changes**: How component behaves across different states
5. **Integration Points**: API calls, external dependencies to mock
6. **Performance Concerns**: Any tests for render optimization

Follow the KISS principle - prefer simple, readable tests over clever abstractions.
```

#### **Phase 2: Test Generation with DRY Principles**

##### The Test Generation Prompt Template

```
As a Senior Test Engineer, generate comprehensive unit tests following these principles:

Component/Function to test:
[PASTE YOUR CODE HERE]

Test Requirements:
1. **Setup Utilities**: Create reusable test utilities to avoid repetition
   - Factory functions for test data
   - Custom render functions with common providers
   - Shared mocks for external dependencies

2. **Test Structure**:
   - Use descriptive test names that explain the behavior
   - Group related tests with describe blocks
   - Follow Arrange-Act-Assert pattern
   - One assertion per test when possible

3. **Coverage Goals**:
   - User interactions and outcomes
   - Error states and edge cases
   - Accessibility requirements
   - Component integration with props

Generate tests that are:
- Independent (no test depends on another)
- Repeatable (same results every run)
- Self-validating (clear pass/fail)
- Timely (fast execution)

Include custom test utilities to keep tests DRY and maintainable.
```

#### **Phase 3: Test Refactoring for Maintainability**

##### The Test Optimization Prompt Template

```
Review these tests and refactor for maximum maintainability:

[PASTE YOUR TESTS HERE]

Refactoring objectives:
1. **Eliminate Duplication**: Extract common setup, assertions, and data
2. **Improve Readability**: Make test intent immediately clear
3. **Reduce Brittleness**: Test behavior, not implementation details
4. **Add Test Utilities**: Create helpers for common patterns
5. **Optimize Performance**: Identify slow tests and improve them

Apply the DRY principle without sacrificing test clarity. Each test should still be understandable in isolation.
```

### 3.4. How to Create React Components

#### Methodology Introduction

Building components with flexibility and reusability from the start prevents technical debt and accelerates future development. This methodology ensures every component follows SOLID principles adapted for React.

#### **Phase 1: Component Design Analysis**

##### The Component Planning Prompt Template

```
You are a React Architect focused on creating flexible, reusable components.

I need to create a component for: [DESCRIBE THE FEATURE/UI ELEMENT]

Context:
- Where it will be used: [PAGES/SECTIONS]
- Data it will display: [DATA STRUCTURE]
- User interactions: [CLICKS, FORMS, ETC]
- Similar existing components: [IF ANY]

Analyze and provide:
1. **Component Breakdown**: Should this be one component or multiple?
2. **Props Interface**: What configuration should be exposed?
3. **State Management**: Local state vs props vs context?
4. **Reusability Opportunities**: How can this serve multiple use cases?
5. **Composition Pattern**: How will it work with other components?

Focus on KISS - start simple and extensible rather than trying to handle every possible future case.
```

#### **Phase 2: Component Generation with Clean Code Principles**

##### The Component Generation Prompt Template

```
As a Senior React Developer, create a component following clean code principles:

Component Requirements:
[PASTE REQUIREMENTS FROM PHASE 1]

Engineering Principles to Apply:

1. **Single Responsibility**: 
   - Component does one thing well
   - Extract complex logic to custom hooks
   - Separate concerns (data fetching, presentation, logic)

2. **DRY Implementation**:
   - Create utility functions for repeated logic
   - Use custom hooks for shared stateful logic
   - Extract constants and types to separate files

3. **Flexible Interface**:
   - Props for customization, not dozens of boolean flags
   - Composition-friendly (accepts children, render props if needed)
   - Sensible defaults with override capability

4. **Clean Code Structure**:
   - Clear variable/function names (no comments needed)
   - Early returns to reduce nesting
   - Destructure props for clarity
   - Group related logic together

5. **TypeScript Excellence**:
   - Comprehensive interfaces
   - Avoid 'any' types
   - Use generics where flexibility is needed

Generate a production-ready component that's immediately useful but easy to extend.
```

#### **Phase 3: Component Optimization and Patterns**

##### The Component Refactoring Prompt Template

```
Review this component and optimize it for maintainability and performance:

[PASTE YOUR COMPONENT HERE]

Optimization Tasks:

1. **Identify Repeated Patterns**:
   - Extract repeated JSX into sub-components
   - Create maps/configs for similar elements
   - Use composition to reduce duplication

2. **Performance Optimization**:
   - Add React.memo where beneficial
   - Implement useMemo/useCallback for expensive operations
   - Lazy load heavy dependencies

3. **Flexibility Improvements**:
   - Convert hardcoded values to props
   - Add variant props for common modifications
   - Enable style overrides through className props

4. **Code Simplification**:
   - Reduce conditional complexity
   - Extract complex logic to utilities
   - Simplify prop interfaces

Apply KISS principle: If a "clever" solution makes the code harder to understand, prefer the simple approach.
```

### 3.5. How to Optimize Existing Code

#### Methodology Introduction

Code optimization isn't just about performance - it's about making code more maintainable, testable, and adaptable to change. This systematic approach identifies and eliminates technical debt while preserving functionality.

#### **Phase 1: Code Audit for Optimization Opportunities**

##### The Code Analysis Prompt Template

```
You are a Code Quality Expert specializing in React and TypeScript optimization.

Audit this code for improvement opportunities:

[PASTE YOUR CODE HERE]

Analyze for:

1. **DRY Violations**:
   - Repeated code blocks
   - Similar functions with slight variations
   - Copy-pasted components with minor differences

2. **Complexity Issues**:
   - Functions doing too many things
   - Deeply nested conditionals
   - Long parameter lists
   - Complex prop drilling

3. **Performance Bottlenecks**:
   - Unnecessary re-renders
   - Missing memoization
   - Large bundle imports
   - Synchronous operations that could be async

4. **Maintainability Concerns**:
   - Tight coupling between components
   - Hard-coded values
   - Missing error boundaries
   - Inconsistent patterns

5. **TypeScript Improvements**:
   - Missing or weak types
   - Type assertions that could be type guards
   - Opportunities for generics

Prioritize improvements by impact: what changes would most improve the codebase?
```

#### **Phase 2: Refactoring for Clean Architecture**

##### The Refactoring Implementation Prompt Template

```
As a Refactoring Specialist, transform this code following clean code principles:

Original Code:
[PASTE CODE TO REFACTOR]

Problems Identified:
[LIST FROM PHASE 1]

Refactoring Approach:

1. **Extract and Abstract**:
   - Pull repeated logic into utilities
   - Create custom hooks for stateful logic
   - Build higher-order components for common patterns

2. **Simplify and Clarify**:
   - Break complex functions into smaller ones
   - Replace nested conditionals with early returns
   - Use descriptive variable names

3. **Optimize Performance**:
   - Implement proper memoization
   - Add code splitting where appropriate
   - Optimize re-render triggers

4. **Improve Flexibility**:
   - Replace hard-coded values with configuration
   - Add extension points for future features
   - Create cleaner interfaces

Ensure the refactored code is:
- Easier to test
- Easier to understand
- Easier to modify
- More performant

Keep changes incremental and testable - avoid big bang refactors.
```

#### **Phase 3: Pattern Library Creation**

##### The Pattern Extraction Prompt Template

```
Based on these refactoring patterns we've identified, create reusable utilities and components:

Repeated Patterns Found:
[PASTE PATTERNS FROM REFACTORING]

Create a mini-library of:

1. **Utility Functions**:
   - Data transformation helpers
   - Validation functions
   - Formatting utilities
   - API call wrappers

2. **Custom Hooks**:
   - Common state patterns
   - Data fetching abstractions
   - Event handler patterns
   - Form management

3. **Higher-Order Components/Wrappers**:
   - Error boundaries
   - Loading states
   - Authentication checks
   - Layout wrappers

4. **Type Definitions**:
   - Shared interfaces
   - Type guards
   - Generic types
   - Utility types

Each utility should:
- Have a single, clear purpose
- Be thoroughly tested
- Include usage examples
- Be documented with JSDoc

This creates a toolkit that prevents future code duplication and speeds development.
```

#### **Code Quality Metrics Checklist**

Before considering optimization complete, verify:

- [ ] **DRY Score**: No function/component logic repeated more than twice
- [ ] **Complexity**: No function longer than 50 lines
- [ ] **Dependencies**: No circular dependencies
- [ ] **Type Coverage**: 100% of exports have proper types
- [ ] **Performance**: No unnecessary re-renders in React DevTools
- [ ] **Testability**: Every function/component can be tested in isolation
- [ ] **Readability**: New developer could understand in < 5 minutes
- [ ] **Flexibility**: Can handle reasonable future requirements without major refactor

## 4. Examples & Best Practices

### Good vs. Bad Prompts

#### ❌ **Bad Prompt Example:**
"Write a blog post about Azure"

*Why it's bad*: Too vague, no context, no target audience, no specific angle

#### ✅ **Good Prompt Example:**
"You are a Cloud Solutions Architect writing for IT professionals transitioning from on-premises to cloud. Create a blog post outline about 'Cost Optimization Strategies for Azure Virtual Machines' that includes practical tips for right-sizing, reserved instances, and auto-shutdown policies. Target length: 1000 words, reading time: 6 minutes."

*Why it's good*: Clear persona, specific audience, focused topic, concrete requirements

### Prompt Iteration Strategy

1. **Start Broad**: Get initial ideas and directions
2. **Refine Scope**: Narrow down to specific requirements
3. **Add Context**: Provide project-specific details
4. **Request Format**: Specify exact output structure needed
5. **Polish Output**: Fine-tune for style and consistency

## 5. Project-Specific Context

### Tech Stack Reference
Always inform Claude about the current tech stack when requesting code:
- React 19.1.0 with TypeScript
- Vite 7.0.4 build system
- React Router DOM 7.8.2
- Tailwind CSS 4.1.11
- React Markdown 10.1.0 for blog rendering

### File Structure Context
Provide relevant paths when requesting new components or content:
```
src/
├── components/Blog/  (Blog-specific components)
├── pages/           (Page components)
├── data/posts/      (Markdown blog posts)
├── types/           (TypeScript interfaces)
└── utils/           (Helper functions)
```

### Existing Blog Posts Reference
Current content themes for consistency:
- Azure Fundamentals and certification journeys
- PowerShell automation for IT operations
- Microsoft Intune and device management
- Cloud transformation strategies
- IT operations best practices

### Design System Constants
- Primary Color: `#4338ca` (Indigo)
- Font: System font stack
- Spacing: Tailwind defaults
- Component Patterns: Card-based layouts with hover effects

## 6. Advanced Techniques

### Multi-Shot Prompting
For complex tasks, break them into sequential prompts:
1. First prompt: Generate structure/outline
2. Second prompt: Fill in specific sections
3. Third prompt: Add examples and edge cases
4. Fourth prompt: Polish and format

### Context Windows Management
When working with large codebases:
- Provide only relevant file contents
- Summarize instead of pasting entire files
- Focus on interfaces and function signatures
- Use comments to indicate omitted code

### Consistency Maintenance
To maintain consistency across generated content:
- Create a "style memory" prompt with examples
- Reference existing blog posts or components
- Explicitly state patterns to follow
- Request adherence to project conventions

## 7. Troubleshooting Common Issues

### Issue: Generated content doesn't match project style
**Solution**: Provide more examples from existing code/content

### Issue: Code suggestions use outdated patterns
**Solution**: Explicitly state React/TypeScript versions and modern patterns to use

### Issue: Blog posts lack technical depth
**Solution**: Specify expertise level and include technical requirements in prompt

### Issue: Markdown formatting is inconsistent
**Solution**: Provide the exact formatting rules from this guide in your prompt

## 8. Quick Reference Templates

### Blog Post Metadata Template
```typescript
{
  id: '[lowercase-hyphenated]',
  slug: '[lowercase-hyphenated]',
  title: '[Compelling Title]',
  excerpt: '[2-3 sentence preview]',
  content: '[imported markdown]',
  date: '[YYYY-MM-DD]',
  readTime: '[X min]',
  tags: ['azure', 'automation', 'cloud'],
  featuredImage: '/blog-images/[descriptive-name].jpg',
  category: '[Technical Area]'
}
```

### Component Generation Template
```
Create a React TypeScript component named [ComponentName] that:
- Purpose: [specific functionality]
- Props: [list required props]
- State: [any state management needs]
- Styling: Tailwind utilities with BEM classes
- Location: src/components/[folder]/
- Integrates with: [existing components]
```

---

*Last Updated: [Current Date]*  
*Version: 1.0*  
*Maintained for: Personal Portfolio Website Project*