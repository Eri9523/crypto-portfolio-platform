export interface User {
    id: string;
    email: string;
    name: string;
    password: string;
    phone?:string;
    createdAt: Date;
    updatedAt: Date
}

export class UserEntity implements User {
    constructor(
        public id: string,
        public email: string,
        public name: string,
        public password: string,
        public createdAt: Date,
        public updatedAt: Date,
        public phone?: string
    ) { }

    static create(
        email: string,
        name: string,
        hashedPassword: string,
        phone?: string
    ) : UserEntity {
        return new UserEntity(
            '', //ID,
            email,
            name,
            hashedPassword,
            new Date(),
            new Date(),
            phone
        )
    }
}