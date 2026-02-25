"use client";

import { localPoint } from "@visx/event";
import type { scaleLinear, scaleTime } from "@visx/scale";
import { useCallback, useState } from "react";
import type { LineConfig, Margin, TooltipData } from "./chart-context";

type ScaleTime = ReturnType<typeof scaleTime<number>>;
type ScaleLinear = ReturnType<typeof scaleLinear<number>>;

export interface ChartSelection {
  active: boolean;
  startIndex: number;
  endIndex: number;
  startX: number;
  endX: number;
}

interface UseChartInteractionProps {
  xScale: ScaleTime;
  yScale: ScaleLinear;
  data: Record<string, unknown>[];
  lines: LineConfig[];
  margin: Margin;
  xAccessor: (d: Record<string, unknown>) => Date;
  bisectDate: (data: Record<string, unknown>[], date: Date) => number;
  canInteract: boolean;
}

export function useChartInteraction({
  xScale,
  yScale,
  data,
  lines,
  margin,
  xAccessor,
  bisectDate,
  canInteract,
}: UseChartInteractionProps) {
  const [tooltipData, setTooltipData] = useState<TooltipData | null>(null);
  const [selection, setSelection] = useState<ChartSelection | null>(null);

  const clearSelection = useCallback(() => {
    setSelection(null);
  }, []);

  const handleMouseMove = useCallback(
    (event: React.MouseEvent<SVGGElement>) => {
      if (!canInteract) return;

      const point = localPoint(event);
      if (!point) return;

      const x0 = xScale.invert(point.x - margin.left);
      const index = bisectDate(data, x0);
      const d0 = data[index - 1];
      const d1 = data[index];

      let d = d0;
      let idx = index - 1;
      if (d1 && d0) {
        const t0 = xAccessor(d0).getTime();
        const t1 = xAccessor(d1).getTime();
        if (x0.getTime() - t0 > t1 - x0.getTime()) {
          d = d1;
          idx = index;
        }
      }

      if (!d) return;

      const xPos = xScale(xAccessor(d)) ?? 0;
      const yPositions: Record<string, number> = {};
      for (const line of lines) {
        const value = d[line.dataKey];
        if (typeof value === "number") {
          yPositions[line.dataKey] = yScale(value) ?? 0;
        }
      }

      setTooltipData({
        point: d,
        index: idx,
        x: xPos,
        yPositions,
      });
    },
    [
      xScale,
      yScale,
      data,
      lines,
      margin.left,
      xAccessor,
      bisectDate,
      canInteract,
    ],
  );

  const handleMouseLeave = useCallback(() => {
    setTooltipData(null);
  }, []);

  const interactionHandlers = canInteract
    ? {
        onMouseMove: handleMouseMove,
        onMouseLeave: handleMouseLeave,
      }
    : {};

  const interactionStyle = {
    cursor: canInteract ? "crosshair" : ("default" as const),
  };

  return {
    tooltipData,
    setTooltipData,
    selection,
    clearSelection,
    interactionHandlers,
    interactionStyle,
  };
}
