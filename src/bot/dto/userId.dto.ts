import { IsNotEmpty, IsString } from "class-validator";

export class UserIdDto {
    @IsString()
    @IsNotEmpty()
    chatId: string;
}