import { ListMeasuresDto } from "../ListMeasuresDto";

export interface ListMeasuresResponse {
    customer_code: string;
    measures: ListMeasuresDto[];
}
