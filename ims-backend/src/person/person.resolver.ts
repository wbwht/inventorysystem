import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';

import { Person, PersonDocument } from './person.model';
import { PersonService } from './person.service';
import {
  CreatePersonInput,
  ListPersonInput,
  UpdatePersonInput,
} from './person.inputs';
import { Product } from '../product/product.model';
import { AuthService } from '../auth/auth.service';
import { AuthPayload } from '../auth/auth.model';
import { UseGuards } from '@nestjs/common';
import { AuthGuardJwt } from 'src/auth/auth.guard-jwt';

@Resolver(() => Person)
export class PersonResolver {
  constructor(
    private personService: PersonService,
    private authService: AuthService,
  ) {}

  @Query(() => Person)
  async person(
    @Args('_id', { type: () => String }) _id: MongooseSchema.Types.ObjectId,
  ) {
    return this.personService.getById(_id);
  }

  @Query(() => [Person])
  @UseGuards(AuthGuardJwt)
  async persons(
    @Args('filters', { nullable: true }) filters?: ListPersonInput,
  ) {
    return this.personService.list(filters);
  }

  @Mutation(() => Person)
  async createPerson(@Args('payload') payload: CreatePersonInput) {
    return this.personService.create(payload);
  }

  @Mutation(() => AuthPayload)
  async signup(
    @Args('email') email: string,
    @Args('password') password: string,
    @Args('name') name: string,
  ) {
    const pwd = await this.authService.hashPassword(password);
    const person = await this.personService.create({
      name: name,
      password: pwd,
      email: email,
      products: null,
    });
    return {
      token: this.authService.generateJwt({ userId: person.id }),
      user: person,
    };
  }

  @Mutation(() => AuthPayload)
  async login(
    @Args('email') email: string,
    @Args('password') password: string,
  ) {
    const person = await this.personService.validateUser(email, password);
    if (!person) {
      throw new Error('No such user found!');
    }
    const valid = await this.authService.comparePasswords(
      password,
      person.password,
    );
    if (!valid) {
      throw new Error('Invalid password!');
    }
    return {
      token: this.authService.generateJwt({ userId: person.id }),
      user: person,
    };
  }

  @Mutation(() => Person)
  async updatePerson(@Args('payload') payload: UpdatePersonInput) {
    return this.personService.update(payload);
  }

  @Mutation(() => Person)
  async deletePerson(
    @Args('_id', { type: () => String }) _id: MongooseSchema.Types.ObjectId,
  ) {
    return this.personService.delete(_id);
  }

  @ResolveField()
  async products(
    @Parent() person: PersonDocument,
    @Args('populate') populate: boolean,
  ) {
    if (populate)
      await person.populate({ path: 'products', model: Product.name });

    console.log(person.products);
    return person.products;
  }
}
