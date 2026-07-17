const { neon } = require('@neondatabase/serverless');
const fs = require('fs');

// Read .env.local
const envContent = fs.readFileSync('.env.local', 'utf8');
const dbUrl = envContent.match(/DATABASE_URL=(.*)/)[1].trim();

console.log('🔄 Connecting to database...');

const sql = neon(dbUrl);

async function setupDatabase() {
  try {
    // Test connection
    await sql`SELECT NOW()`;
    console.log('✅ Database connected successfully!');
    
    // Create tables
    console.log('🔄 Creating tables...');
    
    // Users table
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) NOT NULL UNIQUE,
        password TEXT NOT NULL,
        name VARCHAR(255) NOT NULL,
        role VARCHAR(50) NOT NULL DEFAULT 'editor',
        created_at TIMESTAMP DEFAULT NOW() NOT NULL,
        updated_at TIMESTAMP DEFAULT NOW() NOT NULL
      )
    `;
    
    // Categories table
    await sql`
      CREATE TABLE IF NOT EXISTS categories (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        slug VARCHAR(255) NOT NULL UNIQUE,
        description TEXT,
        image TEXT,
        seo_title VARCHAR(255),
        meta_description TEXT,
        keywords TEXT,
        og_image TEXT,
        faq JSONB,
        featured BOOLEAN DEFAULT FALSE,
        status VARCHAR(20) NOT NULL DEFAULT 'published',
        "order" INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT NOW() NOT NULL,
        updated_at TIMESTAMP DEFAULT NOW() NOT NULL
      )
    `;
    
    // Products table
    await sql`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        slug VARCHAR(255) NOT NULL UNIQUE,
        description TEXT,
        category_id INTEGER NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
        images JSONB,
        seo_title VARCHAR(255),
        meta_description TEXT,
        keywords TEXT,
        og_image TEXT,
        specifications JSONB,
        packaging_details TEXT,
        export_markets JSONB,
        faq JSONB,
        related_products JSONB,
        featured BOOLEAN DEFAULT FALSE,
        status VARCHAR(20) NOT NULL DEFAULT 'published',
        "order" INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT NOW() NOT NULL,
        updated_at TIMESTAMP DEFAULT NOW() NOT NULL
      )
    `;
    
    // Blogs table
    await sql`
      CREATE TABLE IF NOT EXISTS blogs (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        slug VARCHAR(255) NOT NULL UNIQUE,
        content TEXT NOT NULL,
        excerpt TEXT,
        author VARCHAR(255) NOT NULL,
        author_bio TEXT,
        category VARCHAR(100),
        tags JSONB,
        featured_image TEXT,
        seo_title VARCHAR(255),
        meta_description TEXT,
        keywords TEXT,
        og_image TEXT,
        canonical_url TEXT,
        reading_time INTEGER,
        faq JSONB,
        related_articles JSONB,
        publish_date TIMESTAMP DEFAULT NOW(),
        status VARCHAR(20) NOT NULL DEFAULT 'published',
        views INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT NOW() NOT NULL,
        updated_at TIMESTAMP DEFAULT NOW() NOT NULL
      )
    `;
    
    // Contact messages table
    await sql`
      CREATE TABLE IF NOT EXISTS contact_messages (
        id SERIAL PRIMARY KEY,
        full_name VARCHAR(255) NOT NULL,
        company_name VARCHAR(255),
        country VARCHAR(100) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50),
        whatsapp VARCHAR(50),
        product_interest VARCHAR(255),
        quantity VARCHAR(100),
        message TEXT NOT NULL,
        status VARCHAR(20) NOT NULL DEFAULT 'new',
        notes TEXT,
        created_at TIMESTAMP DEFAULT NOW() NOT NULL
      )
    `;
    
    // Newsletter subscribers table
    await sql`
      CREATE TABLE IF NOT EXISTS newsletter_subscribers (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) NOT NULL UNIQUE,
        name VARCHAR(255),
        status VARCHAR(20) NOT NULL DEFAULT 'active',
        subscribed_at TIMESTAMP DEFAULT NOW() NOT NULL
      )
    `;
    
    // SEO settings table
    await sql`
      CREATE TABLE IF NOT EXISTS seo_settings (
        id SERIAL PRIMARY KEY,
        page VARCHAR(255) NOT NULL UNIQUE,
        title VARCHAR(255),
        meta_description TEXT,
        keywords TEXT,
        og_image TEXT,
        canonical_url TEXT,
        noindex BOOLEAN DEFAULT FALSE,
        nofollow BOOLEAN DEFAULT FALSE,
        updated_at TIMESTAMP DEFAULT NOW() NOT NULL
      )
    `;
    
    // Site settings table
    await sql`
      CREATE TABLE IF NOT EXISTS site_settings (
        id SERIAL PRIMARY KEY,
        key VARCHAR(255) NOT NULL UNIQUE,
        value TEXT,
        type VARCHAR(50) NOT NULL DEFAULT 'text',
        updated_at TIMESTAMP DEFAULT NOW() NOT NULL
      )
    `;
    
    // Redirects table
    await sql`
      CREATE TABLE IF NOT EXISTS redirects (
        id SERIAL PRIMARY KEY,
        source VARCHAR(500) NOT NULL UNIQUE,
        destination VARCHAR(500) NOT NULL,
        type INTEGER NOT NULL DEFAULT 301,
        enabled BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT NOW() NOT NULL
      )
    `;
    
    // Media table
    await sql`
      CREATE TABLE IF NOT EXISTS media (
        id SERIAL PRIMARY KEY,
        filename VARCHAR(255) NOT NULL,
        url TEXT NOT NULL,
        cloudinary_id VARCHAR(255),
        folder VARCHAR(255),
        type VARCHAR(50) NOT NULL,
        size INTEGER,
        width INTEGER,
        height INTEGER,
        alt TEXT,
        created_at TIMESTAMP DEFAULT NOW() NOT NULL
      )
    `;
    
    console.log('✅ All tables created successfully!');
    console.log('');
    console.log('📊 Database is ready with 10 tables:');
    console.log('   ✓ users');
    console.log('   ✓ categories');
    console.log('   ✓ products');
    console.log('   ✓ blogs');
    console.log('   ✓ contact_messages');
    console.log('   ✓ newsletter_subscribers');
    console.log('   ✓ seo_settings');
    console.log('   ✓ site_settings');
    console.log('   ✓ redirects');
    console.log('   ✓ media');
    console.log('');
    console.log('🎉 Database setup complete!');
    console.log('');
    console.log('Next steps:');
    console.log('1. Your server is already running at http://localhost:3000');
    console.log('2. Visit http://localhost:3000/admin to see the dashboard');
    console.log('3. Test contact form at http://localhost:3000/contact');
    
  } catch (error) {
    console.error('❌ Error setting up database:', error.message);
    process.exit(1);
  }
}

setupDatabase();
