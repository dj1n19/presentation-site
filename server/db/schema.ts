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

export const messages = sqliteTable('messages', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    firstName: text('firstName').notNull(),
    lastName: text('lastName').notNull(),
    email: text('email').notNull(),
    phone: text('phone').notNull(),
    message: text('message').notNull(),
    read: integer('read', { mode: 'boolean' }).notNull().default(false),
    createdAt: integer('createdAt', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date())
})

export type Message = typeof messages.$inferSelect
export type NewMessage = typeof messages.$inferInsert

export const testimonials = sqliteTable('testimonials', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    username: text('username').notNull().unique(),
    testimonial: text('testimonial').notNull(),
    ratingContact: integer('ratingContact').notNull(),
    ratingPayment: integer('ratingPayment').notNull(),
    ratingFollowup: integer('ratingFollowup').notNull(),
    ratingEfficiency: integer('ratingEfficiency').notNull(),
    status: text('status', { enum: ['pending', 'approved', 'rejected'] }).notNull().default('pending'),
    createdAt: integer('createdAt', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date())
})

export type Testimonial = typeof testimonials.$inferSelect
export type NewTestimonial = typeof testimonials.$inferInsert

export const faq_entries = sqliteTable('faq_entries', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    question: text('question').notNull(),
    answer: text('answer').notNull(),
    category: text('category', { enum: ['general'] }).notNull(),
    visible: integer('visible', { mode: 'boolean' }).notNull().default(true),
    createdAt: integer('createdAt', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date())
})

export type FaqEntry = typeof faq_entries.$inferSelect
export type NewFaqEntry = typeof faq_entries.$inferInsert