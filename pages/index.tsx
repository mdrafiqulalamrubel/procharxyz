import App from '../src/App';
import SeoHead from '../src/components/SeoHead';

export default function Home() {
  return (
    <>
      <SeoHead
        title="Prochar.xyz - Email Marketing Platform for Bangladesh | Send Campaigns & Automation"
        description="Send powerful email campaigns to thousands of customers in Bangladesh. Easy-to-use platform with templates, automation, analytics, and high-deliverability infrastructure. Start free today."
        url="https://prochar.xyz"
        canonicalUrl="https://prochar.xyz"
      />
      <App />
    </>
  );
}
