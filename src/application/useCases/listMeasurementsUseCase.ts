import { ListMeasure } from "../../domain/models/ListMeasure";
import { MeasureRepository } from "../../domain/repositories/MeasureRepository";
import { ErrorHandler } from "../../errors/ErrrorHandler";
import { ListMeasuresResponse } from "../dto/response/LIstMeasuresResponse";

export class ListMeasurementsUseCase {
  static async execute(
    customer_code: string,
    measure_type?: string
  ): Promise<ListMeasuresResponse> {
    const results = await MeasureRepository.listMeasures(
      customer_code,
      measure_type
    );

    if (results.length === 0) {
      throw new ErrorHandler(
        "MEASURES_NOT_FOUND",
        "Nenhuma leitura encontrada",
        404
      );
    }

    const measures = results.map((measure) => {
      return new ListMeasure({
        measure_uuid: measure.id,
        has_confirmed: measure.isConfirmed as boolean,
        image_url: measure.imageUrl as string,
        measure_datetime: measure.measureDate,
        measure_type: measure.measureType,
      });
    });

    return { customer_code, measures };
  }
}
