import type { QueryFilter } from 'mongoose';
import Testimonial, { ITestimonialDocument } from '@/models/Testimonial';
import { BaseRepository, PaginatedResult, PaginationOptions } from './base.repository';
import type { TestimonialQueryInput } from '@/lib/validators/testimonial.schema';

export class TestimonialRepository extends BaseRepository<ITestimonialDocument> {
    constructor() {
        super(Testimonial);
    }

    async findAllTestimonials(
        query: TestimonialQueryInput = {}
    ): Promise<PaginatedResult<ITestimonialDocument>> {
        const filter: QueryFilter<ITestimonialDocument> = {};

        if (query.isActive !== undefined) {
            filter.isActive = query.isActive;
        } else {
            filter.isActive = true;
        }

        const options: PaginationOptions = {
            limit: query.limit ?? 50,
            offset: query.offset ?? 0,
            orderBy: query.orderBy ?? 'order',
            orderDir: query.orderDir ?? 'asc',
        };

        return this.findAll(filter, options);
    }

    async findTestimonialById(id: string): Promise<ITestimonialDocument | null> {
        return this.findById(id);
    }

    async createTestimonial(data: Partial<ITestimonialDocument>): Promise<ITestimonialDocument> {
        return this.create(data);
    }
}

export const testimonialRepository = new TestimonialRepository();
