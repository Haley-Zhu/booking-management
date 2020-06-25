import React from "react";
import { Button } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

export const DeleteButton = (props) => {
  return (
    <Button {...props} icon={<DeleteOutlined />} title="Delete" danger/>
  )
}

export const EditButton = (props) => {
  return (
    <Button {...props} icon={<EditOutlined />} title="Edit" />
  )
}

