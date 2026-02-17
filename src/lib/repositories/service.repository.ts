import type { QueryFilter } from 'mongoose';
import Service, { IServiceDocument } from '@/models/Service';
import { BaseRepository, PaginatedResult, PaginationOptions } from './base.repository';
import { ServiceQueryInput } from '@/lib/validators/service.schema';

export class ServiceRepository extends BaseRepository<IServiceDocument> {
    constructor() {
        super(Service);
    }

    async findAllServices(
        query: ServiceQueryInput = {}
    ): Promise<PaginatedResult<IServiceDocument>> {
        const filter: QueryFilter<IServiceDocument> = {};

        // Por defecto solo mostrar activos, a menos que se especifique lo contrario
        if (query.isActive !== undefined) {
            filter.isActive = query.isActive;
        } else {
            filter.isActive = true;
        }

        const options: PaginationOptions = {
            limit: query.limit ?? 10,
            offset: query.offset ?? 0,
            orderBy: query.orderBy ?? 'order',
            orderDir: query.orderDir ?? 'asc',
        };

        return this.findAll(filter, options);
    }

    async findServiceById(id: string): Promise<IServiceDocument | null> {
        return this.findById(id);
    }

    async findServiceBySlug(slug: string): Promise<IServiceDocument | null> {
        return this.findOne({ slug, isActive: true });
    }

    async findActiveServices(): Promise<IServiceDocument[]> {
        return this.model.find({ isActive: true }).sort({ order: 1 }).exec();
    }

    async createService(data: Partial<IServiceDocument>): Promise<IServiceDocument> {
        return this.create(data);
    }

    async updateService(
        id: string,
        data: Partial<IServiceDocument>
    ): Promise<IServiceDocument | null> {
        return this.update(id, data);
    }

    async deleteService(id: string, hard = false): Promise<IServiceDocument | null | boolean> {
        return this.delete(id, { hard });
    }

    async restoreService(id: string): Promise<IServiceDocument | null> {
        return this.restore(id);
    }

    async reorderServices(
        orderedIds: string[]
    ): Promise<{ success: boolean; updated: number }> {
        const operations = orderedIds.map((id, index) => ({
            updateOne: {
                filter: { _id: id },
                update: { $set: { order: index } },
            },
        }));

        const result = await this.model.bulkWrite(operations);

        return {
            success: true,
            updated: result.modifiedCount,
        };
    }
}

// Singleton instance
export const serviceRepository = new ServiceRepository();
