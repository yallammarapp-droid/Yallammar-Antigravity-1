CREATE TABLE IF NOT EXISTS services (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT,
  image_url TEXT
);

CREATE TABLE IF NOT EXISTS gallery (
  id BIGSERIAL PRIMARY KEY,
  image_url TEXT NOT NULL,
  description TEXT,
  category TEXT DEFAULT 'general',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS contacts (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL
);

-- Seed Initial Data
INSERT INTO settings (key, value) VALUES 
('phone', '966500000000'),
('whatsapp', '966500000000'),
('address', 'الرياض، المملكة العربية السعودية'),
('about_text', 'نحن شركة يلا عمار المتخصصة في تقديم خدمات الرخام والأرضيات بخبرة واحترافية عالية.')
ON CONFLICT (key) DO NOTHING;

INSERT INTO services (title, description, icon) VALUES 
('تركيب السيراميك والبورسلين', 'خدمة تركيب احترافية لمختلف أنواع السيراميك والبورسلين.', 'LayoutGrid'),
('تركيب الرخام', 'تركيب رخام للفلل والقصور والمشاريع التجارية بدقة متناهية.', 'Hammer'),
('جلي وتلميع الرخام', 'إعادة اللمعان والحيوية للرخام المطفأ وإزالة الخدوش.', 'Sparkles');
