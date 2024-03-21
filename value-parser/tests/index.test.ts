import {ConvertGivenDuration} from "../index";

describe("Convert given duration", () => {
    it("should calc seconds correctly for given format PT1H1M1.2S", () => {
      expect(ConvertGivenDuration("PT1H1M1.2S")).toEqual(3661.2);
    });

    it("should calc seconds correctly for given format PT1M1.2S", () => {
        expect(ConvertGivenDuration("PT1M1.2S")).toEqual(61.2);
      });
  });