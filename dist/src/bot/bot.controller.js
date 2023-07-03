"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BotController = void 0;
const common_1 = require("@nestjs/common");
const bot_service_1 = require("./bot.service");
const dto_1 = require("./dto");
let BotController = exports.BotController = class BotController {
    constructor(botService) {
        this.botService = botService;
    }
    signup(dto) {
        return this.botService.signup(dto);
    }
    getTimetable(id) {
        return this.botService.getTimetable(id);
    }
    user(id) {
        return this.botService.user(id);
    }
};
__decorate([
    (0, common_1.Post)("user-signup"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.BotUserDto]),
    __metadata("design:returntype", void 0)
], BotController.prototype, "signup", null);
__decorate([
    (0, common_1.Get)('timetable/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BotController.prototype, "getTimetable", null);
__decorate([
    (0, common_1.Get)('user/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BotController.prototype, "user", null);
exports.BotController = BotController = __decorate([
    (0, common_1.Controller)('bot'),
    __metadata("design:paramtypes", [bot_service_1.BotService])
], BotController);
//# sourceMappingURL=bot.controller.js.map