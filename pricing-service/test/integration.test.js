import {
  describe,
  it,
  test,
  expect,
  beforeAll,
  afterAll,
  jest,
} from "@jest/globals";
import {
  quoteBulk,
  quotePricing,
} from "../api/pricing-management-api/controller";

describe("Pricing API Service Integration Test", () => {
  let req, res;

  beforeEach(() => {
    jest.clearAllMocks();
    req = {
      body: {},
      params: {},
      query: {},
      get: jest.fn().mockImplementation((header) => {
        if (header === "content-type") return "application/json";
        return null;
      }),
    };

    // Mock response object with chainable methods
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
  });

  /**
   * Test Suite: quotePricing
   * Endpoint: POST /quotes/price
   */
  describe("quotePricing", () => {
    test("should handle request with valid payload", async () => {
      req.body = {
        name: "QUOTE001",
        products: [
          {
            product_name: "Metal Rod",
            price: 300,
            quantity: 1,
            weight: 10,
          },
          {
            product_name: "Bolt",
            price: 50,
            quantity: 5,
            weight: 1,
          },
          {
            product_name: "Nail",
            price: 10,
            quantity: 100,
            weight: 0.2,
          },
        ],
        shipping_to: "TH-MHS",
      };

      await quotePricing(req, res);

      // Should call response methods
      expect(res.status).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalled();

      const jsonCall = res.json.mock.calls[0][0];
      expect(jsonCall).toHaveProperty("status");
      expect(jsonCall.data).toHaveProperty("totalPrice");
      expect(jsonCall.data).toHaveProperty("totalWeight");
      expect(jsonCall.data).toHaveProperty("name");
    });
  });

  /**
   * Test Suite: quoteBulk
   * Endpoint: POST /quotes/bulk
   */
  describe("quoteBulk", () => {
    test("should handle valid bulk JSON payload", async () => {
      req.body = [
        {
          name: "QUOTE001",
          products: [
            {
              product_name: "Metal Rod",
              price: 300,
              quantity: 1,
              weight: 10,
            },
            {
              product_name: "Bolt",
              price: 50,
              quantity: 5,
              weight: 1,
            },
            {
              product_name: "Nail",
              price: 10,
              quantity: 100,
              weight: 0.2,
            },
          ],
          shipping_to: "TH-MHS",
        },
        {
          name: "QUOTE002",
          products: [
            {
              product_name: "Metal Rod",
              price: 300,
              quantity: 2,
              weight: 10,
            },
            {
              product_name: "Bolt",
              price: 50,
              quantity: 5,
              weight: 1,
            },
            {
              product_name: "Nail",
              price: 10,
              quantity: 100,
              weight: 0.2,
            },
          ],
          shipping_to: "TH-MHS",
        },
      ];

      await quoteBulk(req, res);

      const jsonCall = res.json.mock.calls[0][0];
      expect(jsonCall).toHaveProperty("status");
    });

    test("should throw error if content-type is not application/json", async () => {
      // Change mock behavior for this specific test
      req.get.mockReturnValue("text/plain");

      await quoteBulk(req, res);

      const jsonCall = res.json.mock.calls[0][0];
      expect(jsonCall.status).toBe("error");
      expect(jsonCall.message).toBe("File format mismatch");
    });
  });
});
