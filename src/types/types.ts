import { Node, Edge } from "@xyflow/react";

export interface FlowNodeData extends Record<string, unknown> {
  label: string;
}

export type FlowNode = Node<FlowNodeData>;
export type FlowEdge = Edge;

export interface FlowState {
  nodes: FlowNode[];
  edges: FlowEdge[];
  selectedNodeId: string | null;
}

export interface CustomRootState {
  flow: FlowState;
}
