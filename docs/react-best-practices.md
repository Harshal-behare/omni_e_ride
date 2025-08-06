# React Best Practices

## Preventing Infinite Re-renders

### Rule: Never place non-memoized functions in effect dependency arrays

When using `useEffect` in React, including non-memoized functions in the dependency array can cause infinite re-render loops. This happens because:

1. Functions are recreated on every render with a new reference
2. React's dependency comparison uses referential equality (===)
3. A new function reference triggers the effect to re-run
4. The effect causes a state update, which triggers a re-render
5. This creates an infinite loop

### Example of the Problem

```typescript
// ❌ BAD: This causes infinite re-renders
function MyComponent() {
  const [data, setData] = useState(null);
  
  // This function is recreated on every render
  const fetchData = async (id: string) => {
    const result = await api.getData(id);
    return result;
  };
  
  useEffect(() => {
    fetchData('123').then(setData);
  }, [fetchData]); // ❌ fetchData changes on every render!
}
```

### Solutions

#### 1. Use `useCallback` to memoize the function

```typescript
// ✅ GOOD: Memoized function with stable reference
function MyComponent() {
  const [data, setData] = useState(null);
  
  const fetchData = useCallback(async (id: string) => {
    const result = await api.getData(id);
    return result;
  }, []); // Empty deps = stable function reference
  
  useEffect(() => {
    fetchData('123').then(setData);
  }, [fetchData]); // ✅ fetchData reference is stable
}
```

#### 2. Move the function inside the effect

```typescript
// ✅ GOOD: Function defined inside effect
function MyComponent() {
  const [data, setData] = useState(null);
  const id = '123';
  
  useEffect(() => {
    const fetchData = async () => {
      const result = await api.getData(id);
      setData(result);
    };
    
    fetchData();
  }, [id]); // ✅ Only depend on primitive values
}
```

#### 3. Define the function outside the component

```typescript
// ✅ GOOD: Stable function defined outside component
const fetchData = async (id: string) => {
  const result = await api.getData(id);
  return result;
};

function MyComponent() {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    fetchData('123').then(setData);
  }, []); // ✅ No function in dependencies
}
```

### Real-world Example: useModels Hook

In our `useModels` hook, we fixed an infinite re-render issue by:

```typescript
// Before: Function recreated on every render
const getModelById = async (id: string) => { ... }

// After: Memoized with useCallback
const getModelById = useCallback(
  async (id: string) => { ... },
  [] // No dependencies = stable reference
)
```

### Testing for Reference Stability

Always test that memoized functions maintain reference equality:

```typescript
it('should maintain function reference equality across renders', () => {
  const { result, rerender } = renderHook(() => useMyHook());
  
  const firstRender = result.current.myFunction;
  rerender();
  const secondRender = result.current.myFunction;
  
  expect(firstRender).toBe(secondRender);
});
```

### Key Takeaways

1. **Always memoize functions** that are:
   - Passed as props to child components
   - Used in effect dependency arrays
   - Used in other hooks' dependency arrays

2. **Use `useCallback`** with an empty dependency array for functions that don't need to change

3. **Consider moving functions** inside effects if they're only used there

4. **Test for reference stability** to catch potential infinite loop issues early

5. **Use ESLint rules** like `exhaustive-deps` to catch these issues during development
