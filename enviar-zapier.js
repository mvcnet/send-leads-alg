export default async function handler(req, res) {
  // Libera CORS para todas as origens e métodos
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Responde imediatamente a requisições OPTIONS (preflight)
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Bloqueia métodos diferentes de POST
  if (req.method !== 'POST') {
    return res.status(405).end("Método não permitido");
  }

  try {
    const zapierWebhook = "https://hooks.zapier.com/hooks/catch/15307898/20p7qcm/";

    const resposta = await fetch(zapierWebhook, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(req.body)
    });

    if (!resposta.ok) throw new Error("Erro ao enviar para o Zapier");

    return res.status(200).json({ ok: true });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
