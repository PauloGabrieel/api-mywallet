import supertest from "supertest";
import app from "../../src/index";
import { createRandomUser, generateValidUser } from "../factory/userFactory";
import { cleanDb } from "../helpers";

beforeAll( async () => {
  await cleanDb();
})

const api = supertest(app);

describe('POST /signup', () => {
  it('should respond with status 400 when body is not valid', async () => {
    const result = await api.post('/signup')
    expect(result.status).toBe(400);

  });
  it('should respond with status 400 when the email is already in use',async () => {
    const user = await createRandomUser();
    const result = await api.post('/signup').send(user);
    expect(result.status).toBe(400);
  });

  it('should respond with status 201 when user is created', async () => {
    const user = generateValidUser();
    const result = await api.post('/signup').send(user);
    expect(result.status).toBe(201);
  })
});