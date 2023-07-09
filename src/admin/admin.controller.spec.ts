import { Test, TestingModule } from '@nestjs/testing';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';

describe('AdminController', () => {
  let controller: AdminController;
  let service: AdminService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminController],
      providers: [AdminService],
    }).compile();

    controller = module.get<AdminController>(AdminController);
    service = module.get<AdminService>(AdminService)
  });

  describe('groups', () => {
    it('should return an array of groups', async () => {
      const result = ['test'];

      expect(await controller.groups('1')).toBe(result);
    });
  });
});
