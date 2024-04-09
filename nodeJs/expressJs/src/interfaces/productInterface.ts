import PaginationResponseInterface from './paginationResponseInterface';
import { Types } from 'mongoose';

interface ProductInterface {
	name: string;
	description: string;
	quantity: number;
	price: number;
	createdAt: Date;
}

interface CreateProductResponseInterface extends ProductInterface {
	_id: Types.ObjectId;
}

interface FindProductInterface
	extends PaginationResponseInterface<CreateProductResponseInterface> {}

interface UpdateProductInterface
	extends Partial<Omit<ProductInterface, 'createdAt'>> {}

export {
	ProductInterface,
	CreateProductResponseInterface,
	FindProductInterface,
	UpdateProductInterface,
};
