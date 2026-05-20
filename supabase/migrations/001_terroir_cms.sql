-- ============================================================
-- Terroir Coffee — CMS Migration
-- 執行方式：貼到 Supabase SQL Editor → Run
-- ============================================================

-- ────────────────────────────────
-- Step 1: 建立資料表
-- ────────────────────────────────

CREATE TABLE IF NOT EXISTS site_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  site_name TEXT DEFAULT 'Terroir',
  site_description TEXT DEFAULT 'Single-origin specialty coffee sourced from the world''s finest terroirs.',
  footer_tagline TEXT DEFAULT 'Origin. Process. Cup.',
  copyright TEXT DEFAULT '© 2024 Terroir Coffee Co. — Taipei, Taiwan',
  instagram_url TEXT DEFAULT '',
  newsletter_url TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS hero (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  eyebrow TEXT DEFAULT 'Single Origin · Micro Lot · Taipei Roastery',
  title TEXT DEFAULT 'Where Soil Becomes Flavour',
  description TEXT DEFAULT 'We source directly from smallholder farmers in Ethiopia, Colombia, and Taiwan — then roast every lot to its own rhythm.',
  background_image TEXT DEFAULT 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=1800&q=85',
  scroll_text TEXT DEFAULT 'Scroll to explore',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS origin_chapters (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  sort_order INT NOT NULL,
  chapter_num TEXT NOT NULL,
  label TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  detail TEXT NOT NULL,
  image_url TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS process_steps (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  sort_order INT NOT NULL,
  step_num TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  sort_order INT NOT NULL,
  origin_country TEXT NOT NULL,
  name TEXT NOT NULL,
  origin_detail TEXT NOT NULL,
  flavor_tags TEXT[] NOT NULL DEFAULT '{}',
  price TEXT NOT NULL,
  image_url TEXT NOT NULL,
  altitude TEXT DEFAULT '',
  process_method TEXT DEFAULT '',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS manifesto (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  label TEXT DEFAULT 'MANIFESTO',
  quote TEXT NOT NULL,
  attribution TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS stats (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  sort_order INT NOT NULL,
  value TEXT NOT NULL,
  label TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS team_members (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  sort_order INT NOT NULL,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  image_url TEXT NOT NULL,
  bio TEXT DEFAULT '',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS pages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  hero_label TEXT NOT NULL,
  hero_title TEXT NOT NULL,
  hero_image TEXT DEFAULT '',
  meta_title TEXT DEFAULT '',
  meta_description TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ────────────────────────────────
-- Step 2: 插入預設資料
-- ────────────────────────────────

INSERT INTO site_settings (site_name, site_description, footer_tagline, copyright, instagram_url, newsletter_url)
VALUES ('Terroir', 'Single-origin specialty coffee sourced from the world''s finest terroirs.', 'Origin. Process. Cup.', '© 2024 Terroir Coffee Co. — Taipei, Taiwan', 'https://instagram.com/terroir.coffee', '');

INSERT INTO hero (eyebrow, title, description, background_image, scroll_text, is_active)
VALUES ('Single Origin · Micro Lot · Taipei Roastery', 'Where Soil Becomes Flavour', 'We source directly from smallholder farmers in Ethiopia, Colombia, and Taiwan — then roast every lot to its own rhythm.', 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=1800&q=85', 'Scroll to explore', true);

INSERT INTO origin_chapters (sort_order, chapter_num, label, title, description, detail, image_url) VALUES
(1, '01', 'CHAPTER 01 — ETHIOPIA', 'The Ancient Forest', 'At 1,900 metres above sea level in Ethiopia''s Gedeo Zone, wild coffee trees grow beneath a canopy that has stood for millennia. Here, coffee is not cultivated — it is discovered.', 'Yirgacheffe · 1,900m · Heirloom Varieties', 'https://images.unsplash.com/photo-1524350876685-274059332603?w=1400&q=80'),
(2, '02', 'CHAPTER 02 — HARVEST', 'Only Ripe Cherries', 'Pickers visit each tree up to fifteen times per season, selecting only cherries at peak ripeness. This patience is the invisible ingredient in every bag we sell.', 'Hand-picked · Peak ripeness only', 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1400&q=80'),
(3, '03', 'CHAPTER 03 — PROCESS', 'Sun & Patience', 'Cherries are spread on raised African beds and turned by hand twice daily for twenty-one days. The fruit ferments slowly — gifting a wine-like complexity no machine can replicate.', 'Natural process · 21 days · Raised beds', 'https://images.unsplash.com/photo-1611854779393-1b2da9d400fe?w=1400&q=80'),
(4, '04', 'CHAPTER 04 — ROASTERY', 'The Transformation', 'In our Zhongzheng roastery, each lot is roasted to a profile designed for that specific harvest. We listen for first crack and trust what the bean tells us.', 'Taipei · Small batch · Profile roasted', 'https://images.unsplash.com/photo-1504630083234-14187a9df0f5?w=1400&q=80');

INSERT INTO process_steps (sort_order, step_num, title, description, image_url) VALUES
(1, '01', 'Green Bean Selection', 'Each shipment is cupped blind. Only lots scoring above 86 points earn a place in our roastery.', 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=900&q=75'),
(2, '02', 'Profile Development', 'We map every roast on a data logger — but the final call is made by nose and intuition.', 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=900&q=75'),
(3, '03', 'The Roast', 'Twelve minutes at precisely managed heat. We listen for first crack — the moment the bean opens itself.', 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=900&q=75'),
(4, '04', 'Rest & Release', 'Freshly roasted beans rest 48 hours. CO₂ dissipates, flavours integrate, the cup finds its character.', 'https://images.unsplash.com/photo-1459755486867-b55449bb39ff?w=900&q=75');

INSERT INTO products (sort_order, origin_country, name, origin_detail, flavor_tags, price, image_url, altitude, process_method) VALUES
(1, 'ETHIOPIA', 'Yirgacheffe Natural', 'Yirgacheffe · 1,900m · Heirloom', ARRAY['Blueberry','Jasmine','Dark Chocolate'], 'NT$ 580', 'https://images.unsplash.com/photo-1611854779393-1b2da9d400fe?w=700&q=80', '1,900m', 'Natural'),
(2, 'ETHIOPIA', 'Shakiso Washed', 'Shakiso · 1,750m · Heirloom', ARRAY['Lemon','Green Apple','Jasmine'], 'NT$ 560', 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=700&q=80', '1,750m', 'Washed'),
(3, 'COLOMBIA', 'Huila Honey', 'Huila · 1,650m · Castillo', ARRAY['Mango','Honey','Almond'], 'NT$ 620', 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=700&q=80', '1,650m', 'Honey'),
(4, 'COLOMBIA', 'Nariño Washed', 'Nariño · 1,800m · Castillo', ARRAY['Caramel','Red Apple','Milk Chocolate'], 'NT$ 640', 'https://images.unsplash.com/photo-1459755486867-b55449bb39ff?w=700&q=80', '1,800m', 'Washed'),
(5, 'TAIWAN', 'Alishan Oolong Process', 'Alishan · 1,400m · Typica', ARRAY['Oolong','Lychee','Rose Water'], 'NT$ 780', 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=700&q=80', '1,400m', 'Honey'),
(6, 'TAIWAN', 'Sun Moon Lake Honey', 'Sun Moon Lake · 1,100m · Ruby', ARRAY['Osmanthus','Brown Sugar','Peach'], 'NT$ 720', 'https://images.unsplash.com/photo-1524350876685-274059332603?w=700&q=80', '1,100m', 'Honey');

INSERT INTO manifesto (label, quote, attribution) VALUES
('MANIFESTO', 'Good coffee is not a luxury — it is a quiet conversation between a farmer''s hands, a roaster''s instinct, and your morning stillness.', '— Terroir Coffee · Taipei · 2019');

INSERT INTO stats (sort_order, value, label) VALUES
(1, '12', 'Origin Farms'),
(2, '86+', 'Avg. Cup Score'),
(3, '48', 'Hrs Rest After Roast'),
(4, '6', 'Yrs Direct Trade');

INSERT INTO team_members (sort_order, name, role, image_url, bio) VALUES
(1, 'Wei-Ling Chen', 'Founder & Head Roaster', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80', 'Wei-Ling trained at the Specialty Coffee Association in London, earned her Q Grader certification in 2017, and spent a season working at a washed-processing station in Colombia''s Huila region before returning to Taipei to found Terroir.'),
(2, 'Ming-Zhe Xu', 'Green Buyer · Q Grader', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80', ''),
(3, 'Yuki Tanaka', 'Head Barista · Education', 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80', ''),
(4, 'Amara Bekele', 'Origin Liaison · Ethiopia', 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80', '');

INSERT INTO pages (slug, hero_label, hero_title, hero_image, meta_title, meta_description) VALUES
('about', 'OUR STORY', 'We believe in the power of terroir', '', 'About — Terroir Coffee', 'Learn about Terroir Coffee''s origin story, team, and values.'),
('process', 'ROASTING CRAFT', 'The Process', '', 'Process — Terroir Coffee', 'Discover our meticulous roasting process from green bean selection to rest and release.'),
('product', 'CURRENT OFFERINGS', 'This Season''s Lots', '', 'Products — Terroir Coffee', 'Browse our current selection of single-origin specialty coffees.'),
('contact', 'GET IN TOUCH', 'Let''s Talk Coffee', '', 'Contact — Terroir Coffee', 'Contact Terroir Coffee for orders, wholesale inquiries, and roastery visits.');

-- ────────────────────────────────
-- Step 3: 啟用 RLS
-- ────────────────────────────────

ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE hero ENABLE ROW LEVEL SECURITY;
ALTER TABLE origin_chapters ENABLE ROW LEVEL SECURITY;
ALTER TABLE process_steps ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE manifesto ENABLE ROW LEVEL SECURITY;
ALTER TABLE stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE pages ENABLE ROW LEVEL SECURITY;

-- 公開讀取
CREATE POLICY "Public read" ON site_settings FOR SELECT USING (true);
CREATE POLICY "Public read" ON hero FOR SELECT USING (true);
CREATE POLICY "Public read" ON origin_chapters FOR SELECT USING (true);
CREATE POLICY "Public read" ON process_steps FOR SELECT USING (true);
CREATE POLICY "Public read" ON products FOR SELECT USING (true);
CREATE POLICY "Public read" ON manifesto FOR SELECT USING (true);
CREATE POLICY "Public read" ON stats FOR SELECT USING (true);
CREATE POLICY "Public read" ON team_members FOR SELECT USING (true);
CREATE POLICY "Public read" ON pages FOR SELECT USING (true);

-- 認證寫入
CREATE POLICY "Auth write" ON site_settings FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Auth write" ON hero FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Auth write" ON origin_chapters FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Auth write" ON process_steps FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Auth write" ON products FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Auth write" ON manifesto FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Auth write" ON stats FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Auth write" ON team_members FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Auth write" ON pages FOR ALL USING (auth.role() = 'authenticated');

-- ────────────────────────────────
-- Step 4: Storage Bucket (images)
-- ────────────────────────────────

INSERT INTO storage.buckets (id, name, public) VALUES ('images', 'images', true) ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public read images" ON storage.objects FOR SELECT USING (bucket_id = 'images');
CREATE POLICY "Auth upload images" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'images' AND auth.role() = 'authenticated');
CREATE POLICY "Auth update images" ON storage.objects FOR UPDATE USING (bucket_id = 'images' AND auth.role() = 'authenticated');
CREATE POLICY "Auth delete images" ON storage.objects FOR DELETE USING (bucket_id = 'images' AND auth.role() = 'authenticated');
