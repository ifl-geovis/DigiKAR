# DigiKAR API: Endpoints

This document describes and compares the two main API endpoints for rights data in the DigiKAR project: the **Summary View** and the **Default (Detailed) View**. It is based on the TypeScript types found in `types/SummaryView.ts` and `types/RightDefaultView.ts`. In addition, it provides an overview of the `/orte` endpoint, which is used to retrieve right data based on spatial location.

---

## Summary View Endpoint

> [!CAUTION]
> This view is obsolete and might be deprecated.

- **TypeScript type:** `SummaryViewRights` (see `types/SummaryView.ts`)
- **Typical API usage:** `/orte?select=*,<right>_summary(*)` (in Combination with the `/orte` endpoint)
- **Example API call:** [/grundherrschaft_summary?place_id=eq.00c16b51-9d93-4c3c-afcc-34842ce0c4b0](https://api.geohistoricaldata.org/digikar/grundherrschaft_summary?place_id=eq.00c16b51-9d93-4c3c-afcc-34842ce0c4b0)
- **Shape:** Array of objects, each with place and time information per place aggregated right attributes.
- **Purpose:**
  - Provides a compact, aggregated view of rights for each source.
  - Designed for map overviews and fast queries.
- **Key fields:**
  - `id`, `label`, `earliest_attested`, `latest_attested`,
  - For each right (e.g., `grundherrschaft_summary`): an array of `RightEntry` objects, each summarizing rights for a place.

**Example structure:**

```ts
{
  attested: FuzzyTimeInterval;
  place_id: string;
  place_label: string;
  place_ref: string;
  rightholders_individuals: {
    category: string;
    is_disputing: boolean;
    rightholder: string;
    rightholder_consolidated: string;
    source: string;
    top_level: string;
    type: string; // "Körperschaft", "Person"
  }
}
```

---

## Default (Detailed) View Endpoint

- **TypeScript type:** `RightDefaultView` (see `types/RightDefaultView.ts`)
- **Typical API usage:**
  `/orte?select=*,<right>(*)`
- **Example API call:** [/orte?select=_,grundherrschaft(_)&limit=3](<https://api.geohistoricaldata.org/digikar/orte?select=*,grundherrschaft(*)&limit=3>)
- **Shape:** Array of objects, for every source at a certain place at a certain time
- **Purpose:**
  - Provides a detailed, per-source, per-place view for in-depth queries.
  - Intended for detail dialogs.
- **Key fields:**
  - `id`, `geometry`, `label`, `earliest_attested`, `latest_attested`, `when`
  - For each right (e.g., `grundherrschaft`): an array of detailed right objects, each with:
    - `attested_fuzzy`, `attested_raw`, `attested_json` (fuzzy time interval)
    - `when`, `sources`, `originators`, `comments`
    - `rightholders`: array of detailed rightholder objects
    - `top_levels`, `md_rights_held_by`, `md_disputed_by`, `md_rightholders_categories`

**Example structure:**

```ts
{
  attested_fuzzy: {
    kernel: string;
    support: string;
  };
  attested_json: {
    kernel: [number, number];
    support: [number, number];
  };
  attested_raw: string;
  comments: string[];
  md_rights_held_by: number;
  md_disputed_by: number;
  md_rightholders_categories: string[];
  originators: string[];
  place_id: string;
  place_label: string;
  rightholders: {
    category: string;
    is_disputing: boolean;
    rightholder: string;
    rightholder_consolidated: string;
    source: string;
    top_level: string;
    type: string; // "Körperschaft", "Person"
  }[];
  top_levels: string[];
  when: { timespans: TimeSpan[] };
}
```

## `/orte` Endpoint

- **Shape:** Array of objects, each representing a source for a certain place at a certain time.
- **API Usage:** `/rpc/orte.geojson/orte?select=\*`
- **Example API call:** [/rpc/orte.geojson?bbox={12.031,13.10,50.56,50.80}&select=_,kollatur_summary(_)&in_sample_regions=is.true](<https://api.geohistoricaldata.org/digikar/rpc/orte.geojson?bbox={12.031,13.10,50.56,50.80}&select=*,kollatur_summary(*)&in_sample_regions=is.true>)
- **Use Cases:**  
  Retrieve information based on location. The endpoint executes a RPC (_Remote Procedure Call_) allowing to filter spatially by a bounding box (e.g. based on the current map view).
- **Features:**
  - Supports standard PostgREST query parameters (filtering, ordering, pagination).
  - With content negotiation (`.geojson` suffix), it can return GeoJSON for spatial data, hence returns a `FeatureCollection` with `Point` geometries in this case.
  - Supports the `bbox` parameter to spatially filter results by a bounding box.

**Example Structure:**

```ts
{
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [longitude, latitude]
      },
      properties: {
        id: string;
        label: string;
        earliest_attested: number; // YYYY
        latest_attested: number; // YYYY
        when: When; // Fuzzy time interval
        in_sample_regions: boolean;
        case_study: string; // Name of the case study area
        <right>_summary: RightSummary[]; // Summary of rights, e.g., grundherrschaft_summary, depending on which right was joined
      }
    },
    // ...more features
  ]
}
```

---

## References

- See `types/SummaryView.ts` and `types/RightDefaultView.ts` for full type definitions.
- API: [api.geohistoricaldata.org/digikar/](https://api.geohistoricaldata.org/digikar/)
