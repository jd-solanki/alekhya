# Alekhya

## API

```ts
const complexCode = `
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(10));
`;

const encoded = Buffer.from(complexCode).toString('base64');

console.log(`https://alekhya.com/api/image/code?code=${encoded}&lang=js`)
```
