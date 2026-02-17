import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ITestimonial {
    name: string;
    role?: string;
    description: string;
    image?: string;
    order: number;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface ITestimonialDocument extends ITestimonial, Document {
    _id: mongoose.Types.ObjectId;
}

const TestimonialSchema = new Schema<ITestimonialDocument>(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
            trim: true,
            maxlength: [100, 'Name cannot exceed 100 characters'],
        },
        role: {
            type: String,
            trim: true,
            maxlength: [150, 'Role cannot exceed 150 characters'],
        },
        description: {
            type: String,
            required: [true, 'Description is required'],
            maxlength: [2000, 'Description cannot exceed 2000 characters'],
        },
        image: {
            type: String,
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

TestimonialSchema.index({ isActive: 1, order: 1 });

const Testimonial: Model<ITestimonialDocument> =
    mongoose.models.Testimonial ||
    mongoose.model<ITestimonialDocument>('Testimonial', TestimonialSchema);

export default Testimonial;
