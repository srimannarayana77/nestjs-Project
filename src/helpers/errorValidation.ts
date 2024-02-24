import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
import { UserService } from '../user/user.service';
@ValidatorConstraint({ name: 'isSameAs', async: false })
export class IsSameAsConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    return value === (args.object as any)[args.constraints[0]];
  }

  defaultMessage(args: ValidationArguments) {
    const [relatedProperty] = args.constraints;
    return `${args.property} must be the same as ${relatedProperty}`;
  }
}

// @ValidatorConstraint({ name: 'isUniqueEmail', async: true })
// export class IsUniqueEmailConstraint implements ValidatorConstraintInterface {
//   constructor(private readonly userService: UserService) {}

//   async validate(email: string, args: ValidationArguments) {
//     const user = await this.userService.findByEmail(email);
//     return !user; // Returns true if the email is unique, false otherwise
//   }

//   defaultMessage(args: ValidationArguments) {
//     return `Email '${args.value}' is already in use`;
//   }
// }
