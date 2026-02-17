// Inicializar conexión a MongoDB al cargar los repositorios
import '@/lib/db';

export { BaseRepository } from './base.repository';
export type { PaginationOptions, PaginatedResult, DeleteOptions } from './base.repository';

export { ServiceRepository, serviceRepository } from './service.repository';
export { ProjectRepository, projectRepository } from './project.repository';
export { TestimonialRepository, testimonialRepository } from './testimonial.repository';
export type { ProjectStats } from './project.repository';
