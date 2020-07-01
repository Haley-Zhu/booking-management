import React from "react";
import { Button } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';

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

export const CreateItemButton = ({field, ...rest}) => {
  return(
    <Button className="create-btn" {...rest} icon={<PlusOutlined />}>{`New ${field}`}</Button>
  )
}

