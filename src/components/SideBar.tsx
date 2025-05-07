import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { updateNode } from "../store/flowSlice";
import "../sidebar.css";
import { FlowNode } from "../types/types";

export const SideBar = () => {
  const [nodeLabel, setNodeLabel] = useState("");
  const [buttonIsDisabled, setButtonIsDisabled] = useState(false);
  const [selectedNode, setSelectedNode] = useState<FlowNode | null>(null);
  const dispatch = useAppDispatch();

  // Get nodes and ID of the selected node from the Redux store
  const nodes = useAppSelector((state) => state.flow.nodes);
  const selectedNodeId = useAppSelector((state) => state.flow.selectedNodeId);

  // Effect to update state when selected node changes
  useEffect(() => {
    if (selectedNodeId) {
      const node = nodes.find((nds) => nds.id === selectedNodeId);
      if (node) {
        setSelectedNode(node);
        setNodeLabel(node.data.label || "");
        setButtonIsDisabled(false);
      }
    } else {
      setSelectedNode(null);
    }
  }, [selectedNodeId, nodes]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNodeLabel(event.target.value);
    setButtonIsDisabled(true);
  }

  const handleClear = () => {
    setNodeLabel("");
    setButtonIsDisabled(true);
  }

  const handleSave = () => {
    if (selectedNode) {
      dispatch(
        updateNode({
          id: selectedNode.id,
          label: nodeLabel,
        })
      );
    }
  };

  // Chack if input is empty
  const isError = buttonIsDisabled && !nodeLabel.trim();
  // Save button lock flag
  const isSaveDisabled = !nodeLabel.trim();

  return (
    <>
      {selectedNode && (
        <div className="sidebar">
          <div className="sidebar-header">Edit Node</div>

          <div className="sidebar-section">
            <label htmlFor="node-label">Label</label>
            <input
              id="node-label"
              value={nodeLabel}
              onChange={handleInputChange}
              onBlur={() => setButtonIsDisabled(true)}
              placeholder="Enter node label"
              className={isError ? "error" : ""}
              required
            />
            {isError && <div className="error-message">This field is required</div>}
          </div>

          <div className="sidebar-section">
            <label>Node ID: {selectedNode.id}</label>
          </div>

          <div className="sidebar-actions">
            <button
              onClick={handleClear}
              className="clear-btn"
            >
              Clear
            </button>
            <button
              onClick={handleSave}
              className="save-btn"
              disabled={isSaveDisabled}
            >
              Save
            </button>
          </div>
        </div>
      )}
    </>
  );
};
