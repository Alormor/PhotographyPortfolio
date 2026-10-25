import { useState, useEffect } from "react";
import { QuantityStepper } from "./QuantityStepper";
import { formatPrice } from "../lib/format";
import { useSession } from "../lib/auth-client";

import BookingModal from "./BookingModal";

export default function WorkshopsSection({ onRequireAuth }) {
  const [workshops, setWorkshops] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [selectedWorkshop, setSelectedWorkshop] = useState(null);
  const [bookingSuccess, setBookingSuccess] = useState(null);
  const [bookingLoading, setBookingLoading] = useState(false);
  const { data: session } = useSession();

  // Fetch workshops from backend API
  const loadWorkshops = async () => {
    try {
      const res = await fetch("/api/workshops");
      if (!res.ok) throw new Error("Failed to load workshops");
      const data = await res.json();
      const sorted = data.sort((a, b) => new Date(a.date) - new Date(b.date));
      setWorkshops(sorted);
      const initialQty = {};
      data.forEach((w) => {
        initialQty[w.id] = 1;
      });
      setQuantities(initialQty);
    } catch (err) {
      console.error("Error loading workshops:", err);
    }
  };
  useEffect(() => {
    loadWorkshops();
  }, []);
  const handleQtyChange = (workshopId, newQty) => {
    setQuantities((prev) => ({ ...prev, [workshopId]: newQty }));
  };
  
  // Open confirmation window
  const handleOpenBooking = (workshop) => {
    if (!session?.user) {
      onRequireAuth?.();
      return;
    }
    setSelectedWorkshop(workshop);
  };

  // Execute purchase
  const handleConfirmPurchase = async () => {
    if (!selectedWorkshop) return;
    setBookingLoading(true);
    const qty = quantities[selectedWorkshop.id] || 1;
    try {
      const res = await fetch(`/api/workshops/${selectedWorkshop.id}/book`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity: qty }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Booking failed");
      // Update spots left live on screen!
      setWorkshops((prev) =>
        prev.map((w) =>
          w.id === selectedWorkshop.id
            ? { ...w, availableTickets: w.availableTickets - qty }
            : w
        )
        .sort((a, b) => new Date(a.date) - new Date(b.date))
      );
      // Show success screen in modal
      setBookingSuccess({
        title: selectedWorkshop.title,
        tickets: qty,
        total: selectedWorkshop.price * 100 * qty,
      });
    } catch (err) {
      alert(err.message);
    } finally {
      setBookingLoading(false);
    }
  };

  return (
    <section id="workshops" className="w-full py-16 md:py-24 bg-bg border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <div className="w-full sm:w-250 h-0.5 bg-accent/80 mx-auto mb-6"></div>
          <h2 className="font-secondary text-3xl sm:text-4xl md:text-5xl font-bold tracking-wide text-text">
            Workshops & Masterclasses
          </h2>
          <p className="text-muted text-sm sm:text-base mt-4 max-w-xl mx-auto">
            Join Clara for intimate, hands-on masterclasses in Barcelona. Limited seats per session.
          </p>
        </div>

        {/* Workshops Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {workshops.map((workshop) => {
            const qty = quantities[workshop.id] || 1;
            const totalPriceCents = workshop.price * 100 * qty;
            const isSoldOut = workshop.availableTickets <= 0;

            return (
              <div
                key={workshop.id}
                className="bg-surface rounded-xl overflow-hidden border border-neutral-800 flex flex-col justify-between group hover:border-neutral-700 transition-colors"
              >
                {/* Workshop Cover Image */}
                <div className="relative aspect-16/10 overflow-hidden bg-neutral-900">
                  <img
                    src={workshop.image}
                    alt={workshop.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-accent border border-neutral-700/60">
                    {workshop.availableTickets} spots left
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col grow justify-between gap-6">
                  <div>
                    <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-accent mb-2">
                      <i className="fa-regular fa-calendar"></i>
                      <span>{workshop.date}</span>
                    </div>

                    <h3 className="font-secondary text-xl font-bold text-text mb-2">
                      {workshop.title}
                    </h3>

                    <p className="text-xs text-muted mb-3 flex items-center gap-1.5">
                      <i className="fa-solid fa-location-dot text-neutral-500"></i>
                      {workshop.location}
                    </p>

                    <p className="text-sm text-muted leading-relaxed">
                      {workshop.description}
                    </p>
                  </div>

                  {/* Quantity Stepper & Ticket Booking Action */}
                  <div className="pt-4 border-t border-neutral-800 flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted">Select tickets:</span>
                      <QuantityStepper
                        value={qty}
                        onChange={(val) => handleQtyChange(workshop.id, val)}
                        min={1}
                        max={workshop.availableTickets}
                      />
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div>
                        <span className="text-xs text-muted block">Total</span>
                        <span className="text-lg font-bold text-text">
                          {formatPrice(totalPriceCents)}
                        </span>
                      </div>

                      <button
                        type="button"
                        disabled={isSoldOut}
                        onClick={() => handleOpenBooking(workshop)}
                        className="px-5 py-2.5 bg-accent text-bg font-primary font-bold uppercase tracking-wide text-xs rounded-md hover:bg-[#e5b382] transition-colors cursor-pointer shadow-md disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        {isSoldOut ? "Sold Out" : "Book Ticket"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Confirmation Window Modal */}
      <BookingModal
        isOpen={Boolean(selectedWorkshop)}
        onClose={() => {
          setSelectedWorkshop(null);
          setBookingSuccess(null);
        }}
        workshop={selectedWorkshop}
        quantity={selectedWorkshop ? quantities[selectedWorkshop.id] || 1 : 1}
        onConfirm={handleConfirmPurchase}
        loading={bookingLoading}
        successData={bookingSuccess}
      />
    </section>
  );
}
