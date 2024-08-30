import { Request, Response } from "express";
import { IConfirmRequestBody } from "../application/dto/request/ConfirmRequestBody";
import { IUploadRequestBody } from "../application/dto/request/UploadRequestBody";
import { ErrorHandler } from "../errors/ErrrorHandler";
import { ResponseError } from "../errors/ResponseError";
import { validateRequestBody } from "../infra/uitls/validateRequestBody";
import { MeasureService } from "../services/measureService";

const measureService = new MeasureService();

export class MeasureController {
  static async upload(req: Request, res: Response) {
    const body: IUploadRequestBody = req.body;

    const isValid = validateRequestBody(res, req.body, [
      "image",
      "customer_code",
      "measure_datetime",
      "measure_type",
    ]);
    if (!isValid) return;

    try {
      const result = await measureService.uploadImage({ ...body });
      return res.status(200).json(result);
    } catch (error: ErrorHandler | any) {
      console.error("Error in upload:", error.message);
      return res
        .status(error.status_code)
        .json(new ResponseError(error.error_code, error.error_description));
    }
  }

  static async confirm(req: Request, res: Response) {
    const body: IConfirmRequestBody = req.body;

    const isValid = validateRequestBody(res, req.body, [
      "measure_uuid",
      "confirmed_value",
    ]);
    if (!isValid) return;

    try {
      const result = await measureService.confirmMeasurement({ ...body });
      return res.status(200).json(result);
    } catch (error: any) {
      console.error("Error in confirm:", error.message);
      return res
        .status(error.status_code)
        .json(new ResponseError(error.error_code, error.error_description));
    }
  }

  static async list(req: Request, res: Response) {
    const { customer_code } = req.params;
    const { measure_type } = req.query;

    try {
      if (
        measure_type &&
        !["WATER", "GAS"].includes(measure_type.toString().toUpperCase())
      ) {
        return res
          .status(400)
          .json(
            new ResponseError("INVALID_DATA", "Tipo de medição não permitida")
          );
      }

      const result = await measureService.listMeasurements(
        customer_code,
        measure_type as string
      );
      return res.status(200).json(result);
    } catch (error: any) {
      console.error("Error in list:", error.message);
      return res
        .status(error.status_code)
        .json(new ResponseError(error.error_code, error.error_description));
    }
  }
}
