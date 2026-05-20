export interface HeroData {
  id: string
  eyebrow: string
  title: string
  description: string
  background_image: string
  scroll_text: string
  is_active: boolean
}

export interface OriginChapter {
  id: string
  sort_order: number
  chapter_num: string
  label: string
  title: string
  description: string
  detail: string
  image_url: string
  is_active: boolean
}

export interface ProcessStep {
  id: string
  sort_order: number
  step_num: string
  title: string
  description: string
  image_url: string
  is_active: boolean
}

export interface Product {
  id: string
  sort_order: number
  origin_country: string
  name: string
  origin_detail: string
  flavor_tags: string[]
  price: string
  image_url: string
  altitude: string
  process_method: string
  is_active: boolean
}

export interface ManifestoData {
  id: string
  label: string
  quote: string
  attribution: string
  is_active: boolean
}

export interface Stat {
  id: string
  sort_order: number
  value: string
  label: string
  is_active: boolean
}

export interface TeamMember {
  id: string
  sort_order: number
  name: string
  role: string
  image_url: string
  bio: string
  is_active: boolean
}

export interface PageData {
  id: string
  slug: string
  hero_label: string
  hero_title: string
  hero_image: string
  meta_title: string
  meta_description: string
}

export interface SiteSettings {
  id: string
  site_name: string
  site_description: string
  footer_tagline: string
  copyright: string
  instagram_url: string
  newsletter_url: string
}

// Fallback data (used when Supabase fetch fails)
export const HERO_FALLBACK: HeroData = {
  id: '',
  eyebrow: 'Single Origin · Micro Lot · Taipei Roastery',
  title: 'Where Soil Becomes Flavour',
  description: 'We source directly from smallholder farmers in Ethiopia, Colombia, and Taiwan — then roast every lot to its own rhythm.',
  background_image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=1800&q=85',
  scroll_text: 'Scroll to explore',
  is_active: true,
}

export const ORIGIN_CHAPTERS_FALLBACK: OriginChapter[] = [
  { id: '1', sort_order: 1, chapter_num: '01', label: 'CHAPTER 01 — ETHIOPIA', title: 'The Ancient Forest', description: "At 1,900 metres above sea level in Ethiopia's Gedeo Zone, wild coffee trees grow beneath a canopy that has stood for millennia. Here, coffee is not cultivated — it is discovered.", detail: 'Yirgacheffe · 1,900m · Heirloom Varieties', image_url: 'https://images.unsplash.com/photo-1524350876685-274059332603?w=1400&q=80', is_active: true },
  { id: '2', sort_order: 2, chapter_num: '02', label: 'CHAPTER 02 — HARVEST', title: 'Only Ripe Cherries', description: 'Pickers visit each tree up to fifteen times per season, selecting only cherries at peak ripeness. This patience is the invisible ingredient in every bag we sell.', detail: 'Hand-picked · Peak ripeness only', image_url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1400&q=80', is_active: true },
  { id: '3', sort_order: 3, chapter_num: '03', label: 'CHAPTER 03 — PROCESS', title: 'Sun & Patience', description: 'Cherries are spread on raised African beds and turned by hand twice daily for twenty-one days. The fruit ferments slowly — gifting a wine-like complexity no machine can replicate.', detail: 'Natural process · 21 days · Raised beds', image_url: 'https://images.unsplash.com/photo-1611854779393-1b2da9d400fe?w=1400&q=80', is_active: true },
  { id: '4', sort_order: 4, chapter_num: '04', label: 'CHAPTER 04 — ROASTERY', title: 'The Transformation', description: 'In our Zhongzheng roastery, each lot is roasted to a profile designed for that specific harvest. We listen for first crack and trust what the bean tells us.', detail: 'Taipei · Small batch · Profile roasted', image_url: 'https://images.unsplash.com/photo-1504630083234-14187a9df0f5?w=1400&q=80', is_active: true },
]

export const PROCESS_STEPS_FALLBACK: ProcessStep[] = [
  { id: '1', sort_order: 1, step_num: '01', title: 'Green Bean Selection', description: 'Each shipment is cupped blind. Only lots scoring above 86 points earn a place in our roastery.', image_url: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=900&q=75', is_active: true },
  { id: '2', sort_order: 2, step_num: '02', title: 'Profile Development', description: 'We map every roast on a data logger — but the final call is made by nose and intuition.', image_url: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=900&q=75', is_active: true },
  { id: '3', sort_order: 3, step_num: '03', title: 'The Roast', description: 'Twelve minutes at precisely managed heat. We listen for first crack — the moment the bean opens itself.', image_url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=900&q=75', is_active: true },
  { id: '4', sort_order: 4, step_num: '04', title: 'Rest & Release', description: 'Freshly roasted beans rest 48 hours. CO₂ dissipates, flavours integrate, the cup finds its character.', image_url: 'https://images.unsplash.com/photo-1459755486867-b55449bb39ff?w=900&q=75', is_active: true },
]

export const PRODUCTS_FALLBACK: Product[] = [
  { id: '1', sort_order: 1, origin_country: 'ETHIOPIA', name: 'Yirgacheffe Natural', origin_detail: 'Yirgacheffe · 1,900m · Heirloom', flavor_tags: ['Blueberry', 'Jasmine', 'Dark Chocolate'], price: 'NT$ 580', image_url: 'https://images.unsplash.com/photo-1611854779393-1b2da9d400fe?w=700&q=80', altitude: '1,900m', process_method: 'Natural', is_active: true },
  { id: '2', sort_order: 2, origin_country: 'COLOMBIA', name: 'Huila Honey', origin_detail: 'Huila · 1,650m · Castillo', flavor_tags: ['Mango', 'Honey', 'Almond'], price: 'NT$ 620', image_url: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=700&q=80', altitude: '1,650m', process_method: 'Honey', is_active: true },
  { id: '3', sort_order: 3, origin_country: 'TAIWAN', name: 'Alishan Oolong Process', origin_detail: 'Alishan · 1,400m · Typica', flavor_tags: ['Oolong', 'Lychee', 'Rose Water'], price: 'NT$ 780', image_url: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=700&q=80', altitude: '1,400m', process_method: 'Honey', is_active: true },
]

export const MANIFESTO_FALLBACK: ManifestoData = {
  id: '',
  label: 'MANIFESTO',
  quote: "Good coffee is not a luxury — it is a quiet conversation between a farmer's hands, a roaster's instinct, and your morning stillness.",
  attribution: '— Terroir Coffee · Taipei · 2019',
  is_active: true,
}

export const STATS_FALLBACK: Stat[] = [
  { id: '1', sort_order: 1, value: '12', label: 'Origin Farms', is_active: true },
  { id: '2', sort_order: 2, value: '86+', label: 'Avg. Cup Score', is_active: true },
  { id: '3', sort_order: 3, value: '48', label: 'Hrs Rest After Roast', is_active: true },
  { id: '4', sort_order: 4, value: '6', label: 'Yrs Direct Trade', is_active: true },
]

export const TEAM_FALLBACK: TeamMember[] = [
  { id: '1', sort_order: 1, name: 'Wei-Ling Chen', role: 'Founder & Head Roaster', image_url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80', bio: '', is_active: true },
  { id: '2', sort_order: 2, name: 'Ming-Zhe Xu', role: 'Green Buyer · Q Grader', image_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80', bio: '', is_active: true },
  { id: '3', sort_order: 3, name: 'Yuki Tanaka', role: 'Head Barista · Education', image_url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80', bio: '', is_active: true },
  { id: '4', sort_order: 4, name: 'Amara Bekele', role: 'Origin Liaison · Ethiopia', image_url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80', bio: '', is_active: true },
]
