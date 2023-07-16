import { IsNotEmpty, IsOptional, IsString,  } from "class-validator";

export class UpdateEventDto {
    @IsNotEmpty()
    id: string;
    @IsString()
    @IsNotEmpty()
    title: string;
    @IsOptional()
    @IsString()
    lecturer: string;
    @IsOptional()
    @IsString()
    room: string;
    @IsOptional()
    @IsString()
    type: string;
}