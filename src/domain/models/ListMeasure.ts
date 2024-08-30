import { ListMeasuresDto } from "../../application/dto/ListMeasuresDto";

export class ListMeasure implements ListMeasuresDto {
  measure_uuid: string;
  measure_datetime: Date;
  measure_type: string;
  has_confirmed: boolean;
  image_url: string;

  constructor(data: ListMeasuresDto) {
    this.measure_uuid = data.measure_uuid;
    this.measure_datetime = data.measure_datetime;
    this.measure_type = data.measure_type;
    this.has_confirmed = data.has_confirmed;
    this.image_url = data.image_url;
  }
}
