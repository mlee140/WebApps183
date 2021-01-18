const Templater = require('./templater');

test('Undefined', () => {
  const t = new Templater(undefined);
  expect(t.apply({})).toBe(undefined);
});

test('Single Tag', () => {
  const t = new Templater('Hello {{tag}}');
  expect(t.apply({tag: 'World'})).toBe('Hello World');
});

test('Multi Tag', () => {
  const t = new Templater('Mary {{had}} a {{little}} {{lamb}}');
  expect(t.apply({had: 'had', little: 'little', lamb: 'lamb'}))
      .toBe('Mary had a little lamb');
});

test('Missing Tag', () => {
  const t = new Templater('Mary {{had}} a {{little}} {{lamb}}');
  expect(t.apply({had: 'had', lamb: 'lamb'}))
      .toBe('Mary had a lamb');
});

test('Missing Tag Strict', () => {
  const t = new Templater('Mary {{had}} a {{little}} {{lamb}}');
  expect(() => t.apply({had: 'had', lamb: 'lamb'}, true))
      .toThrowError();
});

test('Whitespace In Tag', () => {
  const t = new Templater('Mary {{had }} a {{little}} {{lamb}}');
  expect(t.apply({had: 'had', little: 'little', lamb: 'lamb'}))
      .toBe('Mary a little lamb');
});

test('End with Whitespace', () => {
  const t = new Templater('Mary {{had}} a {{little}} {{lamb}} ');
  expect(t.apply({had: 'had', little: 'little', lamb: 'lamb'}))
      .toBe('Mary had a little lamb ');
});

test('No Space Btw Tags', () => {
  const t = new Templater('Mary {{had}} a {{little}}{{lamb}}');
  expect(t.apply({had: 'had', little: 'little', lamb: 'lamb'}))
      .toBe('Mary had a littlelamb');
});

test('Same Tags', () => {
  const t = new Templater('Mary {{lamb}} a {{lamb}} {{little}}');
  expect(t.apply({had: 'had', little: 'little', lamb: 'lamb'}))
      .toBe('Mary lamb a lamb little');
});

test('Seperate with Characters not space', () => {
  const t = new Templater('Mary {{had}} a {{little}}-{{lamb}}');
  expect(t.apply({had: 'had', little: 'little', lamb: 'lamb'}))
      .toBe('Mary had a little-lamb');
});

test('Tags with numbers', () => {
  const t = new Templater('Mary {{e123}} a {{little}}-{{lamb}}');
  expect(t.apply({e123: 'had', little: 'little', lamb: 'lamb'}))
      .toBe('Mary had a little-lamb');
});
