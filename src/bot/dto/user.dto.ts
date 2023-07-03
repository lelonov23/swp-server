import { IsNotEmpty, IsString } from "class-validator";

export class BotUserDto {
    @IsString()
    @IsNotEmpty()
    chatId: string;
    @IsString()
    @IsNotEmpty()
    group: string;
}