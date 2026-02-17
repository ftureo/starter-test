/**
 * Seed script for Chloe O'Keeffe / Yoga with Chloe site.
 * Populates Services (offerings), Projects (events/retreats), Testimonials.
 *
 * Run: pnpm seed
 * Ensure .env has MONGODB_DATABASE=chloe-yoga (and Atlas credentials).
 */

import * as fs from 'fs';
import * as path from 'path';
import mongoose from 'mongoose';
import Service from '../models/Service';
import Project from '../models/Project';
import Testimonial from '../models/Testimonial';

// Load .env from project root (handle Windows \r\n)
const envPath = path.resolve(process.cwd(), '.env');
if (fs.existsSync(envPath)) {
    const content = fs.readFileSync(envPath, 'utf8');
    content.split(/\r?\n/).forEach((line) => {
        const match = line.match(/^([^#=]+)=(.*)$/);
        if (match) {
            const key = match[1].trim().replace(/\r$/, '');
            let val = match[2].trim().replace(/\r$/, '');
            if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
                val = val.slice(1, -1);
            }
            process.env[key] = val;
        }
    });
}

function getMongoUri(): string {
    const database = process.env.MONGODB_DATABASE || 'chloe-yoga';
    if (process.env.MONGODB_URI) {
        return process.env.MONGODB_URI;
    }
    const user = process.env.MONGODB_USER;
    const password = process.env.MONGODB_PASSWORD;
    const cluster = process.env.MONGODB_CLUSTER;
    const appName = process.env.MONGODB_APP_NAME;
    if (user && password && cluster) {
        const params = new URLSearchParams();
        if (appName) params.append('appName', appName);
        const qs = params.toString();
        return `mongodb+srv://${user}:${encodeURIComponent(password)}@${cluster}/${database}${qs ? `?${qs}` : ''}`;
    }
    return `mongodb://localhost:27017/${database}`;
}

const servicesData = [
    {
        title: 'Breathwork',
        slug: 'breathwork',
        description: 'Experience the transformative power of conscious breathing through private and group sessions.',
        longDescription:
            'Experience the transformative power of conscious breathing through a private breathwork session. These sessions are designed to help you release stored tension, clear mental blockages, and regulate your nervous system. If you are interested in a tailored group breathwork session, please reach out.',
        image: 'https://framerusercontent.com/images/KtD1LupHDUDXyd0ScUvsuPCsh5g.jpg?width=4128&height=4985',
        gallery: [],
        icon: 'Wind',
        features: [
            { title: 'Private Sessions', description: 'One-to-one breathwork tailored to you' },
            { title: 'Group Sessions', description: 'Transformational Breathwork in community' },
            { title: 'Nervous System Regulation', description: 'Release tension and mental blockages' },
        ],
        order: 0,
        isActive: true,
    },
    {
        title: 'Yoga',
        slug: 'yoga',
        description: 'Hatha, Yin and Pre/Post Natal Yoga. Weekly classes and personalised programmes.',
        longDescription:
            'I teach Hatha, Yin and Pre/Post Natal Yoga and you can currently find me teaching at Yoga Hub Blackrock and Yoga Dublin Ranelagh. I also teach corporate classes and one to one yoga classes and programs, completely personalised to your needs.',
        image: 'https://framerusercontent.com/images/ulKC0zaQVFB0eXA7bl1YNDBL0U.jpg?width=1365&height=2048',
        gallery: [],
        icon: 'Heart',
        features: [
            { title: 'Hatha & Yin', description: 'Weekly group classes' },
            { title: 'Pre/Post Natal', description: 'Yoga for pregnancy and new mothers' },
            { title: 'One to One', description: 'Programmes tailored to your needs' },
        ],
        order: 1,
        isActive: true,
    },
    {
        title: 'Events',
        slug: 'events',
        description: 'Seasonal events: Transformational Breathwork, Healing circles and community yoga.',
        longDescription:
            'From cozy indoor winter gatherings to summer circles along the coast, I host events that move with the rhythm of the seasons. These events include Transformational Breathwork, Healing circles and outdoor community yoga classes, all based around the Monkstown/Blackrock area.',
        image: 'https://framerusercontent.com/images/oNUpgVQJf1v39LokZGjOG2FelJQ.png?width=498&height=572',
        gallery: [],
        icon: 'Calendar',
        features: [
            { title: 'Healing Circles', description: 'Community and connection' },
            { title: 'Outdoor Yoga', description: 'Summer classes by the coast' },
            { title: 'Seasonal Rhythm', description: 'Events that move with the year' },
        ],
        order: 2,
        isActive: true,
    },
    {
        title: 'Retreats',
        slug: 'retreats',
        description: 'Immersive retreats in Ireland and abroad. Join the community for the next one.',
        longDescription:
            "I've hosted retreats in the Blue Mountains, the jungles of Bali, and the sacred landscapes of Wicklow, Ireland. I invite you to join our community and stay tuned for my next retreat by subscribing below.",
        image: 'https://framerusercontent.com/images/ulKC0zaQVFB0eXA7bl1YNDBL0U.jpg?width=1365&height=2048',
        gallery: [],
        icon: 'Compass',
        features: [
            { title: 'Ireland', description: 'Wicklow and sacred landscapes' },
            { title: 'International', description: 'Bali, Blue Mountains and more' },
            { title: 'Community', description: 'Unplug and reconnect' },
        ],
        order: 3,
        isActive: true,
    },
];

const projectsData = [
    {
        title: 'Transformational Breathwork Circle',
        slug: 'transformational-breathwork-circle',
        description:
            'Immersive breathwork sessions designed to shift energy, release blockages and create lasting change. A before and after experience.',
        image: 'https://framerusercontent.com/images/KtD1LupHDUDXyd0ScUvsuPCsh5g.jpg?width=4128&height=4985',
        gallery: [],
        status: 'completed' as const,
        categorySlug: 'breathwork',
        client: 'Monkstown / Blackrock community',
        startDate: new Date('2024-06-01'),
        endDate: new Date('2024-06-30'),
        technologies: ['Breathwork', 'Meditation', 'Healing circles'],
        featured: true,
        metadata: { views: 0, likes: 0 },
        isActive: true,
    },
    {
        title: 'Summer Yoga Retreat - Wicklow',
        slug: 'summer-yoga-retreat-wicklow',
        description:
            'A weekend retreat in the sacred landscapes of Wicklow. Yoga, breathwork, and connection with nature and community.',
        image: 'https://framerusercontent.com/images/ulKC0zaQVFB0eXA7bl1YNDBL0U.jpg?width=1365&height=2048',
        gallery: [],
        status: 'in-progress' as const,
        categorySlug: 'retreats',
        startDate: new Date('2025-07-01'),
        technologies: ['Yoga', 'Breathwork', 'Nature', 'Mindfulness'],
        featured: true,
        metadata: { views: 0, likes: 0 },
        isActive: true,
    },
    {
        title: 'One to One Programme',
        slug: 'one-to-one-programme',
        description:
            'Personalised yoga or breathwork programmes. Tailored to your goals, schedule and experience level.',
        image: 'https://framerusercontent.com/images/CgxptZ6gvYpQXkpSI7bFPyJv4OU.jpg?width=3412&height=5118',
        gallery: [],
        status: 'planned' as const,
        categorySlug: 'yoga',
        startDate: new Date('2025-01-01'),
        technologies: ['Yoga', 'Breathwork', '1:1 Sessions'],
        featured: true,
        metadata: { views: 0, likes: 0 },
        isActive: true,
    },
];

const testimonialsData = [
    { name: 'Ben', role: 'yoga student', description: "Best Yoga-teacher I've ever met. She really knows what she does. And helps the inflexible like me. :)", order: 0, isActive: true },
    {
        name: 'Natalia',
        role: 'breathwork student',
        description:
            "Chloe!! What a great teacher and soul you are. I love your soft and gentle voice during classes and my favourite part was the quotes in the end of the class, always left me so happy and warm. 3 weeks in Nicaragua together and never missed a class ❤️",
        order: 1,
        isActive: true,
    },
    { name: 'Enda', role: 'breathwork student', description: "Best Yoga-teacher I've ever met. She really knows what she does. And helps the inflexible like me. :)", order: 2, isActive: true },
    {
        name: 'Michaela',
        role: 'retreat attendee',
        description:
            "Every session with Chloe is truly beautiful and nourishing for the heart. She has a special gift for creating harmony and transmitting genuine kindness. You can feel that she truly loves what she does, and that energy fills the space in such a powerful way. Her breathwork sessions, are transformative, they always shift my energy completely. I couldn't recommend them enough; they're truly a before and after experience.",
        order: 3,
        isActive: true,
    },
    { name: 'Filippa', role: '', description: "Best Yoga-teacher I've ever met. She really knows what she does. And helps the inflexible like me. :)", order: 4, isActive: true },
    {
        name: 'Amporo',
        role: '',
        description:
            'Really enjoy Chloe classes. They are soothing and have a nice flow to them. She incorporates breathwork and poetry which is fab. Also, she always reminds to introduce an intention and bringing awareness to our life.',
        order: 5,
        isActive: true,
    },
];

async function seed() {
    const uri = getMongoUri();
    const database = process.env.MONGODB_DATABASE || 'chloe-yoga';

    try {
        console.log('🔌 Connecting to MongoDB...');
        await mongoose.connect(uri, { dbName: database });
        console.log(`✅ Connected to database: ${database}`);

        console.log('🧹 Clearing existing data...');
        await Service.deleteMany({});
        await Project.deleteMany({});
        await Testimonial.deleteMany({});

        console.log('📦 Inserting services...');
        const insertedServices = await Service.insertMany(servicesData);
        console.log(`✅ ${insertedServices.length} services inserted`);

        const serviceMap = new Map<string, mongoose.Types.ObjectId>();
        insertedServices.forEach((s) => serviceMap.set(s.slug, s._id as mongoose.Types.ObjectId));

        const projectsWithCategory = projectsData.map((p) => {
            const { categorySlug, ...rest } = p;
            const categoryId = serviceMap.get(categorySlug);
            if (!categoryId) throw new Error(`Service not found for slug: ${categorySlug}`);
            return { ...rest, category: categoryId };
        });

        console.log('📦 Inserting projects...');
        const insertedProjects = await Project.insertMany(projectsWithCategory);
        console.log(`✅ ${insertedProjects.length} projects inserted`);

        console.log('📦 Inserting testimonials...');
        const insertedTestimonials = await Testimonial.insertMany(testimonialsData);
        console.log(`✅ ${insertedTestimonials.length} testimonials inserted`);

        console.log('\n🎉 Seed completed successfully!');
        console.log('\nSummary:');
        console.log(`- Services: ${insertedServices.length}`);
        console.log(`- Projects: ${insertedProjects.length}`);
        console.log(`- Testimonials: ${insertedTestimonials.length}`);

        console.log('\n📋 Service slugs:');
        insertedServices.forEach((s) => console.log(`  ${s.slug}`));
        console.log('\n📋 Project slugs:');
        insertedProjects.forEach((p) => console.log(`  ${p.slug}`));
    } catch (error) {
        console.error('❌ Seed failed:', error);
        process.exit(1);
    } finally {
        await mongoose.disconnect();
        console.log('\n🔌 Disconnected from MongoDB');
    }
}

seed();
