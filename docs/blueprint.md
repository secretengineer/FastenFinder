# **App Name**: SortMaster

## Core Features:

- Video Stream Integration: Integrate with ESP32 camera(s) to receive a live video feed of hardware passing through the sorting system.
- Visual Identification: Employ AI-powered image recognition to identify and classify individual pieces of hardware from the video feed.
- Hardware Database: Maintain a comprehensive database of hardware specifications, including images, dimensions, and container assignments.
- Real-time Sorting Instructions: Generate real-time instructions for the mechanical sorting robot, directing each piece of hardware to its designated container. The AI tool decides when a sorting decision can be made and passed along. It may decide to defer, retry, request manual override, etc.
- Unidentified Hardware Handling: Implement a process for handling unrecognized hardware by diverting it to a 'random' bin for manual sorting.
- Inventory Tracking: Track the quantity of each hardware type sorted into its respective container.
- Sorting Log: Record each sorting decision in a system log, noting the hardware type, timestamp, and destination container.

## Style Guidelines:

- Primary color: Deep blue (#3F51B5), evoking a sense of precision and reliability.
- Background color: Very light blue (#E8EAF6) that maintains the seriousness of the brand while allowing an airy spaciousness for content.
- Accent color: A light, gentle violet (#7986CB), that sits slightly to the "left" of the primary color in hue.
- Body and headline font: 'Inter', a sans-serif typeface for a clean, modern and professional appearance.
- Use simple, clear icons to represent hardware types and container destinations.
- Organize the user interface to clearly display the video feed, hardware identification information, and sorting instructions.
- Employ subtle animations to provide feedback on sorting progress and system status.