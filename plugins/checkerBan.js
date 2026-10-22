
const handler = async (m, { conn }) => {
  const who =
    m.mentionedJid?.[0] ||
    m.quoted?.sender ||
    null;

  if (!who) {
    return m.reply(
      '❌ Menziona un utente o rispondi a un suo messaggio.\n\n' +
      'Esempio: .checkerBan @utente'
    );
  }

  const user = global.db.data.users[who] || {};
  const isBanned = user.banned === true;

  let name = 'Utente';
  try {
    name = await conn.getName(who);
  } catch {}

  await conn.sendMessage(m.chat, {
    text:
      `╭━━━〔 444-BOT 〕━━━╮\n` +
      `┃ 👤 Nome: ${name}\n` +
      `┃ 🆔 ID: ${who.split('@')[0]}\n` +
      `┃\n` +
      `┃ ${isBanned ? '🚫 BANNATO' : '✅ NON BANNATO'}\n` +
      `╰━━━━━━━━━━━━━━━━╯`,
    mentions: [who]
  }, { quoted: m });
};

handler.help = ['checkerBan'];
handler.tags = ['info'];
handler.command = ['checkerban'];

export default handler;
