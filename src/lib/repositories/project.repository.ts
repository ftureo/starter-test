import type { QueryFilter } from 'mongoose';
import Project, { IProjectDocument } from '@/models/Project';
import { BaseRepository, PaginatedResult } from './base.repository';
import { ProjectQueryInput } from '@/lib/validators/project.schema';

export interface ProjectStats {
    total: number;
    byStatus: Record<string, number>;
    byCategory: Record<string, number>;
    featured: number;
}

export class ProjectRepository extends BaseRepository<IProjectDocument> {
    constructor() {
        super(Project);
    }

    async findAllProjects(
        query: ProjectQueryInput = {}
    ): Promise<PaginatedResult<IProjectDocument>> {
        const filter: QueryFilter<IProjectDocument> = {};

        // Si isActive está definido (true o false), aplicar el filtro
        // Si isActive es undefined, mostrar todos los proyectos (sin filtrar por isActive)
        if (typeof query.isActive === 'boolean') {
            filter.isActive = query.isActive;
        }
        // Nota: Si no se pasa isActive (undefined), no se agrega filtro de isActive,
        // permitiendo ver todos los proyectos (activos e inactivos) en el admin

        if (query.status) {
            filter.status = query.status;
        }

        if (query.category) {
            filter.category = query.category;
        }

        if (query.featured !== undefined) {
            filter.featured = query.featured;
        }

        if (query.search) {
            filter.$or = [
                { title: { $regex: query.search, $options: 'i' } },
                { description: { $regex: query.search, $options: 'i' } },
                { client: { $regex: query.search, $options: 'i' } },
            ];
        }

        const { limit = 10, offset = 0, orderBy = 'createdAt', orderDir = 'desc' } = query;
        const sort: Record<string, 1 | -1> = { [orderBy ?? 'createdAt']: orderDir === 'asc' ? 1 : -1 };

        // Usar populate para obtener category y lean() para objetos planos
        const [data, total] = await Promise.all([
            this.model
                .find(filter)
                .populate('category', 'title slug icon')
                .sort(sort)
                .skip(offset)
                .limit(limit)
                .lean<IProjectDocument[]>()
                .exec(),
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

    async findProjectById(id: string): Promise<IProjectDocument | null> {
        return this.model
            .findById(id)
            .populate('category', 'title slug icon')
            .lean<IProjectDocument>()
            .exec();
    }

    async findProjectBySlug(slug: string): Promise<IProjectDocument | null> {
        return this.model
            .findOne({ slug, isActive: true })
            .populate('category', 'title slug icon')
            .lean<IProjectDocument>()
            .exec();
    }

    async findFeaturedProjects(limit = 3): Promise<IProjectDocument[]> {
        return this.model
            .find({ isActive: true, featured: true })
            .populate('category', 'title slug icon')
            .sort({ createdAt: -1 })
            .limit(limit)
            .lean<IProjectDocument[]>()
            .exec();
    }

    async findProjectsByCategory(categoryId: string, limit?: number): Promise<IProjectDocument[]> {
        const query = this.model
            .find({ category: categoryId, isActive: true })
            .populate('category', 'title slug icon')
            .sort({ createdAt: -1 });

        if (limit) {
            query.limit(limit);
        }

        return query.lean<IProjectDocument[]>().exec();
    }

    async findProjectsByCategorySlug(categorySlug: string): Promise<IProjectDocument[]> {
        // Primero encontrar el servicio por slug
        const Service = (await import('@/models/Service')).default;
        const service = await Service.findOne({ slug: categorySlug }).lean();

        if (!service) {
            return [];
        }

        return this.model
            .find({ category: service._id, isActive: true })
            .populate('category', 'title slug icon')
            .sort({ createdAt: -1 })
            .lean<IProjectDocument[]>()
            .exec();
    }

    async createProject(data: Partial<IProjectDocument>): Promise<IProjectDocument> {
        return this.create(data);
    }

    async updateProject(
        id: string,
        data: Partial<IProjectDocument>
    ): Promise<IProjectDocument | null> {
        return this.update(id, data);
    }

    async deleteProject(id: string, hard = false): Promise<IProjectDocument | null | boolean> {
        return this.delete(id, { hard });
    }

    async restoreProject(id: string): Promise<IProjectDocument | null> {
        return this.restore(id);
    }

    async incrementViews(id: string): Promise<IProjectDocument | null> {
        return this.model
            .findByIdAndUpdate(id, { $inc: { 'metadata.views': 1 } }, { new: true })
            .exec();
    }

    async incrementLikes(id: string): Promise<IProjectDocument | null> {
        return this.model
            .findByIdAndUpdate(id, { $inc: { 'metadata.likes': 1 } }, { new: true })
            .exec();
    }

    async getStats(): Promise<ProjectStats> {
        const [total, statusAgg, categoryAgg, featured] = await Promise.all([
            this.model.countDocuments({ isActive: true }),
            this.model.aggregate([
                { $match: { isActive: true } },
                { $group: { _id: '$status', count: { $sum: 1 } } },
            ]),
            this.model.aggregate([
                { $match: { isActive: true } },
                { $group: { _id: '$category', count: { $sum: 1 } } },
            ]),
            this.model.countDocuments({ isActive: true, featured: true }),
        ]);

        const byStatus = statusAgg.reduce(
            (acc, { _id, count }) => {
                acc[_id] = count;
                return acc;
            },
            {} as Record<string, number>
        );

        const byCategory = categoryAgg.reduce(
            (acc, { _id, count }) => {
                acc[String(_id)] = count;
                return acc;
            },
            {} as Record<string, number>
        );

        return { total, byStatus, byCategory, featured };
    }
}

// Singleton instance
export const projectRepository = new ProjectRepository();
