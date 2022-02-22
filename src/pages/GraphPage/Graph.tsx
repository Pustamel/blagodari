import React from 'react';
import { DefaultNode, Graph } from '@visx/network';

export type NetworkProps = {
  width: number;
  height: number;
  users: any;
  connections: any;
};

interface CustomNode {
  x: number;
  y: number;
  color?: string;
}

interface CustomLink {
  source: CustomNode;
  target: CustomNode;
  dashed?: boolean;
}

export const background = '#272b4d';

interface colors {
  color?: string;
  node: any;
}

export default function GraphComponent({
  width,
  height,
  users,
  connections,
}: NetworkProps) {
  console.log('users:', users);
  console.log('connections:', connections);

  const orig: { source: any; target: any }[] = [];

  // const nodes: CustomNode[] = [
  // { x: 50, y: 20, color: 'pink' },
  // { x: 200, y: 250, color: 'red' },
  // { x: 300, y: 40, color: "#26deb0" },
  // { x: 400, y: 50, color: "grey" }
  // ]

  // const links: CustomLink[] = [
  // { source: nodes[0], target: nodes[1] }, //pink
  // { source: nodes[1], target: nodes[2] }, //red
  // { source: nodes[2], target: nodes[0], },
  // { source: nodes[3], target: nodes[1], dashed: true }
  // ]

  connections.map((item: { source: any; target: any }) => {
    orig.push({
      source: item.source,
      target: item.target,
    });
  });

  const set = new Set([
    ...orig.map(user => user.source),
    ...orig.map(user => user.target),
  ]);

  const map = new Map();

  [...set].map((userId, index) => {
    map.set(userId, index);
  });

  const nodes = [...set].map((node, index) => ({
    x: (Math.random() + index / 2) * 100, // -50 ... +50
    y: (Math.random() + index / 2) * 100,
    color: 'pink',
  }));

  const links = orig.map(user => ({
    source: nodes[map.get(user.source)],
    target: nodes[map.get(user.target)],
  }));

  const graph = {
    nodes,
    links,
  };

  return width < 10 ? null : (
    <svg width={width} height={height}>
      <rect width={width} height={height} rx={14} fill={background} />
      <Graph<CustomLink, CustomNode>
        graph={graph}
        top={20}
        left={100}
        nodeComponent={({ node: { color } }: colors) =>
          color !== undefined ? <DefaultNode fill={color} /> : <DefaultNode />
        }
        linkComponent={({ link: { source, target, dashed } }: any) => (
          <line
            x1={source.x}
            y1={source.y}
            x2={target.x}
            y2={target.y}
            strokeWidth={2}
            stroke="#999"
            strokeOpacity={0.6}
            strokeDasharray={dashed !== undefined ? '8,4' : undefined}
          />
        )}
      />
    </svg>
  );
}
