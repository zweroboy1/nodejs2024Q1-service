import { IsString, IsNotEmpty } from 'class-validator';
export class UpdatePasswordDto {
  @IsNotEmpty({ message: 'Old password should not be empty' })
  @IsString({ message: 'Old password should be a string' })
  oldPassword: string;

  @IsNotEmpty({ message: 'New password should not be empty' })
  @IsString({ message: 'New password should be a string' })
  newPassword: string;
}