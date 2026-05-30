import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  const admin = await prisma.user.upsert({
    where: { email: "admin@temper.sd" },
    update: {},
    create: {
      name: "Admin",
      email: "admin@temper.sd",
      password: "$2a$10$8K1p/a0dL1LXMIgoEDFrwOfMQkf9Rn6bmNjFf7P0iQ0i0l0l0l0l0",
      role: "ADMIN",
      phone: "+249 123 000 000",
    },
  });

  console.log("Created admin user:", admin.email);

  const categories = await Promise.all([
    prisma.category.create({ data: { nameEn: "Bedrooms", nameAr: "غرف النوم", slug: "bedrooms" } }),
    prisma.category.create({ data: { nameEn: "Sofas", nameAr: "الكنب", slug: "sofas" } }),
    prisma.category.create({ data: { nameEn: "Tables", nameAr: "الطاولات", slug: "tables" } }),
    prisma.category.create({ data: { nameEn: "Offices", nameAr: "المكاتب", slug: "offices" } }),
    prisma.category.create({ data: { nameEn: "Kitchens", nameAr: "المطابخ", slug: "kitchens" } }),
    prisma.category.create({ data: { nameEn: "Library Furniture", nameAr: "الأثاث المكتبي", slug: "library" } }),
    prisma.category.create({ data: { nameEn: "Decor", nameAr: "الديكور", slug: "decor" } }),
    prisma.category.create({ data: { nameEn: "Used Furniture", nameAr: "الأثاث المستعمل", slug: "used" } }),
    prisma.category.create({ data: { nameEn: "Kids Furniture", nameAr: "أثاث الأطفال", slug: "kids" } }),
  ]);

  console.log(`Created ${categories.length} categories`);

  const productsData = [
    { nameEn: "Modern Wooden Bed", nameAr: "سرير خشبي عصري", slug: "modern-wooden-bed", descEn: "Elegant wooden bed with premium finish. Solid wood construction with comfortable headboard.", descAr: "سرير خشبي أنيق بلمسة عصرية. مصنوع من الخشب الصلب مع لوح رأسي مريح.", price: 250000, comparePrice: 350000, stock: 5, featured: true, isOffer: true, categoryIndex: 0, tags: ["bedroom", "wooden", "modern"] },
    { nameEn: "Elegant Sofa Set", nameAr: "طقم كنبة أنيق", slug: "elegant-sofa-set", descEn: "Luxurious 3-piece sofa set with premium fabric upholstery and wooden accents.", descAr: "طقم كنبة فاخر من 3 قطع بتنجيد قماش فاخر ولمسات خشبية.", price: 420000, comparePrice: null, stock: 3, featured: true, isOffer: false, categoryIndex: 1, tags: ["sofa", "luxury", "living-room"] },
    { nameEn: "Dining Table 6-Seater", nameAr: "طاولة طعام 6 كراسي", slug: "dining-table-6", descEn: "Solid wood dining table with 6 chairs. Perfect for family gatherings.", descAr: "طاولة طعام خشب صلب مع 6 كراسي. مثالية للتجمعات العائلية.", price: 180000, comparePrice: 220000, stock: 7, featured: true, isOffer: true, categoryIndex: 2, tags: ["dining", "table", "wooden"] },
    { nameEn: "Executive Office Desk", nameAr: "مكتب تنفيذي", slug: "executive-desk", descEn: "Spacious office desk with storage drawers. Modern design with clean lines.", descAr: "مكتب عمل واسع مع أدراج تخزين. تصميم عصري بخطوط نظيفة.", price: 95000, comparePrice: null, stock: 10, featured: true, isOffer: false, categoryIndex: 3, tags: ["office", "desk", "executive"] },
    { nameEn: "Kids Bunk Bed", nameAr: "سرير أطفال دورين", slug: "kids-bunk-bed", descEn: "Fun and safe bunk bed for kids. Made with child-safe materials and guard rails.", descAr: "سرير دورين ممتع وآمن للأطفال. مصنوع من مواد آمنة مع حواجز حماية.", price: 120000, comparePrice: null, stock: 8, featured: false, isOffer: false, categoryIndex: 8, tags: ["kids", "bed", "bunk"] },
    { nameEn: "Wooden Bookshelf", nameAr: "رفوف كتب خشبية", slug: "wooden-bookshelf", descEn: "Tall wooden bookshelf with 5 shelves. Ideal for library or study room.", descAr: "رف كتب خشبي طويل بـ 5 أرفف. مثالي للمكتبة أو غرفة الدراسة.", price: 65000, comparePrice: 85000, stock: 15, featured: false, isOffer: true, categoryIndex: 5, tags: ["shelf", "library", "wooden"] },
    { nameEn: "Modern Kitchen Cabinet", nameAr: "خزانة مطبخ عصرية", slug: "modern-kitchen-cabinet", descEn: "Complete kitchen cabinet set with soft-close hinges and ample storage.", descAr: "طقم خزانة مطبخ كامل بمفصلات إغلاق ناعم وسعة تخزين كبيرة.", price: 310000, comparePrice: null, stock: 4, featured: true, isOffer: false, categoryIndex: 4, tags: ["kitchen", "cabinet", "modern"] },
    { nameEn: "Used Office Desk", nameAr: "مكتب مستعمل بحالة جيدة", slug: "used-office-desk", descEn: "Good condition used office desk. Minor wear but fully functional.", descAr: "مكتب مستعمل بحالة جيدة. استعمال بسيط ولكنه يعمل بكفاءة.", price: 45000, comparePrice: 95000, stock: 2, featured: false, isOffer: true, categoryIndex: 7, tags: ["used", "desk", "office"] },
    { nameEn: "Wooden Coffee Table", nameAr: "طاولة قهوة خشبية", slug: "wooden-coffee-table", descEn: "Classic wooden coffee table with lower storage shelf. Warm finish.", descAr: "طاولة قهوة خشبية كلاسيكية مع رف تخزين سفلي. لمسة دافئة.", price: 85000, comparePrice: null, stock: 12, featured: false, isOffer: false, categoryIndex: 2, tags: ["table", "coffee", "wooden"] },
    { nameEn: "Velvet Sofa", nameAr: "كنبة مخمل فاخرة", slug: "velvet-sofa", descEn: "Premium velvet upholstered sofa with gold legs. A statement piece.", descAr: "كنبة مخمل فاخرة بأرجل ذهبية. قطعة مميزة لديكور منزلك.", price: 380000, comparePrice: 450000, stock: 6, featured: true, isOffer: true, categoryIndex: 1, tags: ["sofa", "velvet", "luxury"] },
    { nameEn: "Minimalist Desk Lamp", nameAr: "مصباح مكتب بسيط", slug: "minimalist-desk-lamp", descEn: "Modern LED desk lamp with adjustable arm. USB charging port.", descAr: "مصباح مكتب LED عصري بذراع قابل للتعديل. منفذ شحن USB.", price: 25000, comparePrice: null, stock: 25, featured: false, isOffer: false, categoryIndex: 6, tags: ["decor", "lamp", "modern"] },
    { nameEn: "Leather Office Chair", nameAr: "كرسي مكتب جلدي", slug: "leather-office-chair", descEn: "Ergonomic leather office chair with lumbar support and adjustable height.", descAr: "كرسي مكتب جلدي مريح مع دعم للظهر وارتفاع قابل للتعديل.", price: 110000, comparePrice: null, stock: 9, featured: false, isOffer: false, categoryIndex: 3, tags: ["office", "chair", "leather"] },
    { nameEn: "Wooden Wall Art", nameAr: "لوحة حائط خشبية", slug: "wooden-wall-art", descEn: "Handcrafted wooden wall decoration. Traditional Sudanese design.", descAr: "ديكور حائط خشبي مصنوع يدوياً. تصميم سوداني تقليدي.", price: 35000, comparePrice: null, stock: 20, featured: false, isOffer: false, categoryIndex: 6, tags: ["decor", "wall", "wooden"] },
    { nameEn: "Kids Study Table", nameAr: "طاولة دراسة أطفال", slug: "kids-study-table", descEn: "Colorful study table for kids with storage compartments.", descAr: "طاولة دراسة ملونة للأطفال مع أقسام تخزين.", price: 55000, comparePrice: 70000, stock: 14, featured: false, isOffer: true, categoryIndex: 8, tags: ["kids", "table", "study"] },
    { nameEn: "Rustic Kitchen Shelf", nameAr: "رف مطبخ ريفي", slug: "rustic-kitchen-shelf", descEn: "Rustic wooden shelf set for kitchen. 3 tiers with metal brackets.", descAr: "طقم رفوف مطبخ خشبية ريفية. 3 مستويات بأقواس معدنية.", price: 42000, comparePrice: null, stock: 18, featured: false, isOffer: false, categoryIndex: 4, tags: ["kitchen", "shelf", "rustic"] },
    { nameEn: "Wooden Wardrobe", nameAr: "خزانة ملابس خشبية", slug: "wooden-wardrobe", descEn: "Spacious 4-door wooden wardrobe with hanging rods and drawers.", descAr: "خزانة ملابس خشبية واسعة بـ 4 أبواب مع قضبان تعليق وأدراج.", price: 280000, comparePrice: 350000, stock: 6, featured: true, isOffer: true, categoryIndex: 0, tags: ["bedroom", "wardrobe", "wooden"] },
    { nameEn: "Fabric Ottoman", nameAr: "عثماني قماش", slug: "fabric-ottoman", descEn: "Comfortable fabric ottoman with storage inside. Multi-functional.", descAr: "عثماني قماش مريح مع تخزين داخلي. متعدد الاستخدامات.", price: 48000, comparePrice: null, stock: 22, featured: false, isOffer: false, categoryIndex: 6, tags: ["decor", "ottoman", "fabric"] },
    { nameEn: "Used Bed Frame", nameAr: "هيكل سرير مستعمل", slug: "used-bed-frame", descEn: "Used metal bed frame in good condition. Queen size.", descAr: "هيكل سرير معدني مستعمل بحالة جيدة. مقاس كوين.", price: 35000, comparePrice: 80000, stock: 1, featured: false, isOffer: true, categoryIndex: 7, tags: ["used", "bed", "frame"] },
    { nameEn: "Glass Display Cabinet", nameAr: "خزانة عرض زجاجية", slug: "glass-display-cabinet", descEn: "Elegant glass display cabinet with LED lighting. Perfect for collectibles.", descAr: "خزانة عرض زجاجية أنيقة مع إضاءة LED. مثالية للمقتنيات الثمينة.", price: 195000, comparePrice: null, stock: 4, featured: false, isOffer: false, categoryIndex: 5, tags: ["library", "display", "glass"] },
    { nameEn: "Nursery Crib", nameAr: "سرير أطفال حديثي الولادة", slug: "nursery-crib", descEn: "Safe and adjustable nursery crib with teething rails. Converts to toddler bed.", descAr: "سرير أطفال آمن وقابل للتعديل مع قضبان تسنين. يتحول إلى سرير طفل.", price: 85000, comparePrice: null, stock: 11, featured: true, isOffer: false, categoryIndex: 8, tags: ["kids", "crib", "nursery"] },
  ];

  for (const p of productsData) {
    const product = await prisma.product.create({
      data: {
        nameEn: p.nameEn,
        nameAr: p.nameAr,
        slug: p.slug,
        descriptionEn: p.descEn,
        descriptionAr: p.descAr,
        price: p.price,
        comparePrice: p.comparePrice,
        stock: p.stock,
        featured: p.featured,
        isOffer: p.isOffer,
        categoryId: categories[p.categoryIndex].id,
        tags: p.tags,
        images: {
          create: [
            { url: "https://res.cloudinary.com/demo/image/upload/v1/temper/placeholder", publicId: `temper/${p.slug}`, order: 0 },
          ],
        },
      },
    });
    console.log(`Created product: ${product.nameEn}`);
  }

  console.log(`Seeded ${productsData.length} products`);

  await prisma.coupon.create({
    data: {
      code: "WELCOME10",
      discount: 10,
      type: "PERCENTAGE",
      maxUses: 100,
      expiresAt: new Date("2026-12-31"),
    },
  });

  await prisma.coupon.create({
    data: {
      code: "SAVE50K",
      discount: 50000,
      type: "FIXED",
      minAmount: 200000,
      maxUses: 50,
      expiresAt: new Date("2026-08-15"),
    },
  });

  console.log("Created coupons");
  console.log("Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
