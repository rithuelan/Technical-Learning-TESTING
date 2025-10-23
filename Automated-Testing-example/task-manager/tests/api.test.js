import request from 'supertest';
import app from '../server';


describe('Task API', () => {
let created;


test('GET /api/tasks - empty array initially', async () => {
const res = await request(app).get('/api/tasks');
expect(res.statusCode).toBe(200);
expect(Array.isArray(res.body)).toBe(true);
});


test('POST /api/tasks - create task', async () => {
const res = await request(app).post('/api/tasks').send({ title: 'Test task', description: 'desc' });
expect(res.statusCode).toBe(201);
expect(res.body.id).toBeDefined();
created = res.body;
});


test('GET /api/tasks/:id - fetch created', async () => {
const res = await request(app).get(`/api/tasks/${created.id}`);
expect(res.statusCode).toBe(200);
expect(res.body.title).toBe('Test task');
});


test('PUT /api/tasks/:id - update', async () => {
const res = await request(app).put(`/api/tasks/${created.id}`).send({ title: 'Updated', done: true });
expect(res.statusCode).toBe(200);
expect(res.body.title).toBe('Updated');
expect(res.body.done).toBe(true);
});


test('DELETE /api/tasks/:id - delete', async () => {
const res = await request(app).delete(`/api/tasks/${created.id}`);
expect(res.statusCode).toBe(204);
});


test('GET /api/tasks/:id - not found after delete', async () => {
const res = await request(app).get(`/api/tasks/${created.id}`);
expect(res.statusCode).toBe(404);
});
});