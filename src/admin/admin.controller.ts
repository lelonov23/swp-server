import { Controller, Get, Param } from '@nestjs/common';
import { AdminService } from './admin.service';
import { stringify } from 'querystring';

@Controller('admin')
export class AdminController {
    constructor(private adminService: AdminService) {}

    @Get('years')
    years() {
        return this.adminService.years()
    }

    @Get('groups/:id')
    groups(@Param('id') id: string) {
        const intId = parseInt(id)
        return this.adminService.groups(intId)
    }

    @Get('events/:id')
    events(@Param('id') id: string) {
        const intId = parseInt(id)
        return this.adminService.event(intId)
    }
}
