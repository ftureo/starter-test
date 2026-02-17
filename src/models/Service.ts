import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IServiceFeature {
    title: string;
    description: string;
}

export interface IServicePricing {
    basePrice: number;
    currency: string;
}

export interface IService {
    title: string;
    slug: string;
    slogan?: string;
    description: string;
    longDescription?: string;
    image: string;
    gallery: string[];
    icon?: string;
    features: IServiceFeature[];
    pricing?: IServicePricing;
    order: number;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface IServiceDocument extends IService, Document {
    _id: mongoose.Types.ObjectId;
}

const ServiceFeatureSchema = new Schema<IServiceFeature>(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
    },
    { _id: false }
);

const ServicePricingSchema = new Schema<IServicePricing>(
    {
        basePrice: { type: Number, required: true },
        currency: { type: String, default: 'ARS' },
    },
    { _id: false }
);

const ServiceSchema = new Schema<IServiceDocument>(
    {
        title: {
            type: String,
            required: [true, 'El título es requerido'],
            trim: true,
            maxlength: [100, 'El título no puede exceder 100 caracteres'],
        },
        slug: {
            type: String,
            required: [true, 'El slug es requerido'],
            unique: true,
            lowercase: true,
            trim: true,
        },
        slogan: {
            type: String,
            trim: true,
            maxlength: [150, 'El slogan no puede exceder 150 caracteres'],
        },
        description: {
            type: String,
            required: [true, 'La descripción es requerida'],
            maxlength: [500, 'La descripción no puede exceder 500 caracteres'],
        },
        longDescription: {
            type: String,
            maxlength: [2000, 'La descripción larga no puede exceder 2000 caracteres'],
        },
        image: {
            type: String,
            required: [true, 'La imagen es requerida'],
        },
        gallery: {
            type: [String],
            default: [],
        },
        icon: {
            type: String,
        },
        features: {
            type: [ServiceFeatureSchema],
            default: [],
        },
        pricing: {
            type: ServicePricingSchema,
        },
        order: {
            type: Number,
            default: 0,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

// Índices para optimizar queries (slug ya tiene índice por unique: true)
ServiceSchema.index({ isActive: 1, order: 1 });

// Generar slug automáticamente si no se proporciona
// Mongoose 9.x: middleware síncrono no usa next()
ServiceSchema.pre('validate', function () {
    if (!this.slug && this.title) {
        this.slug = this.title
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
    }
});

const Service: Model<IServiceDocument> =
    mongoose.models.Service || mongoose.model<IServiceDocument>('Service', ServiceSchema);

export default Service;
