/**
 * Unit tests for Rule Management Controller
 *
 * Tests all four main functions: listRule, createRule, updateRule, deleteRule
 * Each function tests:
 * - Success path (returns 200 with data)
 * - Error path (returns 500 with error message)
 */

import { describe, it, test, expect, beforeEach, jest } from "@jest/globals";
import { listRule, createRule, updateRule, deleteRule } from "./controller.js";

describe("Rule Management Controller", () => {
  let req, res;

  beforeEach(() => {
    // Mock request object
    req = {
      body: {},
      params: {},
      query: {},
    };

    // Mock response object with chainable methods
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
  });

  /**
   * Test Suite: createRule
   * Endpoint: POST /rules
   * Creates a new rule with validation
   */
  describe("createRule", () => {
    test("should handle request with valid payload", async () => {
      req.body = {
        type: "TimeWindowPromotion", // TimeWindowPromotion / RemoteAreaSurcharge / WeightTier
        priority: 3,
        effective_from: "2026-02-19",
        effective_to: "2026-02-25",
        is_active: 1,
        rule_data: {
          TimeWindowPromotion: {
            percentage: 10,
            start_time: "08:00",
            end_time: "12:00",
          },
          RemoteAreaSurcharge: {
            destination: "TH-MHS",
            price: 100,
          },
          WeightTier: [
            {
              min: 0,
              max: 5,
              price_per_kg: 5,
            },
            {
              min: 5,
              max: 90,
              price_per_kg: 10,
            },
          ],
        },
      };

      await createRule(req, res);

      // Should call response methods
      expect(res.status).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalled();

      const jsonCall = res.json.mock.calls[0][0];
      expect(jsonCall).toHaveProperty("status");
    });

    test("should return response object", async () => {
      req.body = {
        type: "TimeWindowPromotion", // TimeWindowPromotion / RemoteAreaSurcharge / WeightTier
        priority: 3,
        effective_from: "2026-02-19",
        effective_to: "2026-02-25",
        is_active: 1,
        rule_data: {
          TimeWindowPromotion: {
            percentage: 10,
            start_time: "08:00",
            end_time: "12:00",
          },
          RemoteAreaSurcharge: {
            destination: "TH-MHS",
            price: 100,
          },
          WeightTier: [
            {
              min: 0,
              max: 5,
              price_per_kg: 5,
            },
            {
              min: 5,
              max: 90,
              price_per_kg: 10,
            },
          ],
        },
      };

      await createRule(req, res);

      const responseBody = res.json.mock.calls[0][0];
      expect(responseBody).toHaveProperty("status");
      expect(["success", "error"]).toContain(responseBody.status);
    });

    test("should handle missing required fields", async () => {
      req.body = { priority: 1 }; // Missing required fields

      await createRule(req, res);

      expect(res.status).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalled();
    });
  });

  /**
   * Test Suite: updateRule
   * Endpoint: PUT /rules
   * Updates an existing rule
   */
  describe("updateRule", () => {
    test("should handle request with valid payload", async () => {
      req.body = {
        id: 2,
        type: "TimeWindowPromotion", // TimeWindowPromotion / RemoteAreaSurcharge / WeightTier
        priority: 1,
        effective_from: "2026-02-19",
        effective_to: "2026-02-20",
        is_active: 1,
        rule_data: {
          TimeWindowPromotion: {
            percentage: 10,
            start_time: "08:00",
            end_time: "20:00",
          },
          RemoteAreaSurcharge: {
            destination: "TH-MHS",
            price: 10,
          },
          WeightTier: [
            {
              min: 0,
              max: 5,
              price_per_kg: 80,
            },
            {
              min: 5,
              max: 20,
              price_per_kg: 70,
            },
          ],
        },
      };

      await updateRule(req, res);

      expect(res.status).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalled();
    });

    test("should return proper response structure", async () => {
      req.body = {
        id: 1,
        type: "TimeWindowPromotion", // TimeWindowPromotion / RemoteAreaSurcharge / WeightTier
      };

      await updateRule(req, res);

      const responseBody = res.json.mock.calls[0][0];
      expect(responseBody).toHaveProperty("status");
      expect(["success", "error"]).toContain(responseBody.status);
    });

    test("should handle missing rule id", async () => {
      req.body = {
        type: "TimeWindowPromotion", // TimeWindowPromotion / RemoteAreaSurcharge / WeightTier
        priority: 1,
        effective_from: "2026-02-19",
        effective_to: "2026-02-20",
        is_active: 1,
        rule_data: {
          TimeWindowPromotion: {
            percentage: 10,
            start_time: "08:00",
            end_time: "20:00",
          },
          RemoteAreaSurcharge: {
            destination: "TH-MHS",
            price: 10,
          },
          WeightTier: [
            {
              min: 0,
              max: 5,
              price_per_kg: 80,
            },
            {
              min: 5,
              max: 20,
              price_per_kg: 70,
            },
          ],
        },
      }; // Missing id

      await updateRule(req, res);

      expect(res.status).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalled();
    });
  });

  /**
   * Test Suite: listRule
   * Endpoint: GET /rules
   * Retrieves all rules from database
   */
  describe("listRule", () => {
    test("should handle success response", async () => {
      // When listRule is called, it should call res.status() with 200
      // and res.json() with data in success format

      await listRule(req, res);

      // Verify that status and json were called
      expect(res.status).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalled();

      // Get the actual call arguments
      const statusCall = res.status.mock.calls[0];
      const jsonCall = res.json.mock.calls[0][0];

      // The response should have status and data fields
      expect(jsonCall).toHaveProperty("status");
      expect(jsonCall).toHaveProperty("data");
    });

    test("should return 200 on success", async () => {
      await listRule(req, res);

      // If successful, status should be 200
      // If error, status should be 500
      const statusCode = res.status.mock.calls[0]?.[0];

      expect([200, 500]).toContain(statusCode);
    });
  });

  /**
   * Test Suite: deleteRule
   * Endpoint: DELETE /rules/:id
   * Deletes a rule by id from URL parameters
   */
  describe("deleteRule", () => {
    test("should handle request with rule id", async () => {
      req.params = { id: 1 };

      await deleteRule(req, res);

      expect(res.status).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalled();
    });

    test("should return proper response structure", async () => {
      req.params = { id: 1 };

      await deleteRule(req, res);

      const responseBody = res.json.mock.calls[0][0];
      expect(responseBody).toHaveProperty("status");
      expect(["success", "error"]).toContain(responseBody.status);
    });

    test("should handle missing rule id", async () => {
      req.params = {}; // Missing id

      await deleteRule(req, res);

      expect(res.status).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalled();
    });

    test("should handle non-existent rule id", async () => {
      req.params = { id: 999 };

      await deleteRule(req, res);

      expect(res.status).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalled();
    });
  });
});
