/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Modal, Upload, Button, message } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { RcFile, UploadChangeParam, UploadFile } from "antd/es/upload";
import { useCreateImageMutation } from "@/redux/api/gallery/galleryApi";
import { toast } from "sonner";

const { Dragger } = Upload;

export interface UploadImageModalProps {
  open: boolean;
  fileList: UploadFile[];
  onChange: (info: UploadChangeParam<UploadFile>) => void;
  onCancel: () => void;
  onUploadSuccess?: () => void; // optional callback
}

export default function UploadImageModal({
  open,
  fileList,
  onChange,
  onCancel,
  onUploadSuccess,
}: UploadImageModalProps) {
  const [createImage, { isLoading }] = useCreateImageMutation();

  // validate before adding to list
  const beforeUpload = (file: RcFile) => {
    const isImage = file.type.startsWith("image/");
    const isLt25M = file.size / 1024 / 1024 < 25;

    if (!isImage) {
      toast.error("You can only upload image files!");
      return Upload.LIST_IGNORE;
    }
    if (!isLt25M) {
      toast.error("Image must smaller than 25MB!");
      return Upload.LIST_IGNORE;
    }
    return false; // prevent auto-upload
  };

  // manual upload
  const handleUpload = async () => {
    if (fileList.length === 0) {
      toast.warning("Please select an image first");
      return;
    }

    const file = fileList[0].originFileObj as File;
    if (!file) return;

    try {
      await createImage(file).unwrap();
      toast.success("Image uploaded successfully!");
      onUploadSuccess?.();
      onCancel();
    } catch (err) {
      toast.error("Upload failed, please try again");
    }
  };

  return (
    <Modal
      open={open}
      centered
      closable={false}
      title="Upload Image"
      footer={null}
      onCancel={onCancel}
      destroyOnHidden
      styles={{ body: { padding: 20 } }}
    >
      <Dragger
        multiple={false}
        maxCount={1}
        accept="image/*"
        fileList={fileList}
        onChange={onChange}
        beforeUpload={beforeUpload}
        showUploadList={{ showRemoveIcon: true }}
      >
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">Drag or click to select</p>
        <p className="ant-upload-hint text-xs">
          JPG/PNG • max 25 MB • single file
        </p>
      </Dragger>

      <div className="mt-4 flex justify-end gap-3">
        <Button onClick={onCancel}>Cancel</Button>
        <Button
          type="primary"
          loading={isLoading}
          onClick={handleUpload}
          disabled={fileList.length === 0}
        >
          Upload
        </Button>
      </div>
    </Modal>
  );
}
