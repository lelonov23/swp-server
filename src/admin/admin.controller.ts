import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AdminService } from './admin.service';
import { EventDto } from './dto';

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

    @Post('event/create')
    switch(@Body() dto: EventDto) {
        return this.adminService.createEvent(dto);
    }
}
