"use client";

import { useParams, useRouter } from "next/navigation";
import { Spin, Alert, Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import UserCard from "@/components/cards/UserCard";
// import ActivePlan from "@/components/pages/user profile/ActivePlan";
import { useGetUserByIdQuery } from "@/redux/api/user/userAPi";

export default function UserDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const userId = params.id as string ;

  // Fetch user data via RTK Query
  const { data, isLoading, isError } = useGetUserByIdQuery(userId);

  // The actual user object is inside Data[0]
  const user = data?.Data;
  console.log("all user",user)

  // Loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spin size="large" />
      </div>
    );
  }

  // Error state
  if (isError || !user) {
    return (
      <div className="p-6">
        <Button
          icon={<ArrowLeftOutlined />}
          onClick={() => router.push("/dashboard/users")}
          className="mb-4"
        >
          Back to Users
        </Button>
        <Alert
          message="Error"
          description="User not found"
          type="error"
          showIcon
        />
      </div>
    );
  }

  // Render user details
  return (
    <div className="py-6 !space-y-12 min-h-screen">
      {/* User Card */}
      <UserCard
        userId={user?._id}
        firstName={user?.firstName}
        lastName={user?.lastName}
        name={user?.name}
        image={user?.images?.[0] || "/images/user-avatar.jpg"}
        phone={user?.phone}
        email={user?.email}
        country={user?.country}
        editable={false}
      />
      {/* Active Plan Section */}
      {/* <ActivePlan subscriptions={user?.subscriptionPurchaseId || []} /> */}
    </div>
  );
}
