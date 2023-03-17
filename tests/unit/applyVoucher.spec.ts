import voucherService from "services/voucherService";
import {
  mockSuccessGetVoucher,
  mockSuccessUseVoucher,
  mockUndefinedGetVocher,
  mockUsedGetVoucher,
} from "./mocks/voucherRepository";

describe("Apply Voucher", () => {
  it("should apply the voucher with success", () => {
    const code = "voucher_code";
    const amount = 100;

    mockSuccessGetVoucher(code);

    mockSuccessUseVoucher(code);

    const promise = voucherService.applyVoucher(code, amount);

    expect(promise).resolves.toEqual(
      expect.objectContaining({
        amount,
        discount: expect.any(Number),
        finalAmount: expect.any(Number),
        applied: expect.any(Boolean),
      })
    );
  });

  it("should not apply the voucher when it not exists", () => {
    const code = "voucher_code";
    const amount = 100;

    mockUndefinedGetVocher(code);

    const promise = voucherService.applyVoucher(code, amount);

    expect(promise).rejects.toEqual(expect.any(Object));
  });

  it("should not apply the voucher when it is already used", () => {
    const code = "voucher_code";
    const amount = 100;

    mockUsedGetVoucher(code);

    const promise = voucherService.applyVoucher(code, amount);

    expect(promise).resolves.toEqual(
      expect.objectContaining({
        applied: false,
      })
    );
  });

  it("shoul not apply the voucher when the amount is not sufficient", () => {
    const code = "voucher_code";
    const amount = 99;

    mockSuccessGetVoucher(code);

    const promise = voucherService.applyVoucher(code, amount);

    expect(promise).resolves.toEqual(
      expect.objectContaining({
        applied: false,
      })
    );
  });
});
