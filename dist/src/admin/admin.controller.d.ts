import { AdminService } from './admin.service';
export declare class AdminController {
    private adminService;
    constructor(adminService: AdminService);
    years(): Promise<import(".prisma/client").Year[]>;
    groups(id: number): Promise<void>;
    events(id: number): Promise<void>;
}
