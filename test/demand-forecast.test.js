const assert = require("assert");

async function runAllTests() {
  console.log("=== KISAN CONNECT — AI DEMAND FORECAST VERIFICATION SUITE ===");

  const BASE_URL = "http://localhost:3000";

  // 1. Test Determinism across 50 iterations
  console.log("\n[TEST 1] Verifying Mathematical Determinism (50 iterations)...");
  let firstResult = null;
  for (let i = 0; i < 50; i++) {
    const res = await fetch(`${BASE_URL}/api/forecast?product=Tomato`);
    assert.strictEqual(res.status, 200, "Status should be 200");
    const data = await res.json();
    if (i === 0) {
      firstResult = JSON.stringify(data);
    } else {
      assert.strictEqual(
        JSON.stringify(data),
        firstResult,
        `Iteration ${i} result differed from iteration 0 — model must be deterministic!`
      );
    }
  }
  console.log("  ✓ PASS: 50/50 iterations yielded 100% identical outputs.");

  // 2. Test Tomato Forecast Values
  console.log("\n[TEST 2] Verifying Tomato Forecast Calculation...");
  const tomatoRes = await fetch(`${BASE_URL}/api/forecast?product=Tomato`);
  const tomato = await tomatoRes.json();
  assert.strictEqual(tomato.success, true);
  assert.strictEqual(tomato.product, "Tomato");
  assert.strictEqual(tomato.forecastQuantity, 150);
  assert.strictEqual(tomato.unit, "kg");
  assert.strictEqual(tomato.trend, "increasing");
  assert.strictEqual(tomato.changePercentage, 7.1);
  assert.ok(tomato.recommendation.includes("Tomato"), "Recommendation mentions Tomato");
  assert.strictEqual(tomato.isDemoData, true);
  assert.ok(tomato.dataSource.includes("Prototype estimate"), "Includes prototype label");
  console.log("  ✓ PASS: Tomato forecast = 150 kg (+7.1% increasing).");

  // 3. Test Sharbati Wheat Forecast Values
  console.log("\n[TEST 3] Verifying Sharbati Wheat Forecast...");
  const wheatRes = await fetch(`${BASE_URL}/api/forecast?product=Wheat`);
  const wheat = await wheatRes.json();
  assert.strictEqual(wheat.success, true);
  assert.strictEqual(wheat.product, "Sharbati Wheat");
  assert.strictEqual(wheat.forecastQuantity, 135);
  assert.strictEqual(wheat.unit, "Qtl");
  assert.strictEqual(wheat.trend, "increasing");
  assert.strictEqual(wheat.changePercentage, 3.8);
  console.log("  ✓ PASS: Sharbati Wheat forecast = 135 Qtl (+3.8% increasing).");

  // 4. Test Red Onion Forecast
  console.log("\n[TEST 4] Verifying Red Onion Forecast...");
  const onionRes = await fetch(`${BASE_URL}/api/forecast?product=Onion`);
  const onion = await onionRes.json();
  assert.strictEqual(onion.success, true);
  assert.strictEqual(onion.product, "Red Onion");
  assert.strictEqual(onion.forecastQuantity, 116);
  assert.strictEqual(onion.trend, "increasing");
  console.log("  ✓ PASS: Red Onion forecast = 116 Qtl.");

  // 5. Test Error Handling: Unknown Crop (404)
  console.log("\n[TEST 5] Verifying Unknown Product Handling (404)...");
  const unknownRes = await fetch(`${BASE_URL}/api/forecast?product=NonExistentCrop123`);
  assert.strictEqual(unknownRes.status, 404, "Expected HTTP 404");
  const unknownData = await unknownRes.json();
  assert.strictEqual(unknownData.success, false);
  assert.ok(unknownData.error.includes("No historical or demo demand data available"));
  console.log("  ✓ PASS: Handled 404 cleanly with user-friendly error message.");

  // 6. Test Error Handling: Missing Product Param (400)
  console.log("\n[TEST 6] Verifying Missing Parameter Handling (400)...");
  const missingRes = await fetch(`${BASE_URL}/api/forecast`);
  assert.strictEqual(missingRes.status, 400, "Expected HTTP 400");
  const missingData = await missingRes.json();
  assert.strictEqual(missingData.success, false);
  assert.ok(missingData.error.includes("required"));
  console.log("  ✓ PASS: Handled 400 cleanly with validation error.");

  // 7. Test Farmer Dashboard UI Render (200)
  console.log("\n[TEST 7] Verifying Farmer Dashboard HTML Page...");
  const pageRes = await fetch(`${BASE_URL}/`);
  assert.strictEqual(pageRes.status, 200, "Expected HTTP 200 for dashboard");
  const html = await pageRes.text();
  assert.ok(html.includes("KISAN Connect"), "Page contains brand name");
  assert.ok(html.includes("AI Demand Insights") || html.includes("Farmer Command"), "Page contains forecast UI header");
  console.log("  ✓ PASS: Farmer Dashboard renders successfully with AI Demand components.");

  console.log("\n=======================================================");
  console.log(">>> ALL 7 AUTOMATED VERIFICATION TESTS PASSED! <<<");
  console.log("=======================================================\n");
}

runAllTests().catch((err) => {
  console.error("TEST SUITE FAILED:", err);
  process.exit(1);
});
