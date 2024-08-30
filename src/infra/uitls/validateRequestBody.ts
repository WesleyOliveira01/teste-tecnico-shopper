import { Response } from "express";
import { ResponseError } from "../../errors/ResponseError";

export const validateRequestBody = (
  res: Response,
  body: any,
  requiredFields: string[]
) => {
  for (const field of requiredFields) {
    if (!body[field]) {
      res
        .status(400)
        .json(
          new ResponseError(
            "INVALID_DATA",
            "Os dados fornecidos no corpo da requisição são inválidos"
          )
        );
      return false;
    }
  }
  return true;
};
