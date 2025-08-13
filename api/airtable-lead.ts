// Vercel Serverless Function to store leads in Airtable
// Required env vars (set on the hosting platform, NOT exposed to the client):
// - AIRTABLE_TOKEN (Personal Access Token)
// - AIRTABLE_BASE_ID
// - AIRTABLE_TABLE_NAME

import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const token = process.env.AIRTABLE_TOKEN;
  const baseId = process.env.AIRTABLE_BASE_ID;
  const table = process.env.AIRTABLE_TABLE_NAME;

  if (!token || !baseId || !table) {
    return res.status(501).json({ error: "Airtable not configured" });
  }

  let body: any = req.body;
  if (typeof body === "string") {
    try { body = JSON.parse(body); } catch { body = {}; }
  }

  const { name, email, whatsapp, message, page } = body || {};

  if (!name || !email || !whatsapp) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const url = `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(table)}`;
    const atRes = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fields: {
          Name: name,
          Email: email,
          Whatsapp: whatsapp,
          Message: message ?? "",
          Page: page ?? "",
          Source: "Landing True Rise",
          Status: "Novo",
          CreatedAt: new Date().toISOString(),
        },
      }),
    });

    if (!atRes.ok) {
      const text = await atRes.text();
      return res.status(502).json({ error: "Airtable request failed", details: text });
    }

    const json = await atRes.json();
    return res.status(200).json({ ok: true, id: json?.id });
  } catch (e: any) {
    return res.status(500).json({ error: "Unexpected error", details: String(e?.message || e) });
  }
}


