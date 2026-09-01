function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">

        {/* Main Footer */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold text-white">
              Shop<span className="text-blue-400">Store</span>
            </h2>

            <p className="mt-4 max-w-xs text-sm leading-6 text-slate-400">
              Discover products you love, all in one place. Shop smarter,
              faster, and better with ShopStore.
            </p>

            <div className="mt-5 flex gap-3">
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 text-sm text-slate-300 transition hover:bg-blue-600 hover:text-white"
              >
                f
              </a>

              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 text-sm text-slate-300 transition hover:bg-blue-600 hover:text-white"
              >
                X
              </a>

              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 text-sm text-slate-300 transition hover:bg-pink-600 hover:text-white"
              >
                ◎
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Shop
            </h3>

            <ul className="mt-4 space-y-3 text-sm text-slate-400">
              <li>
                <a href="#" className="transition hover:text-blue-400">
                  All Products
                </a>
              </li>
              <li>
                <a href="#" className="transition hover:text-blue-400">
                  New Arrivals
                </a>
              </li>
              <li>
                <a href="#" className="transition hover:text-blue-400">
                  Best Sellers
                </a>
              </li>
              <li>
                <a href="#" className="transition hover:text-blue-400">
                  Special Offers
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Support
            </h3>

            <ul className="mt-4 space-y-3 text-sm text-slate-400">
              <li>
                <a href="#" className="transition hover:text-blue-400">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="transition hover:text-blue-400">
                  Shipping & Delivery
                </a>
              </li>
              <li>
                <a href="#" className="transition hover:text-blue-400">
                  Returns & Refunds
                </a>
              </li>
              <li>
                <a href="#" className="transition hover:text-blue-400">
                  FAQs
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Stay Updated
            </h3>

            <p className="mt-4 text-sm leading-6 text-slate-400">
              Subscribe to get updates about new products and special offers.
            </p>

            <div className="mt-4 flex">
              <input
                type="email"
                placeholder="Your email"
                className="min-w-0 flex-1 rounded-l-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white outline-none placeholder:text-slate-500 focus:border-blue-500"
              />

              <button
                type="button"
                className="rounded-r-lg bg-blue-600 px-4 py-2 text-sm font-medium transition hover:bg-blue-700"
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 border-t border-slate-800 pt-6">
          <div className="flex flex-col items-center justify-between gap-3 text-sm text-slate-500 sm:flex-row">
            <p>
              © 2026 ShopStore. All rights reserved.
            </p>

            <div className="flex gap-5">
              <a href="#" className="transition hover:text-slate-300">
                Privacy Policy
              </a>

              <a href="#" className="transition hover:text-slate-300">
                Terms of Service
              </a>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;