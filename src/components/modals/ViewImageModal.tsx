'use client';

import { Modal, Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import Image from 'next/image';

export interface ViewImageModalProps {
    imageSrc?: string;
    open: boolean;
    onDelete: () => void;
    onClose: () => void;
}

export default function ViewImageModal({
    imageSrc,
    open,
    onDelete,
    onClose
}: ViewImageModalProps) {

    
    return (
      <Modal
        open={open}
        footer={null}
        closable={false}
        centered
        width={700}
        onCancel={onClose}
        wrapClassName="image-modal"
        styles={{ body: { padding: 0 } }}
        destroyOnHidden
      >
        {imageSrc && (
          <Image
            src={imageSrc}
            alt="Large view"
            width={700}
            height={700}
            className="w-full h-auto object-contain rounded-xl"
          />
        )}

        <Button
          danger
          icon={<DeleteOutlined />}
          onClick={onDelete}
          className="!absolute !bottom-2 !right-2"
        />
      </Modal>
    );
}