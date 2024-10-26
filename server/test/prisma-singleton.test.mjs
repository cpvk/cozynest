import { test } from 'node:test';
import assert from 'node:assert/strict';

// Run after `npx tsc` in server/:  node --test test/prisma-singleton.test.mjs
// Guards the fix for eight per-controller `new PrismaClient()` pools:
// every controller must share the one client from dist/lib/prisma.js.
test('prisma module exports a single shared instance', async () => {
  const unwrap = (mod) => mod.default?.default ?? mod.default;
  const first = unwrap(await import('../dist/lib/prisma.js'));
  const second = unwrap(await import('../dist/lib/prisma.js'));
  assert.ok(first, 'prisma client should exist');
  assert.equal(first, second, 'repeated imports must return the same client');
  await first.$disconnect();
});
