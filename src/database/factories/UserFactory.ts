import { Factory } from '@mikro-orm/seeder';
import { User } from '../../modules/user/user.entity';

export class UserFactory extends Factory<User> {
    model = User;

    definition(): Partial<User> {
        return {};
    }

    createUser(email: string, displayName: string): User {
        return this.makeEntity({
            email,
            displayName,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
    }
}
