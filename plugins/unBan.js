
const handler = async (m, { text }) => {
  const who =
    m.mentionedJid?.[0] ||
    m.quoted?.sender ||
    (text?.trim()
      ? `${text.replace(/\D/g, '')}@s.whatsapp.net`
      : null);

  if (!who || who === '@s.whatsapp.net') {
    return m.reply('❌ Usa: .unban 393331234567 oppure menziona un utente.');
  }

  const user = global.db.data.users[who];

  if (!user?.banned) {
    return m.reply('✅ Questo numero non risulta bannato.');
  }

  user.banned = false;

  return m.reply(
    `╭━━━〔 444-BOT 〕━━━╮\n` +
    `┃ ✅ BAN RIMOSSO\n` +
    `┃ 📱 ${who.split('@')[0]}\n` +
    `╰━━━━━━━━━━━━━━━━╯`
  );
};

handler.help = ['unban <numero>'];
handler.tags = ['owner'];
handler.command = ['unban'];
handler.owner = true;

export default handler;
