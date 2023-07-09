import { Controller, Get, Param } from '@nestjs/common';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
    constructor(private adminService: AdminService) {}

    @Get('years')
    years() {
        return this.adminService.years()
    }

    @Get('groups/:id')
    groups(@Param('id') id: number) {
        return this.adminService.groups(id)
    }

    @Get('events/:id')
    events(@Param('id') id: number) {
        return this.adminService.event(id)
    }
}
