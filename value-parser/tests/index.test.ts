import {ConvertGivenDuration} from "../index";

describe("Math functions", () => {
    it("should calc seconds correctly for given format", () => {
      expect(ConvertGivenDuration("PT1H1M1.2S")).toEqual(3661.2);
    });
  });