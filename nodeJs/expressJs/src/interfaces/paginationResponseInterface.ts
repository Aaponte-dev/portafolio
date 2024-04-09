import PaginationSearchInterface from './paginationSearchInterface';

interface PaginationResponseInterface<T> extends PaginationSearchInterface {
	response?: T[];
	data?: T[];
	total: number;
}

export default PaginationResponseInterface;
