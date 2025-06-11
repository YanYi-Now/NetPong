// backend/src/plugins/guestUserSeeder.ts
import { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';
import { getDb } from '../db'; 
import User from '../models/user';

export default fp(async function guestUserSeeder(server: FastifyInstance) {
  const GUEST_USERNAME = process.env.GUEST_USERNAME || 'guest';
  const GUEST_PASSWORD_RAW = process.env.GUEST_PASSWORD || 'guestpass';

  try {
    const db = await getDb(); 
    const guestUser = await User.findByUsername(db, GUEST_USERNAME);

    if (!guestUser) {
      await User.create(db, {
        username: GUEST_USERNAME,
        email: `${GUEST_USERNAME}@example.com`, 
        password: GUEST_PASSWORD_RAW,
        google_id: null 
      });
      server.log.info(`Guest user '${GUEST_USERNAME}' created successfully! Password: '${GUEST_PASSWORD_RAW}'`);
    } else {
      server.log.info(`Guest user '${GUEST_USERNAME}' already exists.`);
    }
  } catch (error) {
    server.log.error('Error seeding guest user:', error);
  }
});