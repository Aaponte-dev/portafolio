import { getModelForClass, index, prop } from '@typegoose/typegoose';

@index({ name: 1 }, { unique: true })
class Product {
	@prop({ required: true, type: String })
	name!: string;

	@prop({ required: true, type: String })
	description!: string;

	@prop({ required: true, type: Number })
	quantity!: number;

	@prop({ required: true, type: Number })
	price!: number;

	@prop({ type: Date, default: Date.now() })
	createdAt!: Date;
}

const ProductModel = getModelForClass(Product);

export default ProductModel;
