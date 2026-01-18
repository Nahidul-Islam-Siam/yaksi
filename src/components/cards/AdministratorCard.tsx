// components/AdministratorCard.tsx
'use client';

import { Avatar, Button, Card } from 'antd';
import { AdministrationMember } from '@/type/type';

interface AdministratorCardProps {
  administrator: AdministrationMember;
  onRemove: (id: string) => void;
  onDetails: (id: string) => void;
  removing?: boolean;
}

export default function AdministratorCard({ 
  administrator, 
  onRemove, 
  onDetails 
}: AdministratorCardProps) {
  return (
    <Card className="mb-4 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
      {/* Mobile Layout (stacked) */}
      <div className="block sm:hidden">
        {/* Profile Info */}
        <div className="flex items-center gap-3 mb-4">
          <Avatar
            size={48}
            src={administrator?.images?.[0]}
            className="border-2 border-gray-100 flex-shrink-0"
          />
          <div className="min-w-0 flex-1">
            <h3 className="text-base font-semibold text-gray-900 mb-1 truncate">
              {administrator?.name}
            </h3>
            <p className="text-gray-600 text-sm truncate">
              {administrator?.email}
            </p>
          </div>
        </div>

        {/* Action Buttons - Full width on mobile */}
        <div className="flex space-x-2">
          <Button
            onClick={() => onRemove(administrator?._id)}
            className="flex-1 px-4 py-2 h-auto font-medium text-sm"
            style={{
              borderRadius: "8px",
              border: "1px solid #d1d5db",
              backgroundColor: "#fff",
            }}
          >
            Remove
          </Button>
          <Button
            onClick={() => onDetails(administrator?._id)}
            className="flex-1 px-4 py-2 h-auto font-medium text-sm"
            style={{
              borderRadius: "8px",
              border: "1px solid #d1d5db",
              backgroundColor: "#fff",
            }}
          >
            Details
          </Button>
        </div>
      </div>

      {/* Tablet Layout (sm and up) */}
      <div className="hidden sm:block md:hidden">
        <div className="flex flex-col space-y-4">
          {/* Profile Info */}
          <div className="flex items-center gap-4">
            <Avatar
              size={56}
              src={administrator?.images?.[0]}
              className="border-2 border-gray-100 flex-shrink-0"
            />
            <div className="min-w-0 flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-1 truncate">
                {administrator?.name}
              </h3>
              <p className="text-gray-600 text-sm truncate">
                {administrator?.email}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3">
            <Button
              onClick={() => onRemove(administrator?._id)}
              className="px-5 py-2 h-auto font-medium"
              style={{
                borderRadius: "8px",
                border: "1px solid #d1d5db",
                backgroundColor: "#fff",
              }}
            >
              Remove
            </Button>
            <Button
              onClick={() => onDetails(administrator?._id)}
              className="px-5 py-2 h-auto font-medium"
              style={{
                borderRadius: "8px",
                border: "1px solid #d1d5db",
                backgroundColor: "#fff",
              }}
            >
              Details
            </Button>
          </div>
        </div>
      </div>

      {/* Desktop Layout (md and up) - Original horizontal layout */}
      <div className="hidden md:flex items-center justify-between">
        {/* Left section - Profile Info */}
        <div className="flex items-center gap-4 min-w-0 flex-1 mr-6">
          <Avatar
            size={64}
            src={administrator?.images?.[0]}
            className="border-2 border-gray-100 flex-shrink-0"
          />

          {/* Name and Email */}
          <div className="min-w-0 flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-1 truncate">
              {administrator?.name}
            </h3>
            <p className="text-gray-600 text-sm truncate">
              {administrator?.email}
            </p>
          </div>
        </div>

        {/* Right section - Action Buttons */}
        <div className="flex space-x-3 flex-shrink-0">
          <Button
            onClick={() => onRemove(administrator?._id)}
            className="px-6 py-2 h-auto font-medium"
            style={{
              borderRadius: "8px",
              border: "1px solid #d1d5db",
              backgroundColor: "#fff",
            }}
          >
            Remove
          </Button>
          <Button
            onClick={() => onDetails(administrator?._id)}
            className="px-6 py-2 h-auto font-medium"
            style={{
              borderRadius: "8px",
              border: "1px solid #d1d5db",
              backgroundColor: "#fff",
            }}
          >
            Details
          </Button>
        </div>
      </div>
    </Card>
  );
}