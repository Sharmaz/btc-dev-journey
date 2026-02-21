import React, { useCallback } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  type NodeMouseHandler,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useHistory } from '@docusaurus/router';
import { nodes as initialNodes, edges as initialEdges } from './roadmapData';
import styles from './styles.module.css';

export default function RoadmapDiagram(): JSX.Element {
  const [nodes] = useNodesState(initialNodes);
  const [edges] = useEdgesState(initialEdges);
  const history = useHistory();

  const onNodeClick: NodeMouseHandler = useCallback(
    (_event, node) => {
      const url = node.data?.url as string | undefined;
      if (url) {
        history.push(url);
      }
    },
    [history],
  );

  return (
    <div className={styles.roadmapContainer}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodeClick={onNodeClick}
        fitView
        fitViewOptions={{ padding: 0.3 }}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
        proOptions={{ hideAttribution: true }}
      >
        <Background gap={16} size={1} />
        <Controls showInteractiveButton={false} />
        <MiniMap
          nodeStrokeWidth={3}
          pannable
          zoomable
        />
      </ReactFlow>
    </div>
  );
}
