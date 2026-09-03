# KISSAN Connect — Project Specification

## Problem
SIH Problem Statement 26033: **Multiple intermediaries reduce farmers earnings and increase consumer prices.**

## Solution
KISSAN Connect is a simple local web prototype that demonstrates a more direct connection between farmers/FPOs and consumers or bulk buyers, with demand intelligence and logistics support.

## Core demonstration

**Farmer/FPO → Produce Listing → Marketplace → Buyer → Order → Demand Insight → Logistics Route**

The product story is not a normal e-commerce store with an AI button added at the end. The system should show how supply, buyer demand, orders, and logistics can work together.

## Primary users

- Farmer / FPO
- Consumer / Buyer
- System/Admin view for prototype impact and operations

## Minimum working features

### Farmer
- Demo login/access
- Farmer dashboard
- Add produce
- View own listings/inventory
- View incoming orders
- View earnings summary
- View demand recommendation

### Buyer
- Marketplace
- Search/filter
- Product details
- Select quantity
- Place order
- View order status

### AI
- Demand forecast or demand score
- Supply/listing recommendation
- Route optimization result

### Logistics
- Delivery information
- Pickup/drop locations
- Route/stop sequence visualization

### Admin/impact
- Basic counts and prototype metrics
- Clearly labelled demo/synthetic metrics

## Non-goals

- Production deployment
- Native mobile applications
- Real payment gateway
- Real-time GPS tracking
- Blockchain
- Microservices
- Kubernetes
- Large-scale ML training
- Government-system integration
- Complex enterprise authentication

## Prototype principles

1. End-to-end flow is more important than feature count.
2. Prefer simple, reliable implementations.
3. Use realistic seeded data.
4. Label simulated or synthetic values clearly.
5. Never invent AI accuracy claims.
6. Keep the whole project easy to run locally.
7. Do not add technology only because it sounds advanced.
