# Monsoon

Compliant trade receivables financing for Asia's SME exporters — verified end-to-end with [Cleanverse](https://cleanverse.com)'s CVI (Verified Identity) and CVA (Verified Assets) infrastructure, built on **Monad Testnet**.

Built for the **Cleanverse Build: Trusted Assets Hackathon** (RWA Track).

> **Smart contracts** (ComplianceRegistry / InvoiceAsset / FinancingPool) live in a companion repository: `monsoon-contract` — *link to be added*.

## What this is

SME exporters in Asia typically wait 60–120 days to get paid on their invoices. Monsoon brings trade receivables on-chain as verified assets, so exporters can get a cash advance against an invoice immediately after the buyer confirms it — with Cleanverse's CVI/CVA compliance stack embedded from the moment the invoice is issued, and the same invoice hash structurally unable to be pledged to two lenders at once.

## Architecture

- **Next.js 16** (App Router) + TypeScript, deployed as a single web app with 5 role-based portals (Bank, Exporter, Importer, Researcher, Admin)
- **Two contract modes**, switched by `NEXT_PUBLIC_CONTRACT_MODE`:
  - `mock` — fully self-contained demo, no wallet needed, deterministic mock data
  - `real` — reads/writes the deployed Monad Testnet contracts; write actions requiring a specific role (exporter mints its own invoice NFT, bank approves/disburses, buyer confirms/repays) are signed by the user's own connected wallet (wagmi), never by a shared backend key
- **Cleanverse integration**: KYB approval calls Cleanverse's real `generate_apass` (CVI) API and mirrors the result into our on-chain `ComplianceRegistry`; the settlement currency used by `FinancingPool` is a real Cleanverse-issued A-Token (CVA), not a placeholder stablecoin — see `lib/cleanverse/`
- **Supabase**: case data (`cases`, `risk_profiles`, `chain_records`, `alerts`, `audit_log`, …) — see `supabase/`

## Deployed contracts — Monad Testnet (chainId 10143)

| Contract | Address |
|---|---|
| ComplianceRegistry | [`0xec97185d251cd17e58a4d5b6bc0ac1df8d9056e7`](https://testnet.monadexplorer.com/address/0xec97185d251cd17e58a4d5b6bc0ac1df8d9056e7) |
| InvoiceAsset | [`0x756fc8f842ae808ad5af5a773e52580b2969e343`](https://testnet.monadexplorer.com/address/0x756fc8f842ae808ad5af5a773e52580b2969e343) |
| FinancingPool | [`0x6d210698924c56cc006c1f3d039bffdf607bfa4c`](https://testnet.monadexplorer.com/address/0x6d210698924c56cc006c1f3d039bffdf607bfa4c) |
| Settlement stablecoin (Cleanverse A-Token) | [`0x8602d979Accfa6c089fEc00519891B475c4A4412`](https://testnet.monadexplorer.com/address/0x8602d979Accfa6c089fEc00519891B475c4A4412) |

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in the values described below
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment variables

See [`.env.example`](.env.example) for the full list. At minimum:

- `NEXT_PUBLIC_CONTRACT_MODE=mock` to run without any wallet or API keys
- `ANTHROPIC_API_KEY` for the AI case-assessment features (falls back to static content if unset)
- Supabase keys if you want real case persistence instead of mock data (schema in `supabase/migrations/`)
- Contract addresses + `CLEANVERSE_API_ID`/`CLEANVERSE_API_KEY` only if running `NEXT_PUBLIC_CONTRACT_MODE=real`

### Demo accounts (mock mode)

| Role | Email | Password |
|---|---|---|
| Bank | `bank@monsoon.demo` | `demo1234` |
| Exporter | `exporter@monsoon.demo` | `demo1234` |
| Importer | `importer@monsoon.demo` | `demo1234` |
| Researcher | `researcher@monsoon.demo` | `demo1234` |
| Admin | `admin@monsoon.demo` | `admin5678` |

Or use the demo-account pills on the login page.

## Project docs

- [`docs/DESIGN.md`](docs/DESIGN.md) — design system reference
- [`docs/changes/`](docs/changes/) — dated change-record log (this project's process for tracking requirement changes)
