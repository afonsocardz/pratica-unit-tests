import { Voucher } from "@prisma/client";
import voucherRepository from "repositories/voucherRepository";
import voucherService from "services/voucherService";
import {
  mockCreateVoucher,
  mockInvalidDiscountVoucher,
  mockSuccessGetVoucher,
  mockUndefinedGetVocher,
} from "./mocks/voucherRepository";

describe("Create Voucher", () => {
  it("should be able to create a Voucher", async () => {
    const code = "voucher_code";
    const discount = 100;

    mockUndefinedGetVocher(code);

    mockCreateVoucher(code, discount);

    const result = await voucherService.createVoucher(code, discount);

    expect(result).toEqual(undefined);
  });

  it("should not be able to create a voucher when it already exists", async () => {
    const code = "voucher_code";
    const discount = 100;

    mockSuccessGetVoucher(code);

    const promise = voucherService.createVoucher(code, discount);

    expect(promise).rejects.toEqual(expect.any(Object));
  });

  it("should not be able to create a voucher when discount is invalid", async () => {
    const code = "voucher_code";
    const discount = 0;

    mockUndefinedGetVocher(code);

    mockInvalidDiscountVoucher(discount);

    const promise = voucherService.createVoucher(code, discount);

    expect(promise).rejects.toThrowError();
  })
});
