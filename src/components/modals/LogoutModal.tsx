import React from 'react';
import { Modal, Button, Space } from 'antd';

interface LogoutModalProps {
    open: boolean;
    onConfirm: () => void;
    onCancel: () => void;
}

const LogoutModal: React.FC<LogoutModalProps> = ({ open, onConfirm, onCancel }) => {
    return (
        <Modal
            open={open}
            title={null}
            footer={null}
            onCancel={onCancel}
            centered
            width={400}
            maskClosable={false}
            className="logout-modal"
        >
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <h3 style={{
                    fontSize: '18px',
                    fontWeight: 500,
                    margin: '0 0 30px 0',
                    color: '#333'
                }}>
                    Do you want to logout?
                </h3>

                <Space size="middle">
                    <Button
                        size="large"
                        onClick={onCancel}
                        style={{
                            minWidth: '80px',
                            borderRadius: '6px',
                            border: '1px solid #d9d9d9',
                            backgroundColor: '#fff'
                        }}
                    >
                        No
                    </Button>
                    <Button
                        type="primary"
                        danger
                        size="large"
                        onClick={onConfirm}
                        style={{
                            minWidth: '80px',
                            borderRadius: '6px',
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
};

export default LogoutModal;