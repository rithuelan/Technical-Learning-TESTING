const { validateTask } = require('../src/utils');


test('validateTask rejects empty title', () => {
const r = validateTask({});
expect(r.valid).toBe(false);
expect(r.errors.title).toBeDefined();
});


test('validateTask accepts valid title', () => {
const r = validateTask({ title: 'Hello' });
expect(r.valid).toBe(true);
});