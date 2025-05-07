import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { FlowEdge, FlowNode, FlowState } from "../types/types";

const initialState: FlowState = {
  nodes: [
    {
      id: "1",
      position: { x: 100, y: 100 },
      data: { label: "Start node" },
      type: "input",
    },
  ],
  edges: [],
  selectedNodeId: null,
};

// Create a "slice" of storage to manage flow state
export const flowSlice = createSlice({
  name: "flow",
  initialState,
  reducers: {
    // Adding a new node
    // action.payload contains the new node
    addNode: (state, action: PayloadAction<FlowNode>) => {
      state.nodes.push(action.payload);
    },

    // Select node (or reset selection)
    // action.payload contains node ID or null
    // update ID of selected node
    selectNode: (state, action: PayloadAction<string | null>) => {
      state.selectedNodeId = action.payload;
    },

    // Update node label
    // Find node by ID
    // If node found, update its label
    // If node not found, do nothing
    updateNode: (
      state,
      action: PayloadAction<{ id: string; label: string }>
    ) => {
      const node = state.nodes.find((n) => n.id === action.payload.id);
      if (node) {
        node.data.label = action.payload.label;
      }
    },

    // Adding a new connection between nodes
    // Checking if such a connection already exists
    // Source matches and target matches
    addEdge: (state, action: PayloadAction<FlowEdge>) => {
      const edgeExists = state.edges.some(
        (edge) =>
          edge.source === action.payload.source &&
          edge.target === action.payload.target
      );

      // If there is no connection yet, add it
      // Copy all properties from action.payload
      // Generate a unique ID for the connection
      // Add a new connection to the edges array
      if (!edgeExists) {
        const newEdge = {
          ...action.payload,
          id: uuidv4(),
        };
        state.edges.push(newEdge);
      }
    },

    // Completely replace all nodes
    // action.payload contains a new array of nodes
    // Completely replace the nodes array
    setNodes: (state, action: PayloadAction<FlowNode[]>) => {
      state.nodes = action.payload;
    },

    // completely replace all connections
    // action.payload contains a new array of connections
    // Completely replace the edges array
    setEdges: (state, action: PayloadAction<FlowEdge[]>) => {
      state.edges = action.payload;
    },
  },
});

export const { addNode, updateNode, selectNode, addEdge, setNodes, setEdges } =
  flowSlice.actions;

export const flowReducer = flowSlice.reducer;
