import { addColorsToFlows } from "@/lib/addColorsToFlows";
import { getBiographiesByCommonEvent } from "@/lib/getBiographiesByCommonEvent";

export type BiographyFlow = Awaited<
  ReturnType<typeof getBiographiesByCommonEvent>
>[number];

export type BiographyFlowExtened = NonNullable<
  ReturnType<typeof addColorsToFlows>
>[number];
