import React, { useCallback } from "react";
import { useAppDispatch } from "../store/hooks";
import { addNode } from "../store/flowSlice";

export const AddNodeButton = () => {
  const dispatch = useAppDispatch();
  // Create new Node in random positions on React Flow sheet
  const handleAddNodes = useCallback(() => {
    const newNode = {
      id: `${Date.now()}`,
      position: { x: Math.random() * 500, y: Math.random() * 500 },
      data: { label: "Task" },
    };
    dispatch(addNode(newNode));
  }, [dispatch]);

  return <button className="btn-main" onClick={handleAddNodes}>Add task</button>;
};
