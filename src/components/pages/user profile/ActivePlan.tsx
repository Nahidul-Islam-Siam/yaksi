'use client';

import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Subscription } from '@/type/type';

interface Props {
    subscriptions: Subscription[]  ;
}

interface Row {
    key: number;
    plan: string;
    start: string;
    end: string;
    done: number;
    left: number;
}

export default function ActivePlan({ subscriptions }: Props) {
    /* -------- table columns -------- */
    const columns: ColumnsType<Row> = [
        { title: 'Subscription', dataIndex: 'plan' },
        { title: 'Starting Date', dataIndex: 'start' },
        { title: 'Expire Date', dataIndex: 'end' },
        { title: 'Ride Complete', dataIndex: 'done', align: 'center' },
        { title: 'Ride Remaining', dataIndex: 'left', align: 'center' }
    ];

    /* -------- convert data -------- */
    const rows: Row[] = subscriptions.map(s => ({
        key: s.id,
        plan: s.title,                                           // show plan name
        start: s.startDate?.toLocaleDateString('en-GB') ?? '--',
        end: s.endDate ? s.endDate.toLocaleDateString('en-GB') : '--',
        done: s.ridesCompleted,
        left: s.ridesLeft
    }));

    return (
        <section className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Active Plan</h2>

            <Table
                columns={columns}
                dataSource={rows}
                pagination={false}
                rowKey="key"
                bordered
                className="[&_th]:!bg-[#00AEEF] [&_th]:!text-white rounded-xl overflow-hidden"
                scroll={{ x: 900 }}
            />
        </section>
    );
}