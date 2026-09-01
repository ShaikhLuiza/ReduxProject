function Footer() {
  return (
    <footer className="border-t bg-white">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
        <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">

          <div>
            <h2 className="text-lg font-bold text-blue-900">
              ShopStore
            </h2>

            <p className="text-sm text-slate-500">
              Discover products you love.
            </p>
          </div>

          <p className="text-sm text-slate-500">
            © 2026 ShopStore. All rights reserved.
          </p>

        </div>
      </div>
    </footer>
  );
}

export default Footer;