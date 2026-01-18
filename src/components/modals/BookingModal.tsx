"use client";

import { Modal, Spin, Button, Result } from "antd";
import { useEffect, useState, useMemo } from "react";
import {
  Calendar,
  CheckCircle2,
  CalendarX,
  Users,
  Waves,
  Sun,
} from "lucide-react";
import { motion } from "framer-motion";
import dayjs from "dayjs";
import { useGetRentByIdQuery } from "@/redux/api/rent/rentApi";
import { useSelector } from "react-redux";

interface BookingModalProps {
  open: boolean;
  onClose: () => void;
  rentId: string;
  jetName?: string;
  jetHp?: number;
  jetPrice?: number;
}

export default function BookingModal({
  open,
  onClose,
  rentId,
  jetHp,
  jetName,
  jetPrice,
}: BookingModalProps) {
  const [loading, setLoading] = useState(true);
  const [availableDates, setAvailableDates] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  const { data } = useGetRentByIdQuery(rentId);
  const rent = data?.Data?.[0];

  // get role from redux
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const userRole = useSelector((state: any) => state.auth.user?.role);

  // booking dates from DB (already booked/unavailable)
const bookedDates = useMemo(
  () =>
    (rent?.bookingDate || []).map((d: string) => dayjs(d).format("YYYY-MM-DD")),
  [rent?.bookingDate]
);

  // compute available dates
  const allowedDays = useMemo(
    () => (userRole === "Admin" || userRole === "Administrator" ? 30 : 14),
    [userRole]
  );

  useEffect(() => {
    if (open) {
      setLoading(true);
      setConfirmed(false);
      setSelectedDate(null);

      const today = dayjs();
      const days = Array.from({ length: allowedDays }, (_, i) =>
        today.add(i, "day").format("YYYY-MM-DD")
      );

      // exclude already booked
      const filtered = days.filter((d) => !bookedDates.includes(d));

      setAvailableDates(filtered);
      setLoading(false);
    }
  }, [open, rentId, bookedDates, allowedDays]);

  const handleSelectDate = (date: string) => {
    setSelectedDate(date);
  };

  const handleConfirm = () => {
    console.log("Booking confirmed for:", selectedDate);
    setConfirmed(true);
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      centered
      width={720}
      className="!rounded-2xl !overflow-hidden"
      title={
        <div className="flex items-center gap-3 text-2xl font-bold">
          {confirmed && <CheckCircle2 className="w-7 h-7 text-green-500" />}
          {!confirmed && "Select Booking Date"}
        </div>
      }
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-cyan-50 via-white to-white opacity-70" />

      {loading ? (
        <div className="flex justify-center items-center h-72 relative z-10">
          <Spin size="large" />
        </div>
      ) : confirmed ? (
        <div className="relative z-10">
          <Result
            status="success"
            title="🎉 Booking Successful!"
            subTitle={`Your ${jetName ?? "Jet Ski"} is reserved for ${dayjs(
              selectedDate
            ).format("MMMM DD, YYYY")} (6 AM – 6 PM).`}
            className="text-center"
            extra={[
              <Button
                type="primary"
                key="done"
                onClick={onClose}
                className="!bg-gradient-to-r !from-cyan-500 !to-blue-500 !rounded-full px-6 py-2 hover:!from-cyan-600 hover:!to-blue-600"
              >
                Done
              </Button>,
            ]}
          />
        </div>
      ) : (
        <div className="relative z-10 space-y-6">
          {/* Info Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-7 relative z-10">
            <div className="bg-cyan-50 border border-cyan-200 rounded-2xl p-5 text-center shadow-md flex flex-col items-center gap-1">
              <Sun className="w-8 h-8 text-cyan-500" />
              <p className="text-lg font-semibold text-cyan-700">12 Hours</p>
              <p className="text-gray-600 text-sm sm:text-base">
                Full Day Access
              </p>
            </div>
            <div className="bg-cyan-50 border border-cyan-200 rounded-2xl p-5 text-center shadow-md flex flex-col items-center gap-1">
              <Waves className="w-8 h-8 text-cyan-500" />
              <p className="text-lg font-semibold text-cyan-700">Unlimited</p>
              <p className="text-gray-600 text-sm sm:text-base">
                Water Activities
              </p>
            </div>
            <div className="bg-cyan-50 border border-cyan-200 rounded-2xl p-5 text-center shadow-md flex flex-col items-center gap-1">
              <Users className="w-8 h-8 text-cyan-500" />
              <p className="text-lg font-semibold text-cyan-700">Up to 2</p>
              <p className="text-gray-600 text-sm sm:text-base">Passengers</p>
            </div>
          </div>

          {/* Jet Info */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 bg-cyan-50 p-4 rounded-md text-cyan-700 font-semibold text-lg sm:text-xl">
            <span>JetSki: {jetName}</span>
            <span>Horsepower: {jetHp}</span>
            <span>Price: {jetPrice}$</span>
          </div>

          {/* Date Header */}
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-cyan-500" />
            <h2 className="text-cyan-700 font-semibold text-lg sm:text-xl">
              Bookings Available for the Next {allowedDays} Days
            </h2>
          </div>

          {/* Date Selection */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {availableDates.length > 0 ? (
              availableDates.map((date) => {
                const formatted = dayjs(date).format("MMM DD");
                const isSelected = selectedDate === date;

                return (
                  <motion.div
                    key={date}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      type={isSelected ? "primary" : "default"}
                      className={`h-16 w-full !rounded-xl transition-all text-lg font-medium ${
                        isSelected
                          ? "!bg-gradient-to-r !from-cyan-500 !to-blue-500 text-white border-none shadow-lg"
                          : "!border-gray-300 hover:!border-cyan-400 hover:!text-cyan-600"
                      }`}
                      onClick={() => handleSelectDate(date)}
                      block
                    >
                      {formatted}
                    </Button>
                  </motion.div>
                );
              })
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-6 text-gray-500">
                <CalendarX className="w-10 h-10 mb-2 text-gray-400" />
                <p>No available dates in the next {allowedDays} days.</p>
              </div>
            )}
          </div>

          {/* Confirm Section */}
          {selectedDate && (
            <motion.div
              className="mt-8 p-5 bg-cyan-50 border border-cyan-200 rounded-2xl shadow-md text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <p className="mb-3 text-lg font-medium">
                You selected:{" "}
                <span className="text-cyan-600 font-semibold">
                  {dayjs(selectedDate).format("MMMM DD, YYYY")}
                </span>
              </p>
              <p className="mb-4 text-sm text-gray-600">
                Your booking covers the whole day: 6:00 AM – 6:00 PM
              </p>
              <Button
                type="primary"
                size="large"
                className="!bg-gradient-to-r !from-cyan-500 !to-blue-500 !rounded-full px-12 py-4 text-lg hover:!from-cyan-600 hover:!to-blue-600 shadow-lg"
                onClick={handleConfirm}
              >
                Confirm Booking
              </Button>
            </motion.div>
          )}
        </div>
      )}
    </Modal>
  );
}
