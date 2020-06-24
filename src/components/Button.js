import React from "react";
import { Button } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

export const DeleteButton = () => {
  return (
    <Button icon={<DeleteOutlined />} title="Delete" danger/>
  )
}

export const EditButton = () => {
  return (
    <Button icon={<EditOutlined />} title="Edit" />
  )
}

