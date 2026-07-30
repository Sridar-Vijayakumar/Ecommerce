import { Link, useParams } from "react-router-dom";

const pages = {
  privacy: {
    title: "Privacy policy",
    intro: "We collect only the information needed to operate your account, process orders, and improve ShopEase.",
    sections: [
      ["Information we use", "Account details, delivery addresses, order history, and payment status may be used to provide the service you request."],
      ["How we protect it", "Access is limited to authorized services and staff. Payment card details are handled by the payment provider and are not stored by ShopEase."],
      ["Your choices", "You can update your profile details or contact support to request help with your personal information."],
    ],
  },
  terms: {
    title: "Terms and conditions",
    intro: "These terms describe the basic rules for using ShopEase and placing an order.",
    sections: [
      ["Orders and pricing", "Orders remain subject to product availability and payment confirmation. We will show the final price before checkout."],
      ["Accounts", "Keep your sign-in details secure and provide accurate information for purchases and deliveries."],
      ["Offers", "Discounts may have eligibility dates, product restrictions, and usage limits. Only one coupon may apply unless stated otherwise."],
    ],
  },
  returns: {
    title: "Returns",
    intro: "Eligible items can be returned within 30 days of delivery.",
    sections: [
      ["Return condition", "Items should be unused and returned with their original packaging and included accessories."],
      ["Starting a return", "Contact support with your order number and the item you want to return. We will provide the next steps."],
      ["Refunds", "Approved refunds are sent to the original payment method after the returned item is checked."],
    ],
  },
  faqs: {
    title: "Frequently asked questions",
    intro: "Quick answers to common ShopEase questions.",
    sections: [
      ["Where can I track an order?", "Sign in, open My orders, and select the order you want to review."],
      ["How do I change my delivery address?", "You can edit the address during the shipping step before placing your order."],
      ["How do subscriber offers work?", "Newsletter subscribers can use WELCOME10 for 10% off their first eligible order."],
    ],
  },
};

export default function Information() {
  const { page } = useParams();
  const content = pages[page];

  if (!content) {
    return (
      <div className="page-shell py-20 text-center">
        <h1 className="text-3xl font-black text-ink-900">Page not found</h1>
        <Link to="/" className="btn-primary mt-6">Back home</Link>
      </div>
    );
  }

  return (
    <div className="page-shell py-14 sm:py-20">
      <div className="mx-auto max-w-3xl">
        <p className="text-xs font-extrabold uppercase tracking-[.2em] text-brand-600">ShopEase help</p>
        <h1 className="mt-3 text-4xl font-black text-ink-900 sm:text-5xl">{content.title}</h1>
        <p className="mt-5 text-lg leading-8 text-slate-600">{content.intro}</p>
        <div className="mt-10 space-y-5">
          {content.sections.map(([title, text]) => (
            <section key={title} className="surface p-6 sm:p-8">
              <h2 className="text-xl font-extrabold text-ink-900">{title}</h2>
              <p className="mt-3 leading-7 text-slate-600">{text}</p>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
