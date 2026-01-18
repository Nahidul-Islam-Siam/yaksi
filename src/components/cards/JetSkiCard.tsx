'use client';

import { Card, Button, Dropdown } from 'antd';
import { MoreOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { TJetSki } from '@/type/type';
import type { MenuProps } from 'antd';
import Image from 'next/image';

interface JetSkiCardProps {
    jetSki: TJetSki;
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
}

export default function JetSkiCard({ jetSki, onEdit, onDelete }: JetSkiCardProps) {

    
    const menuItems: MenuProps['items'] = [
        {
            key: 'edit',
            label: 'Edit',
            icon: <EditOutlined className="text-blue-500" />,
            onClick: () => onEdit(jetSki._id),
        },
        {
            key: 'delete',
            label: 'Delete',
            icon: <DeleteOutlined className="text-red-500" />,
            onClick: () => onDelete(jetSki._id),
            danger: true,
        },
    ];
    
   

    return (
      <Card className="mb-4 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex flex-col sm:flex-row items-center gap-4 relative">
          {/* Left - Image */}
          <div className="flex-shrink-0 w-full sm:w-auto">
            <Image
              src={jetSki.images?.[0]}
              alt={jetSki.name}
              width={96}
              height={240}
              className="w-full sm:w-24 h-48 sm:h-20 object-cover rounded-lg"
            />
          </div>

          {/* Middle - Content */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              {/* Content Info */}
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-gray-900 mb-1 truncate">
                  {jetSki.name}
                </h3>

                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-2">
                  <span className="font-medium">{jetSki.model}</span>
                  <span className="font-medium">{jetSki.hp} HP</span>
                </div>

                <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                  {jetSki.description}
                </p>
              </div>

              <div className="text-right">
                <div className="text-2xl font-bold text-cyan-500">
                  ${jetSki.price}/Day
                </div>
              </div>
            </div>
          </div>

          <Dropdown
            menu={{ items: menuItems }}
            trigger={["click"]}
            placement="bottomRight"
            className="!absolute top-0 right-0 !z-10"
          >
            <Button
              icon={<MoreOutlined />}
              className="border-gray-300 hover:border-gray-400"
              size="small"
            />
          </Dropdown>
        </div>
      </Card>
    );
}