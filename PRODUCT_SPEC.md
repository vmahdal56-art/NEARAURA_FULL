# NearAura Product Specification

This document outlines the technical development instructions for the four core pillars of the NearAura application.

## 1. aNEARAURA (<500m): The Real-Time Map Sync

**The Tech:** Google Maps SDK + BleManager LiveData.

**Sync Logic:** As BleManager discovers a new MAC address and smoothes the RSSI (distance), the map must "pulse" a marker at the user’s last known GPS coordinate.

**Dev Instruction:**
> Map markers must be dynamic. Use the `nearbyUsers` observer to update marker opacity. If a user is <50m away, the marker glow should be at 100%. If they move to 400m, fade the glow to 30%. Integrate the London Underground KML layer to show station entrances as '''High-Density Aura Zones'''.

## 2. FARAURA (>500m): The "3x6 Grid" Geo-Sync

**The Tech:** GeoFirestore + RecyclerView (GridLayout).

**Sync Logic:** This section does not use BLE (which is too short-range). It uses the database. When the user moves the distance slider, it triggers a "circular query" around the user'''s GPS.

**Dev Instruction:**
> Implement a GeoQuery centered on the user. When the slider changes, kill the old listener and start a new one. Sort the results by distance and map the first 18 results to the `3x6 GridAdapter`. Cache the images using Glide so the grid feels instant when sliding back and forth.

**UI/UX Guidelines for the "Gallery" (3x6 Grid):**

*   **Photo Treatment:**
    *   Aspect Ratio: 3:4 (Portrait).
    *   Corner Radius: 16dp.
    *   Overlays: Subtle bottom-to-top black gradient for name and distance readability.
*   **"Aura" Indicators:**
    *   Placement: Top-right corner.
    *   Style: Circular "glassmorphism" badge with emoji (🍍, 🍇, 🍓).
    *   Status Ring: Thin gold glowing border for "Verified Founder".
*   **Distance Slider:**
    *   Material Design 3 "discrete" slider (500m, 1km, 5km, 10km).
    *   Visual Feedback: "Shimmer" loading effect (Skeleton UI) on grid refresh.
*   **Technical Brief:**
    *   Grid Spacing: 8dp horizontal and vertical padding.
    *   Typography: '''Plus Jakarta Sans'''.
    *   Skeleton Loading: Shimmer effect during GeoQuery fetch.
    *   Haptics: Light '''click''' on profile tap.

## 3. DATING: The "Radar-to-Stack" Filter

**The Tech:** CardStackView library + List Filtering.

**Sync Logic:** This takes the "Top 100" nearest users found by the Radar/GeoQuery and converts them into a swipable stack.

**Dev Instruction:**
> Create a `SwipeStackAdapter`. The data source should be the same list used by the Radar, filtered strictly for users with `intent.aura == '''PINEAPPLE'''`. This ensures that the '''Dating''' section only shows people who are physically near and have the same intent. If a user disappears from the Radar, remove them from the stack in real-time.

## 4. COMMUNITY: The "Spatial Hub" Sync

**The Tech:** Firestore Collections (`community_hubs`) + Geo-fencing.

**Sync Logic:** Community "Pins" are static GPS locations in Firestore. If the user’s current Radar radius (<500m or >500m) overlaps with a Community Pin, it appears in the list.

**Dev Instruction:**
> Sync the CommunityFragment with the Map. If a user joins a '''London Tech''' hub, their Aura on other people'''s Radars should show a small 🍇 badge. Use `onCameraMove` on the Map to refresh the '''Nearby Communities''' list based on the map'''s center point.

## 5. Optional Map-Overlay Feature

**Feature Specs:**

*   **User Consent & Toggle:**
    *   A "Map" icon on the Radar screen.
    *   Consent Popup: "Allow NearAura to display your location on a map? This helps you navigate toward connections. You can turn this off at any time."
    *   Map is off by default.
*   **Visual Integration:**
    *   Custom Dark Mode JSON for Google Maps ('''Midnight''' or '''Aubergine''' style).
    *   Radar layer as a fixed overlay.
    *   Sync Radar scale with Map zoom.
*   **London Underground Integration:**
    *   Integrate TfL API or KML file to display Tube lines on the map.

**Development Instructions:**

> **Optional Map Integration**
>
> *   **Map Provider:** `com.google.android.gms:play-services-maps`.
> *   **Custom Styling:** Apply a '''Midnight''' or '''Aubergine''' style to the map.
> *   **Fragment Layering:** Place the `SupportMapFragment` behind the `RadarCustomView`.
> *   **Zoom Syncing:** Use `GoogleMap.OnCameraMoveListener` to sync Radar radius with map zoom.
> *   **Privacy:** Never mark user'''s "Home" or "Work" locations.

## System Architecture Summary

| Section | Data Trigger | Update Frequency |
| :--- | :--- | :--- |
| aNEARAURA | BLE Scan Result | Every 3 seconds (smoothed) |
| FARAURA | Slider / GPS Move | On demand (Debounced) |
| DATING | Radar Match | Real-time |
| COMMUNITY | Geo-fence Entry | On location change (>50m) |

## GDPR/Privacy Snippet for Map Feature

"By enabling the map feature, you consent to sharing your location data to display your position relative to other users on a map. This data is used solely for the purpose of enhancing your navigational experience within the NearAura app and is not shared with third parties. You can revoke this consent at any time by disabling the map feature in the app settings."