import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'

export const users = sqliteTable('users', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    username: text('username').notNull().unique(),
    email: text('email').notNull().unique(),
    password: text('password').notNull(),
    role: text('role', { enum: ['admin', 'user'] }).notNull().default('user'),
    createdAt: integer('createdAt', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
    updateAt: integer('updateAt', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date())
})

export type User = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert