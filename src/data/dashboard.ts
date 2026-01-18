// import { getOrdersApiResponse } from "@/data/orders";
// import { mockPayments } from "@/data/payments";
// import { OrderWithPaymentsAndCars } from "@/type/type";

// export interface DashboardStats {
//     totalOrders: number;
//     runningShipments: number;
//     totalRevenue: number;
//     monthlyRevenue: number;
//     recentShipments: OrderWithPaymentsAndCars[]; 
// }

// export interface WeeklyRevenueData {
//     week: string;
//     revenue: number;
// }

// export interface MonthOption {
//     value: string;
//     label: string;
//     month: number;
//     year: number;
// }

// export const getDashboardStats = (): DashboardStats => {
//     const ordersResponse = getOrdersApiResponse(1, 100); 
//     const ordersWithPaymentsAndCars = ordersResponse.data;
    
//     // Calculate total orders
//     const totalOrders = ordersWithPaymentsAndCars.length;

//     // ✅ Calculate running shipments using populated orders
//     const runningShipments = ordersWithPaymentsAndCars.filter(order => 
//         order.status === 'shipped' || order.status === 'processing'
//     ).length;

//     // ✅ Calculate total revenue from ACTUAL completed payments only
//     const totalRevenue = mockPayments
//         .filter(payment => payment.status === 'completed')
//         .reduce((sum, payment) => sum + payment.amount, 0);

//     // ✅ Calculate current month revenue from ACTUAL payments only
//     const currentMonth = new Date().getMonth();
//     const currentYear = new Date().getFullYear();
//     const monthlyRevenue = mockPayments
//         .filter(payment => 
//             payment.status === 'completed' && 
//             payment.paymentDate.getMonth() === currentMonth &&
//             payment.paymentDate.getFullYear() === currentYear
//         )
//         .reduce((sum, payment) => sum + payment.amount, 0);

//     const recentShipments = ordersWithPaymentsAndCars
//         .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
//         .slice(0, 5);

//     return {
//         totalOrders,
//         runningShipments,
//         totalRevenue,
//         monthlyRevenue,
//         recentShipments
//     };
// };

// export const getMonthOptions = (): MonthOption[] => {
//     const paymentMonths = new Set<string>();
    
//     mockPayments.forEach(payment => {
//         if (payment.status === 'completed') {
//             const date = payment.paymentDate;
//             const monthYear = `${date.toLocaleDateString('en-US', { month: 'long' }).toLowerCase()}-${date.getFullYear()}`;
//             paymentMonths.add(monthYear);
//         }
//     });

//     const monthsArray = Array.from(paymentMonths).map(monthYear => {
//         const [monthName, year] = monthYear.split('-');
//         const monthIndex = new Date(`${monthName} 1, ${year}`).getMonth();
        
//         return {
//             value: monthYear,
//             label: `${monthName.charAt(0).toUpperCase() + monthName.slice(1)} ${year}`,
//             month: monthIndex,
//             year: parseInt(year)
//         };
//     });

//     return monthsArray.sort((a, b) => {
//         if (a.year !== b.year) return b.year - a.year;
//         return b.month - a.month;
//     });
// };

// export const getWeeklyRevenueForMonth = (monthValue: string): WeeklyRevenueData[] => {
//     const [monthName, yearStr] = monthValue.split('-');
//     const year = parseInt(yearStr);
//     const monthIndex = new Date(`${monthName} 1, ${year}`).getMonth();

//     const monthlyPayments = mockPayments.filter(payment => 
//         payment.status === 'completed' && 
//         payment.paymentDate.getMonth() === monthIndex &&
//         payment.paymentDate.getFullYear() === year
//     );

//     if (monthlyPayments.length === 0) {
//         return [];
//     }

//     const weeklyRevenue: { [key: string]: number } = {};
    
//     monthlyPayments.forEach(payment => {
//         const paymentDate = payment.paymentDate;
//         const dayOfMonth = paymentDate.getDate();
        
//         // Determine which week of the month (1-5)
//         let weekNumber: number;
//         if (dayOfMonth <= 7) weekNumber = 1;
//         else if (dayOfMonth <= 14) weekNumber = 2;
//         else if (dayOfMonth <= 21) weekNumber = 3;
//         else if (dayOfMonth <= 28) weekNumber = 4;
//         else weekNumber = 5;
        
//         const weekKey = `Week ${weekNumber}`;
//         weeklyRevenue[weekKey] = (weeklyRevenue[weekKey] || 0) + payment.amount;
//     });

//     return Object.entries(weeklyRevenue)
//         .map(([week, revenue]) => ({ week, revenue }))
//         .sort((a, b) => {
//             const aNum = parseInt(a.week.split(' ')[1]);
//             const bNum = parseInt(b.week.split(' ')[1]);
//             return aNum - bNum;
//         });
// };

// export const getCurrentMonth = (): string => {
//     const monthOptions = getMonthOptions();

//     if (monthOptions.length > 0) {
//         return monthOptions[0].value;
//     }

//     const now = new Date();
//     const monthNames = [
//         'january', 'february', 'march', 'april', 'may', 'june',
//         'july', 'august', 'september', 'october', 'november', 'december'
//     ];
    
//     return `${monthNames[now.getMonth()]}-${now.getFullYear()}`;
// };

// export const getMonthlyTotal = (monthValue: string): number => {
//     const weeklyData = getWeeklyRevenueForMonth(monthValue);
//     return weeklyData.reduce((sum, week) => sum + week.revenue, 0);
// };

// export const getMonthlyRevenueSummary = () => {
//     const monthOptions = getMonthOptions();
    
//     return monthOptions.map(month => ({
//         month: month.label,
//         total: getMonthlyTotal(month.value),
//         weeklyBreakdown: getWeeklyRevenueForMonth(month.value)
//     }));
// };

// export const getOrderStatistics = () => {
//     const ordersResponse = getOrdersApiResponse(1, 100);
//     const ordersWithPaymentsAndCars = ordersResponse.data;
    
//     return {
//         totalOrders: ordersWithPaymentsAndCars.length,
//         totalCars: ordersWithPaymentsAndCars.reduce((sum, order) => sum + order.totalCars, 0),
//         totalOrderValue: ordersWithPaymentsAndCars.reduce((sum, order) => sum + order.totalAmount, 0),
//         averageOrderValue: ordersWithPaymentsAndCars.length > 0 
//             ? ordersWithPaymentsAndCars.reduce((sum, order) => sum + order.totalAmount, 0) / ordersWithPaymentsAndCars.length 
//             : 0,
//         ordersByStatus: {
//             pending: ordersWithPaymentsAndCars.filter(o => o.status === 'pending').length,
//             confirmed: ordersWithPaymentsAndCars.filter(o => o.status === 'confirmed').length,
//             processing: ordersWithPaymentsAndCars.filter(o => o.status === 'processing').length,
//             shipped: ordersWithPaymentsAndCars.filter(o => o.status === 'shipped').length,
//             delivered: ordersWithPaymentsAndCars.filter(o => o.status === 'delivered').length,
//             cancelled: ordersWithPaymentsAndCars.filter(o => o.status === 'cancelled').length,
//         },
//         paymentStatusBreakdown: {
//             fullyPaid: ordersWithPaymentsAndCars.filter(o => o.paymentSummary.paymentStatus === 'fully_paid').length,
//             advancePaid: ordersWithPaymentsAndCars.filter(o => o.paymentSummary.paymentStatus === 'advance_paid').length,
//             notStarted: ordersWithPaymentsAndCars.filter(o => o.paymentSummary.paymentStatus === 'not_started').length,
//         }
//     };
// };