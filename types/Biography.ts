import { addColorsToFlows } from "@/lib/add-colors-to-flows";
import { getBiographiesByCommonEvent } from "@/lib/get-biographies-by-common-event";

export type BiographyFlow = Awaited<
  ReturnType<typeof getBiographiesByCommonEvent>
>[number];

export type BiographyFlowExtened = NonNullable<
  ReturnType<typeof addColorsToFlows>
>[number];
