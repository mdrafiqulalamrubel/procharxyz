'use client';

import { useState, useRef, useEffect } from 'react';
import { X, Send, MessageCircle, Bot, Minimize2 } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const getReply = (input: string): string => {
  const msg = input.toLowerCase().trim();

  if (/^(hi|hello|hey|assalamu|salam|হ্যালো|হাই|good morning|good evening|good afternoon)/.test(msg)) {
    return "Hi there! 👋 Welcome to Prochar.xyz!\n\nI can help you with:\n• 💰 Pricing plans\n• ✨ Features\n• 🚀 Getting started\n• 📞 Contact info\n\nWhat would you like to know?";
  }

  if (/(price|pricing|plan|cost|কত|টাকা|মূল্য|package|subscription|pay|fee|monthly|৳)/.test(msg)) {
    return "💰 Our Pricing Plans:\n\n🆓 Free Trial — ৳0\n• 1,000 emails (one-time)\n• Up to 100 contacts\n\n📦 Starter — ৳500/month\n• 5,000 emails/month\n• Up to 500 contacts\n\n🌟 Growth — ৳900/month ⭐ Most Popular\n• 10,000 emails/month\n• A/B testing + segmentation\n• Up to 2,000 contacts\n\n💼 Business — ৳2,000/month\n• 25,000 emails/month\n• API access\n• Up to 5,000 contacts\n\n⚡ Pro — ৳3,500/month\n• 50,000 emails/month\n• Full automation\n• Up to 15,000 contacts\n\n🏢 Enterprise — ৳6,000+/month\n• 100,000+ emails\n• Unlimited contacts\n\nNo credit card required! 🎉";
  }

  if (/(free|trial|ফ্রি|বিনামূল্যে|no cost|zero|without pay|1000|1,000)/.test(msg)) {
    return "🆓 Yes! We have a FREE plan!\n\n✅ 1,000 emails (one-time)\n✅ Basic templates\n✅ Up to 100 contacts\n✅ Community support\n✅ No credit card required\n\nVisit prochar.xyz to get started! 🚀";
  }

  if (/(feature|what can|what do|কি কি|সুবিধা|capability|offer|provide|include|tool)/.test(msg)) {
    return "✨ Prochar.xyz Features:\n\n📧 Email Campaign Sending\nThousands of emails with high deliverability.\n\n🎨 50+ Ready Templates\nMobile-responsive for all needs.\n\n🖱️ Drag & Drop Builder\nCreate emails without coding.\n\n👥 Email List Management\nTags, segments & smart lists.\n\n📊 Advanced Analytics\nTrack opens, clicks & bounce rates.\n\n🤖 Automation & Workflows\nDrip campaigns & triggers.\n\n🔒 SSL, 99.9% uptime, 24/7 support!";
  }

  if (/(start|begin|how to|signup|sign up|register|join|শুরু|কিভাবে|getting started|create account)/.test(msg)) {
    return "🚀 Get Started in 4 Easy Steps:\n\n1️⃣ Upload Your Email List\nImport from CSV, Excel or CRM.\n\n2️⃣ Choose a Template\n50+ ready templates or design your own.\n\n3️⃣ Send Your Campaign\nReach thousands instantly.\n\n4️⃣ Track & Optimize\nMonitor opens & clicks in real-time.\n\n⏱️ Launch in under 5 minutes!\nVisit prochar.xyz to start free! 🎉";
  }

  if (/(template|design|drag|drop|builder|ডিজাইন|টেমপ্লেট)/.test(msg)) {
    return "🎨 Templates & Design:\n\n✅ 50+ ready-made templates\n✅ Mobile-responsive designs\n✅ Drag & Drop Builder\n✅ No coding needed!\n✅ Preview before sending\n\nAvailable from Starter plan (৳500/month)!";
  }

  if (/(analytic|report|track|open rate|click|stat|metric|dashboard|a\/b|ab test)/.test(msg)) {
    return "📊 Analytics & Reporting:\n\n✅ Real-time open rate tracking\n✅ Click rate monitoring\n✅ Bounce rate analysis\n✅ Heatmap reports\n✅ A/B testing (Growth+)\n✅ Advanced analytics (Business+)\n\n🏆 42% average open rate!\nDouble the industry standard!";
  }

  if (/(automat|workflow|drip|sequence|trigger|schedule|auto|স্বয়ংক্রিয়)/.test(msg)) {
    return "🤖 Automation & Workflows:\n\n✅ Welcome email sequences\n✅ Drip campaigns\n✅ Behavioral trigger emails\n✅ Runs on autopilot!\n✅ Webhooks & API (Pro+)\n\nAvailable on Pro plan (৳3,500/month).\nSave 20+ hours per week! ⏰";
  }

  if (/(contact|support|help|phone|call|reach|talk|যোগাযোগ|ফোন|সাহায্য|office|location)/.test(msg)) {
    return "📞 Contact Us:\n\n📧 Email: hello@prochar.xyz\n📱 Phone: +880 171 234 5678\n🏢 Level 5, Tech Park,\n    Gulshan, Dhaka 1212\n\n⏰ Email support: 24/7\n⏰ Phone: Business hours\n\nWe respond within a few hours! 😊";
  }

  if (/(about|company|who are|prochar|bangladesh|বাংলাদেশ|trusted|reliable)/.test(msg)) {
    return "🏢 About Prochar.xyz:\n\nBangladesh's most powerful email marketing platform!\n\n📊 Numbers:\n• 2,500+ happy businesses\n• 10M+ emails sent\n• 42% average open rate\n• 99.9% uptime\n• 50K+ emails sent daily\n\n🇧🇩 Built for Bangladesh:\n• BDT pricing\n• Local data centers\n• Bengali & English support\n• GDPR compliant 🌟";
  }

  if (/(security|secure|safe|privacy|gdpr|ssl|encrypt|spam|নিরাপদ)/.test(msg)) {
    return "🔒 Security & Trust:\n\n✅ 256-bit SSL Encryption\n✅ GDPR Compliant\n✅ No spam guarantee\n✅ Local BD data centers\n✅ 99.9% uptime SLA\n\nYour data is completely safe! 🛡️";
  }

  if (/(api|integration|webhook|developer|integrate|crm)/.test(msg)) {
    return "🔌 API & Integrations:\n\n✅ API access — Business (৳2,000+)\n✅ Webhooks — Pro (৳3,500+)\n✅ Full API — Enterprise\n✅ CSV & Excel import\n✅ CRM integration\n\nContact: hello@prochar.xyz 👨‍💻";
  }

  if (/(cancel|refund|stop|quit|money back|বন্ধ|ফেরত)/.test(msg)) {
    return "❓ Cancellation & Refunds:\n\n✅ Cancel anytime!\n✅ No lock-in contracts\n✅ No hidden fees\n\nFor refunds:\n📧 hello@prochar.xyz\n📱 +880 171 234 5678 😊";
  }

  if (/(thank|thanks|ধন্যবাদ|great|awesome|perfect|helpful|nice)/.test(msg)) {
    return "You're welcome! 😊\n\nFeel free to ask anything else!\n📧 hello@prochar.xyz\n📱 +880 171 234 5678\n\nHave a great day! 🌟";
  }

  if (/(bye|goodbye|see you|later|আল্লাহ হাফেজ|বিদায়)/.test(msg)) {
    return "Goodbye! 👋\nThank you for visiting Prochar.xyz!\n\n📧 hello@prochar.xyz\nHave a wonderful day! 🌟";
  }

  if (/(আমি|আপনি|কি|কেন|কোন|কখন|কিভাবে|বলুন|জানতে|চাই|ইমেইল)/.test(msg)) {
    return "আমি Prochar.xyz-এর সহকারী! 🙏\n\nসাহায্য করতে পারি:\n• 💰 মূল্য পরিকল্পনা\n• ✨ ফিচারসমূহ\n• 🚀 শুরু করার পদ্ধতি\n• 📞 যোগাযোগ তথ্য\n\nআপনার প্রশ্ন করুন! 😊";
  }

  return "Thanks for your message! 😊\n\nI can help with:\n• 💰 Pricing & Plans\n• ✨ Features\n• 🚀 Getting Started\n• 📊 Analytics\n• 🤖 Automation\n• 📞 Contact & Support\n\nTry asking:\n\"What are your pricing plans?\"\n\"Do you have a free plan?\"\n\"How do I get started?\"\n\n📧 hello@prochar.xyz\n📱 +880 171 234 5678";
};

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hi! 👋 I'm Prochar Assistant.\n\nI can help you with pricing, features, getting started, and anything about Prochar.xyz!\n\nWhat would you like to know?",
    },
  ]);
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, open]);

  const sendMessage = (text?: string) => {
    const msg = (text || input).trim();
    if (!msg) return;
    const reply = getReply(msg);
    setMessages(prev => [
      ...prev,
      { role: 'user', content: msg },
      { role: 'assistant', content: reply },
    ]);
    setInput('');
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  const quickQuestions = [
    '💰 Pricing plans?',
    '🆓 Do you have a free plan?',
    '✨ What features do you offer?',
    '🚀 How do I get started?',
    '📞 How to contact you?',
  ];

  return (
    <>
      {open && (
        <div style={{
          position: 'fixed', bottom: '90px', right: '24px', width: '360px',
          maxHeight: '560px', display: 'flex', flexDirection: 'column',
          background: '#ffffff', borderRadius: '20px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
          zIndex: 9999, overflow: 'hidden', border: '1px solid #e5e7eb',
        }}>

          {/* HEADER */}
          <div style={{
            background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
            padding: '16px 20px', display: 'flex',
            alignItems: 'center', justifyContent: 'space-between',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '38px', height: '38px', background: 'rgba(255,255,255,0.2)',
                borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Bot size={20} color="white" />
              </div>
              <div>
                <div style={{ color: 'white', fontWeight: 700, fontSize: '14px' }}>Prochar Assistant</div>
                <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ width: '6px', height: '6px', background: '#4ade80', borderRadius: '50%', display: 'inline-block' }} />
                  Always Online • Free
                </div>
              </div>
            </div>
            <button onClick={() => setOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'white' }}>
              <Minimize2 size={18} />
            </button>
          </div>

          {/* MESSAGES */}
          <div style={{
            flex: 1, overflowY: 'auto', padding: '16px',
            display: 'flex', flexDirection: 'column', gap: '12px', background: '#f9fafb',
          }}>
            {messages.map((msg, i) => (
              <div key={i} style={{
                display: 'flex',
                justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
                alignItems: 'flex-end', gap: '8px',
              }}>
                {msg.role === 'assistant' && (
                  <div style={{
                    width: '28px', height: '28px',
                    background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
                    borderRadius: '50%', display: 'flex',
                    alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }}>
                    <Bot size={14} color="white" />
                  </div>
                )}
                <div style={{
                  maxWidth: '78%', padding: '10px 14px',
                  borderRadius: msg.role === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                  background: msg.role === 'user' ? 'linear-gradient(135deg, #2563eb, #7c3aed)' : 'white',
                  color: msg.role === 'user' ? 'white' : '#1f2937',
                  fontSize: '13px', lineHeight: '1.6',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.06)', whiteSpace: 'pre-wrap',
                }}>
                  {msg.content}
                </div>
              </div>
            ))}

            {messages.length === 1 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '4px' }}>
                <p style={{ fontSize: '11px', color: '#9ca3af', textAlign: 'center', margin: 0 }}>Quick questions 👇</p>
                {quickQuestions.map((q, i) => (
                  <button key={i} onClick={() => sendMessage(q)}
                    style={{
                      background: 'white', border: '1px solid #e5e7eb',
                      borderRadius: '20px', padding: '7px 14px',
                      fontSize: '13px', color: '#2563eb', cursor: 'pointer', textAlign: 'left',
                    }}
                    onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = '#eff6ff'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'white'; }}
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* INPUT */}
          <div style={{
            padding: '12px 16px', background: 'white',
            borderTop: '1px solid #f3f4f6', display: 'flex', gap: '8px', alignItems: 'flex-end',
          }}>
            <textarea value={input} onChange={e => setInput(e.target.value)} onKeyDown={handleKey}
              placeholder="Type your message..." rows={1}
              style={{
                flex: 1, border: '1px solid #e5e7eb', borderRadius: '12px',
                padding: '10px 14px', fontSize: '14px', resize: 'none',
                outline: 'none', fontFamily: 'inherit', lineHeight: '1.4',
                maxHeight: '80px', overflowY: 'auto',
              }}
            />
            <button onClick={() => sendMessage()} disabled={!input.trim()}
              style={{
                width: '40px', height: '40px', borderRadius: '12px',
                background: input.trim() ? 'linear-gradient(135deg, #2563eb, #7c3aed)' : '#e5e7eb',
                border: 'none', cursor: input.trim() ? 'pointer' : 'not-allowed',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>
              <Send size={16} color={input.trim() ? 'white' : '#9ca3af'} />
            </button>
          </div>
        </div>
      )}

      {/* FLOATING BUTTON */}
      <button onClick={() => setOpen(p => !p)}
        style={{
          position: 'fixed', bottom: '24px', right: '24px',
          width: '56px', height: '56px', borderRadius: '50%',
          background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
          border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 8px 24px rgba(37,99,235,0.4)',
          zIndex: 9999, transition: 'transform 0.2s',
        }}
        onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.1)')}
        onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
      >
        {open ? <X size={22} color="white" /> : <MessageCircle size={22} color="white" />}
      </button>
    </>
  );
}
