// data/membershipPlanData.ts

import { ApiResponse } from "@/type/type";

export interface MembershipPlan {
    id: number;
    duration: number;           // Duration in months
    ridesPerMonth: number;      // Rides per month
    signupFee: number;         // Signup fee
    refundableDeposit: number; // Refundable deposit
    pricing: number;           // Monthly pricing
    description: string;       // Plan description
    createdAt: Date;
    updatedAt: Date;
}

// Mock Data - 3 Fixed Membership Plans
export const membershipPlanMockData: MembershipPlan[] = [
    {
        id: 1,
        duration: 24,
        ridesPerMonth: 5,
        signupFee: 2000,
        refundableDeposit: 2000,
        pricing: 44,
        description: "Premium 24-month membership with full access to all jet skis and up to 5 rides per month. Includes refundable deposit and signup fee.",
        createdAt: new Date("2024-01-01T00:00:00Z"),
        updatedAt: new Date("2024-01-01T00:00:00Z")
    },
    {
        id: 2,
        duration: 12,
        ridesPerMonth: 4,
        signupFee: 1500,
        refundableDeposit: 1500,
        pricing: 55,
        description: "Standard 12-month membership with access to selected jet skis and up to 4 rides per month. Great value for regular users.",
        createdAt: new Date("2024-01-01T00:00:00Z"),
        updatedAt: new Date("2024-01-01T00:00:00Z")
    },
    {
        id: 3,
        duration: 6,
        ridesPerMonth: 3,
        signupFee: 1000,
        refundableDeposit: 1000,
        pricing: 69,
        description: "Flexible 6-month membership perfect for seasonal users. Access to basic jet ski fleet with up to 3 rides per month.",
        createdAt: new Date("2024-01-01T00:00:00Z"),
        updatedAt: new Date("2024-01-01T00:00:00Z")
    }
];

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Fetch all membership plans
 */
export async function fetchMembershipPlans(): Promise<ApiResponse<MembershipPlan[]>> {
    await delay(500);

    try {
        return {
            status: 200,
            message: "Membership plans fetched successfully",
            data: membershipPlanMockData
        };
    } catch (error: unknown) {
        console.log(error);
        return {
            status: 500,
            message: "Failed to fetch membership plans",
            data: []
        };
    }
}

/**
 * Get membership plan by ID
 */
export async function getMembershipPlanById(planId: number): Promise<ApiResponse<MembershipPlan | null>> {
    await delay(300);

    try {
        const plan = membershipPlanMockData.find(plan => plan.id === planId);

        if (plan) {
            return {
                status: 200,
                message: "Membership plan fetched successfully",
                data: plan
            };
        } else {
            return {
                status: 404,
                message: "Membership plan not found",
                data: null
            };
        }
    } catch (error: unknown) {
        console.log(error);
        return {
            status: 500,
            message: "Failed to fetch membership plan",
            data: null
        };
    }
}

/**
 * Update membership plan
 */
export async function updateMembershipPlan(
    planId: number,
    updateData: {
        duration?: number;
        ridesPerMonth?: number;
        signupFee?: number;
        refundableDeposit?: number;
        pricing?: number;
        description?: string;
    }
): Promise<ApiResponse<MembershipPlan>> {
    await delay(600);

    try {
        const planIndex = membershipPlanMockData.findIndex(plan => plan.id === planId);

        if (planIndex === -1) {
            return {
                status: 404,
                message: "Membership plan not found",
                data: {} as MembershipPlan
            };
        }

        // Update the plan
        membershipPlanMockData[planIndex] = {
            ...membershipPlanMockData[planIndex],
            ...updateData,
            updatedAt: new Date()
        };

        return {
            status: 200,
            message: "Membership plan updated successfully",
            data: membershipPlanMockData[planIndex]
        };
    } catch (error: unknown) {
        console.log(error);
        return {
            status: 500,
            message: "Failed to update membership plan",
            data: {} as MembershipPlan
        };
    }
}

/**
 * Add new membership plan
 */
export async function addMembershipPlan(
    planData: {
        duration: number;
        ridesPerMonth: number;
        signupFee: number;
        refundableDeposit: number;
        pricing: number;
        description: string;
    }
): Promise<ApiResponse<MembershipPlan>> {
    await delay(600);

    try {
        const newId = Math.max(...membershipPlanMockData.map(p => p.id)) + 1;
        const newPlan: MembershipPlan = {
            id: newId,
            ...planData,
            createdAt: new Date(),
            updatedAt: new Date()
        };

        membershipPlanMockData.push(newPlan);

        return {
            status: 201,
            message: "Membership plan created successfully",
            data: newPlan
        };
    } catch (error: unknown) {
        console.log(error);
        return {
            status: 500,
            message: "Failed to create membership plan",
            data: {} as MembershipPlan
        };
    }
}