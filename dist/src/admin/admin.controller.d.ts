import { AdminService } from './admin.service';
export declare class AdminController {
    private adminService;
    constructor(adminService: AdminService);
    years(): Promise<import(".prisma/client").Year[]>;
    groups(id: string): Promise<import(".prisma/client").Group[]>;
    events(id: string): Promise<(import(".prisma/client").Event & {
        lecturer: import(".prisma/client").Lecturer;
    })[]>;
}
