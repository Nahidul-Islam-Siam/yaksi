/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Edit } from "lucide-react";
import userIcon from "@/assets/user/user-icons.jpg";
import carIcon from "@/assets/car/car-icon.jpg";
import Image, { StaticImageData } from "next/image";
import { useState } from "react";
import ProfileModal from "./page/Profile/EditModal";
import Link from "next/link";

// ---- Reusable Order Card Component ----
type OrderCardProps = {
  id: string | number;
image: string | StaticImageData;  // <-- updated
  model: string;
  status: string;
  location: string;
  deliveryDate: string;
  onTrackClick: (id: string | number) => void;
};

function OrderCard({
  id,
  image,
  model,
  status,
  location,
  deliveryDate,
  onTrackClick,
}: OrderCardProps) {
  return (
    <div
      key={id}
      className="bg-white shadow rounded p-4 flex flex-col md:flex-row items-center gap-6"
    >
      <Image
        width={128}
        height={80}
        src={image}
        alt={model}
        className="w-32 h-20 rounded object-cover"
      />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 flex-1 w-full">
        <OrderItem label="Model" value={model} />
        <OrderItem label="Order Status" value={status} />
        <OrderItem label="Current Location" value={location} />
        <OrderItem label="Delivery Date" value={deliveryDate} />
      </div>
      <button
        className="px-4 py-2 bg-cyan-500 text-white rounded hover:bg-cyan-600 mt-4 md:mt-0"
        onClick={() => onTrackClick(id)}
      >


        <Link href={`/order-details/${id}`}
        className="px-4 py-2 bg-cyan-500 text-white rounded hover:bg-cyan-600 mt-4 md:mt-0">
                Track your Order
        </Link>
      </button>
    </div>
  );
}

// ---- Main Dashboard ----
export default function UserDashboard() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => setIsModalVisible(true);
  const handleCancel = () => setIsModalVisible(false);

  const handleSubmit = (values: any) => {
    console.log("Form submitted:", values);
    setIsModalVisible(false);
  };

  const handleTrackOrder = (orderId: string | number) => {
    console.log(`Tracking order with ID: ${orderId}`);
  };

  const orders = [
    {
      id: "ORD-001",
      image: carIcon,
      model: "TESLA MODEL X P100D 2017",
      status: "Shipping",
      location: "USA",
      deliveryDate: "06-12-2025",
    },
    {
      id: "ORD-002",
      image: carIcon,
      model: "TESLA MODEL 3 2020",
      status: "Processing",
      location: "Germany",
      deliveryDate: "11-01-2026",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 mt-20">
      <div className="flex">
        <main className="flex-1 p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-semibold">My Profile</h1>
            <button
              onClick={showModal}
              className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </button>
            <ProfileModal
              visible={isModalVisible}
              onCancel={handleCancel}
              onFinish={handleSubmit}
            />
          </div>

          <section className="bg-white rounded shadow p-6 mb-6">
            <div className="flex items-center gap-6">
              <Image
                src={userIcon}
                width={64}
                height={64}
                alt="Monica Lucas"
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h2 className="text-xl font-semibold">Monica Lucas</h2>
                <p className="text-gray-600">Real Estate Professional</p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
              {[
                ["City", "Hong Kong"],
                ["State", "Hong Kong"],
                ["Country", "China"],
                ["Zip Code", "1547"],
                ["Email", "moo@rentaly.com"],
                ["Phone Number", "+158454***"],
              ].map(([label, value]) => (
                <div key={label}>
                  <p className="text-gray-600 text-sm">{label}</p>
                  <p className="font-medium">{value}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="grid md:grid-cols-3 gap-6 mb-8">
            <StatCard label="Total Cost" value="$345,000" />
            <StatCard label="Total Purchases" value="03" highlight />
            <StatCard label="Last Order Date" value="12 October,2024" />
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">My Orders</h2>
            <div className="space-y-4">
              {orders.map((order) => (
                <OrderCard
                  key={order.id}
                  {...order}
                  onTrackClick={handleTrackOrder}
                />
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

// ---- Supporting Components ----
function StatCard({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="bg-white rounded shadow p-6 text-center">
      <p className="text-gray-500">{label}</p>
      <p className={`text-2xl font-bold ${highlight ? "text-indigo-600" : ""}`}>
        {value}
      </p>
    </div>
  );
}

function OrderItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  );
}
