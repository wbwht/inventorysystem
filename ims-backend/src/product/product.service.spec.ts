import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model, Schema } from 'mongoose';
import { ProductDocument } from './product.model';
import { ProductService } from './product.service';

const mockProduct = {
  _id: '123',
  title: 'Laptop #1',
  description: '15-inch laptop #1',
  category: 'Electrical',
};

describe('ProductService', () => {
  let service: ProductService;
  let model: Model<ProductDocument>;

  const productsArray = [
    {
      _id: '123',
      title: 'Laptop #1',
      description: '15-inch laptop #1',
      category: 'Electrical',
    },
    {
      _id: '124',
      title: 'Laptop #2',
      description: '15-inch laptop #2',
      category: 'Electrical',
    },
  ];

  const productsElectricalArray = [
    {
      _id: '123',
      title: 'Laptop #1',
      description: '15-inch laptop #1',
      category: 'Electrical',
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: getModelToken('Product'),
          useValue: {
            new: jest.fn().mockResolvedValue(mockProduct),
            constructor: jest.fn().mockResolvedValue(mockProduct),
            find: jest.fn(),
            save: jest.fn(),
            exec: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
    model = module.get<Model<ProductDocument>>(getModelToken('Product'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getPosts()', () => {
    it('should get all posts by default', async () => {
      jest.spyOn(model, 'find').mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(productsArray),
      } as any);
      const products = await service.getPosts(undefined);
      expect(products).toEqual(productsArray);
    });
    it('should filter posts by category', async () => {
      jest.spyOn(model, 'find').mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(productsElectricalArray),
      } as any);
      const products = await service.getPosts({
        category: 'Electrical',
        description: '',
        author: '',
        title: '',
        skip: 0,
        limit: 0,
        search: '',
      });
      expect(products).toEqual(productsElectricalArray);
    });
    it('should paginate posts', async () => {
      jest.spyOn(model, 'find').mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(productsArray),
      } as any);
      const products = await service.getPosts({
        category: '',
        description: '',
        author: '',
        title: '',
        skip: 2,
        limit: 2,
        search: '',
      });
      expect(products).toEqual(productsArray);
    });
    it('should search all posts', async () => {
      jest.spyOn(model, 'find').mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(productsArray),
      } as any);
      const products = await service.getPosts({
        category: '',
        description: '',
        author: '',
        title: '',
        skip: 0,
        limit: 0,
        search: 'laptop',
      });
      expect(products).toEqual(productsArray);
    });
  });
});
