const sayHello = require('./server');

test('should return "Hello, World!"', () => {
  const result = sayHello();
  expect(result).toBe('Hello, World!');
});
