import Database from 'better-sqlite3'
import { join } from 'path'
import { mkdirSync } from 'fs'

let db: InstanceType<typeof Database> | null = null

export function getDb(): InstanceType<typeof Database> {
  if (!db) {
    const dbPath = join(process.cwd(), 'data', 'app.db')

    // Ensure the data directory exists
    mkdirSync(join(process.cwd(), 'data'), { recursive: true })

    db = new Database(dbPath)

    // Enable WAL mode for better performance
    db.pragma('journal_mode = WAL')

    // Create testimonials table if it doesn't exist
    db.exec(`
      CREATE TABLE IF NOT EXISTS testimonials (
        id         INTEGER PRIMARY KEY AUTOINCREMENT,
        text       TEXT    NOT NULL,
        author     TEXT    NOT NULL,
        role       TEXT    NOT NULL DEFAULT '',
        visible    INTEGER NOT NULL DEFAULT 1,
        created_at TEXT    NOT NULL DEFAULT (datetime('now'))
      );

      INSERT INTO testimonials (text, author, role)
      SELECT
        '[Testimonial text from a satisfied client about your work and impact]',
        '[Client Name]',
        '[Position, Company]'
      WHERE NOT EXISTS (SELECT 1 FROM testimonials LIMIT 1);

      INSERT INTO testimonials (text, author, role)
      SELECT
        '[Another testimonial highlighting specific achievements or qualities]',
        '[Client Name]',
        '[Position, Company]'
      WHERE (SELECT COUNT(*) FROM testimonials) < 2;

      INSERT INTO testimonials (text, author, role)
      SELECT
        '[Third testimonial emphasizing results and professionalism]',
        '[Client Name]',
        '[Position, Company]'
      WHERE (SELECT COUNT(*) FROM testimonials) < 3;
    `)
  }

  return db
}