import React, { useCallback, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  applyEdgeChanges,
  applyNodeChanges,
  Connection,
  EdgeChange,
  NodeChange,
  ReactFlow,
  useEdgesState,
  useNodesState,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import "./App.css";
import { AddNodeButton } from "./components/AddNodeButton";
import {
  addEdge,
  setNodes as setReduxNodes,
  setEdges as setReduxEdges,
  selectNode,
} from "./store/flowSlice";
import { SideBar } from "./components/SideBar";
import { FlowEdge, FlowNode } from "./types/types";

export const App = () => {
  // Get current nodes and edges from Redux store
  const { nodes: reduxNodes, edges: reduxEdges } = useAppSelector(
    (state) => state.flow
  );

  // Create start state for nodes and edges with React Flow's
  const [nodes, setNodes] = useNodesState(reduxNodes);
  const [edges, setEdges] = useEdgesState(reduxEdges);

  const dispatch = useAppDispatch();

  // Effect to sync Redux state with React Flow's internal state
  useEffect(() => {
    setNodes(reduxNodes);
    setEdges(reduxEdges);
  }, [reduxNodes, reduxEdges, setNodes, setEdges]);

  // Handler for creating new connections between nodes
  // Create a new edge object with a unique ID
  const handleConnect = useCallback(
    (connection: Connection) => {
      const edge: FlowEdge = {
        ...connection,
        id: uuidv4(),
      };
      dispatch(addEdge(edge));
    },
    [dispatch]
  );

  // Handler for node changes (drag, select, etc.)
  // Apply changes to nodes using React Flow's utility
  // Update local state
  // Sync changes with Redux store
  const handleNodesChange = useCallback(
    (changes: NodeChange[]) => {
      const updatedNodes = applyNodeChanges(changes, nodes) as FlowNode[];
      setNodes(updatedNodes);
      dispatch(setReduxNodes(updatedNodes)); 
    },
    [dispatch, nodes]
  );

  // Similar like handleNodesChange, but with Edges
  const handleEdgesChange = useCallback(
    (changes: EdgeChange[]) => {
      const updatedEdges = applyEdgeChanges(changes, edges);
      setEdges(updatedEdges);
      dispatch(setReduxEdges(updatedEdges)); 
    },
    [dispatch, edges]
  );

  // This handler need to open sidebar panel
  const handleNodeClick = useCallback(
    (_: React.MouseEvent, node: FlowNode) => {
      dispatch(selectNode(node.id));
    },
    [dispatch]
  );

  // Use this handler to click on an empty area
  // and close the sidebar panel
  const handlePaneClick = useCallback(() => {
    dispatch(selectNode(null));
  }, [dispatch]);

  return (
    <div className="app">
      <div style={{ width: "100vw", height: "100vh" }}>
        <AddNodeButton />
        <SideBar />
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onConnect={handleConnect}
          onNodesChange={handleNodesChange}
          onEdgesChange={handleEdgesChange}
          onNodeClick={handleNodeClick}
          onPaneClick={handlePaneClick}
          fitView
        />
      </div>
    </div>
  );
};
