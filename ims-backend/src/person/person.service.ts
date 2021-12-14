import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema as MongooseSchema } from 'mongoose';

import { Person, PersonDocument } from './person.model';
import {
  CreatePersonInput,
  ListPersonInput,
  UpdatePersonInput,
} from './person.inputs';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class PersonService {
  constructor(
    @InjectModel(Person.name) private personModel: Model<PersonDocument>,
  ) {}

  async create(payload: CreatePersonInput) {
    const createdPerson = await new this.personModel(payload);
    return createdPerson.save();
  }

  getById(_id: MongooseSchema.Types.ObjectId) {
    return this.personModel.findById(_id).exec();
  }

  list(filters: ListPersonInput) {
    return this.personModel.find({ ...filters }).exec();
  }

  update(payload: UpdatePersonInput) {
    return this.personModel
      .findByIdAndUpdate(payload._id, { new: true })
      .exec();
  }

  delete(_id: MongooseSchema.Types.ObjectId) {
    return this.personModel.findByIdAndDelete(_id).exec();
  }

  async validateUser(email: string, pass: string): Promise<any> {
    try {
      const user = await this.personModel
        .findOne(
          { email: email },
          '_id name email password products',
          function (err, person) {
            if (err) return err;
            console.log(person);
          },
        )
        .clone()
        .exec();
      return user;
    } catch (err) {
      throw new Error(err);
    }
  }
}
