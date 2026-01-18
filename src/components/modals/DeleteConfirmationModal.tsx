'use client';

import { Modal, Button, Space } from 'antd';

interface DeleteConfirmationModalProps {
    open: boolean;
    onConfirm: () => void;
    onCancel: () => void;
    loading?: boolean;
}

export default function DeleteConfirmationModal({
    open,
    onConfirm,
    onCancel,
    loading = false
}: DeleteConfirmationModalProps) {
    return (
        <Modal
            open={open}
            onCancel={onCancel}
            footer={null}
            centered
            closable={false}
            width={400}
            maskClosable={false}
            className="delete-confirmation-modal"
        >
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <h3 style={{
                    fontSize: '18px',
                    fontWeight: 500,
                    margin: '0 0 30px 0',
                    color: '#333'
                }}>
                    Do you want to Delete?
                </h3>

                <Space size="middle">
                    <Button
                        onClick={onCancel}
                        disabled={loading}
                        className="px-6 py-2 h-auto font-medium"
                        style={{
                            minWidth: '80px',
                            borderRadius: '8px',
                            border: '1px solid #d9d9d9',
                            backgroundColor: '#fff'
                        }}
                    >
                        No
                    </Button>
                    <Button
                        type="primary"
                        danger
                        onClick={onConfirm}
                        loading={loading}
                        className="px-6 py-2 h-auto font-medium"
                        style={{
                            minWidth: '80px',
                            borderRadius: '8px',
                            backgroundColor: '#dc3545',
                            borderColor: '#dc3545'
                        }}
                    >
                        Yes
                    </Button>
                </Space>
            </div>
        </Modal>
    );
}