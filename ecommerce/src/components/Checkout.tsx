function Checkout() {
  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8">
      <div className="mx-auto max-w-4xl">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">
            Checkout
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Complete your order details
          </p>
        </div>

        {/* Checkout Card */}
        <div className="rounded-xl border bg-white p-6 shadow-sm">

          <h2 className="text-xl font-semibold text-slate-900">
            Order Details
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Your selected products will appear here.
          </p>

        </div>

      </div>
    </div>
  );
}

export default Checkout;