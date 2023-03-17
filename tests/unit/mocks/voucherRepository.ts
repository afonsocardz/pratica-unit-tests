import { Voucher } from "@prisma/client";
import voucherRepository from "repositories/voucherRepository";

export const mockUndefinedGetVocher = (code: string) => {
  jest
    .spyOn(voucherRepository, "getVoucherByCode")
    .mockImplementationOnce((code: string): any => {
      return undefined;
    });
};

export const mockSuccessUseVoucher = (code: string) => {
  jest
    .spyOn(voucherRepository, "useVoucher")
    .mockImplementationOnce((code: string): any => {
      const usedVoucher: Voucher = {
        id: 1,
        code: "voucher_code",
        discount: 100,
        used: true,
      };
      return usedVoucher;
    });
};

export const mockUsedGetVoucher = (code: string) => {
  jest
    .spyOn(voucherRepository, "getVoucherByCode")
    .mockImplementationOnce((code: string): any => {
      const usedVoucher = {
        id: 1,
        code: "voucher_code",
        discount: 100,
        used: true,
      };
      return usedVoucher;
    });
};

export const mockSuccessGetVoucher = (code: string) => {
  jest
    .spyOn(voucherRepository, "getVoucherByCode")
    .mockImplementationOnce((code: string): any => {
      const voucher: Voucher = {
        id: 1,
        code: "voucher_code",
        discount: 100,
        used: false,
      };
      return voucher;
    });
};

export const mockCreateVoucher = (code: string, discount: number) => {
  jest
    .spyOn(voucherRepository, "createVoucher")
    .mockImplementationOnce((): any => {
      const voucher: Voucher = {
        id: 1,
        code,
        discount,
        used: false,
      };

      return voucher;
    });
};

export const mockInvalidDiscountVoucher = (discount: number) => {
  jest
    .spyOn(voucherRepository, "createVoucher")
    .mockImplementationOnce((code: string, discount: number): any => {
      if (discount < 1 || discount > 100) {
        throw new Error();
      }
    });
};
