import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create Admin
  const hashedPassword = await bcrypt.hash('admin123', 10);
  await prisma.admin.upsert({
    where: { email: 'admin@guthalinaturals.com' },
    update: {},
    create: {
      name: 'Admin',
      email: 'admin@guthalinaturals.com',
      passwordHash: hashedPassword,
    },
  });
  console.log('✅ Admin seeded.');

  // Create Categories
  const categoriesData = [
    { name: 'Herbal Medicines', slug: 'herbal-medicines', description: 'Traditional Ayurvedic and herbal medicines for holistic healing.', icon: 'pill' },
    { name: 'Supplements & Vitamins', slug: 'supplements-vitamins', description: 'Natural health supplements and vitamin formulations.', icon: 'apple' },
    { name: 'Essential Oils', slug: 'essential-oils', description: 'Pure therapeutic-grade essential oils for aromatherapy.', icon: 'droplets' },
    { name: 'Wellness Teas', slug: 'wellness-teas', description: 'Herbal tea blends for health and relaxation.', icon: 'coffee' },
  ];

  for (const cat of categoriesData) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    });
  }
  console.log('✅ Categories seeded.');

  // Fetch Categories for products
  const herbalCat = await prisma.category.findUnique({ where: { slug: 'herbal-medicines' } });
  const suppCat = await prisma.category.findUnique({ where: { slug: 'supplements-vitamins' } });
  const oilCat = await prisma.category.findUnique({ where: { slug: 'essential-oils' } });
  const teaCat = await prisma.category.findUnique({ where: { slug: 'wellness-teas' } });

  // Create Products
  const productsData = [
    // Herbal Medicines
    {
      name: 'Ashwagandha Capsules',
      slug: 'ashwagandha-capsules',
      description: 'Premium Ashwagandha root extract for stress relief, energy, and vitality. Made from organically grown Withania somnifera roots using advanced extraction technology.',
      price: 499,
      mrp: 699,
      categoryId: herbalCat!.id,
      flipkartUrl: 'https://www.flipkart.com',
      amazonUrl: 'https://www.amazon.in',
      featured: true,
      benefits: 'Reduces stress and anxiety\nBoosts energy and stamina\nSupports healthy sleep\nEnhances cognitive function\nStrengthens immune system',
      ingredients: 'Ashwagandha Root Extract (500mg), Vegetable Cellulose Capsule, Rice Flour',
      howToUse: 'Take 1-2 capsules daily with warm water or milk, preferably after meals. For best results, use consistently for 8-12 weeks.',
    },
    {
      name: 'Triphala Churna',
      slug: 'triphala-churna',
      description: 'Traditional Ayurvedic formulation combining Amla, Bibhitaki, and Haritaki for complete digestive health and natural detoxification.',
      price: 299,
      mrp: 399,
      categoryId: herbalCat!.id,
      flipkartUrl: 'https://www.flipkart.com',
      amazonUrl: 'https://www.amazon.in',
      benefits: 'Supports healthy digestion\nNatural detoxification\nRich in antioxidants\nPromotes regular bowel movements\nBoosts immunity',
      ingredients: 'Amla (Emblica officinalis), Bibhitaki (Terminalia bellirica), Haritaki (Terminalia chebula)',
      howToUse: 'Mix 1 teaspoon with warm water before bedtime. Can also be taken with honey or ghee.',
    },
    {
      name: 'Brahmi Memory Booster',
      slug: 'brahmi-memory-booster',
      description: 'Natural cognitive support and memory enhancement supplement. Brahmi (Bacopa monnieri) has been used for centuries to sharpen intellect and improve concentration.',
      price: 599,
      categoryId: herbalCat!.id,
      flipkartUrl: 'https://www.flipkart.com',
      amazonUrl: 'https://www.amazon.in',
      benefits: 'Enhances memory and focus\nReduces mental fatigue\nSupports learning ability\nCalms the mind\nNeuroprotective properties',
      ingredients: 'Brahmi Extract (600mg), Black Pepper Extract (5mg), Vegetable Capsule',
      howToUse: 'Take 1 capsule twice daily with water after meals.',
    },
    // Supplements & Vitamins
    {
      name: 'Moringa Leaf Tablets',
      slug: 'moringa-leaf-tablets',
      description: 'Superfood supplement rich in vitamins, minerals, and amino acids. Moringa oleifera is known as the "Miracle Tree" for its extraordinary nutritional profile.',
      price: 450,
      mrp: 550,
      categoryId: suppCat!.id,
      flipkartUrl: 'https://www.flipkart.com',
      amazonUrl: 'https://www.amazon.in',
      featured: true,
      benefits: 'Rich in Vitamin C, A, and Iron\nPowerful antioxidant\nSupports healthy blood sugar\nBoosts energy naturally\nAnti-inflammatory properties',
      ingredients: 'Organic Moringa Leaf Powder (1000mg), Binding agents (natural)',
      howToUse: 'Take 2 tablets daily with water, preferably with meals.',
    },
    {
      name: 'Spirulina Capsules',
      slug: 'spirulina-capsules',
      description: 'High-protein superfood for energy, immunity, and overall wellness. Spirulina contains 60-70% protein and is loaded with B-vitamins.',
      price: 550,
      categoryId: suppCat!.id,
      flipkartUrl: 'https://www.flipkart.com',
      amazonUrl: 'https://www.amazon.in',
      benefits: 'Complete protein source\nBoosts immune function\nSupports eye health\nNatural energy booster\nRich in iron and B12',
      ingredients: 'Organic Spirulina (500mg), Vegetable Capsule',
      howToUse: 'Take 2 capsules daily with water before meals.',
    },
    {
      name: 'Turmeric Curcumin',
      slug: 'turmeric-curcumin',
      description: 'Powerful anti-inflammatory and antioxidant supplement with enhanced bioavailability. Curcumin is the active compound in turmeric that provides its remarkable health benefits.',
      price: 799,
      mrp: 999,
      categoryId: suppCat!.id,
      flipkartUrl: 'https://www.flipkart.com',
      amazonUrl: 'https://www.amazon.in',
      benefits: 'Powerful anti-inflammatory\nStrong antioxidant protection\nSupports joint health\nPromotes heart health\nEnhances brain function',
      ingredients: 'Turmeric Extract (95% Curcuminoids, 500mg), Piperine (10mg), Vegetable Capsule',
      howToUse: 'Take 1 capsule twice daily with meals. Black pepper extract enhances absorption by 2000%.',
    },
    // Essential Oils
    {
      name: 'Eucalyptus Essential Oil',
      slug: 'eucalyptus-essential-oil',
      description: 'Pure therapeutic-grade eucalyptus oil for respiratory support and mental clarity. Steam-distilled from fresh Eucalyptus globulus leaves.',
      price: 350,
      categoryId: oilCat!.id,
      flipkartUrl: 'https://www.flipkart.com',
      amazonUrl: 'https://www.amazon.in',
      benefits: 'Clears respiratory airways\nRelieves muscle tension\nNatural insect repellent\nMental clarity and focus\nAntimicrobial properties',
      ingredients: '100% Pure Eucalyptus Globulus Essential Oil',
      howToUse: 'Add 3-5 drops to a diffuser, or dilute with carrier oil for topical application. For steam inhalation, add 2-3 drops to hot water.',
    },
    {
      name: 'Lavender Aromatherapy Oil',
      slug: 'lavender-aromatherapy-oil',
      description: 'Calming and relaxing pure lavender essential oil. Perfect for aromatherapy, sleep support, and stress relief. Sourced from premium Lavandula angustifolia flowers.',
      price: 450,
      mrp: 599,
      categoryId: oilCat!.id,
      flipkartUrl: 'https://www.flipkart.com',
      amazonUrl: 'https://www.amazon.in',
      featured: true,
      benefits: 'Promotes deep relaxation\nImproves sleep quality\nReduces anxiety and stress\nSoothes skin irritation\nNatural headache relief',
      ingredients: '100% Pure Lavandula Angustifolia Essential Oil',
      howToUse: 'Add 4-6 drops to your diffuser before bedtime. For skin, dilute 2-3 drops with coconut oil.',
    },
    {
      name: 'Tea Tree Oil',
      slug: 'tea-tree-oil',
      description: 'Natural antibacterial and antifungal oil for skin care and household cleaning. Extracted from Melaleuca alternifolia leaves using steam distillation.',
      price: 399,
      categoryId: oilCat!.id,
      flipkartUrl: 'https://www.flipkart.com',
      amazonUrl: 'https://www.amazon.in',
      benefits: 'Natural antiseptic\nFights acne and blemishes\nAntifungal properties\nScalp health support\nNatural household cleaner',
      ingredients: '100% Pure Melaleuca Alternifolia Essential Oil',
      howToUse: 'For skin: dilute 1-2 drops with carrier oil. For cleaning: add 10 drops to spray bottle with water and vinegar.',
    },
    // Wellness Teas
    {
      name: 'Tulsi Green Tea',
      slug: 'tulsi-green-tea',
      description: 'Refreshing blend of holy basil (Tulsi) and premium green tea leaves. A perfect blend of tradition and taste that supports immunity and well-being.',
      price: 250,
      mrp: 350,
      categoryId: teaCat!.id,
      flipkartUrl: 'https://www.flipkart.com',
      amazonUrl: 'https://www.amazon.in',
      benefits: 'Boosts immunity naturally\nRich in antioxidants\nSupports respiratory health\nAids weight management\nRelieves stress',
      ingredients: 'Green Tea Leaves, Holy Basil (Tulsi) Leaves, Natural Flavoring',
      howToUse: 'Steep 1 tea bag in hot water (80°C) for 3-5 minutes. Add honey or lemon to taste. Best enjoyed 2-3 times daily.',
    },
    {
      name: 'Immunity Booster Kadha',
      slug: 'immunity-booster-kadha',
      description: 'Traditional Indian herbal decoction blend to strengthen your immune system. An ancient recipe with modern convenience, packed with powerful immune-supporting herbs.',
      price: 320,
      categoryId: teaCat!.id,
      flipkartUrl: 'https://www.flipkart.com',
      amazonUrl: 'https://www.amazon.in',
      featured: true,
      benefits: 'Strengthens immune system\nFights seasonal infections\nRich in Vitamin C\nAnti-inflammatory\nDetoxifies the body',
      ingredients: 'Tulsi, Ginger, Cinnamon, Black Pepper, Clove, Turmeric, Mulethi (Licorice)',
      howToUse: 'Boil 1 tablespoon in 2 cups of water for 5 minutes. Strain and add honey or jaggery. Drink warm, 1-2 times daily.',
    },
    {
      name: 'Chamomile Sleep Tea',
      slug: 'chamomile-sleep-tea',
      description: 'Soothing herbal tea to promote restful sleep and relaxation. Made with premium chamomile flowers sourced from the finest gardens.',
      price: 299,
      mrp: 399,
      categoryId: teaCat!.id,
      flipkartUrl: 'https://www.flipkart.com',
      amazonUrl: 'https://www.amazon.in',
      benefits: 'Promotes restful sleep\nCalms nervous system\nReduces anxiety\nAids digestion\nAnti-inflammatory',
      ingredients: 'Chamomile Flowers, Passionflower, Valerian Root, Lemon Balm',
      howToUse: 'Steep 1 tea bag in hot water for 5-7 minutes. Drink 30 minutes before bedtime for best results.',
    },
  ];

  for (const prod of productsData) {
    await prisma.product.upsert({
      where: { slug: prod.slug },
      update: {},
      create: prod,
    });
  }
  console.log('✅ Products seeded (12 products).');

  // Create Blog Posts
  const blogPosts = [
    {
      title: 'The Wonders of Ashwagandha: Ancient Herb for Modern Stress',
      slug: 'wonders-of-ashwagandha',
      excerpt: 'Discover how this ancient adaptogenic herb can help manage stress, boost vitality, and improve overall wellness.',
      content: `<h2>What is Ashwagandha?</h2>
<p>Ashwagandha (Withania somnifera) is one of the most important herbs in Ayurveda, the traditional Indian system of medicine. It's classified as an <strong>adaptogen</strong>, meaning it helps your body manage stress more effectively.</p>
<h2>Key Benefits</h2>
<ul>
<li><strong>Stress & Anxiety Relief:</strong> Studies show ashwagandha can reduce cortisol levels by up to 30%.</li>
<li><strong>Improved Sleep:</strong> The compound triethylene glycol promotes natural sleep.</li>
<li><strong>Enhanced Physical Performance:</strong> Athletes have reported increased strength and recovery.</li>
<li><strong>Cognitive Function:</strong> Supports memory, focus, and reaction time.</li>
</ul>
<h2>How to Use</h2>
<p>The most common form is capsules or powder. Take 300-600mg daily with meals for optimal results. Consistency is key — most benefits are noticed after 6-8 weeks of regular use.</p>
<p>At <strong>Guthali Naturals</strong>, our Ashwagandha capsules use KSM-66 root extract for maximum potency and bioavailability.</p>`,
      image: '/images/blog-ashwagandha.jpg',
      published: true,
      publishedAt: new Date('2024-08-15'),
    },
    {
      title: 'Essential Oils for Better Sleep: A Complete Guide',
      slug: 'essential-oils-for-sleep',
      excerpt: 'Learn which essential oils can help you get a better night\'s rest and how to use them effectively.',
      content: `<h2>The Science of Sleep and Aromatherapy</h2>
<p>Struggling with sleep? You're not alone. Millions of people worldwide suffer from sleep issues. Certain essential oils have been scientifically shown to promote relaxation and improve sleep quality.</p>
<h2>Top Essential Oils for Sleep</h2>
<h3>1. Lavender</h3>
<p>The gold standard for sleep aromatherapy. Research published in the Journal of Alternative and Complementary Medicine found that lavender improved sleep quality by 45%.</p>
<h3>2. Chamomile</h3>
<p>Roman chamomile has mild sedative effects and can reduce anxiety before bedtime.</p>
<h3>3. Eucalyptus</h3>
<p>Helps clear airways for easier breathing during sleep, especially beneficial during cold season.</p>
<h2>How to Use</h2>
<ul>
<li><strong>Diffuser:</strong> Add 5-7 drops to your bedroom diffuser 30 minutes before bed.</li>
<li><strong>Pillow Spray:</strong> Mix with water in a spray bottle and mist your pillow.</li>
<li><strong>Bath:</strong> Add 8-10 drops to a warm bath before bedtime.</li>
</ul>`,
      image: '/images/blog-oils.jpg',
      published: true,
      publishedAt: new Date('2024-09-01'),
    },
    {
      title: 'Boosting Your Immunity Naturally with Ayurveda',
      slug: 'boosting-immunity-naturally',
      excerpt: 'Explore natural Ayurvedic ways to strengthen your immune system and protect your health year-round.',
      content: `<h2>The Ayurvedic Approach to Immunity</h2>
<p>In Ayurveda, immunity is called <em>Ojas</em> — the vital energy that protects us from disease. A strong Ojas means strong immunity. Here's how to build it naturally.</p>
<h2>Top Immunity-Boosting Herbs</h2>
<h3>1. Tulsi (Holy Basil)</h3>
<p>Known as the "Queen of Herbs," Tulsi has powerful immunomodulatory properties. Drinking Tulsi tea daily can significantly strengthen your immune response.</p>
<h3>2. Turmeric (Haldi)</h3>
<p>Curcumin, the active compound in turmeric, is a potent anti-inflammatory and antioxidant. Combined with black pepper, its absorption increases by 2000%.</p>
<h3>3. Amla (Indian Gooseberry)</h3>
<p>One of the richest natural sources of Vitamin C. A single amla contains 20 times more Vitamin C than an orange.</p>
<h2>Daily Immunity Ritual</h2>
<ol>
<li>Start your day with warm water and turmeric</li>
<li>Drink Tulsi tea mid-morning</li>
<li>Include amla in your diet (fresh, powder, or supplement)</li>
<li>End your day with our Immunity Booster Kadha</li>
</ol>
<p>Building immunity is a marathon, not a sprint. Consistent daily practices yield the best long-term results.</p>`,
      image: '/images/blog-immunity.jpg',
      published: true,
      publishedAt: new Date('2024-09-10'),
    },
  ];

  for (const post of blogPosts) {
    await prisma.blogPost.upsert({
      where: { slug: post.slug },
      update: {},
      create: post,
    });
  }
  console.log('✅ Blog posts seeded.');

  // Create FAQs
  const faqs = [
    { question: 'Are your products 100% natural?', answer: 'Yes, all Guthali Naturals products are made from 100% natural herbs and ingredients without any synthetic additives, preservatives, or artificial colors. We source our ingredients directly from certified organic farms.', sortOrder: 1 },
    { question: 'How long does it take to see results?', answer: 'Results vary depending on the individual and the product. Natural remedies work holistically with your body, so we generally recommend consistent use for 4-8 weeks to notice significant improvements. Some products like essential oils provide immediate benefits.', sortOrder: 2 },
    { question: 'Where can I buy your products?', answer: 'You can purchase our products online through Amazon and Flipkart. Direct purchase links are available on each product page. Simply click "Buy on Amazon" or "Buy on Flipkart" to be taken directly to the product listing.', sortOrder: 3 },
    { question: 'Do you offer international shipping?', answer: 'Currently, our products are available for shipping within India through our marketplace partners (Amazon and Flipkart). We are working on expanding internationally and will update our website once this is available.', sortOrder: 4 },
    { question: 'Can I take these supplements with my regular medication?', answer: 'We always recommend consulting with your healthcare provider or an Ayurvedic practitioner before starting any new supplement, especially if you are currently on medication. While our products are natural, some herbs may interact with certain medications.', sortOrder: 5 },
  ];

  for (const faq of faqs) {
    const existing = await prisma.fAQ.findFirst({ where: { question: faq.question } });
    if (!existing) {
      await prisma.fAQ.create({ data: faq });
    }
  }
  console.log('✅ FAQs seeded.');

  // Create Banners
  const existingBanners = await prisma.banner.count();
  if (existingBanners === 0) {
    await prisma.banner.createMany({
      data: [
        {
          title: 'Welcome to Guthali Naturals',
          subtitle: 'From Seeds to Solutions — Discover the power of nature with our premium Ayurvedic products.',
          ctaText: 'Explore Products',
          ctaLink: '/products',
          active: true,
          sortOrder: 1,
        },
        {
          title: "Nature's Best for Your Wellness",
          subtitle: '100% Natural | Lab Tested | Ayurvedic Heritage',
          ctaText: 'Learn More',
          ctaLink: '/about',
          active: true,
          sortOrder: 2,
        },
      ],
    });
  }
  console.log('✅ Banners seeded.');

  // Create Coupons
  const existingCoupons = await prisma.coupon.count();
  if (existingCoupons === 0) {
    await prisma.coupon.createMany({
      data: [
        { code: 'WELCOME10', description: 'Welcome discount for new customers', discountPercent: 10, active: true, validUntil: new Date('2025-12-31') },
        { code: 'WELLNESS20', description: 'Wellness month special discount', discountPercent: 20, active: true, validUntil: new Date('2025-06-30') },
      ],
    });
  }
  console.log('✅ Coupons seeded.');

  console.log('\n🎉 Database seeded successfully!');
  console.log('Admin login: admin@guthalinaturals.com / admin123');
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
