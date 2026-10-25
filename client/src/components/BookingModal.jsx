import { formatPrice } from "../lib/format";

export default function BookingModal({
  isOpen,
  onClose,
  workshop,
  quantity,
  onConfirm,
  loading,
  successData,
}) {
  if (!isOpen || !workshop) return null;

  const totalCents = workshop.price * 100 * quantity;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-md rounded-xl bg-surface p-6 sm:p-8 border border-neutral-800 shadow-2xl">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-muted hover:text-text text-xl cursor-pointer"
          aria-label="Close modal"
        >
          ✕
        </button>

        {/* --- BOOKING CONFIRMED SUCCESS --- */}
        {successData ? (
          <div className="text-center py-4 flex flex-col items-center">
            {/* Checkmark Icon */}
            <div className="w-12 h-12 rounded-full bg-accent/20 text-accent flex items-center justify-center text-2xl mb-4">
              ✓
            </div>

            <span className="text-accent text-xs font-bold uppercase tracking-widest">
              Booking Confirmed
            </span>
            <h3 className="font-secondary text-2xl font-bold text-text mt-1 mb-2">
              You're all set!
            </h3>
            <p className="text-xs sm:text-sm text-muted mb-6 max-w-xs">
              We've reserved {successData.tickets} ticket(s) for "{successData.title}".
            </p>

            <div className="w-full bg-bg rounded-lg p-4 border border-neutral-800 space-y-2 mb-6 text-xs text-left">
              <div className="flex justify-between text-muted">
                <span>Workshop:</span>
                <span className="text-text font-medium">{workshop.title}</span>
              </div>
              <div className="flex justify-between text-muted">
                <span>Date:</span>
                <span className="text-text font-medium">{workshop.date}</span>
              </div>
              <div className="flex justify-between text-muted">
                <span>Tickets:</span>
                <span className="text-text font-medium">{successData.tickets}</span>
              </div>
              <div className="border-t border-neutral-800 pt-2 flex justify-between font-bold text-sm">
                <span className="text-text">Total Paid:</span>
                <span className="text-accent">{formatPrice(successData.total)}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="w-full py-2.5 rounded bg-accent text-bg text-xs uppercase tracking-wider font-bold hover:bg-[#e5b382] transition-colors cursor-pointer"
            >
              Done
            </button>
          </div>
        ) : (
          /* --- CONFIRMATION STEP --- */
          <div>
            <div className="text-center mb-6">
              <span className="text-accent text-xs font-bold uppercase tracking-widest">
                Confirm Booking
              </span>
              <h3 className="font-secondary text-2xl font-bold text-text mt-1">
                {workshop.title}
              </h3>
            </div>

            <div className="bg-bg rounded-lg p-4 border border-neutral-800 space-y-3 mb-6 text-sm">
              <div className="flex justify-between text-muted">
                <span>Date & Location:</span>
                <span className="text-text text-right font-medium">{workshop.date}</span>
              </div>
              <div className="flex justify-between text-muted">
                <span>Price per ticket:</span>
                <span className="text-text font-medium">{formatPrice(workshop.price * 100)}</span>
              </div>
              <div className="flex justify-between text-muted">
                <span>Quantity:</span>
                <span className="text-accent font-bold">{quantity} ticket(s)</span>
              </div>
              <div className="border-t border-neutral-800 pt-2 flex justify-between font-bold text-base">
                <span className="text-text">Total Due:</span>
                <span className="text-accent">{formatPrice(totalCents)}</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="w-1/2 py-2.5 rounded bg-neutral-800 text-text text-xs uppercase tracking-wider font-semibold hover:bg-neutral-700 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={loading}
                onClick={onConfirm}
                className="w-1/2 py-2.5 rounded bg-accent text-bg text-xs uppercase tracking-wider font-bold hover:bg-[#e5b382] transition-colors cursor-pointer disabled:opacity-50"
              >
                {loading ? "Booking..." : "Confirm & Book"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
