import mongoose, { Schema, Document, Model } from 'mongoose';

export type ProjectStatus = 'in-progress' | 'completed' | 'planned';

export interface IProjectMetadata {
    views: number;
    likes: number;
}

export interface IProject {
    title: string;
    slug: string;
    slogan?: string;
    description: string;
    image: string;
    gallery: string[];
    status: ProjectStatus;
    category: mongoose.Types.ObjectId | string;
    client?: string;
    startDate: Date;
    endDate?: Date;
    technologies: string[];
    featured: boolean;
    metadata: IProjectMetadata;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface IProjectDocument extends IProject, Document {
    _id: mongoose.Types.ObjectId;
}

const ProjectMetadataSchema = new Schema<IProjectMetadata>(
    {
        views: { type: Number, default: 0 },
        likes: { type: Number, default: 0 },
    },
    { _id: false }
);

const ProjectSchema = new Schema<IProjectDocument>(
    {
        title: {
            type: String,
            required: [true, 'El título es requerido'],
            trim: true,
            maxlength: [150, 'El título no puede exceder 150 caracteres'],
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
            maxlength: [1000, 'La descripción no puede exceder 1000 caracteres'],
        },
        image: {
            type: String,
            required: [true, 'La imagen principal es requerida'],
        },
        gallery: {
            type: [String],
            default: [],
        },
        status: {
            type: String,
            enum: {
                values: ['in-progress', 'completed', 'planned'],
                message: '{VALUE} no es un estado válido',
            },
            default: 'planned',
        },
        category: {
            type: Schema.Types.ObjectId,
            ref: 'Service',
            required: [true, 'La categoría es requerida'],
        },
        client: {
            type: String,
            trim: true,
            maxlength: [100, 'El nombre del cliente no puede exceder 100 caracteres'],
        },
        startDate: {
            type: Date,
            required: [true, 'La fecha de inicio es requerida'],
        },
        endDate: {
            type: Date,
        },
        technologies: {
            type: [String],
            default: [],
        },
        featured: {
            type: Boolean,
            default: false,
        },
        metadata: {
            type: ProjectMetadataSchema,
            default: () => ({ views: 0, likes: 0 }),
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
ProjectSchema.index({ isActive: 1, status: 1 });
ProjectSchema.index({ isActive: 1, featured: 1 });
ProjectSchema.index({ category: 1, isActive: 1 });
ProjectSchema.index({ createdAt: -1 });

// Virtual para popular la categoría
ProjectSchema.virtual('categoryInfo', {
    ref: 'Service',
    localField: 'category',
    foreignField: '_id',
    justOne: true,
});

// Generar slug automáticamente si no se proporciona
// Mongoose 9.x: middleware síncrono no usa next()
ProjectSchema.pre('validate', function () {
    if (!this.slug && this.title) {
        this.slug = this.title
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
    }
});

const Project: Model<IProjectDocument> =
    mongoose.models.Project || mongoose.model<IProjectDocument>('Project', ProjectSchema);

export default Project;
