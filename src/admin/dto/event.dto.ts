import { IsNotEmpty, IsOptional, IsString,  } from "class-validator";

export class EventDto {
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
    @IsNotEmpty()
    groups: [string];
    @IsNotEmpty()
    date: Date;
}