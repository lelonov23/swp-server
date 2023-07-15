import { IsNotEmpty, IsString } from "class-validator";

export class BotUserDto {
    @IsString()
    @IsNotEmpty()
    email: string;
    @IsString()
    @IsNotEmpty()
    password: string;
}