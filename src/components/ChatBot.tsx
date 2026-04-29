'use client';

import { useState, useRef, useEffect } from 'react';
import { X, Send, MessageCircle, Bot, Minimize2 } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const getReply = (input: string): string => {
  const msg = input.toLowerCase().trim();

  // ── Greetings ──────────────────────────────────────────────────────────────
  if (/^(hi|hello|hey|assalamu|salam|হ্যালো|হাই|good morning|good evening|good afternoon)/.test(msg)) {
    return "Hi there! 👋 Welcome to Prochar.xyz!\n\nI can help you with:\n• 💰 Pricing plans\n• ✨ Features & capabilities\n• 🏢 About Prochar & Daffodil Group\n• 🔒 Privacy & data security\n• 📞 Contact info\n\nWhat would you like to know?";
  }

  // ── Pricing ────────────────────────────────────────────────────────────────
  if (/(price|pricing|plan|cost|কত|টাকা|মূল্য|package|subscription|pay|fee|monthly|৳)/.test(msg)) {
    return "💰 Our Pricing Plans:\n\n🆓 Free Trial — ৳0\n• 1,000 emails (one-time)\n• Up to 100 contacts\n• No credit card required\n\n📦 Starter — ৳500/month\n• 5,000 emails/month\n• Up to 500 contacts\n\n🌟 Growth — ৳900/month ⭐ Most Popular\n• 10,000 emails/month\n• A/B testing + segmentation\n• Up to 2,000 contacts\n\n💼 Business — ৳2,000/month\n• 25,000 emails/month\n• API access\n• Up to 5,000 contacts\n\n⚡ Pro — ৳3,500/month\n• 50,000 emails/month\n• Full automation & webhooks\n• Up to 15,000 contacts\n\n🏢 Enterprise — ৳6,000+/month\n• 100,000+ emails\n• Unlimited contacts\n• Dedicated support\n\nNo credit card required to start! 🎉";
  }

  // ── Free plan ──────────────────────────────────────────────────────────────
  if (/(free|trial|ফ্রি|বিনামূল্যে|no cost|zero|without pay|1000|1,000)/.test(msg)) {
    return "🆓 Yes! We have a FREE plan!\n\n✅ 1,000 emails (one-time)\n✅ Basic templates\n✅ Up to 100 contacts\n✅ Community support\n✅ No credit card required\n\nVisit prochar.xyz to get started free! 🚀";
  }

  // ── Features ───────────────────────────────────────────────────────────────
  if (/(feature|what can|what do|কি কি|সুবিধা|capability|offer|provide|include|tool)/.test(msg)) {
    return "✨ Prochar.xyz Core Capabilities:\n\n📧 Email Campaign Management\nCreate & send campaigns through an intuitive interface.\n\n🎨 50+ Ready Templates\nMobile-responsive, ready-to-use & customizable.\n\n🖱️ Drag & Drop Builder\nDesign emails without any coding.\n\n👥 Audience Management\nList management, tags, segments & smart lists.\n\n📊 Real-time Analytics\nOpen rate, click rate, bounce rate & heatmap tracking.\n\n🤖 Automation & Workflows\nDrip campaigns, behavioral triggers & sequences.\n\n📈 Structured Reporting\nPerformance evaluation & decision-making insights.\n\n🔒 Secure & 99.9% uptime guaranteed!";
  }

  // ── Getting started ────────────────────────────────────────────────────────
  if (/(start|begin|how to|signup|sign up|register|join|শুরু|কিভাবে|getting started|create account)/.test(msg)) {
    return "🚀 Get Started in 4 Easy Steps:\n\n1️⃣ Upload Your Email List\nImport from CSV, Excel or connect your CRM.\n\n2️⃣ Choose or Create a Template\n50+ ready templates or use the drag & drop builder.\n\n3️⃣ Send Your Campaign\nReach thousands of inboxes instantly.\n\n4️⃣ Track & Optimize\nMonitor opens, clicks & engagement in real-time.\n\n⏱️ Launch your first campaign in under 5 minutes!\nNo setup fees. No learning curve.\n\nVisit prochar.xyz to start free! 🎉";
  }

  // ── Templates & Design ────────────────────────────────────────────────────
  if (/(template|design|drag|drop|builder|ডিজাইন|টেমপ্লেট)/.test(msg)) {
    return "🎨 Templates & Design:\n\n✅ 50+ ready-made templates\n✅ Mobile-responsive designs\n✅ Drag & Drop email builder\n✅ No coding needed!\n✅ Customizable for your brand\n✅ Preview before sending\n\nAvailable from Starter plan (৳500/month)!";
  }

  // ── Analytics ─────────────────────────────────────────────────────────────
  if (/(analytic|report|track|open rate|click|stat|metric|dashboard|a\/b|ab test|heatmap)/.test(msg)) {
    return "📊 Analytics & Reporting:\n\n✅ Real-time open rate tracking\n✅ Click rate monitoring\n✅ Bounce rate analysis\n✅ Heatmap-based engagement tracking\n✅ A/B testing (Growth plan+)\n✅ Advanced analytics (Business plan+)\n✅ Structured performance reports\n\n🏆 42% average open rate!\nDouble the industry standard!";
  }

  // ── Automation ────────────────────────────────────────────────────────────
  if (/(automat|workflow|drip|sequence|trigger|schedule|auto|স্বয়ংক্রিয়)/.test(msg)) {
    return "🤖 Automation & Workflows:\n\n✅ Welcome email sequences\n✅ Drip campaigns\n✅ Behavioral trigger emails\n✅ Runs on autopilot!\n✅ Webhooks & API (Pro plan+)\n\nAvailable on Pro plan (৳3,500/month).\nSave hours of manual work every week! ⏰";
  }

  // ── About Prochar ──────────────────────────────────────────────────────────
  if (/(about|company|who are|prochar|what is prochar)/.test(msg)) {
    return "🏢 About Prochar.xyz:\n\nProchar.xyz is a digital email marketing platform designed to enable businesses to execute structured, scalable, and data-driven email communication.\n\nWe simplify professional campaign management by combining usability with performance-focused tools.\n\n📊 Our Numbers:\n• 2,500+ happy businesses\n• 10M+ emails sent\n• 42% average open rate\n• 99.9% uptime\n• 50K+ emails sent daily\n\n🏆 Sister concern of Daffodil Group\n🇧🇩 Built for Bangladesh & beyond";
  }

  // ── Daffodil Group ────────────────────────────────────────────────────────
  if (/(daffodil|group|sister|parent|daffodil group)/.test(msg)) {
    return "🏛️ About Daffodil Group:\n\nProchar.xyz operates as a sister-concern of Daffodil Group — a diversified organization with a strong presence in:\n\n🎓 Education & skill development\n💼 Entrepreneurship development\n💻 Technology-driven initiatives\n🌐 Digital transformation\n\nThis association reflects a broader commitment to digital transformation and innovation-led growth in Bangladesh.\n\n🌐 Website: daffodil.group\n📧 Email: rar@daffodil.group";
  }

  // ── Vision & Mission ──────────────────────────────────────────────────────
  if (/(vision|mission|goal|future|roadmap|strategy|positioning)/.test(msg)) {
    return "🎯 Our Vision & Mission:\n\n🔭 Vision:\nBecoming a leading digital communication platform that empowers businesses to build meaningful, measurable, and long-term customer relationships.\n\n🚀 Mission:\nSimplify professional communication and enable businesses to grow through smarter, more effective email marketing.\n\n📌 Strategic Positioning:\n• Performance-driven email infrastructure\n• Supports SMEs & enterprise organizations\n• Subscription-based & pay-as-you-go models\n• Built for emerging digital markets";
  }

  // ── Bangladesh / Market ───────────────────────────────────────────────────
  if (/(bangladesh|বাংলাদেশ|local|bd|sme|small business|emerging market)/.test(msg)) {
    return "🇧🇩 Built for Bangladesh:\n\n✅ BDT (৳) pricing — no dollar conversions\n✅ Local support in Bengali & English\n✅ Designed for SMEs & enterprises\n✅ Supports growth-focused digital markets\n\n📈 Market Facts:\n• Email = highest ROI digital channel globally\n• SMEs need cost-effective marketing tools\n• Growing shift to direct-to-customer models\n\n2,500+ businesses across Bangladesh trust Prochar! 🌟";
  }

  // ── Privacy Policy ────────────────────────────────────────────────────────
  if (/(privacy|data|personal|collect|store|information|gdpr|private)/.test(msg)) {
    return "🔒 Our Privacy Policy:\n\n📋 What we collect:\n• Account info (name, email, phone, organization)\n• Campaign content & email lists you upload\n• Technical data (IP, browser, device info)\n\n🎯 How we use it:\n• To operate & improve the platform\n• To deliver your campaigns\n• For analytics & performance insights\n• For support & service communications\n\n🛡️ What we DON'T do:\n• We never sell your data to third parties\n• We never misuse your email lists\n• Your data is processed only for your services\n\n✅ GDPR compliant\n✅ 256-bit SSL Encryption\n✅ Secure local data centers\n\nFull policy: prochar.xyz/privacy-policy";
  }

  // ── Security ──────────────────────────────────────────────────────────────
  if (/(security|secure|safe|ssl|encrypt|spam|নিরাপদ|protection)/.test(msg)) {
    return "🔒 Security & Trust:\n\n✅ 256-bit SSL Encryption\n✅ GDPR Compliant\n✅ No spam guarantee\n✅ Secure servers & access controls\n✅ Regular system monitoring\n✅ 99.9% uptime SLA\n\n⚠️ User Responsibility:\nYou are responsible for ensuring your email lists are collected lawfully and recipients have given proper consent.\n\nYour data is completely safe with us! 🛡️";
  }

  // ── Terms of Service ──────────────────────────────────────────────────────
  if (/(terms|tos|terms of service|agreement|license|legal|policy|condition)/.test(msg)) {
    return "📄 Terms of Service Summary:\n\n✅ Use License:\nMaterials granted for personal, non-commercial use only. You may not copy, modify, or redistribute.\n\n⚠️ Disclaimer:\nMaterials provided 'as is' — no warranties expressed or implied.\n\n🚫 Limitations:\nProchar.xyz not liable for damages from use or inability to use the platform.\n\n👤 User Content:\nYour content remains your intellectual property. By posting, you grant Prochar.xyz a non-exclusive license to use it within the platform.\n\n🔄 Modifications:\nTerms may be revised at any time without notice.\n\nFull terms: prochar.xyz/terms-of-service\n📧 Questions: rar@daffodil.group";
  }

  // ── Cookies ───────────────────────────────────────────────────────────────
  if (/(cookie|cookies|tracking|browser|session|persistent)/.test(msg)) {
    return "🍪 Cookie Policy:\n\nWe use cookies to enhance your experience:\n\n🔑 Session Cookies — authentication & login\n💾 Persistent Cookies — remember your preferences\n📊 Analytics Cookies — understand user behavior\n⚙️ Functional Cookies — save settings & preferences\n\n✅ You can manage cookies in your browser settings.\n\n⚠️ Note: Disabling cookies may affect some platform features.\n\nFull policy: prochar.xyz/cookie-policy";
  }

  // ── Email data / User responsibility ──────────────────────────────────────
  if (/(email list|list|upload|contact list|spam|consent|anti.spam|comply|compliance)/.test(msg)) {
    return "📋 Email Lists & Compliance:\n\nProchar.xyz provides the tools & infrastructure. As a user:\n\n✅ You are responsible for lawfully collected email lists\n✅ You must obtain proper consent from recipients\n✅ You must comply with anti-spam regulations\n✅ You must follow applicable data protection laws\n\n🛡️ Our Commitment:\nWe do not sell, rent, or misuse your email lists.\nYour data is processed only to deliver your services.\n\n📧 Questions: rar@daffodil.group";
  }

  // ── API & Integrations ────────────────────────────────────────────────────
  if (/(api|integration|webhook|developer|integrate|crm|csv|excel|import)/.test(msg)) {
    return "🔌 API & Integrations:\n\n✅ CSV & Excel import — all plans\n✅ CRM integration — all plans\n✅ API access — Business plan (৳2,000+)\n✅ Webhooks — Pro plan (৳3,500+)\n✅ Full API — Enterprise plan\n\n👨‍💻 Developer support:\n📧 rar@daffodil.group\n🌐 prochar.xyz";
  }

  // ── Contact ───────────────────────────────────────────────────────────────
  if (/(contact|support|help|phone|call|reach|talk|যোগাযোগ|ফোন|সাহায্য|office|location|address)/.test(msg)) {
    return "📞 Contact Us:\n\n📧 Email: rar@daffodil.group\n📱 Phone: +880 184 702 7537\n🌐 Website: prochar.xyz\n🏢 102/1 Shukrabad, Mirpur Road,\n    Dhanmondi, Dhaka-1207, Bangladesh\n\n⏰ Email support: 24/7\n⏰ Phone: Business hours\n\nWe respond within a few hours! 😊";
  }

  // ── Cancel / Refund ───────────────────────────────────────────────────────
  if (/(cancel|refund|stop|quit|money back|বন্ধ|ফেরত)/.test(msg)) {
    return "❓ Cancellation & Refunds:\n\n✅ Cancel anytime — no lock-in contracts\n✅ No hidden fees\n\nFor refund requests:\n📧 rar@daffodil.group\n📱 +880 184 702 7537\n\nWe're here to help! 😊";
  }

  // ── Data retention ────────────────────────────────────────────────────────
  if (/(retain|retention|delete|remove|data delete|how long)/.test(msg)) {
    return "🗃️ Data Retention:\n\nWe retain your information only as long as necessary to:\n• Provide our services\n• Maintain operational & legal records\n• Resolve any disputes\n\nWhen no longer needed, data is securely deleted or anonymized following industry best practices.\n\n📧 To request deletion: rar@daffodil.group";
  }

  // ── Your rights ───────────────────────────────────────────────────────────
  if (/(my right|rights|access my data|request data|data right|delete my)/.test(msg)) {
    return "⚖️ Your Data Rights:\n\nDepending on your location & applicable laws, you may have the right to:\n\n✅ Access the information we hold about you\n✅ Request corrections to your data\n✅ Request deletion of your data\n\nTo exercise any of these rights:\n📧 rar@daffodil.group\n🌐 prochar.xyz";
  }

  // ── Thank you ─────────────────────────────────────────────────────────────
  if (/(thank|thanks|ধন্যবাদ|great|awesome|perfect|helpful|nice|good)/.test(msg)) {
    return "You're welcome! 😊\n\nFeel free to ask anything else about Prochar.xyz!\n\n📧 rar@daffodil.group\n📱 +880 184 702 7537\n🌐 prochar.xyz\n\nHave a great day! 🌟";
  }

  // ── Goodbye ───────────────────────────────────────────────────────────────
  if (/(bye|goodbye|see you|later|আল্লাহ হাফেজ|বিদায়)/.test(msg)) {
    return "Goodbye! 👋\nThank you for visiting Prochar.xyz!\n\n📧 rar@daffodil.group\n🌐 prochar.xyz\n\nHave a wonderful day! 🌟";
  }

  // ── Bangla fallback ───────────────────────────────────────────────────────
  if (/(আমি|আপনি|কি|কেন|কোন|কখন|কিভাবে|বলুন|জানতে|চাই|ইমেইল)/.test(msg)) {
    return "আমি Prochar.xyz-এর সহকারী! 🙏\n\nসাহায্য করতে পারি:\n• 💰 মূল্য পরিকল্পনা\n• ✨ ফিচারসমূহ\n• 🏢 প্রোচার ও ড্যাফোডিল গ্রুপ সম্পর্কে\n• 🔒 প্রাইভেসি ও নিরাপত্তা\n• 📞 যোগাযোগ তথ্য\n\nআপনার প্রশ্ন করুন! 😊";
  }

  // ── Default fallback ──────────────────────────────────────────────────────
  return "Thanks for your message! 😊\n\nI can help with:\n• 💰 Pricing & Plans\n• ✨ Features & Capabilities\n• 🏢 About Prochar & Daffodil Group\n• 🚀 Getting Started\n• 📊 Analytics & Reporting\n• 🤖 Automation\n• 🔒 Privacy & Security\n• 📄 Terms & Cookies\n• 📞 Contact & Support\n\nTry asking:\n\"What are your pricing plans?\"\n\"Tell me about Daffodil Group\"\n\"How is my data protected?\"\n\"How do I get started?\"\n\n📧 rar@daffodil.group\n📱 +880 184 702 7537\n🌐 prochar.xyz";
};

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hi! 👋 I'm Prochar Assistant.\n\nI can help you with pricing, features, privacy policy, terms of service, and anything about Prochar.xyz — a sister concern of Daffodil Group!\n\nWhat would you like to know?",
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
    '🏢 Tell me about Daffodil Group',
    '🔒 How is my data protected?',
    '📞 How to contact you?',
  ];

  return (
    <>
      {open && (
        <div style={{
          position: 'fixed', bottom: '90px', right: '24px', width: '360px',
          maxHeight: '580px', display: 'flex', flexDirection: 'column',
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
                  Always Online • Daffodil Group
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
