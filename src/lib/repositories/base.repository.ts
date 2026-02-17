import type { Model, Document, QueryFilter, UpdateQuery, QueryOptions } from 'mongoose';

export interface PaginationOptions {
    limit?: number;
    offset?: number;
    orderBy?: string;
    orderDir?: 'asc' | 'desc';
}

export interface PaginatedResult<T> {
    data: T[];
    total: number;
    limit: number;
    offset: number;
    hasMore: boolean;
}

export interface DeleteOptions {
    hard?: boolean;
}

export abstract class BaseRepository<T extends Document> {
    protected model: Model<T>;

    constructor(model: Model<T>) {
        this.model = model;
    }

    async findAll(
        filter: QueryFilter<T> = {},
        options: PaginationOptions = {}
    ): Promise<PaginatedResult<T>> {
        const { limit = 10, offset = 0, orderBy = 'createdAt', orderDir = 'desc' } = options;

        const sort: Record<string, 1 | -1> = { [orderBy]: orderDir === 'asc' ? 1 : -1 };

        const [data, total] = await Promise.all([
            this.model.find(filter).sort(sort).skip(offset).limit(limit).exec(),
            this.model.countDocuments(filter).exec(),
        ]);

        return {
            data,
            total,
            limit,
            offset,
            hasMore: offset + data.length < total,
        };
    }

    async findById(id: string): Promise<T | null> {
        return this.model.findById(id).exec();
    }

    async findOne(filter: QueryFilter<T>): Promise<T | null> {
        return this.model.findOne(filter).exec();
    }

    async findBySlug(slug: string): Promise<T | null> {
        return this.model.findOne({ slug } as QueryFilter<T>).exec();
    }

    async create(data: Partial<T>): Promise<T> {
        const document = new this.model(data);
        return document.save();
    }

    async createMany(data: Partial<T>[]): Promise<T[]> {
        const result = await this.model.insertMany(data);
        return result as unknown as T[];
    }

    async update(id: string, data: UpdateQuery<T>, options?: QueryOptions): Promise<T | null> {
        return this.model
            .findByIdAndUpdate(id, data, { new: true, runValidators: true, ...options })
            .exec();
    }

    async softDelete(id: string): Promise<T | null> {
        return this.model
            .findByIdAndUpdate(id, { isActive: false } as UpdateQuery<T>, { new: true })
            .exec();
    }

    async hardDelete(id: string): Promise<boolean> {
        const result = await this.model.findByIdAndDelete(id).exec();
        return result !== null;
    }

    async delete(id: string, options: DeleteOptions = {}): Promise<T | null | boolean> {
        if (options.hard) {
            return this.hardDelete(id);
        }
        return this.softDelete(id);
    }

    async restore(id: string): Promise<T | null> {
        return this.model
            .findByIdAndUpdate(id, { isActive: true } as UpdateQuery<T>, { new: true })
            .exec();
    }

    async count(filter: QueryFilter<T> = {}): Promise<number> {
        return this.model.countDocuments(filter).exec();
    }

    async exists(filter: QueryFilter<T>): Promise<boolean> {
        const result = await this.model.exists(filter);
        return result !== null;
    }
}
