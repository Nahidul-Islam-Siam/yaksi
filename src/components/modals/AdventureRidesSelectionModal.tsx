"use client";

import React from "react";
import { Modal, Button } from "antd";
import { useSelector } from "react-redux";
import { useAdventurePackMutation } from "@/redux/api/activeAdventurePack/activeAdventurePack";
import { selectCurrentUser } from "@/redux/services/user/authSlice";

interface RidesSelectionModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  packId: string;
  ridesPricing3: number;
  ridesPricing5: number;
  ridesPricing10: number;
  refundAmount: number;
  onSelectRides?: (rides: number, price: number) => void;
}

export default function RidesSelectionModal({
  open,
  onClose,
  title,
  ridesPricing3,
  ridesPricing5,
  ridesPricing10,
  refundAmount,
  packId,
  onSelectRides,
}: RidesSelectionModalProps) {
  const rideOptions = [
    { rides: 3, price: ridesPricing3 },
    { rides: 5, price: ridesPricing5 },
    { rides: 10, price: ridesPricing10 },
  ];

  const [createAdventurePack, { isLoading }] = useAdventurePackMutation();
  const user = useSelector(selectCurrentUser);
  const userId = user?._id;

  if (!userId) {
    console.error("User ID not found in Redux state");
  }

  if (!packId) {
    console.error("Pack ID not provided as prop");
  }

  const handleRideSelection = async (rides: number, price: number) => {
    if (!userId || !packId) {
      alert("User or Pack not found. Please try again.");
      return;
    }

    const payload = {
      userId,
      adventurePackId: packId,
      ridesNumber: rides,
      price,
      refundableDeposit: refundAmount,
      drivingLicense: "sdf",
    };

    console.log("Payload sent to backend:", payload);

    try {
      const res = await createAdventurePack(payload).unwrap();

      if (res?.sessionUrl) {
        // Redirect to Stripe checkout
        window.location.href = res?.sessionUrl;
      } else {
        console.error("Stripe URL not returned", res);
        alert("Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error("Error creating adventure pack:", err);
      alert("Something went wrong with checkout");
    }

    onSelectRides?.(rides, price);
  };

  return (
    <Modal
      title={
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-900">
            Select Your {title}
          </h3>
          <p className="text-gray-600 mt-2">
            Choose the number of rides you want to purchase
          </p>
        </div>
      }
      open={open}
      onCancel={onClose}
      footer={null}
      centered
      width={600}
      className="rides-selection-modal"
    >
      <div className="py-6">
        <div className="grid grid-cols-1 gap-4">
          {rideOptions.map((option) => (
            <div
              key={option.rides}
              className="border-2 border-gray-200 rounded-lg p-6 hover:border-[#00AEEF] hover:bg-gray-50 transition-all duration-200 cursor-pointer group"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xl font-bold text-gray-900 group-hover:text-[#00AEEF]">
                    {option.rides} Rides
                  </h4>
                  <p className="text-gray-600 text-sm mt-1">
                    {option.rides === 3
                      ? "Perfect for trying out"
                      : option.rides === 5
                      ? "Perfect for regular fun"
                      : "Perfect for adventure seekers"}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-gray-900 group-hover:text-[#00AEEF]">
                    ${option.price}
                  </p>
                  <p className="text-gray-500 text-sm">
                    ${(option.price / option.rides).toFixed(0)} per ride
                  </p>
                </div>
              </div>

              <Button
                type="primary"
                size="large"
                loading={isLoading}
                className="w-full mt-4 !bg-[#00AEEF] hover:!bg-[#00AEEF]/90 !border-[#00AEEF] font-semibold"
                onClick={() => handleRideSelection(option.rides, option.price)}
              >
                Select {option.rides} Rides - ${option.price}
              </Button>
            </div>
          ))}
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            All payments are processed securely through Stripe
          </p>
        </div>
      </div>
    </Modal>
  );
}
